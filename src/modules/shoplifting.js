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

// CHECKING MODULE COUNTER
var mod_counter = 0;
if ("modcounter" in inParams) {
	console.log("module counter: " + inParams["modcounter"]);
	mod_counter = inParams["modcoutner"];
} else {
	alert("ERROR: Parameter Parsing - Invalid Module Setting 'modcounter': " + inParams["modcounter"]);
} console.log("module counter set to " + mod_counter);

// CHECKING MODULE
var mod = 0;
if ("module" in inParams) {
	console.log("module: " + inParams["module"]);
	mod = inParams["module"];
} else {
	alert("ERROR: Parameter Parsing - Invalid Module Setting 'module': " + inParams["module"]);
}

// CHECKING USERNAME FROM QUALTRICS FORM
var username = "ERROR";
if ("Name" in inParams)
    username = inParams["Name"].substr(0,20);
else
    alert("ERROR: Parameter Parsing - Invalid Module Setting 'Name': " + inParams["Name"]);
console.log("Username set to " + username);

// CHECKING GUILT SET BY QUALTRICS FORM
var guilt = false;
if ("guilt_1" in inParams) {
    if (inParams["guilt_1"] == "innocent")
        guilt = false;
    else if (inParams["guilt_1"] == "guilty")
        guilt = true;
    else
        alert("ERROR: Parameter Parsing - Invalid Module Setting 'guilt_1': " + inParams["guilt_1"]);
}
else
    alert("ERROR: Parameter Parsing - Missing Module Setting 'guilt_1'");

surveyURL += "guilt=" + guilt;
console.log("Guilt set to " + guilt);

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

// Parsing the URL for Palette and slip/avatar indicies
var skinA = "#FFFFFF";
if ("skinA" in inParams) {
	skinA = inParams["skinA"];
} else {
	alert("ERROR: Parameter Parsing - Invalid skinA of Palette: " + inParams["skinA"]);
}

var skinB = "#FFFFFF";
if ("skinB" in inParams) {
	skinB = inParams["skinB"];
} else {
	alert("ERROR: Parameter Parsing - Invalid skinB of Palette: " + inParams["skinB"]);
}

var hairA = "#FFFFFF";
if ("hairA" in inParams) {
	hairA = inParams["hairA"];
} else {
	alert("ERROR: Parameter Parsing - Invalid hairA of Palette: " + inParams["hairA"]);
}

var hairB = "#FFFFFF";
if ("hairB" in inParams) {
	hairB = inParams["hairB"];
} else {
	alert("ERROR: Parameter Parsing - Invalid hairB of Palette: " + inParams["hairB"]);
}

var eyeA = "#FFFFFF";
if ("eyeA" in inParams) {
	eyeA = inParams["eyeA"];
} else {
	alert("ERROR: Parameter Parsing - Invalid eyeA of Palette: " + inParams["eyeA"]);
}

var eyeB = "#FFFFFF";
if ("eyeB" in inParams) {
	eyeB = inParams["eyeB"];
} else {
	alert("ERROR: Parameter Parsing - Invalid eyeB of Palette: " + inParams["eyeB"]);
}

var outfitA = "#FFFFFF";
if ("outfitA" in inParams) {
	outfitA = inParams["outfitA"];
} else {
	alert("ERROR: Parameter Parsing - Invalid outfitA of Palette: " + inParams["outfitA"]);
}

var outfitB = "#FFFFFF";
if ("outfitB" in inParams) {
	outfitB = inParams["outfitB"];
} else {
	alert("ERROR: Parameter Parsing - Invalid outfitB of Palette: " + inParams["outfitB"]);
}

var avatarSex = 0;
if ("avatarSex" in inParams) {
	avatarSex = inParams["avatarSex"];
} else {
	alert("ERROR: Parameter Parsing - Invalid avatarSex of Palette: " + inParams["avatarSex"]);
}

var avatarNum = 0;
if ("avatarNum" in inParams) {
	avatarNum = inParams["avatarNum"];
} else {
	alert("ERROR: Parameter Parsing - Invalid avatarNum of Palette: " + inParams["avatarNum"]);
}

var avatarEyes, avatarHair;

if ("eyes" in inParams) {
  avatarEyes = inParams["eyes"];
} else {
  alert("ERROR: Parameter Parsing - Invalid eyes in Palette: " + inParams["eyes"]);
}

if ("hair" in inParams) {
  avatarHair = inParams["hair"];
} else {
  alert("ERROR: Parameter Parsing - Invalid hair in Palette: " + inParams["hair"]);
}

var da_rec = false;
if ("rec" in inParams) {
    if (inParams["rec"] == "accept")
        da_rec = true;
    else if (inParams["rec"] == "reject")
        da_rec = false;
    else
        alert("ERROR: Parameter Parsing - Invalid Module Setting 'rec': " + inParams["rec"]);
}
else
    alert("ERROR: Parameter Parsing - Missing Module Setting 'rec'");

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


// Declaring the scenes with lines, actors, foreground and background as arguments.
var scene_intro0 = new Scene("intro0",
    "Good afternoon,~~~~~~~~ my name is Mr. Clark and I will be prosecuting this case on behalf of the State of Massachusetts, Your Honor.~~~~~~~~",
    actor_prosecutor,
    bg_courtroom,
    fg_table);
var scene_intro1 = new Scene("intro1",
    "Good afternoon.~~~~~~~~~~~~~~~~~~ What is the nature of this case, Mr. Clark?~~~~~~~~~",
    actor_judge,
    bg_judge_courtroom,
    fg_table);
var scene_intro2 = new Scene("intro2",
    username + " is accused of committing larceny occurring around 12PM on the 3rd day of November in the year 2018.~~~~~~~~~~~~~~~",
    actor_prosecutor,
    bg_courtroom,
    fg_table);
var scene_intro3 = new Scene("intro3",
    "~~~~~~~~~~~~~~In accordance with state law, larceny occurs when one steals the property of another. ~~~~~~~~~~~~~~~~",
    actor_prosecutor,
    bg_courtroom,
    fg_table);
var scene_intro4 = new Scene("intro4",
    "~~~~According to the information provided in the police report, the defendant requested a pair of sunglasses in a locked case from the salesclerk.",
     actor_prosecutor,
     bg_courtroom,
	 fg_table);
var scene_intro5 = new Scene("intro5",
	"The salesclerk provided the sunglasses to the defendant who allegedly walked away with them in order to examine them in a mirror.",
	actor_prosecutor,
	bg_courtroom,
	fg_table);
var scene_intro6 = new Scene("intro6",
	"Once the salesclerk's attention was diverted to another customer, the defendant exited the store wearing the sunglasses.~~~~~~~~~~",
	actor_prosecutor,
	bg_courtroom,
	fg_table);
var scene_intro7 = new Scene("intro7",
    "~~~~The salesclerk positively identified the defendant as the person who walked out of the store wearing the missing pair of sunglasses.",
    actor_prosecutor,
    bg_courtroom,
	fg_table);
var scene_intro8 = new Scene("intro8",
	"There is also security footage provided by the owner of the sunglasses shop where the theft occurred that shows the defendant walking toward the exit wearing the sunglasses.~~~~~~~~~~~~~~",
	actor_prosecutor,
	bg_courtroom,
	fg_table);
// Security footage here
var scene_post_crime_footage1 = new Scene("pcf1",
    "~~~~~~~~The security footage shows " + username + " wearing the missing pair of designer sunglasses and heading towards the store exit.~~~~~~",
    actor_prosecutor,
    bg_courtroom,
    fg_table);

 var scene_post_crime_footage2 = new Scene("pcf2",
    "Theft of these sunglasses is a clear larceny,~~~ which,~~~~ given the value of these glasses is considered a felony offense punishable by imprisonment.~~~~~~~~~",
    actor_prosecutor,
    bg_courtroom,
    fg_table);
    
var scene_post_crime_footage3 = new Scene("pcf3",
	"We request a court date be set by the State as soon as it is possible.~~~~~",
	actor_prosecutor,
	bg_courtroom,
	fg_table);
var scene_post_crime_footage4 = new Scene("pcf4",
    username + ", you are being charged with larceny.~~~~~~~~~~~~~~",
    actor_judge,
    bg_judge_courtroom,
    null);
var scene_post_crime_footage5 = new Scene("pcf5",
"~~~~~~~~You have the right to request the appointment of counsel if you cannot afford counsel;~~~~~~~ the right to not make a statement;~~~~~~~~~~ and the right to a jury trial,~~~~~~~~~~~~~ judgment,~~~~~~~~~~~ and sentencing ~~~~~~~~~~before a district judge.~~~~~~~~",
    actor_judge,
    bg_judge_courtroom,
    null);
var scene_post_crime_footage6 = new Scene("pcf6",
    "~~~~~~At this time, you will be held until counsel has been assigned to you,~~~~~ which will occur within the next 48 hours.~~~~~~~~~~",
    actor_judge,
    bg_judge_courtroom,
    null);
// Jailcell scene reflecting on the incident
var scene_jailcell1 = new Scene("jailcell1",
	"I know I remember the day Mr. Clark is talking about...",
  null,
  null,
  jail_cell[avatarSex]);
// Flashback of event from User's point of view (Guilty)
var scene_jailcellG = new Scene("jailcellGuilty",
	"I know I forgot to take those sunglassess off before I left.~~~~~~ I should have returned them...~~~~~~~ But, I was afraid they'd think I intended to steal them.~~~~~~~ I guess I'm guilty of this!~~~~~~",
  null,
  null,
  jail_cell[avatarSex]);
// Flashback of event from User's point of view (Innocent)
var scene_jailcellI = new Scene("jailcellInnocent",
	"I couldn't return the sunglasses to the sales clerk because he was helping another customer,~~~~~~ but I did remember to leave them on the counter before I left the store.~~~~~~~~~ I know I'm innocent.~~~ Someone else must have swiped them!~~~~~~~",
  null,
  null,
  jail_cell[avatarSex]);

var scene_offer1 = new Scene("offer1",
    "~~~~~~~~Hello, " + username + ".~~~~~ I am your defense attorney, Mr. Grant. ~~~~~~~~ Mr. Clark, the prosecutor on your case, is interested in seeing whether the case could be resolved without a trial.~~~~~~~~~~~~~",
    actor_defense,
    bg_meetingroom,
    null);

var scene_offer2 = new Scene("offer2",
    "Based on the security camera footage and the testimony from the salesclerk,~~~~~ Mr. Clark believes that he could win if this case goes to trial.~~~~~~",
	actor_defense,
	bg_meetingroom,
    null);

var scene_offer3 = new Scene("offer3",
    "~~~~~~~If this case does go to trial, Mr. Clark will be seeking the maximum penalty of 12 months in jail.~~~~~~~~~~~~",
    actor_defense,
    bg_meetingroom,
	null);
var scene_offer4 = new Scene("offer4",
	"If you plead guilty now, saving the State the resources needed for a formal trial, Mr. Clark is prepared to recommend that the district court judge sentence you to 1 month rather than 12 months in jail.~~~~~~~~~~~",
	actor_defense,
	bg_meetingroom,
	null);
var scene_offer5 = new Scene("offer5",
    "If you accept this plea offer, you will be asked to sign this form, which includes the recommendations for lower sentencing that I just described.~~~~~~~~",
    actor_defense,
    bg_meetingroom,
    null);
var scene_offer6 = new Scene("offer6",
    "If you reject this plea offer and take your case to trial, Mr. Clark will pursue the maximum jail sentence of 12 months.~~~~~~~~~~~~~~~~~~~~~~~~~",
    actor_defense,
    bg_meetingroom,
    null);
var scene_offer7 = new Scene("offer7",
	"Really,~~~~~ it boils down to this:~~~~~ you never know if the prosecutor will come back with another offer or what that offer will look like.~~~~~~~~~~~~~~~~~",
	actor_defense,
	bg_meetingroom,
    null);
var scene_offer8 = new Scene("offer8",
	"Sure,~~~~ they could always come back with a better offer. ~~~~~~~Or they could decide not to bargain with you anymore, ~~~~~come back with the same offer, ~~~~~or offer a less desirable plea deal than this one.~~~~~~",
	actor_defense,
	bg_meetingroom,
    null);

if (da_rec)
{
    var scene_offer9 = new Scene("offer9",
	"It really could go in any direction.~~~~~ While this is your decision to make,~~~~~ I think you should accept this offer.~~~~~~~~~~",
	actor_defense,
	bg_meetingroom,
    null);
}
else 
{
    var scene_offer9 = new Scene("offer9",
	"It really could go in any direction.~~~~~ While this is your decision to make,~~~~~ I think you should reject this offer.~~~~~~~~~~",
	actor_defense,
	bg_meetingroom,
    null);
}

var scene_offer10 = new Scene("offer10",
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

var initialScene = null;

initialScene = intro_clips[avatarSex];

MainAvatar.setNext(initialScene, "a");

initialScene.setNext(scene_intro0);
scene_intro0.setNext(scene_intro1, "a");
scene_intro1.setNext(scene_intro2, "a");
scene_intro2.setNext(scene_intro3, "a");
scene_intro3.setNext(scene_intro4, "a");
scene_intro4.setNext(scene_intro5, "a");
scene_intro5.setNext(scene_intro6, "a");
scene_intro6.setNext(scene_intro7, "a");
scene_intro7.setNext(scene_intro8, "a");
scene_intro8.setNext(security_clips[avatarSex], "a"); // should have security footage
security_clips[avatarSex].setNext(scene_post_crime_footage1, "a");
scene_post_crime_footage1.setNext(scene_post_crime_footage2, "a");
scene_post_crime_footage2.setNext(scene_post_crime_footage3, "a");
scene_post_crime_footage3.setNext(scene_post_crime_footage4, "a");
scene_post_crime_footage4.setNext(scene_post_crime_footage5, "a");
scene_post_crime_footage5.setNext(scene_post_crime_footage6, "a");
scene_post_crime_footage6.setNext(scene_jailcell1, "a");
if (guilt) {
	scene_jailcell1.setNext(guilty_clips[avatarSex], "a");
	guilty_clips[avatarSex].setNext(scene_jailcellG);
	scene_jailcellG.setNext(scene_offer1, "a");
} else {
	scene_jailcell1.setNext(innocent_clips[avatarSex], "a");
	innocent_clips[avatarSex].setNext(scene_jailcellI);
	scene_jailcellI.setNext(scene_offer1, "a");
}
scene_offer1.setNext(scene_offer2, "a");
scene_offer2.setNext(scene_offer3, "a");
scene_offer3.setNext(scene_offer4, "a");
scene_offer4.setNext(scene_offer5, "a");
scene_offer5.setNext(scene_offer6, "a");
scene_offer6.setNext(scene_offer7, "a");
scene_offer7.setNext(scene_offer8, "a");
scene_offer8.setNext(scene_offer9, "a");
scene_offer9.setNext(scene_offer10, "a");
scene_offer10.setNext(scene_offer_F, "a");

scene_offer_F.setNext(null, "pleadguilty");
scene_offer_F.setNext(null, "rejectoffer");
