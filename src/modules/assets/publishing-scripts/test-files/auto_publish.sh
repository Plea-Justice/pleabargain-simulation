#!/usr/bin/env bash
echo "Bash Version: "$BASH_VERSION

echo "Using regex to demux $1"


FILE="larg.js"
FIG="figure0"
echo $FIG

sed "/\/\/ ${FIG}hair0/,/addTween/ s/^.*addTween/\/\/&/" $1 > $FILE
sed -i "/\/\/ ${FIG}hair1/,/addTween/ s/^.*addTween/\/\/&/" $FILE

sed -i "/\/\/ ${FIG}eyes0/,/addTween/ s/^.*addTween/\/\/&/" $FILE
sed -i "/\/\/ ${FIG}eyes1/,/addTween/ s/^.*addTween/\/\/&/" $FILE
