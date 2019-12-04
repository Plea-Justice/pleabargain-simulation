/*
 * Avatar Customization implementation
 * Matthew LeBlanc 2018
 * University of Massachusetts Lowell Psychology Department
 * avatar_customization.js will introduce a way for the user to select from traits that represent them best.
 *  This includes hair styles, eye color, skin color, and outfits.
 */

// Variables to make user's avatar object
var stage = new createjs.Stage("canvas");
var canvas = document.getElementById("canvas");

// MAKING CUSTOMIZER AND PALETTE OBJECTS
var mainAvatar = new AvatarCustomizer();
var avatarPalette = new Palette();

// Declaring Lib Fixer
var mc_lib_fixer = new lib.AllScenarios_LibFixer();
var lib_fixer = new Actor(mc_lib_fixer);

// Declaring Male Movie Clips
var mc_male = new lib.AllScenarios_AvatarCustomization_Figure0();
// Declaring Male avatar actors
var actor_male = new Actor(mc_male);

// Declaring Female Movie Clips
var mc_female = new lib.AllScenarios_AvatarCustomization_Figure1();
// Declaring Female Actors
var actor_female = new Actor(mc_female);


// window resize event
window.onResize = OnWindowResize();


// ARRAY OF ACTORS:
var Actors = [actor_male,actor_female];

// VARIABLES FOR INDEXING ASSET ARRAYS:
var sex = 0;
var avatar = 0;
var avatarScript = new Script(" ");

// struct used to store color picker and modal for avatar elements that can be
//  modified using a color picker
var avastruct_hair = {modal:document.getElementById("Hair-Color-Picker")};
var avastruct_eye = {modal:document.getElementById("Eye-Color-Picker")};
var avastruct_skin = {modal:document.getElementById("Skin-Color-Picker")};
var avastruct_outfit = {modal:document.getElementById("Outfit-Color-Picker")};
var avastructs = [avastruct_hair, avastruct_eye, avastruct_skin, avastruct_outfit];

// initialize color pickers
avastruct_hair.picker = new ColorPicker(250, 250, document.getElementById("hair-color-picker"), document.getElementById("hair-selected-color"));
avastruct_eye.picker = new ColorPicker(250, 250, document.getElementById("eye-color-picker"), document.getElementById("eye-selected-color"));
avastruct_skin.picker = new SkinColorPicker(250, 250, document.getElementById("skin-color-picker"), document.getElementById("skin-selected-color"));
avastruct_outfit.picker = new ColorPicker(250, 250, document.getElementById("outfit-color-picker"), document.getElementById("outfit-selected-color"));

// redraws the color picker every millisecond, needs to be done to render the cursor
setInterval(() => avastruct_hair.picker.draw(), 1);
setInterval(() => avastruct_eye.picker.draw(), 1);
setInterval(() => avastruct_skin.picker.draw(), 1);
setInterval(() => avastruct_outfit.picker.draw(), 1);

// color used for when color changes are discarded
let tempColor = {primary:undefined, secondary:undefined};

// Modal Buttons
function openPicker(target)
{
    tempColor.primary = target.picker.currentHex; // stored in case changes will be discarded
    tempColor.secondary = target.picker.secondaryHex;
    target.modal.style.display = "flex";
}

// discards changes to color
function closePickerCancel(target)
{
    target.modal.style.display = "none";
    target.picker.currentHex = tempColor.primary;
    target.picker.secondaryHex = tempColor.secondary;
    refreshColors();
}

// keeps changes to color
function closePickerOK(target)
{
    target.modal.style.display = "none";
    refreshColors();
}

function openModal(target)  {document.getElementById(target).style.display = "flex";}
function closeModal(target)  {document.getElementById(target).style.display = "none";}

function refreshColors()
{
    stage.removeAllChildren();
    mainAvatar.setHair(avastruct_hair.picker.currentHex, avastruct_hair.picker.secondaryHex);
    mainAvatar.setEye(avastruct_eye.picker.currentHex, avastruct_eye.picker.secondaryHex);
    mainAvatar.setSkin(avastruct_skin.picker.currentHex, avastruct_skin.picker.secondaryHex);
    mainAvatar.setOutfit(avastruct_outfit.picker.currentHex, avastruct_outfit.picker.secondaryHex);
    updateAvatar();
    mainAvatar.actor.draw(stage, avatarScript);
}


// CYCLE THROUGH EYE STYLES
/**
 * Changes the avatar that is currently displayed with the next corresponding
 * avatar. It takes no parameters and it only displays a side effect. No return
 * statement. Index is adjusted to maintiain a circular loop for selecting
 * eyes and hair.
 * <p>
 * The following few methods are similar and do the same job of cycling through
 * actors from the Actors array.
 * @see nextEye()
 * @see prevHair()
 * @see nextHair()
 */
function prevEye() {
    if (!((avatar - 3) < 0)) {
        avatar -= 3;
        if(sex) {
            mainAvatar.setActorF(Actors[sex]);
        } else {
            mainAvatar.setActorM(Actors[sex]);
        }
        stage.removeAllChildren();

        mainAvatar.palette.eyes = Math.floor(avatar / 3);
        updateAvatar();
        mainAvatar.actor.draw(stage, avatarScript);
        mainAvatar.palette.setAvatarNum(sex, avatar);

        document.getElementById('Eye').innerHTML = "Eye " + (mainAvatar.palette.eyes+1);

    } else {
        avatar += 6;
        if(sex) {
            mainAvatar.setActorF(Actors[sex]);
        } else {
            mainAvatar.setActorM(Actors[sex]);
        }
        stage.removeAllChildren();

        mainAvatar.palette.eyes = Math.floor(avatar / 3);
        updateAvatar();
        mainAvatar.actor.draw(stage, avatarScript);
        mainAvatar.palette.setAvatarNum(sex, avatar);

        document.getElementById('Eye').innerHTML = "Eye " + (mainAvatar.palette.eyes+1);

    }
}
function nextEye() {
    if (!((avatar + 3) > Math.pow(3, 2) - 1)) {
        avatar += 3;
        if(sex) {
            mainAvatar.setActorF(Actors[sex]);
        } else {
            mainAvatar.setActorM(Actors[sex]);
        }
        stage.removeAllChildren();

        mainAvatar.palette.eyes = Math.floor(avatar / 3);
        updateAvatar();
        mainAvatar.actor.draw(stage, avatarScript);
        mainAvatar.palette.setAvatarNum(sex, avatar);

        document.getElementById('Eye').innerHTML = "Eye " + (mainAvatar.palette.eyes+1);
    } else {
        avatar = avatar % 3;
        if(sex) {
            mainAvatar.setActorF(Actors[sex]);
        } else {
            mainAvatar.setActorM(Actors[sex]);
        }
        stage.removeAllChildren();

        mainAvatar.palette.eyes = Math.floor(avatar / 3);
        updateAvatar();
        mainAvatar.actor.draw(stage, avatarScript);
        mainAvatar.palette.setAvatarNum(sex, avatar);

        document.getElementById('Eye').innerHTML = "Eye " + (mainAvatar.palette.eyes+1);
    }
}
// CYCLE THROUGH THE HAIR STYLES
function prevHair() {
    if (!(((avatar - 1) < 0) || (avatar % 3) == 0)) {
        avatar--;
        if (sex) {
            mainAvatar.setActorF(Actors[sex]);
        } else {
            mainAvatar.setActorM(Actors[sex]);
        }
        stage.removeAllChildren();

        mainAvatar.palette.hair = avatar % 3;
        updateAvatar();
        mainAvatar.actor.draw(stage, avatarScript);
        mainAvatar.palette.setAvatarNum(sex, avatar);

        document.getElementById('Hair').innerHTML = "Hair " + (mainAvatar.palette.hair + 1);
    } else {
        avatar += 2;
        if (sex) {
            mainAvatar.setActorF(Actors[sex]);
        } else {
            mainAvatar.setActorM(Actors[sex]);
        }
        stage.removeAllChildren();

        mainAvatar.palette.hair = avatar % 3;
        updateAvatar();
        mainAvatar.actor.draw(stage, avatarScript);
        mainAvatar.palette.setAvatarNum(sex, avatar);

        document.getElementById('Hair').innerHTML = "Hair " + (mainAvatar.palette.hair + 1);
    }
}
function nextHair() {
    if (!(((avatar + 1) % 3) == 0)) {
        avatar++;
        if (sex) {
            mainAvatar.setActorF(Actors[sex]);
        } else {
            mainAvatar.setActorM(Actors[sex]);
        }
        stage.removeAllChildren();

        mainAvatar.palette.hair = avatar % 3;
        updateAvatar();
        mainAvatar.actor.draw(stage, avatarScript);
        mainAvatar.palette.setAvatarNum(sex, avatar);

        document.getElementById('Hair').innerHTML = "Hair " + (mainAvatar.palette.hair + 1);
    } else {
        avatar -= 2;
        if (sex) {
            mainAvatar.setActorF(Actors[sex]);
        } else {
            mainAvatar.setActorM(Actors[sex]);
        }
        stage.removeAllChildren();

        mainAvatar.palette.hair = avatar % 3;
        updateAvatar();
        mainAvatar.actor.draw(stage, avatarScript);
        mainAvatar.palette.setAvatarNum(sex, avatar);

        document.getElementById('Hair').innerHTML = "Hair " + (mainAvatar.palette.hair + 1);
    }
}

/******* FOLLOWING FUNCTIONS UTILIZE PALETTE AND FUNCTIONS SHOULD FOLLOW THE FOLLOWING PATTERN:
 * <attribute_index>++;
 * stage.removeAllChildren();
 * mainAvatar.set<attribute>(<attribute_array>[<attribute_index>][<attribute_index(B)]); if B is needed, otherwise, just <attribute_index>
 * updateAvatar();
 * mainAvatar.actor.draw(stage, avatarScript);
 *
 * IF YOU DON'T FOLLOW THE STRUCTURE ABOVE, THE AVATARS WON'T BE ABLE TO CHANGE SPECIFIC COLORS.
 ****************************************************************************************************/

// FUNCTIONS FOR SETTING MALE AVATAR
/**
 * Switch the sex from one sex to the other. This is done by just drawing
 * the other avatar version that corresponds with the current avatar. Update
 * sex index too. Other function does the same thing.
 * @see changeSexFemale()
 */
function changeSexMale() {
    // TEMPORARY: toggle button down
    document.getElementById("SexButtonM").className = 'figure_button_selected';
    document.getElementById("SexButtonF").className = 'figure_button';

    // Remove children for rendering new avatar
    stage.removeAllChildren();
    // Setting Actors index for male
    sex = 0;
    // Set the AvatarCustomizer to mainAvatar
    mainAvatar.setActorM(Actors[sex]);
    // Draw mainAvatar
    mainAvatar.actor.draw(stage, avatarScript);
}

// FUNCTION FOR SETTING FEMALE AVATAR
function changeSexFemale() {
     // TEMPORARY: toggle button down
     document.getElementById("SexButtonF").className = 'figure_button_selected';
     document.getElementById("SexButtonM").className = 'figure_button';

    // Following code is the same as above but for female sex
    stage.removeAllChildren();
    sex = 1;
    mainAvatar.setActorF(Actors[sex]);
    mainAvatar.actor.draw(stage, avatarScript);
}

// FUNCTION FOR UPDATING THE LOCAL PALETTES WITH NEW COLOR CODES
/**
 * Update local palette for every avatar and then reinstantiate each
 * movieclip. Note that this function doesn't draw anything, it just
 * updates.
 */


function updateAvatar() {
  console.log("Updating Avatar Features and Colors");
  // loop through the actor.MC.avatarPalettes to update them with assignment.
  for (var i = 0; i < Actors.length; ++i) {
    // loop through second sex as well to keep everything together.
    // update the local avatar palette
    Actors[i].MC.assetPalette = avatarPalette;
    // Check for male or female avatar and then for each avatar, re-initialize the avatar.
    // ***** This has to be done in order to get the dynamic refreshing of the avatar *****
    if (i == 0) {
        // At specific indicies in the Actors array, reinitialize movieclip
        Actors[i].MC = new lib.AllScenarios_AvatarCustomization_Figure0();
    } else {
        // same for female avatars too.
        Actors[i].MC = new lib.AllScenarios_AvatarCustomization_Figure1();
    }
  }
}

// window resize function
canvas.style.minWidth = "1600px";
canvas.style.maxWidth = "2600px";
function OnWindowResize()
{
    canvas.style.width = "120vw";
}

// INITIALIZER FOR THE CANVAS AND DRAWING THE AVATAR
/**
 * Initialize the customizer with the base palette and male
 * avatar with the first set of eyes and hair styles. Create
 * tick event listener. Also draws the first avatar too.
 */
function initCustomizer() {

    // Setting palette
    mainAvatar.setPalette(avatarPalette);

    // Setting Default Actor to Male 1
    mainAvatar.setActorM(Actors[sex]);

    // Drawing mainAvatar
    mainAvatar.actor.draw(stage, avatarScript);

    //Registers the "tick" event listener.
	  createjs.Ticker.setFPS(lib.properties.fps);
    createjs.Ticker.addEventListener("tick", stage);

    refreshColors();
}

// FUNCTION TO SET THE AVATAR TO BE PASSED TO THE NEXT SCENARIO
/**
 * Finalize setting index values and serialize palette. Then randomly select the next scenario, and
 * set the url to be the next scene with new url parameters.
 */
function setAvatar() {

    //create UrlSearchParams object
    var urlparams = new URLSearchParams(window.location.search);

    mainAvatar.palette.setAvatarNum(sex, avatar);
    // Serialize the palette (which includes which avatar to choose)
    let params = mainAvatar.palette.serializePalette();

    // go to phase one of simulation
    first_scenario = 'simulation-phase-one.html'

    var urlparams_str = "";
    urlparams.forEach(function(value, key) {
        urlparams_str += "&" + key + "=" + value;
    });
    urlparams_str = urlparams_str.substr(1);
    // Go to the simulation-hitandrun with the palette and avatar parameters included.
    window.location=first_scenario + "?" + urlparams_str + params;
}

console.log("FIRST SCENARIO: " + Qualtrics.SurveyEngine.getEmbeddedData(module));
console.log("LOADED avatar_customization.js");
