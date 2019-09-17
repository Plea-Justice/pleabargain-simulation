#!/usr/bin/env bash
echo "Starting to generate avatar feature combination javascripts"
echo "Bash Version: "$BASH_VERSION
echo "REQUIRES at least Bash 4"

FILENAME=$(basename $1 '.js')
echo "Figuring out attributes for $FILENAME"

ATTRIBUTES=()

IFS='_' read -ra ADDR <<<"$FILENAME"
for i in "${ADDR[@]}"; do
	ATTRIBUTES+=($i)
done


#Lowercase figure as per our layer naming conventions https://bitbucket.org/pleajustice/pleabargains/wiki/Art%20Documentation
#This will be used for finding the layer name

lowercase_figure=${ATTRIBUTES[2],,}

echo "______Attributes found_______"
echo "Scenario is: ${ATTRIBUTES[0]}"
echo "Scene is: ${ATTRIBUTES[1]}"
echo "Figure is: ${ATTRIBUTES[2]}"

number_of_eyes=3 #three features (3 eyes, 3 hairdos)
number_of_hairdos=4

echo "Adding toggle if statement to all avatar features in Animate-published file"
#hide all features first, sed and regex pattern help from Freddy: https://unix.stackexchange.com/questions/523351/sed-to-find-first-occurrence-of-a-pattern-after-finding-another-pattern
for (( hair=0; hair<=number_of_hairdos-1; hair++ )) #subtract 1 from total features so we have 0, 1, 2, 3 and not 0, 1, 2, 3, 4 (five features)
do
		#looking for lower case figure and feature:hair combos, e.g. 'figure0hair1' and prepending a toggling if statement
		sed -i "/\/\/ ${lowercase_figure}hair${hair}/,/addTween/ s/^.*addTween/if (this.assetPalette.hair == ${hair}) &/" $1

done

for (( eyes=0; eyes<=number_of_eyes-1; eyes++ ))
do
		#looking for lower case figure and feature:eyes combos, e.g. 'figure0eyes2' and prepending a toggling if statement
		sed -i "/\/\/ ${lowercase_figure}eyes${eyes}/,/addTween/ s/^.*addTween/if (this.assetPalette.eyes == ${eyes}) &/" $1
done
echo "Finished adding toggle if statement to all avatar features in Animate-published file"
