#!/usr/bin/env bash
echo "Bash Version: "$BASH_VERSION
echo "REQUIRES at least Bash 4"


number_of_features=3 #three features (3 eyes, 3 hairdos)
fig="figure0"
sed -i '/\/\/ Group2/,/addTween/ s/^.*addTween/ &/' $1

for (( hair=0; hair<=number_of_features-1; hair++ )) #subtract 1 from total features so we have 0, 1, 2 and not 0, 1, 2, 3 (four features)
do
		#sed -i "/\/\/ ${fig}hair${hair}/,/addTween/ s/^.*addTween/\/\/ &/" $1
		for (( eyes=0; eyes<=number_of_features-1; eyes++ ))
		do

				#sed -i "/\/\/ ${fig}eyes${eyes}/,/addTween/ s/^.*addTween/\/\/ &/" $1
		done
		echo
done
echo


#
#features=3

#for (( hair=0; hair<=features-1; hair++ )) #three features (3 eyes, 3 hairdos)
#do
#		for (( eyes=0; eyes<=features-1; eyes++ ))
#		do
#				echo -n "*"

#		done
#		echo
#done
#echo
