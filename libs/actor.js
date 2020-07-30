/* actor animation API
** Thomas Nelson 2017
** University of Massachusetts Lowell, Psychology Department
** actor.js create an actor class, which encapsulates all of the animations
** required to render a speaking character on the stage. Functions of this
** class render the specific frame of animation based on the content of the
** script animation buffer.
*/
console.log("LOADING actor.js");

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
Palette = function () {
  this.skinA	= "#FFCC99";
  this.skinB	= "#F49E50";
  this.hairA	= "#663300";
  this.hairB	= "#FF00FF";
  this.eyeA	= "#663300";
  this.eyeB	= "#FF00FF";
  this.outfitA	= "#E5CCFF";
  this.outfitB	= "#70618D";
  this.figure = 0;

  //eyes and hair the subject selected
  this.eyes = 0;
  this.hair = 0;

  console.log("Palette constructed");

  this.setSkin = function(A, B) {
    if (A.charAt(0) != '#')
      A = '#' + A;
    if (B.charAt(0) != '#')
      B = '#' + B;
    this.skinA = A;
    this.skinB = B;
  }
  this.setHair = function(A, B) {
    if (A.charAt(0) != '#')
      A = '#' + A;
    if (B.charAt(0) != '#')
      B = '#' + B;
    this.hairA = A;
    this.hairB = B;
  }
  this.setEye = function(A, B) {
    if (A.charAt(0) != '#')
      A = '#' + A;
    if (B.charAt(0) != '#')
      B = '#' + B;
    this.eyeA = A;
    this.eyeB = B;
  }
  this.setOutfit = function(A, B) {
    if (A.charAt(0) != '#')
      A = '#' + A;
    if (B.charAt(0) != '#')
      B = '#' + B;
    this.outfitA = A;
    this.outfitB = B;
  }
  this.setFigure = function(A) {
    this.figure = A;
  }

  // format as query string
  this.serializePalette = function() {
    return "&skinA=" + this.skinA.substr(1) + "&skinB=" + this.skinB.substr(1) + 
           "&hairA=" + this.hairA.substr(1) + "&hairB=" + this.hairB.substr(1) +
           "&eyeA=" + this.eyeA.substr(1) + "&eyeB=" + this.eyeB.substr(1) +
           "&outfitA=" + this.outfitA.substr(1) + "&outfitB=" + this.outfitB.substr(1) + 
           "&figure=" + this.figure +
           "&eyes=" + this.eyes + "&hair=" + this.hair;
  }

}

// Create a pallete from passed URL parameters.
function loadAvatarParams() {
  if (!window.avatarPalette)
      avatarPalette = new Palette();

  features = ["skinA", "skinB", "outfitA", "outfitB", "hair", "hairA", "hairB", "eyes", "eyeA", "eyeB", "figure"]
  for (const feature of features)
      if (!(feature in inParams)) {
          console.log("Error: Customized avatar not recieved. "+ feature + " not defined.");
          return
      }

  let skinA = inParams["skinA"];
  let skinB = inParams["skinB"];
  let hairA = inParams["hairA"];
  let hairB = inParams["hairB"];
  let eyeA = inParams["eyeA"];
  let eyeB = inParams["eyeB"];
  let outfitA = inParams["outfitA"];
  let outfitB = inParams["outfitB"];
  let figure = inParams["figure"];
  let eyes = inParams["eyes"];
  let hair = inParams["hair"];

  console.log("****** Palette from Customizer ******");
  console.log("Hair A: " + hairA);
  console.log("Hair B: " + hairB);
  console.log("Eye A: " + eyeA);
  console.log("Eye B: " + eyeB);
  console.log("Outfit A: " + outfitA);
  console.log("Outfit B: " + outfitB);
  console.log("Skin A: " + skinA);
  console.log("Skin B: " + skinB);
  console.log("Figure: " + figure);
  console.log("Avatar eyes: " + eyes);
  console.log("Avatar hair: " + hair);
  
  avatarPalette.setSkin(skinA, skinB);
  avatarPalette.setHair(hairA, hairB);
  avatarPalette.setEye(eyeA, eyeB);
  avatarPalette.setOutfit(outfitA, outfitB);
  avatarPalette.setFigure(figure);
  avatarPalette.eyes = eyes;
  avatarPalette.hair = hair;

  return avatarPalette;
}

/**
 * An object that creates a drawable feature for avatars. Actors are used to draw our movieclips.
 * Actors are given a movieclip in which we give it an option to be rendered to a canvas element,
 * and animate the movieclip so it's mouth can move. This is primarily used to draw the avatars.
 * <p>
 * The draw function is what we use to display the asset to the canvas element, and it takes a stage
 * and script variables. We call this explicitly to get the asset to display.
 * @param movieclip
 */
Actor = function (movieclip) {
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
  console.log("Actor constructed");
  // display a frame from the movieclip into the given stage
  this.anim = function(stage, frameKey) {
    this.MC.gotoAndStop(frameKey);
    stage.addChild(this.MC);
  }
  // draw into a given stage the given animation
  this.draw = function(stage, script) {
    if (script == null) {
      this.anim(stage, "close");
    } else {
      switch(script.animBuffer) {
        case "pause":
          this.anim(stage, "close");
          break;
        case "a":
        case "A":
        case "i":
        case "I":
        case "h": //TODO: contextual H
        case "H": //TODO: contextual H
        case "8":
          this.anim(stage, "ai");
          break;
        case "e":
        case "E":
        case "0":
          this.anim(stage, "e");
          break;
        case "o":
        case "O":
          this.anim(stage, "o");
          break;
        case "m":
        case "M":
        case "b":
        case "B":
          this.anim(stage, "mb");
          break;
        case "l":
        case "L":
        case "3":
          this.anim(stage, "l");
          break;
        case "u":
        case "U":
        case "w":
        case "W":
        case "y":
        case "Y":
        case "1":
          this.anim(stage, "u");
          break;
        case " ": //TODO: contextual space, should use close if prior was close, otherwise slightly open
          if (script.lastAnimBuffer == "close" )
            this.anim(stage, "close");
          else
            this.anim(stage, "slightlyopen");
          break;
        default: // TODO this is for c d t
          this.anim(stage, "consonant");
          break;
      }
    }
  }
}

console.log("LOADED actor.js");
