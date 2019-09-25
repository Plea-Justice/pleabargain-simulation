console.log("LOADING MODULE MANIFEST");

var modulename = "Hit & Run v1.2"
var surveyURL = "";
document.title += " - " + modulename;

// MANIFEST OF URL PARAMETER USAGE
console.log("LOADING URL PARAMETER INTERP MANIFEST");

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

var mod_counter = 0;
if ("module" in inParams) {
	mod_counter = inParams["module"];
} else {
	alert("ERROR: Parameter Parsing - Invalid Module Setting 'module': " + inParams["module"]);
}

var mod = 0;
if ("module" in inParams) {
	console.log("module: " + inParams["module"]);
	mod = inParams["module"];
} else {
	alert("ERROR: Parameter Parsing - Invalid Module Setting 'module': " + inParams["module"]);
}

var username = "ERROR";
if ("Name" in inParams)
  username = inParams["Name"].substr(0,20);
else
  alert("ERROR: Parameter Parsing - Invalid Module Setting 'Name': " + inParams["Name"]);
console.log("Username set to " + username);

var guilt = false;
if ("guilt_0" in inParams) {
  if (inParams["guilt_0"] == "innocent")
    guilt = false;
  else if (inParams["guilt_0"] == "guilty")
    guilt = true;
  else
    alert("ERROR: Parameter Parsing - Invalid Module Setting 'guilt_0': " + inParams["guilt_0"]);
}
else
  alert("ERROR: Parameter Parsing - Missing Module Setting 'guilt_0'");

surveyURL += "guilt=" + guilt;

console.log("Guilt set to " + guilt);

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

var ID;
if ("ID" in inParams)
  ID = inParams["ID"];
else
  alert("ERROR: Parameter Parsing - Invalid Module Setting 'ID': " + inParams["ID"]);

surveyURL += "&ID=" + ID;

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

console.log("****** Palette from Customizer ******");
console.log("Hair A: " + hairA);
console.log("Hair B: " + hairB);
console.log("Eye A: " + eyeA);
console.log("Eye B: " + eyeB);
console.log("Outfit A: " + outfitA);
console.log("Outfit B: " + outfitB);
console.log("Skin A: " + skinA);
console.log("Skin B: " + skinB);
console.log("Avatar's Sex: " + avatarSex);
console.log("Avatar Index: " + avatarNum);
console.log("Avatar eyes: " + avatarEyes);
console.log("Avatar hair: " + avatarHair);

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

// MANIFEST OF ACTORS
console.log("LOADING ACTOR MANIFEST");

var mc_prosecutor	= new lib.prosecutorActor();
var actor_prosecutor	= new Actor(mc_prosecutor);

var mc_defense	= new lib.daActor();
var actor_defense	= new Actor(mc_defense);

var mc_judge		= new lib.judgeActor();
var actor_judge		= new Actor(mc_judge);

// MANIFEST OF BACKGROUNDS AND FOREGROUNDS
// TODO: make a cleaner interface for createjs.Bitmap
console.log("LOADING BACKGROUND & FOREGROUND ASSET MANIFEST");
var bg_meetingroom = new createjs.Bitmap("modules/assets/scenes/backgrounds/meetingroom.png");
//var bg_judge_seat   = new createjs.Bitmap("modules/assets/scenes/backgrounds/judgecourtroom.png");
var bg_judge_seat = new createjs.Bitmap("modules/assets/scenes/backgrounds/JudgeSeat.png");
var bg_p_courtroom = new createjs.Bitmap("modules/assets/scenes/backgrounds/courtroom_2019.png");

var guilty_flashback1 = new createjs.Bitmap("modules/assets/scenes/backgrounds/guiltytext1.png");
var guilty_flashback2 = new createjs.Bitmap("modules/assets/scenes/backgrounds/guiltytext2.png");

var fg_table       = new createjs.Bitmap("modules/assets/scenes/foregrounds/table.png");

// AVATAR CUSTOMIZATION
console.log("LOADING AVATAR CUSTOMIZATION");

// MANIFEST OF CLIPS & SCENES
console.log("LOADING CLIP & SCENE MANIFEST");

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
var mc_intro_male = new lib.Scenario1_Intro_Figure0();
// Declaring Female MCs: Intro
var mc_intro_female = new lib.Scenario1_Intro_Figure1();

// Declaring Male Clips: Intro
var clip_intro_male = new Clip("clip_intro_male", mc_intro_male);
// Declaring Female Clips: Intro
var clip_intro_female = new Clip("clip_intro_female", mc_intro_female);

// Declaring Male MCs: Guilty
var mc_guilty_male = new lib.Scenario1_FlashbackGuilty_Figure0();
// Declaring Female MCs: Guilty
var mc_guilty_female = new lib.Scenario1_FlashbackGuilty_Figure1();

// Declaring Male Clips: Guilty
var clip_guilty_male = new Clip("guilty_male", mc_guilty_male);
// Declaring Female Clips: Guilty
var clip_guilty_female = new Clip("guilty_female", mc_guilty_female);

// Declaring Male MCs: Innocent
var mc_innocent_male = new lib.Scenario1_FlashbackInnocent_Figure0();
// Declaring Female MCs: Innocent
var mc_innocent_female = new lib.Scenario1_FlashbackInnocent_Figure1();

// Declaring Male Clips: Innocent
var clip_innocent_male = new Clip("innocent_male", mc_innocent_male);
// Declaring Female Clips: Innocent
var clip_innocent_female = new Clip("innocent_female", mc_innocent_female);

// Declaring Jail Cell movie clips to be loaded as foreground in SCENE
var mc_AllScenarios_Jail_Figure0 = new lib.AllScenarios_Jail_Figure0();
var mc_AllScenarios_Jail_Figure1 = new lib.AllScenarios_Jail_Figure1();

// Declaring MC: Security Footage
var mc_securityfootage = new lib.Scenario1_SecurityFootage_AllFigures();
// Declaring Clip: Security Footage
var clip_securityfootage = new Clip("securityfootage", mc_securityfootage);

// Declaring Arrays of clips
// ARRAY OF ACTORS:
var Actors = [actor_male,actor_female];
var intro_clips = [clip_intro_male, clip_intro_female];
var innocent_clips = [clip_innocent_male, clip_innocent_female];
var guilty_clips = [clip_guilty_male, clip_guilty_female];
var jail_cell = [mc_AllScenarios_Jail_Figure0, mc_AllScenarios_Jail_Figure1];

// SET THE AVATAR
if (avatarSex) {
	MainAvatar.setActorF(Actors[avatarSex]);
} else {
	MainAvatar.setActorM(Actors[avatarSex]);
}

// SET THE LOCAL PALETTE
Actors[avatarSex].MC.assetPalette = MainAvatar.palette;
intro_clips[avatarSex].MC.assetPalette = MainAvatar.palette;
innocent_clips[avatarSex].MC.assetPalette = MainAvatar.palette;
guilty_clips[avatarSex].MC.assetPalette = MainAvatar.palette;
jail_cell[avatarSex].assetPalette = MainAvatar.palette;

console.log("Resetting palette for clips and actor");

var scene_intro1		 = new Scene("intro1",
				"~~~~~~~~~~~~~Good afternoon,~~~~~~ my name is Mr. Clark ~~~~~~~and I will be prosecuting this case on behalf of the State of Massachusetts, ~~~~~~~~~~your Honor.~~~~~~~~~~~~",
				actor_prosecutor,
				bg_p_courtroom,
				fg_table);

var scene_intro2		= new Scene("intro2",
				"~~~~~~~~~Good afternoon. ~~~~~~~~~~~~What is the nature of this case, ~~~~~~~~~~~~Mr. Clark?~~~~~~~~~~~~",
				actor_judge,
				bg_judge_seat,
				null);

var scene_initial_P0  = new Scene("initial_P0",
				"~~~~~~~~~~~~~~~~~~~~" + username + " is accused of being involved in a hit-and-run ~~~~occurring around 6PM ~~~~on the 26th day of June ~~~~in the year 2019.~~~~~~~~~",
				actor_prosecutor,
				bg_p_courtroom,
				fg_table);

var scene_initial_P1  = new Scene("initial_P1",
				"~~~~~~~~~~~In accordance with state law,~~~~~~~~~~~~ a hit-and-run occurs when the operator ~~of a motor vehicle damages public ~~or ~private ~~~property, ~~~~~~~~~~~~~~and the operator fails to report it.~~~~~~~~~",
				actor_prosecutor,
				bg_p_courtroom,
				fg_table);

var scene_initial_P2  = new Scene("initial_P2",
				"~~~~~~~~~~~~~According to the information provided in the police report,~~~~~~~~~~~~ there was property damage exceeding $1,000, ~~~~~~~~~~~~~~~~~~~which resulted from a collision in a store parking lot.~~~~~~~~~~~~~~~~~~~ The victim's car was legally parked within the lines of the space.~~~~~~~~~~~~~~~~~",
				actor_prosecutor,
				bg_p_courtroom,
				fg_table);

var scene_initial_P3  = new Scene("initial_P3",
				"~~~~~~~~~~~There is security footage provided by the owner of the business where the accident occurred that shows a car with a plate number registered to " + username + " ~~~~~~~~~~~~appearing to come in contact with the victim's car.~~~~~~~~~~~~~",
				actor_prosecutor,
				bg_p_courtroom,
				fg_table);

// Add security footage here

var scene_initial_P4  = new Scene("initial_P4",
				"~~~~~~~~~~~~Although the impact might look minor,~~~~~~~~~~~~~~~~~~ according to a quote from the victim's auto body repair shop the damage to the body was significant.~~~~~~~~~~~~~~~~~",
				actor_prosecutor,
				bg_p_courtroom,
				fg_table);

var scene_initial_P5  = new Scene("initial_P5",
				"~~~~~~~~~~Thus,~~~~~~~~~~~~~~ according to statute,~~~~~~~~~~~~ failure of " + username + " to stop and check the status of the other vehicle constitutes a hit-and-run.~~~~~~~~~~~~~~ The security footage appears to show " + username + "'s car ~~~~striking a vehicle and failing to check for ~~~~or report ~~~damages.~~~~~~~~~~~",
				actor_prosecutor,
				bg_p_courtroom,
				fg_table);

var scene_initial_P6  = new Scene("initial_P6",
				"~~~~~~~~~This is a textbook hit-and-run,~~~~~~~~~~~~~~~~ which is considered a serious misdemeanor~ punishable by significant fines and/or time in jail.~~~~~~~~~~~",
				actor_prosecutor,
				bg_p_courtroom,
				fg_table);

var scene_initial_P7  = new Scene("initial_P7",
				"~~~~~~~~~We request a court date be set by the State as soon as it is possible.~~~~~~~~~~~",
				actor_prosecutor,
				bg_p_courtroom,
				fg_table);

var scene_initial_J1 = new Scene("initial_J1",
				"~~~~~~~~~~~~~" + username + ",~~~~~~~~~~ you are being charged with leaving the scene of an accident involving property damage.~~~~~~~~",
				actor_judge,
				bg_judge_seat,
				null);

var scene_initial_J4 = new Scene("initial_J4",
				"~~~~~~~~You have the right to request the appointment of counsel if you cannot afford counsel;~~~~~~~ the right to not make a statement;~~~~~~~~~~ and the right to a jury trial,~~~~~~~~~~~~~ judgment,~~~~~~~~~~~ and sentencing ~~~~~~~~~~before a district judge.~~~~~~~~",
				actor_judge,
				bg_judge_seat,
				null);

var scene_initial_J5 = new Scene("initial_J5",
				"~~~~~~~At this time you will be held until counsel has been assigned to you, ~~~~~~~~~~~which will occur within the next 48 hours.~~~~~~~~~~~~~~~~~~~~~~~~",
				actor_judge,
				bg_judge_seat,
				null);

var scene_initial_J6 = new Scene("initial_J6",
				"~~~~~~~~~~~~~~~~~~~~It is so ordered.~~~~~~~~~",
				actor_judge,
				bg_judge_seat,
				null);

var scene_jail_intro = new Scene("Jail_Intro",
				"~~~~~~~~~~~~~~I can't believe this is happening. ~~~~~~~~~~~I think I remember the day Mr. Clark is referring to...",
				null,
				null,
				jail_cell[avatarSex]);

var scene_jail_guilty = new Scene("Jail_guilty",
				"~~~~~~~~~~~~I know it was tight when I pulled out, but I thought I just barely grazed that person's car. ~~~~~~~~~ I guess I missed some of the damage I caused when pulling out. I must be guilty.~~~~~~~",
				null,
				null,
				jail_cell[avatarSex]);

var scene_jail_innocent = new Scene("Jail_innocent",
				"~~~~~~~~~I know it was tight when I pulled out, but I didn't actually come into contact with that person's car.~~~~~~~~ When I looked in my mirror, the other car was fine!~~~~~~~ I know I'm innocent.~~~~~~~~",
				null,
				null,
				jail_cell[avatarSex]);

var scene_offer_P0		= new Scene("offer_P0",
				"~~~~~~Hello,~~~ " + username + ". ~~~~~~~~~~~~~~~~I am your defense attorney, Mr. Grant.~~~~~~~~~~ Mr. Clark, the prosecutor on your case, is interested in seeing whether this case could be resolved without a trial.~~~~~~~~",
				actor_defense,
				bg_meetingroom,
				null);

var scene_offer_P1 = new Scene("offer_P1",
				"Based on the security camera footage and the damage to the victim's car, ~~~~ Mr. Clark believes that he could win this case if it goes to trial.~~~~~~~",
				actor_defense,
				bg_meetingroom,
				null);

var scene_offer_P2		= new Scene("offer_P2",
				"~~~~~~~~~~~If this case does go to trial,~~~~~~~~~~~~~~~~ Mr. Clark will be seeking the maximum penalty of 12 months in jail.~~~~~~~~~~~~",
				actor_defense,
				bg_meetingroom,
				null);

var scene_offer_P3		= new Scene("offer_P3",
				"~~~~~~~~~~If you plead guilty now,~~~~~~~~~~~~~ saving the State the resources needed for a formal trial,~~~~~~~~~~ Mr. Clark is prepared to recommend that the district court judge sentence you to 1 month in jail, rather than 12 months in jail.~~~~~~~~~~~~~",
				actor_defense,
				bg_meetingroom,
				null);

var scene_offer_P4		= new Scene("offer_P4",
				"~~~~~~~~~~If you accept this plea offer, you will be asked to sign this form,~~~~~~~~ which includes the recommendations for lower sentencing that I just described. ~~~~~~~~~~~~",
				actor_defense,
				bg_meetingroom,
				null);

var scene_offer_P5		= new Scene("offer_P5",
				"If you reject this plea offer and take your case to trial, Mr. Clark will pursue the maximum jail sentence of 12 months.~~~~~~~~~",
				actor_defense,
				bg_meetingroom,
				null);


var scene_offer_P6		= new Scene("offer_P6",
				"~~~~~~~~Your signature will indicate your agreement to plead guilty and forgo your right to a trial.~~~~~~~~~~",
				actor_defense,
				bg_meetingroom,
				null);


var scene_offer_F		= new Scene("pleadeal",
				"~~~~~~~~~~~~~~~~~~~~~~~~Plead guilty in exchange for a lower sentence (1 month in jail). Reject the offer and risk a more severe sentence if found guilty at trial (12 months in jail).~~~~~~~~",
				null,
				bg_meetingroom,
				null);

// MANIFEST OF TRANSITIONS
console.log("LOADING SCENE TRANSITION MANIFEST");

// TODO: var initialScene = customize;
// Check for proper avatar for scene intialization
var initialScene = null;

initialScene = intro_clips[avatarSex];

MainAvatar.setNext(initialScene, "a");

initialScene.setNext(scene_intro1);
scene_intro1.setNext(scene_intro2, "a");
scene_intro2.setNext(scene_initial_P0, "a");
scene_initial_P0.setNext(scene_initial_P1, "a");
scene_initial_P1.setNext(scene_initial_P2, "a");
scene_initial_P2.setNext(scene_initial_P3, "a");
scene_initial_P3.setNext(clip_securityfootage, "a");
clip_securityfootage.setNext(scene_initial_P4, "a");
scene_initial_P4.setNext(scene_initial_P5, "a");
scene_initial_P5.setNext(scene_initial_P6, "a");
scene_initial_P6.setNext(scene_initial_P7, "a");
scene_initial_P7.setNext(scene_initial_J1, "a");


scene_initial_J1.setNext(scene_initial_J4, "a");
scene_initial_J4.setNext(scene_initial_J5, "a");
scene_initial_J5.setNext(scene_initial_J6, "a");
scene_initial_J6.setNext(scene_jail_intro, "a");


// Check for guilty status and transition to appropraite scene
if (guilt) {
	scene_jail_intro.setNext(guilty_clips[avatarSex], "a");
	guilty_clips[avatarSex].setNext(scene_jail_guilty, "a");
	scene_jail_guilty.setNext(scene_offer_P0, "a");
}
else {
	scene_jail_intro.setNext(innocent_clips[avatarSex], "a");
	innocent_clips[avatarSex].setNext(scene_jail_innocent, "a");
	scene_jail_innocent.setNext(scene_offer_P0, "a");
}

scene_offer_P0.setNext(scene_offer_P1, "a");
scene_offer_P1.setNext(scene_offer_P2, "a");
scene_offer_P2.setNext(scene_offer_P3, "a");
scene_offer_P3.setNext(scene_offer_P4, "a");
scene_offer_P4.setNext(scene_offer_P5, "a");
scene_offer_P5.setNext(scene_offer_F, "a");

scene_offer_F.setNext(null, "pleadguilty");
scene_offer_F.setNext(null, "rejectoffer");


// DEBUG: testing JSON stringification
//alert("JSON: " + JSON.stringify(scene_offer_F));
