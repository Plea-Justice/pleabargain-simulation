console.log("LOADING MODULE MANIFEST");

var modulename = "Shoplifting v1";
var surveyURL = "";
document.title += " - " + modulename;

// MANIFEST OF URL PARAMETER USAGE


// PARSING URL PARAMETERS AND SETTING KEY COMPONENTS
if ("SURL" in inParams) {
    console.log("Captured Survey ID " + inParams["SURL"]);
    surveyURL = inParams["SURL"];
    console.log("Performing regex");
    surveyURL = surveyURL.replace(/[?].*$/g, "");
    surveyURL = surveyURL.replace(/previewForm/g, "preview");
    console.log("Regular Expression handling result: " + surveyURL);
    surveyURL += '?';
} else {
    alert("***CRITICAL ERROR***\nSIMULATION REQUIRES VALID SURVEY ID TO COMPLETE.\nYOU WILL BE UNABLE TO RETURN TO THE SURVEY AFTER SIMULATION HAS CONCLUDED.\nPLEASE RE-ACCESS SIMULATION FROM QUALTRICS.\nCONTACT DEVELOPER IF PROBLEM PERSISTS");
}
console.log("SurveyURL set to " + surveyURL);

// CREATING EXIT SURVEY VARIABLE

// CHECKING USERNAME FROM QUALTRICS FORM
var username = "ERROR";
if ("Name" in inParams)
    username = inParams["Name"].substr(0,20);
else
    alert("ERROR: Parameter Parsing - Invalid Module Setting 'Name': " + inParams["Name"]);
console.log("Username set to " + username);


// CHECKING FOR LANGUAGE SETTING
var locale = en_US;
if ("Locale" in inParams) {
    if (inParams["Locale"] == "en_US")
        locale = en_US;
    else if (inParams["Locale"] == "es_DO")
        locale = es_DO;
    else
        alert("ERROR: Parameter Parsing - Invalid Module Setting 'Locale': " + inParams["Locale"]);
}
else
    alert("ERROR: Parameter Parsing - Missing Module Setting 'Locale'");
console.log("Locale set to " + locale.name);

// CHECKING FORM ID
var ID;
if ("ID" in inParams)
    ID = inParams["ID"];
else
    alert("ERROR: Parameter Parsing - Invalid Module Setting 'ID': " + inParams["ID"]);

surveyURL += "&ID=" + ID;

// CHECKING FOR EMAIL
var email;
if ("email" in inParams)
    email = inParams["email"];
else
    alert("ERROR: Parameter Parsing - Invalid Module Setting 'email': " + inParams["email"]);

surveyURL += "&email=" + email;

var skinA = "#FFFFFF";

var skinB = "#FFFFFF";

var hairA = "#FFFFFF";

var hairB = "#FFFFFF";

var eyeA = "#FFFFFF";

var eyeB = "#FFFFFF";

var outfitA = "#FFFFFF";

var outfitB = "#FFFFFF";

var avatarSex = 0;

var avatarNum = 0;
var avatarEyes = 0, avatarHair = 0;



// END OF MANIFEST OF PARAMETER USAGE

// MANIFEST OF NEW CUSTOMIZER WITH PASSED PARAMETERS
let MainAvatar = new AvatarCustomizer();
// SET PALETTE TO THE NEW PALETTE VARIABLE
avatarPalette.setSkin(skinA, skinB);
avatarPalette.setHair(hairA, hairB);
avatarPalette.setEye(eyeA, eyeB);
avatarPalette.setOutfit(outfitA, outfitB);
avatarPalette.eyes = avatarEyes;
avatarPalette.hair = avatarHair;

MainAvatar.setPalette(avatarPalette);

// ACTOR MAINFEST
var mc_prosecutor = new lib.prosecutorActor();
var actor_prosecutor = new Actor(mc_prosecutor);

var mc_defense	= new lib.daActor();
var actor_defense	= new Actor(mc_defense);

var mc_judge = new lib.judgeActor();
var actor_judge = new Actor(mc_judge);

// MANIFEST OF CLIPS AND SCENES
console.log("LOADING CLIPS & SCENES");

var bg_meetingroom = new createjs.Bitmap("modules/assets/scenes/backgrounds/meetingroom.png");
var bg_courtroom = new createjs.Bitmap("modules/assets/scenes/backgrounds/courtroom_2019.png");
var bg_judge_courtroom = new createjs.Bitmap("modules/assets/scenes/backgrounds/JudgeSeat.png");
var fg_table = new createjs.Bitmap("modules/assets/scenes/foregrounds/table.png");

// MANIFEST OF CLIPS

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

// Declaring Male MCs: Intro
var mc_intro_male = new lib.Scenario2_Intro_Figure0();
// Declaring Female MCs: Intro
var mc_intro_female = new lib.Scenario2_Intro_Figure1();

// Declaring Male Clips: Intro
var clip_intro_male = new Clip("clip_intro_male", mc_intro_male);
// Declaring Female Clips: Intro
var clip_intro_female = new Clip("clip_intro_female", mc_intro_female);

// Declaring Male MCs: Guilty
var mc_guilty_male = new lib.Scenario2_FlashbackGuilty_Figure0();
// Declaring Female MCs: Guilty
var mc_guilty_female = new lib.Scenario2_FlashbackGuilty_Figure1();

// Declaring Male Clips: Guilty
var clip_guilty_male = new Clip("guilty_male", mc_guilty_male);
// Declaring Female Clips: Guilty
var clip_guilty_female = new Clip("guilty_female", mc_guilty_female);

// Declaring Male MCs: Innocent
var mc_innocent_male = new lib.Scenario2_FlashbackInnocent_Figure0();
// Declaring Female MCs: Innocent
var mc_innocent_female = new lib.Scenario2_FlashbackInnocent_Figure1();

// Declaring Male Clips: Innocent
var clip_innocent_male = new Clip("innocent_male", mc_innocent_male);
// Declaring Female Clips: Innocent
var clip_innocent_female = new Clip("innocent_female", mc_innocent_female);

// Declaring Jail Cell movie clips to be loaded as foreground in SCENE
var mc_AllScenarios_Jail_Figure0 = new lib.AllScenarios_Jail_Figure0();
var mc_AllScenarios_Jail_Figure1 = new lib.AllScenarios_Jail_Figure1();



// Create Male MCs: Security Footage
var mc_security_figure0 = new lib.Scenario2_SecurityCam_Figure0();
var mc_security_figure1 = new lib.Scenario2_SecurityCam_Figure1();

// Create Male Clips: Security Footage
var clip_mc_security_figure0 = new Clip("security_footageM", mc_security_figure0);
var clip_mc_security_figure1 = new Clip("security_footageF", mc_security_figure1);

// Declaring Arrays of clips
// ARRAY OF ACTORS:
var Actors = [actor_male,actor_female];
var intro_clips = [clip_intro_male, clip_intro_female];
var innocent_clips = [clip_innocent_male, clip_innocent_female];
var guilty_clips = [clip_guilty_male, clip_guilty_female];
var jail_cell = [mc_AllScenarios_Jail_Figure0, mc_AllScenarios_Jail_Figure1];

var security_clips = [clip_mc_security_figure0, clip_mc_security_figure1];

// SET THE LOCAL PALETTE
// SET THE LOCAL PALETTE
Actors[avatarSex].MC.assetPalette = MainAvatar.palette;
intro_clips[avatarSex].MC.assetPalette = MainAvatar.palette;
innocent_clips[avatarSex].MC.assetPalette = MainAvatar.palette;
guilty_clips[avatarSex].MC.assetPalette = MainAvatar.palette;
jail_cell[avatarSex].assetPalette = MainAvatar.palette;
security_clips[avatarSex].MC.assetPalette = MainAvatar.palette;

console.log("Resetting palette for clips and actor");

// SET THE AVATAR
if (avatarSex) {
	MainAvatar.setActorF(Actors[avatarSex]);
} else {
	MainAvatar.setActorM(Actors[avatarSex]);
}

var scene_offer1 = new Scene("offer1",
	"Your signature will indicate your agreement to plead guilty and forgo your right to a trial.~~~~~~~~~~~~~~~~~",
	actor_defense,
	bg_meetingroom,
    null);

var scene_offer_F = new Scene("pleadeal",
    "~~~~~~~~~~~~~~~~~~~~Plead guilty in exchange for a lower sentence (1 month in jail). Reject the offer and risk a more severe sentence if found guilty at trial (12 months in jail). ~~~~~~",
    null,
    bg_meetingroom,
    null);

// MANIFEST OF SCENE TRANSITIONS
console.log("LOADING SCENE TRANSITION MANIFEST");
var initialScene = scene_offer1;

MainAvatar.setNext(initialScene, "a");

initialScene.setNext(scene_offer1);
scene_offer1.setNext(scene_offer_F, "a");

scene_offer_F.setNext(null, "pleadguilty");
scene_offer_F.setNext(null, "rejectoffer");
