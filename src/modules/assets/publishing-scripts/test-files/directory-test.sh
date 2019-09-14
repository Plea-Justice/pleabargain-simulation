FILENAME=$(basename $1 '.*')
IDENTIFIER="_"
PATTERN="$FILENAME$IDENTIFIER"
for file in $PATTERN*
do
    echo "${file}"
done
