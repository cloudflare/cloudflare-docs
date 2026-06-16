---
_build:
  publishResources: false
  render: never
  list: never

name: "Process .pth files for Python Workers"
sort_date: "2026-05-26"
enable_date: "2026-05-26"
enable_flag: "python_process_pth_files"
disable_flag: "disable_python_process_pth_files"
---

When the `python_process_pth_files` flag is set, Python Workers process `.pth`
files in the `python_modules/` directory during startup by calling
[`site.addsitedir()`](https://docs.python.org/3/library/site.html#site.addsitedir)
on it. This lets packages extend `sys.path` declaratively, for example to add
subdirectories or register import hooks. Without this flag, `.pth` files in
`python_modules/` are ignored.

This flag also moves the top-level entropy context managers required by some
packages out of the runtime and into
[workers-py](https://github.com/cloudflare/workers-py).

You must use `workers-py` version `1.1.3` or later when this flag is set.
