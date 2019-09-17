echo "Updating lib definition"

echo "Writing lib into $1"
#A fix for Adobe breaking our software by changing their JS export in version Adobe Animate 17.5
#including de-gobalizing 'lib'
#https://forums.adobe.com/message/10591893#10591893
#we have to replace empty lib with this definition of lib as below
sed -i "s/var lib={};/var lib = window.lib || AdobeAn.getComposition(Object.keys(AdobeAn.compositions)[0]).getLibrary();/g" $1

echo "End of updating lib definition"
