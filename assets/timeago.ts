import fromnow from 'fromnow';

export function init() {
  let i = 0;
  let tmp: string | null;
  let arr = document.querySelectorAll('time.relative');
  for (; i < arr.length; i++) {
    tmp = arr[i].getAttribute('datetime');
    if (tmp) arr[i].textContent = fromnow(tmp, { max: 1, suffix: true });
  }
}
