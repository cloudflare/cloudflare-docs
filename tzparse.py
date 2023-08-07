# Copyright The IETF Trust 2012-2019, All Rights Reserved
#!/usr/bin/env python

"""
NAME
    tzparse

SYNOPSIS
    >>> tzparse("2008-09-08 14:40:35 +0200", "%Y-%m-%d %H:%M:%S %Z")
    datetime.datetime(2008, 9, 8, 14, 40, 35, tzinfo=pytz.FixedOffset(120))
    
    >>> print(tzparse("14:40:35 CEST, 08 Sep 2008", "%H:%M:%S %Z, %d %b %Y"))
    2008-09-08 14:40:35+02:00

DESCRIPTION
    This describes the python 'tzparse' module. It exports only one function: tzparse().

    tzparse() parses a string according to a specified format, exactly as time.strptime()
    does, but with the added capability to parse most common timezone specifications,
    such as 'UTC', the standard timezones ('NST', 'EST', 'CST', 'MST', 'PST', 'HNY'
    [North America], 'WET', 'CET', 'EET', 'MSK' [Europe], and more), the summer timezones
    ('CEST', 'EEST', 'EDT', PDT' etc.), military timezones ('A' .. 'Z') and numeric
    timezone indications ('+0200', '-0700', '-03:30' etc.).

    The time zone specification may be placed anywhere, not only at the end.

    tzparse() calls time.strptime() to parse everything except the timezone. To parse
    the timezone, it first tries to use the pytz module, but if that doesn't give
    any joy, it falls back to a hardcoded list of common time zone abbreviations and
    their offset from UTC.

BUGS

    * tzparse() cannot parse all valid RFC 3339 formats: it doesn't extract
    fractional seconds, and the underlying time.strptime() doesn't parse fractional
    seconds.

    * Parsing according to format specifications using the generic %c, %x and %X
    specifiers will only succeed if there are explicit delimiting characters
    between the %Z specifier and the %c, %x or %X part.

COPYRIGHT
    Copyright 2009 Henrik Levkowetz

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
"""

import re
import time
from datetime import datetime as Datetime, timedelta as Timedelta # For re-export.  pyflakes:ignore
import pytz

tzdef = {
	"A":	"+0100",	"ACDT":	"+1030",	"ACST":	"+0930",	"ADT":	"-0300",
	"AEDT":	"+1100",	"AEST":	"+1000",	"AKDT":	"-0800",	"AKST":	"-0900",
	"AST":	"-0400",	"AWDT":	"+0900",	"AWST":	"+0800",	"B":	"+0200",
	"BST":	"+0100",	"C":	"+0300",	"CDT":	"+1030",	"CDT":	"-0500",
	"CEDT":	"+0200",	"CEST":	"+0200",	"CET":	"+0100",	"CST":	"+1030",
	"CST":	"+0930",	"CST":	"-0600",	"CXT":	"+0700",	"D":	"+0400",
	"E":	"+0500",	"EDT":	"+1100",	"EDT":	"-0400",	"EEDT":	"+0300",
	"EEST":	"+0300",	"EET":	"+0200",	"EST":	"+1100",	"EST":	"+1000",
	"EST":	"-0500",	"F":	"+0600",	"G":	"+0700",	"GMT":	"+0000",
	"H":	"+0800",	"HAA":	"-0300",	"HAC":	"-0500",	"HADT":	"-0900",
	"HAE":	"-0400",	"HAP":	"-0700",	"HAR":	"-0600",	"HAST":	"-1000",
	"HAT":	"-0230",	"HAY":	"-0800",	"HNA":	"-0400",	"HNC":	"-0600",
	"HNE":	"-0500",	"HNP":	"-0800",	"HNR":	"-0700",	"HNT":	"-0330",
	"HNY":	"-0900",	"I":	"+0900",	"IST":	"+0100",	"K":	"+1000",
	"L":	"+1100",	"M":	"+1200",	"MDT":	"-0600",	"MESZ":	"+0200",
	"MEZ":	"+0100",	"MSD":	"+0400",	"MSK":	"+0300",	"MST":	"-0700",
	"N":	"-0100",	"NDT":	"-0230",	"NFT":	"+1130",	"NST":	"-0330",
	"O":	"-0200",	"P":	"-0300",	"PDT":	"-0700",	"PST":	"-0800",
	"Q":	"-0400",	"R":	"-0500",	"S":	"-0600",	"T":	"-0700",
	"U":	"-0800",	"UTC":	"+0000",	"V":	"-0900",	"W":	"-1000",
	"WDT":	"+0900",	"WEDT":	"+0100",	"WEST":	"+0100",	"WET":	"+0000",
	"WST":	"+0900",	"WST":	"+0800",	"X":	"-1100",	"Y":	"-1200",
	"Z":	"+0000",
    }


def tzparse(string, format):
    # It's surprising that there's no tz parsing capability in the python standard
    # library...

    """
    Given a time specification string and a format, tzparse() returns a localized
    datetime.datetime.

    >>> print(tzparse("9 Oct 2009 CEST 13:58", "%d %b %Y %Z %H:%M"))
    2009-10-09 13:58:00+02:00

    >>> print(tzparse("9 Oct 2009 13:58:00 Europe/Stockholm", "%d %b %Y %H:%M:%S %Z"))
    2009-10-09 13:58:00+02:00

    >>> print(tzparse("9 Oct 2009 13:58:00 +0200", "%d %b %Y %H:%M:%S %Z"))
    2009-10-09 13:58:00+02:00

    >>> print(tzparse("Fri, 9 Oct 2009 13:58:00 +0200", "%a, %d %b %Y %H:%M:%S %Z"))
    2009-10-09 13:58:00+02:00

    >>> print(tzparse("2009-10-09 13:58:00 EST", '%Y-%m-%d %H:%M:%S %Z'))
    2009-10-09 13:58:00-05:00

    >>> print(tzparse("2009-10-09 13:58:00+02:00", "%Y-%m-%d %H:%M:%S%Z"))
    2009-10-09 13:58:00+02:00
    
    >>> print(tzparse("1985-04-12T23:20:50Z", "%Y-%m-%dT%H:%M:%S%Z"))
    1985-04-12 23:20:50+00:00

    >>> print(tzparse("1996-12-19T16:39:57-08:00", "%Y-%m-%dT%H:%M:%S%Z"))
    1996-12-19 16:39:57-08:00

    >>> print(tzparse("1996-12-19T16:39:57", "%Y-%m-%dT%H:%M:%S"))
    1996-12-19 16:39:57+01:00

    """
    
    if not "%Z" in format:
        timetuple = time.strptime(string, format)
        tzstr = time.tzname[0]
    else:
        # extract the %Z part from the format and build a pattern to extract it
        # from the string, too.

        def fmt2pat(s):
            s = re.sub("%[dHIjmMSUwWyY]", r"\\d+", s)
            s = re.sub("%[aAbBp]", r"\\w+", s)
            s = re.sub("%[cxX]", ".+", s)
            s = s.replace("%%", "%")
            return s

        frontfmt, backfmt = format.split("%Z")
        frontpat = "^" + fmt2pat(frontfmt)
        backpat =  fmt2pat(backfmt) + "$"

        
        frontstr = re.search(frontpat, string) and re.search(frontpat, string).group(0) or ""
        backstr = re.search(backpat, string) and re.search(backpat, string).group(0) or ""
        tzstr = string.replace(frontstr, "").replace(backstr, "") # This will fail is backstr occurs twice

        timetuple = time.strptime(frontstr+backstr, frontfmt+backfmt)
    dt = Datetime(*timetuple[:6])

    if not tzstr:
        tzstr = time.tzname[0]
        #raise ValueError("No timezone string found in '%s', but format contained %Z: '%s'."%(string, format))
    try:
        tz = pytz.timezone(tzstr)
    except KeyError:
        if tzstr in tzdef:
            # if we know the offset of the abbreviation, fall back to that
            tzstr = tzdef[tzstr]
        if re.search("^[+-][0-9][0-9]:?[0-9][0-9]$", tzstr):
            if ":" in tzstr:
                tzstr = tzstr[:3]+tzstr[4:]
            # convert numeric timezone to minutes
            sign = tzstr[0]
            h = int(tzstr[1:3])
            m = h*60 + int(tzstr[3:5])
            if sign == "-":
                m = -m
            tz = pytz.FixedOffset(m)
        else:
            raise ValueError("Unknown timezone '%s'" % tzstr)
    dt = tz.localize(dt)

    return dt

if __name__ == "__main__":
    import sys
    if len(sys.argv[1:]) == 2:
        print(tzparse(sys.argv[1], sys.argv[2]))
    else:
        print("Running module tests:\n")
        import doctest
        print(doctest.testmod())
    