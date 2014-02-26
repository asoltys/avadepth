#!/usr/bin/perl -w
use File::stat;
use Time::localtime;
print "Content-type: text/json\n\n";
if (open ($fh,"Data/AvadepthInternet.mdb")){
  my $timestamp = ctime(stat($fh)->mtime);
  print "{\"last_updated\" : \"$timestamp\"}"
}
else{
  print "{\"last_updated\" : \"DB not found\"}";
}
