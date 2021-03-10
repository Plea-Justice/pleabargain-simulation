/* Copyright (C) 2021 The Plea Justice Project
 *
 * Please see https://pleajustice.org for information about this project's
 * licensing and how you can make a contribution.
 */

/* actor animation API
** Thomas Nelson 2017
** University of Massachusetts Lowell, Psychology Department
** actor.js create an actor class, which encapsulates all of the animations
** required to render a speaking character on the stage. Functions of this
** class render the specific frame of animation based on the content of the
** script animation buffer.
*/

/*global assetPalettes, inputParams */

console.log('LOADING actor.js');

/**
 * An object to store the colors that we want to give an avatar
 * customizer object. Stores two versions of skin, hair, eyes, and outfits.
 * It also contains figure which are indicies to be passed
 * to simulations in order to know which clips and avatars to use.
 * <p>
 * The function methods set the functions variables to the two parameters
 * passed to the functions.
 * @see AvatarCustomizer
 */
function Palette () {

    // default colors
    this.colors = [
        '#663300', // Eye
        '#663300',
        '#663300',
        '#663300', // Hair
        '#E5CCFF', // Outfit
        '#FFCC99'  // Skin
    ];
    this.colorsDark = [
        '#663300', // Eye
        '#663300',
        '#663300',
        '#663300', // Hair
        '#70618D', // Outfit
        '#F49E50'  // Skin
    ];

    // default styles and figure
    this.features = {
        eyes: 0,
        hair: 0,
        figure: 0
    };

    console.log('Palette constructed');

    this.setSkin = function(A, B) {
        if (A.charAt(0) != '#')
            A = '#' + A;
        if (B.charAt(0) != '#')
            B = '#' + B;
        this.colors[5] = A;
        this.colorsDark[5] = B;
    };
    this.setHair = function(A, B) {
        if (A.charAt(0) != '#')
            A = '#' + A;
        if (B.charAt(0) != '#')
            B = '#' + B;
        this.colors[3] = A;
        this.colorsDark[3] = B;
    };
    this.setEye = function(A, B) {
        if (A.charAt(0) != '#')
            A = '#' + A;
        if (B.charAt(0) != '#')
            B = '#' + B;
        this.colors[0] = A;
        this.colorsDark[0] = B;
    };
    this.setOutfit = function(A, B) {
        if (A.charAt(0) != '#')
            A = '#' + A;
        if (B.charAt(0) != '#')
            B = '#' + B;
        this.colors[4] = A;
        this.colorsDark[4] = B;
    };
    this.setFigure = function(A) {
        this.features.figure = parseInt(A);
    };

    // format as query string
    this.serializePalette = function() {
        return '&skin=' + this.colors[5].substr(1) +
           '&hair=' + this.colors[3].substr(1) +
           '&eye=' + this.colors[0].substr(1) +
           '&outfit=' + this.colors[4].substr(1) +
           '&figure=' + this.features.figure +
           '&eyes=' + this.features.eyes + '&hairstyle=' + this.features.hair;
    };

}

// Create a pallete from passed URL parameters.
function loadAvatarParams() {

    if (!self.assetPalettes[0])
        self.assetPalettes[0] = new Palette();

    const features =
        ['skin', 'outfit', 'hairstyle', 'hair', 'eyes', 'eye', 'figure'];
    for (const feature of features)
        if (!(feature in inputParams)) {
            console.log('Warning: Customized avatar not recieved. '+ feature + ' not defined.');
            return;
        }


    // TODO: colors are stored in hex and require conversion to RGB and back to
    // utilize generateSecondaryColor(). Could the function be rewritten to
    // work entirely in hex?
    let colorOffset = 30;
    let skin = inputParams['skin'];
    let skin_RGB = hexToRgb(skin);
    let skinDark =
        generateSecondarySkinColor(
            skin_RGB[0], skin_RGB[1], skin_RGB[2], colorOffset);

    let hair = inputParams['hair'];
    let hair_RGB = hexToRgb(hair);
    let hairDark =
        generateSecondaryColor(
            hair_RGB[0], hair_RGB[1], hair_RGB[2], colorOffset);

    let eye = inputParams['eye'];
    let eye_RGB = hexToRgb(eye);
    let eyeDark =
        generateSecondaryColor(
            eye_RGB[0], eye_RGB[1], eye_RGB[2], colorOffset);

    let outfit = inputParams['outfit'];
    let outfit_RGB = hexToRgb(outfit);
    let outfitDark =
        generateSecondaryColor(
            outfit_RGB[0], outfit_RGB[1], outfit_RGB[2], colorOffset);

    let figure = inputParams['figure'];
    let eyes = inputParams['eyes'];
    let hairstyle = inputParams['hairstyle'];

    console.log('****** Palette from Customizer ******');
    console.log('Hair: ' + hair);
    console.log('Eye: ' + eye);
    console.log('Outfit A: ' + outfit);
    console.log('Outfit B: ' + outfitDark);
    console.log('Skin A: ' + skin);
    console.log('Skin B: ' + skinDark);
    console.log('Figure: ' + figure);
    console.log('Avatar eyes: ' + eyes);
    console.log('Avatar hair: ' + hairstyle);

    self.assetPalettes[0].setSkin(skin, skinDark);
    self.assetPalettes[0].setHair(hair, hairDark);
    self.assetPalettes[0].setEye(eye, eyeDark);
    self.assetPalettes[0].setOutfit(outfit, outfitDark);
    self.assetPalettes[0].setFigure(figure);
    self.assetPalettes[0].features.eyes = parseInt(eyes);
    self.assetPalettes[0].features.hair = parseInt(hairstyle);

    return assetPalettes[0];
}

/**
 * An object that creates a drawable feature for avatars. Actors are used to
 * draw our movieclips. Actors are given a movieclip in which we give it an
 * option to be rendered to a canvas element, and animate the movieclip so it's
 * mouth can move. This is primarily used to draw the avatars. The draw function
 * is what we use to display the asset to the canvas element, and it takes a
 * stage and script variables. We call this explicitly to get the asset to
 * display.
 * @param movieclip
 */
function Actor (movieclip) {
    this.MC = movieclip;
    this.MC.timeline.setLabels({
        close:0,
        ai:1,
        consonant:2,
        e:3,
        mb:4,
        o:5,
        l:6,
        slightlyopen:7,
        u:8
    });
    console.log('Actor constructed');
    // display a frame from the movieclip into the given stage
    this.anim = function(stage, frameKey) {
        this.MC.gotoAndStop(frameKey);
        stage.addChild(this.MC);
    };
    // draw into a given stage the given animation
    this.draw = function(stage, script) {
        if (script == null) {
            this.anim(stage, 'close');
        } else {
            switch(script.animBuffer) {
            case 'pause':
                this.anim(stage, 'close');
                break;
            case 'a':
            case 'A':
            case 'i':
            case 'I':
            case 'h': //TODO: contextual H
            case 'H': //TODO: contextual H
            case '8':
                this.anim(stage, 'ai');
                break;
            case 'e':
            case 'E':
            case '0':
                this.anim(stage, 'e');
                break;
            case 'o':
            case 'O':
                this.anim(stage, 'o');
                break;
            case 'm':
            case 'M':
            case 'b':
            case 'B':
                this.anim(stage, 'mb');
                break;
            case 'l':
            case 'L':
            case '3':
                this.anim(stage, 'l');
                break;
            case 'u':
            case 'U':
            case 'w':
            case 'W':
            case 'y':
            case 'Y':
            case '1':
                this.anim(stage, 'u');
                break;
            case ' ': //TODO: contextual space, should use close if prior was close, otherwise slightly open
                if (script.lastAnimBuffer == 'close' )
                    this.anim(stage, 'close');
                else
                    this.anim(stage, 'slightlyopen');
                break;
            default: // TODO this is for c d t
                this.anim(stage, 'consonant');
                break;
            }
        }
    };
}

// COLOR HELPER FUNCTIONS

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)];
}

// generate secondary color
/* secondary color is darkened version of primary color, except for when the
 * primary color is black.
 */
function generateSecondaryColor(r, g, b, colorOffset)
{
    if (r <= 15 && g <= 15 && b <= 15)
    {
        r += colorOffset;
        if (r > 255) r = 255;
        g += colorOffset;
        if (g > 255) g = 255;
        b += colorOffset;
        if (b > 255) b = 255;
    }
    else
    {
        r -= colorOffset;
        if (r < 0) r = 0;
        g -= colorOffset;
        if (g < 0) g = 0;
        b -= colorOffset;
        if (b < 0) b = 0;
    }
    return '#' + ('000000' + ((r << 16) | (g << 8) | b).toString(16)).slice(-6);
}

// generate secondary color, returns as hex
/* if the color is a "light color" (r + g + b over their midpoint) needs to subtract to create a darker
    secondary color, otherwise lightens the channels to create a lighter secondary color
*/
function generateSecondarySkinColor(r, g, b, colorOffset)
{
    if (((r + g + b) / 3) <= 100)
    {
        r += colorOffset;
        if (r > 255) r = 255;
        g += colorOffset;
        if (g > 255) g = 255;
        b += colorOffset;
        if (b > 255) b = 255;
    }
    else
    {
        r -= colorOffset;
        if (r < 0) r = 0;
        g -= colorOffset;
        if (g < 0) g = 0;
        b -= colorOffset;
        if (b < 0) b = 0;
    }
    return '#' + ('000000' + ((r << 16) | (g << 8) | b).toString(16)).slice(-6);
}

console.log('LOADED actor.js');