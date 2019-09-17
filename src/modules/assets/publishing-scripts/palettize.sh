#!/bin/bash
echo "Starting to palettize $1"

# Check if avatarPalette reference is present, add if necessary
if grep -q "this.assetPalette = avatarPalette;" $1; then
	echo "Found avatarPalette reference"
else
	echo "Adding avatarPalette reference"
	# adds avatarPalette reference
	sed -i "/this.initialize/a\	this.assetPalette = avatarPalette;" $1
	# adds comment for avatarPalette reference
	sed -i "/this.initialize/a\	\/\/ avatarPalette reference for customizable avatar" $1
fi

echo "Finding each default palette color hex code and replaces it with a palette variable"


# Finds instance of default palette color hex code and replaces it with the appropriate avatarPalette variable

echo "Palettizing eyeA"
sed -i 's/graphics.f("#666600").s()/graphics.f(this.assetPalette.eyeA).s()/g' $1

echo "Palettizing hairA"
sed -i 's/graphics.f("#663300").s()/graphics.f(this.assetPalette.hairA).s()/g' $1

echo "Palettizing skinA"
sed -i 's/graphics.f("#FFCC99").s()/graphics.f(this.assetPalette.skinA).s()/g' $1

echo "Palettizing skinB"
sed -i 's/graphics.f("#F49E50").s()/graphics.f(this.assetPalette.skinB).s()/g' $1

echo "Palettizing outfitA"
sed -i 's/graphics.f("#E5CCFF").s()/graphics.f(this.assetPalette.outfitA).s()/g' $1

echo "Palettizing outfitB"
sed -i 's/graphics.f("#70618D").s()/graphics.f(this.assetPalette.outfitB).s()/g' $1

echo "End of palettizing"
