# Copyright The IETF Trust 2012-2019, All Rights Reserved
import os
import sys
import time as timeutils
import inspect
from typing import Callable

try:
    import syslog
    logger = syslog.syslog              # type: Callable
except ImportError:                     # import syslog will fail on Windows boxes
    import logging
    logging.basicConfig(filename='tracker.log',level=logging.INFO)
    logger = logging.info

try:
    from pprint import pformat
except ImportError:
    pformat = lambda x: x               # type: ignore

import cProfile
import traceback as tb

# A debug decorator, written by Paul Butler, taken from
# http://paulbutler.org/archives/python-debugging-with-decorators/
# Additional functions and decorator functionality added by
# Henrik Levkowetz

__version__ = "0.16"

increment = 2

debug = False

# Number of times to indent output
# A list is used to force access by reference
_report_indent = [4]
_mark = [ timeutils.time() ]

def set_indent(i):
    _report_indent[0] = i

def trace(fn):                 # renamed from 'report' by henrik 16 Jun 2011
    """Decorator to print information about a function
    call for use while debugging.
    Prints function name, arguments, and call number
    when the function is called. Prints this information
    again along with the return value when the function
    returns.
    """
    def fix(s,n=64):
        import re
        s = re.sub(r'\\t', ' ', s)
        s = re.sub(r'\s+', ' ', s)
        if len(s) > n+3:
            s = s[:n]+"..."
        return s
    def wrap(fn, *params,**kwargs):
        call = wrap.callcount = wrap.callcount + 1

        indent = ' ' * _report_indent[0]
        fr = tb.format_stack()[-3].strip()[4:]                      # call from
        fi, co = [ l.strip() for l in fr.splitlines()[:2] ]         # file info, code
        fu = "%s.%s()" % (fn.__module__, fn.__name__)               # function name
        fc = "%s(%s)" % (fn.__name__, ', '.join(                    # function call
            [fix(repr(a)) for a in params] +
            ["%s = %s" % (a, fix(repr(b))) for a,b in kwargs.items()]
        ))

        if debug:
            sys.stderr.write("\n%s  From %s:\n%s  |  %s\n%s  %s\n%s* %s [#%s]\n" %
                (indent, fi, indent, co, indent, fu, indent, fc, call))
        _report_indent[0] += increment
        mark = timeutils.time()
        ret = fn(*params,**kwargs)
        tau = timeutils.time() - mark
        _report_indent[0] -= increment
        if debug:
            sys.stderr.write("%s  %s | %.3fs [#%s] ==> %s\n" % (indent, fc, tau, call, fix(repr(ret))))

        return ret
    wrap.callcount = 0
    if debug:
        from decorator import decorator
        return decorator(wrap, fn)
    else:
        return fn

def filepos():
    file, line, func, text = tb.extract_stack(None, 2)[0]
    parts = file.split(os.sep)
    name = os.sep.join(parts[-2:])
    indent = ' ' * (_report_indent[0])
    return "%s%s:%s: %s()" % (indent, name, line, func)

def mark():
    def show_entry(e):
        sys.stderr.write(" at %s:L%s %s() %s\n" % e)
    if debug:
        indent = ' ' * (_report_indent[0])
        file, line, func, text = tb.extract_stack(None, 2)[0]
        parts = file.split(os.sep)
        name = os.sep.join(parts[-2:])
        sys.stderr.write("%sMark %s:%s\n" % (indent, name, line))
        _mark[0] = timeutils.time()

def lap(s):
    if debug:
        clk = timeutils.time()
        tau = clk - _mark[0]
        ts = timeutils.strftime("%H:%M:%S", timeutils.localtime(clk))
        say("%s: %.3fs since mark: %s" % (ts, tau, s))

def clock(s):
    if debug:
        lap(s)
        _mark[0] = timeutils.time()

def time(fn):
    """Decorator to print timing information about a function call.
    """
    def wrap(fn, *params,**kwargs):

        indent = ' ' * _report_indent[0]
        fc = "%s.%s()" % (fn.__module__, fn.__name__,)

        mark = timeutils.time()
        ret = fn(*params,**kwargs)
        tau = timeutils.time() - mark
        sys.stderr.write("%s| %s | %.3fs\n" % (indent, fc, tau))

        return ret
    wrap.callcount = 0
    if debug:
        from decorator import decorator
        return decorator(wrap, fn)
    else:
        return fn

def show(name):
    if debug:
        frame = inspect.stack()[1][0]
        value = eval(name, frame.f_globals, frame.f_locals)
        indent = ' ' * (_report_indent[0])
        sys.stderr.write("%s%s: '%s'\n" % (indent, name, value))

def showpos(name):
    if debug:
        file, line, func, text = tb.extract_stack(None, 2)[0]
        parts = file.split(os.sep)
        fn = os.sep.join(parts[-2:])
        #
        frame = inspect.stack()[1][0]
        value = eval(name, frame.f_globals, frame.f_locals)
        indent = ' ' * (_report_indent[0])
        sys.stderr.write("%s%s:%s: %s: '%s'\n" % (indent, fn, line, name, value))

def log(name):
    if debug:
        frame = inspect.stack()[1][0]
        value = eval(name, frame.f_globals, frame.f_locals)
        indent = ' ' * (_report_indent[0])
        logger("%s%s: %s" % (indent, name, value))

def pprint(name):
    if debug:
        frame = inspect.stack()[1][0]
        value = eval(name, frame.f_globals, frame.f_locals)
        indent = ' ' * (_report_indent[0])
        sys.stderr.write("%s%s:\n" % (indent, name))
        lines = pformat(value).split('\n')
        for line in lines:
            sys.stderr.write("%s %s\n"%(indent, line))

def dir(name):
    if debug:
        name = "dir(%s)" % name
        frame = inspect.stack()[1][0]
        value = eval(name, frame.f_globals, frame.f_locals)
        indent = ' ' * (_report_indent[0])
        sys.stderr.write("%s%s:\n" % (indent, name))
        lines = pformat(value).split('\n')
        for line in lines:
            sys.stderr.write("%s %s\n"%(indent, line))

def type(name):
    if debug:
        name = "type(%s)" % name
        frame = inspect.stack()[1][0]
        value = eval(name, frame.f_globals, frame.f_locals)
        indent = ' ' * (_report_indent[0])
        sys.stderr.write("%s%s: %s\n" % (indent, name, value))
            
def say(s):
    if debug:
        indent = ' ' * (_report_indent[0])
        sys.stderr.write("%s%s\n" % (indent, s))
        sys.stderr.flush()

def profile(fn):
    def wrapper(*args, **kwargs):
        datafn = fn.__name__ + ".profile" # Name the data file sensibly
        prof = cProfile.Profile()
        retval = prof.runcall(fn, *args, **kwargs)
        prof.dump_stats(datafn)
        return retval
    if debug:
        from decorator import decorator
        return decorator(wrapper, fn)
    else:
        return fn
    
def traceback(levels=None):
    if debug:
        indent = ' ' * (_report_indent[0])
        sys.stderr.write("\n%s---- Stack ----\n" % indent)
        if levels:
            start = -2-levels
        else:
            start = None
        for s in tb.format_stack()[start:-1]:
            sys.stderr.write("%s%s" % (indent, s))
        sys.stderr.write("%s---------------\n" % indent)

def show_caller(level=None):
    if debug:
        indent = ' ' * (_report_indent[0])
        if level is None:
            level = -3
        sys.stderr.write("%sCalled from %s\n" % (indent, tb.format_stack()[level].strip()[4:]))

def info(name):
    if debug:
        frame = inspect.stack()[1][0]
        value = eval(name, frame.f_globals, frame.f_locals)
        vtype = eval("type(%s)"%name, frame.f_globals, frame.f_locals)
        indent = ' ' * (_report_indent[0])
        sys.stderr.write("%s%s: '%s' (%s)\n" % (indent, name, value, vtype))
