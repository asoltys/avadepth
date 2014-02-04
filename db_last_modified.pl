use File::stat;
use Time::localtime;
print "Content-type: text/json\n\n";
open ($fh,"../avarest/Data/AvadepthInternet.mdb") or die "{\"last_updated\" : \"Never\"}";
my $timestamp = ctime(stat($fh)->mtime);
print "{\"last_updated\" : \"";
print($timestamp);
print "\"}";
