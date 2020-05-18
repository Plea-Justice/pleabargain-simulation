#!/usr/bin/env python3
'''
    Publishing Script for Plea Simulation
'''

import sys
import re

def help():
    print('''
    Usage:
        python3 publish.py < js_file > < options >
        Publish a .js file exported from Animate.

        options:
        update - update a file to the latest CreateJS syntax.
''')

Palletables = {
"#666600":"eyeA",
"#663300":"hairA",
"#FFCC99":"skinA",
"#F49E50":"skinB",
"#E5CCFF":"outfitA",
"#70618D":"outfitB"
}

NumFigures = 2


if (len(sys.argv) & 2) != 2:
    print("\033[31mERROR: Invalid number of arguments.\n\033[m")
    help()
    exit()

filename = sys.argv[1]

print("\033[33mStarting Scene Publishing\033[m")
print(filename + "\n")

if filename[-3:] != ".js":
    print("\033[31mERROR: File must have extension .js\n\033[m")
    help()
    exit()

attr = filename[:-3].split("_")
if not 2 <= len(attr) <= 3:
    print("\033[31mERROR: File name convention is Scenario_Scene\n\033[m")
    exit()

scenario, scene, figure = attr[0], attr[1], "figures"
print("Scenario: " + scenario)
print("Scene: " + scene)
print("Figure: " + figure)

try:
    with open(filename, 'r') as f:
        data = f.read()
    
    if data.startswith("// Published."):
        print("\n\033[32mFile is already published.\033[m")
        raise Exception
    
    if len(sys.argv) == 3:
        if sys.argv[2] == "update":
            print("\n\033[33mUpdate to latest CreateJS.\033[m")
        else:
            print("\n\033[32mInvalid option.\033[m")
    # Replace hardcoded color references with palette object.
    print("\n\033[33mPalletize Colors.\033[m")

    print("Create avatar pallete reference...")
    regex = '(this\\.initialize.*\n)'
    regex = re.compile(regex)
    data = re.sub(regex, '\\1this.assetPalette = avatarPalette;\n', data)
    
    for x in Palletables:
        print("Replacing " + Palletables[x] + "...")
        data = data.replace("graphics.f(\"" + x +"\").s()", \
            "graphics.f(this.assetPalette." + Palletables[x] + ").s()" )

    # Find feature comment and prepend toggling if statement to feature definition.
    print("\n\033[33mAdd feature toggling.\033[m")
    # If this file defines multiple figures, iterate.
    AllFigures = True if figure == "figures" else False
    for fig in range(NumFigures):
        figure = "figure" + str(fig) if AllFigures else figure
        if AllFigures:
            regex = '(// '+figure+'avatar(.|\\n)*?)(^.*addTween)'
            regex = re.compile(regex, flags=re.MULTILINE)
            print("Adding toggle to " + regex.pattern + "...")
            data = re.sub(regex, '\\1if (this.assetPalette.figure == '+ str(fig) + ')\\3' , data)

        # Don't forget the ? for lazy regex!
        regex = '(// '+figure+'hair(\\d)(.|\\n)*?)(^.*addTween)'
        regex = re.compile(regex, flags=re.MULTILINE)
        print("Adding toggle to " + regex.pattern + "...")
        data = re.sub(regex, '\\1if (this.assetPalette.figure == '+str(fig)+' && this.assetPalette.hair == \\2)\\4' , data)

        regex = '(// '+figure+'eyes(\\d)(.|\\n)*?)(^.*addTween)'
        regex = re.compile(regex, flags=re.MULTILINE)
        print("Adding toggle to " + regex.pattern + "...")
        data = re.sub(regex, '\\1if (this.assetPalette.figure == '+str(fig)+' && this.assetPalette.eyes == \\2)\\4' , data)
        if not AllFigures:
            break

    # Replace empty lib definition.
    print("\n\033[33mCorrect \"lib\" definition.\033[m")
    print("Replacing var lib={};...")
    data = data.replace("var lib={};", "var lib = window.lib || AdobeAn.getComposition(Object.keys(AdobeAn.compositions)[0]).getLibrary();")

    print("\n\033[33mMark file as published.\033[m")
    data = "// Published.\n" + data

    with open(filename[:-3] + "published" + ".js", 'w') as f:
        f.write(data)

except FileNotFoundError:
    print("\n\033[31mERROR: File not found.\n\033[m")
except:
    print("\n\033[31mERROR: Could not publish.\033[m")

else:
    print("\n\033[33mPublishing Complete.\033[m")