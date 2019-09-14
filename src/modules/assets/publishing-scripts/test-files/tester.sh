#!/usr/bin/env bash
echo "Bash Version: "$BASH_VERSION
echo "REQUIRES at least Bash 4"


number_of_features=3 #three features (3 eyes, 3 hairdos)
fig="figure0"


sed -i '/\/\/ Group2/,/\/\/.*addTween/ s/^\/\/\(.*addTween\)/\1/' $1



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
