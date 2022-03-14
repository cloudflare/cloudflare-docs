import { AsyncResource } from 'async_hooks';
import { isMainThread, parentPort, Worker } from 'worker_threads';
import { EventEmitter } from 'events';
import { cpus } from 'os';

import type { WorkerOptions } from 'worker_threads';

const FREE = Symbol('FREE');

export interface Options {
  script: URL | string;
  spawn?: WorkerOptions;
  max?: number;
}

export type Callback<T = unknown> = (err: Error | null, result: T) => Promise<void> | void;

export interface Task<I = any, R = unknown> {
  input: I;
  handle?: Callback<R>;
  resolve(value: R): void;
  reject(reason?: any): void;
}

async function exec<R = unknown>(callback: Callback<R>, err: Error | null, result: R | null) {
  let item = new AsyncResource('Task');
  let output = await item.runInAsyncScope(callback, null, err, result);
  item.emitDestroy(); // single use
  return output;
}

export class Pool extends EventEmitter {
  jobs: Map<number, Callback<unknown>>;
  idles: Worker[];
  workers: Set<Worker>;
  script: URL | string;
  tasks: Task[];

  private options?: WorkerOptions;
  private exit?: boolean;

  constructor(options: Options) {
    super();

    this.idles = [];
    this.script = options.script;
    this.workers = new Set();
    this.jobs = new Map();
    this.tasks = [];

    this.options = {
      execArgv: [],
      ...options.spawn,
    };

    let i = 0;
    let max = Math.max(1, options.max || cpus().length);
    while (i++ < max) this.spawn();

    this.on(FREE, () => {
      if (this.tasks.length > 0) {
        let task = this.tasks.shift()!;
        this.dispatch(task);
      }
    });
  }

  private dispatch(task: Task): void {
    if (this.idles.length < 1) {
      this.tasks.push(task);
      return;
    }

    let worker = this.idles.pop()!;

    worker.once('message', async result => {
      if (task.handle) {
        result = await exec(task.handle, null, result);
      }

      worker.removeAllListeners('message');
      this.idles.push(worker);
      task.resolve(result);
      this.emit(FREE);
    });

    worker.once('error', async err => {
      let result;
      if (task.handle) {
        result = await exec(task.handle, err, null);
      }

      // replace current/dead worker
      this.workers.delete(worker);

      // TODO: options.retry
      this.spawn();

      if (result == null) task.reject(err);
      else task.resolve(result);
    });

    worker.postMessage(task.input);
  }

  spawn(options?: WorkerOptions): void {
    if (this.exit) return;

    let worker = new Worker(this.script, {
      ...this.options,
      ...options,
    });

    this.workers.add(worker);
    this.idles.push(worker);
    this.emit(FREE);
  }

  run<T, R>(input: T, handle?: Callback<R>) {
    return new Promise((resolve, reject) => {
      this.dispatch({ input, handle, resolve, reject } as Task);
    });
  }

  close(): void {
    this.exit = true;
    for (let worker of this.workers) {
      worker.terminate();
    }
  }
}

export const isMain = isMainThread;
export const isWorker = !isMainThread;

export function listen<R = unknown>(callback: Callback<R>) {
  if (parentPort) parentPort.on('message', callback);
  else throw new Error('Missing `parentPort` link');
}
