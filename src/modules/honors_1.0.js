console.log("LOADING MODULE MANIFEST");

var modulename = "Hit & Run - v1.2 Honors v1.0"
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

var username = "ERROR";
if ("Name" in inParams)
  username = inParams["Name"].substr(0,20);        
else
  alert("ERROR: Parameter Parsing - Invalid Module Setting 'Name': " + inParams["Name"]);
console.log("Username set to " + username);

var guilt = false;
if ("S" in inParams) {
  if (inParams["S"] == "bip")
    guilt = false;
  else if (inParams["S"] == "bop")
    guilt = true;
  else
    alert("ERROR: Parameter Parsing - Invalid Module Setting 'S': " + inParams["S"]);
}
else
  alert("ERROR: Parameter Parsing - Missing Module Setting 'S'");

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
// MANIFEST OF ACTORS
console.log("LOADING ACTOR MANIFEST");
// TODO: actual female avatar
var mc_avatarF		= new lib.prosecutorActor();
var actor_avatarF	= new Actor(mc_avatarF);

// TODO: actual male avatar
var mc_avatarM		= new lib.prosecutorActor();
var actor_avatarM	= new Actor(mc_avatarM);

var mc_prosecutor	= new lib.prosecutorActor();
var actor_prosecutor	= new Actor(mc_prosecutor);

var mc_judge		= new lib.judgeActor();
var actor_judge		= new Actor(mc_judge);

var mc_defense		= new lib.daActor();
var actor_defense	= new Actor(mc_defense);

// MANIFEST OF BACKGROUNDS AND FOREGROUNDS
// TODO: make a cleaner interface for createjs.Bitmap
console.log("LOADING BACKGROUND & FOREGROUND ASSET MANIFEST");
var bg_meetingroom = new createjs.Bitmap("modules/assets/scenes/backgrounds/meetingroom.png");
var bg_courtroom   = new createjs.Bitmap("modules/assets/scenes/backgrounds/courtroom.png");

var guilty_flashback1 = new createjs.Bitmap("modules/assets/scenes/backgrounds/guiltytext1.png");
var guilty_flashback2 = new createjs.Bitmap("modules/assets/scenes/backgrounds/guiltytext2.png");

var fg_table       = new createjs.Bitmap("modules/assets/scenes/foregrounds/table.png");

// AVATAR CUSTOMIZATION
console.log("LOADING AVATAR CUSTOMIZATION");
var avatarPalette = new Palette();
var customize = new AvatarCustomizer();
customize.setSkin("#FFD598", "#FFBF8E");
customize.setHair("#6B3314", "#FF00FF");
customize.setOutfit("#FFFF99", "#FF00FF");

// MANIFEST OF CLIPS & SCENES
console.log("LOADING CLIP & SCENE MANIFEST");
var mc_prologue			= new lib.prologue();
var clip_prologue		= new Clip("prologue", mc_prologue);

var scene_intro1		 = new Scene("intro1",
				"~~~~~~~~~~~~~Good afternoon,~~~~~~ my name is Mr. Clark ~~~~~~~and I will be prosecuting this case on behalf of the State of Massachusetts, ~~~~~~~~~~your Honor.~~~~~~~~~~~~",
				actor_prosecutor,
				bg_courtroom,
				fg_table);

var scene_intro2		= new Scene("intro2",
				"~~~~~~~~~~~~~~~~~~~~~~~~Good afternoon. ~~~~~~~~~~~~What is the nature of this case, ~~~~~~~~~~~~Mr. Clark?~~~~~~~~~~~~",
				actor_judge,
				bg_courtroom,
				null);

var scene_initial_P0  = new Scene("initial_P0",
				"~~~~~~~~~~~~~~~~~~~~" + username + " is accused of being involved in a hit-and-run ~~~~occurring around 2PM ~~~~on the 11th ~~day of June ~~~~in the year 2016.~~~~~~~~~",
				actor_prosecutor,
				bg_courtroom,
				fg_table); 

var scene_initial_P1  = new Scene("initial_P1",
				"~~~~~~~~~~~In accordance with state law,~~~~~~~~~~~~ a hit-and-run occurs when the operator ~~of a motor vehicle damages public ~~or ~private ~~~property, ~~~~~~~~~~~~~~and the operator fails to report it.~~~~~~~~~",
				actor_prosecutor,
				bg_courtroom,
				fg_table); 

var scene_initial_P2  = new Scene("initial_P2",
				"~~~~~~~~~~~~~According to the information provided in the police report,~~~~~~~~~~~~ there was property damage exceeding $1,000, ~~~~~~~~~~~~~~~~~~~which resulted from a collision in a store parking lot.~~~~~~~~~~~~~~~~~~~ The victim's car was legally parked within the lines of the space.~~~~~~~~~~~~~~~~~",
				actor_prosecutor,
				bg_courtroom,
				fg_table); 

var scene_initial_P3  = new Scene("initial_P3",
				"~~~~~~~~~~~There is security footage provided by the owner of the business where the accident occurred that shows a car with a plate number registered to " + username + " ~~~~~~~~~~~~appearing to come in contact with the victim's car.~~~~~~~~~~~~~",
				actor_prosecutor,
				bg_courtroom,
				fg_table); 

var scene_initial_P4  = new Scene("initial_P4",
				"~~~~~~~~~~~~Although the impact might look minor,~~~~~~~~~~~~~~~~~~ according to a quote from the victim's auto body repair shop the damage to the body was significant.~~~~~~~~~~~~~~~~~",
				actor_prosecutor,
				bg_courtroom,
				fg_table); 

var scene_initial_P5  = new Scene("initial_P5",
				"~~~~~~~~~~Thus,~~~~~~~~~~~~~~ according to statute,~~~~~~~~~~~~ failure of " + username + " to stop and check the status of the other vehicle constitutes a hit-and-run.~~~~~~~~~~~~~~ The security footage shows " + username + "'s car ~~~~striking a vehicle and failing to check for ~~~~or report ~~~damages.~~~~~~~~~~~",
				actor_prosecutor,
				bg_courtroom,
				fg_table); 

var scene_initial_P6  = new Scene("initial_P6",
				"~~~~~~~~~This is a textbook hit-and-run,~~~~~~~~~~~~~~~~ which is considered a serious misdemeanor~ punishable by significant fines and/or time in jail.~~~~~~~~~~~",
				actor_prosecutor,
				bg_courtroom,
				fg_table); 

var scene_initial_P7  = new Scene("initial_P7",
				"~~~~~~~~~We request a court date be set by the State as soon as it is possible.~~~~~~~~~~~ In the meantime,~~~~~~~~~~ we request " + username + " be held until a time bail can be set and paid.~~~~~~~~~~~",
				actor_prosecutor,
				bg_courtroom,
				fg_table);

var scene_initial_J1 = new Scene("initial_J1",
				"~~~~~~~~~~~~~" + username + ",~~~~~~~~~~ you are being charged with leaving the scene of an accident involving property damage.~~~~~ You will be held until bail can be set and paid.~~~~~~~~",
				actor_judge,
				bg_courtroom,
				null);

var scene_initial_J4 = new Scene("initial_J4",
				"~~~~~~~~You have the right to request the appointment of counsel ~~~~~~~~~if you cannot afford counsel,~~~~~~~ the right to not make a statement,~~~~~~~~~~ and the right to a jury trial,~~~~~~~~~~~~~ judgement,~~~~~~~~~~~ and sentencing ~~~~~~~~~~before a district judge.~~~~~~~~",
				actor_judge,
				bg_courtroom,
				null);

var scene_initial_J5 = new Scene("initial_J5",
				"~~~~~~~At this time ~~~~you are remanded to a holding cell where you will await a bail hearing,~~~~~~~~~~~~~~~ which will occur within the next 48 hours ~~~~~~~~~~- at that hearing,~~~~~~~~~~~~~ a bond will be assessed for conditional bail.~~~~~~~~~~~~~~",
				actor_judge,
				bg_courtroom,
				null);

var scene_initial_J6 = new Scene("initial_J6",
				"~~~~~~~~~~~~~~~~~~~~It is so ordered.~~~~~~~~~",
				actor_judge,
				bg_courtroom,
				null);

var jailcellgeneral1   	 	= new createjs.Bitmap("modules/assets/scenes/foregrounds/jailcellgeneral1.png");
var scene_jailcellgeneral1	= new Scene("jailcellgeneral1",
				" ",
				null,
				jailcellgeneral1,
				null);

var jailcellgeneral2   	 	= new createjs.Bitmap("modules/assets/scenes/foregrounds/jailcellgeneral2.png");
var scene_jailcellgeneral2	= new Scene("jailcellgeneral2",
				" ",
				null,
				jailcellgeneral2,
				null);

var jailcellgeneral3   	 	= new createjs.Bitmap("modules/assets/scenes/foregrounds/jailcellgeneral3da.png");
var scene_jailcellgeneral3	= new Scene("jailcellgeneral3",
				" ",
				null,
				jailcellgeneral3,
				null);

var jailcellgeneral4   	 	= new createjs.Bitmap("modules/assets/scenes/foregrounds/jailcellgeneral4.png");
var scene_jailcellgeneral4	= new Scene("jailcellgeneral4",
				" ",
				null,
				jailcellgeneral4,
				null);

var jailcellguilty1   	 	= new createjs.Bitmap("modules/assets/scenes/foregrounds/jailcellguilty1.png");
var scene_jailcellguilty1	= new Scene("jailcellguilty1",
				" ",
				null,
				jailcellguilty1,
				null);

var jailcellguilty2   	 	= new createjs.Bitmap("modules/assets/scenes/foregrounds/jailcellguilty2.png");
var scene_jailcellguilty2	= new Scene("jailcellguilty2",
				" ",
				null,
				jailcellguilty2,
				null);

var jailcellinnocent1   	= new createjs.Bitmap("modules/assets/scenes/foregrounds/jailcellinnocent1.png");
var scene_jailcellinnocent1	= new Scene("jailcellinnocent1",
				" ",
				null,
				jailcellinnocent1,
				null);

var jailcellinnocent2   	= new createjs.Bitmap("modules/assets/scenes/foregrounds/jailcellinnocent2.png");
var scene_jailcellinnocent2	= new Scene("jailcellinnocent2",
				" ",
				null,
				jailcellinnocent2,
				null);

var jailcellinnocent3   	= new createjs.Bitmap("modules/assets/scenes/foregrounds/jailcellinnocent3.png");
var scene_jailcellinnocent3	= new Scene("jailcellinnocent3",
				" ",
				null,
				jailcellinnocent3,
				null);


var mc_flashback_guilty1	= new lib.guilty1();
var clip_flashback_guilty1	= new Clip("flashback_guilty1", mc_flashback_guilty1);

var scene_flashback_guilty1_2	= new Scene("flashback_guilty1_2",
				" ",
				null,
				guilty_flashback1,
				null);

var mc_flashback_guilty2	= new lib.guilty2();
var clip_flashback_guilty2	= new Clip("flashback_guilty2", mc_flashback_guilty2);

var scene_flashback_guilty2_3	= new Scene("flashback_guilty2_3",
				" ",
				null,
				guilty_flashback2,
				null);

var mc_flashback_guilty3	= new lib.guilty3();
var clip_flashback_guilty3	= new Clip("flashback_guilty3", mc_flashback_guilty3);

var mc_flashback_innocent	= new lib.innocentgray();
var clip_flashback_innocent	= new Clip("flashback_innocent", mc_flashback_innocent);

var mc_transition_guilty	= new lib.jailcelltransitionguilty();
var clip_transition_guilty	= new Clip("transition_guilty", mc_transition_guilty);

var mc_transition_innocent	= new lib.jailcelltransitioninnocent();
var clip_transition_innocent	= new Clip("transition_innocent", mc_transition_innocent);

var scene_offer_D0		= new Scene("offer_D0",
				"~~~~~~Hello " + username + ". ~~~~~~~~~~~~~~~~My name is Mr. Stevens and I am your defense attorney.~~~~~ We are currently working on a court date.~~~~~~~~~~~",
				actor_defense,
				bg_meetingroom,
				fg_table);

var scene_offer_D1		= new Scene("offer_D1",
				"~~~~~~~~~I have met with the prosecutor,~~~~ Mr. Clark,~~~~~~ and based on the security footage and damage to the victim's car, he has offered to resolve this with a plea deal,~~~~~ rather than going to trial.~~~~~~~~~~~",
				actor_defense,
				bg_meetingroom,
				fg_table);

var scene_offer_D2		= new Scene("offer_D2",
				"~~~~~~~~~~~Mr. Clark has agreed to the minimum sentence if you accept the plea deal.~~~~~ If not, he says that he will pursue the maximum punishment at trial.~~~~~~~~~~~~~~~",
				actor_defense,
				bg_meetingroom,
				fg_table);

var scene_offer_D3		= new Scene("offer_D3",
				"~~~~~~~~~~If you accept,~~~~~~~~~~~~~ you will need to sign this form.~~~~~ Your signature will indicate your agreement to plead guilty and forgo your right to a trial.~~~~~~~~~~~~",
				actor_defense,
				bg_meetingroom,
				fg_table);

var scene_offer_F		= new Scene("pleadeal",
				'Click the "CONTINUE" button above to end the simulation and continue to the next phase of the study.',
				null,
				bg_meetingroom,
				null);

// MANIFEST OF TRANSITIONS
console.log("LOADING SCENE TRANSITION MANIFEST");

// TODO: var initialScene = customize;
var initialScene = clip_prologue;

customize.setNext(clip_prologue, "a");

clip_prologue.setNext(scene_intro1);
scene_intro1.setNext(scene_intro2, "a");
scene_intro2.setNext(scene_initial_P0, "a");
scene_initial_P0.setNext(scene_initial_P1, "a");
scene_initial_P1.setNext(scene_initial_P2, "a");
scene_initial_P2.setNext(scene_initial_P3, "a");
scene_initial_P3.setNext(scene_initial_P4, "a");
scene_initial_P4.setNext(scene_initial_P5, "a");
scene_initial_P5.setNext(scene_initial_P6, "a");
scene_initial_P6.setNext(scene_initial_P7, "a");
scene_initial_P7.setNext(scene_initial_J1, "a");

scene_initial_J1.setNext(scene_initial_J4, "a");
scene_initial_J4.setNext(scene_initial_J5, "a");
scene_initial_J5.setNext(scene_initial_J6, "a");
scene_initial_J6.setNext(scene_jailcellgeneral1, "a");
scene_jailcellgeneral1.setNext(scene_jailcellgeneral2, "a");

if (guilt)
  scene_jailcellgeneral2.setNext(clip_flashback_guilty1, "a");
else
  scene_jailcellgeneral2.setNext(clip_flashback_innocent, "a");

clip_flashback_guilty1.setNext(scene_flashback_guilty1_2);
scene_flashback_guilty1_2.setNext(clip_flashback_guilty2, "a");
clip_flashback_guilty2.setNext(scene_flashback_guilty2_3);
scene_flashback_guilty2_3.setNext(clip_flashback_guilty3, "a")
clip_flashback_guilty3.setNext(scene_jailcellguilty1);
scene_jailcellguilty1.setNext(scene_jailcellguilty2, "a");
scene_jailcellguilty2.setNext(scene_jailcellgeneral3, "a");


clip_flashback_innocent.setNext(scene_jailcellinnocent1);
scene_jailcellinnocent1.setNext(scene_jailcellinnocent2, "a");
scene_jailcellinnocent2.setNext(scene_jailcellgeneral3, "a");

scene_jailcellgeneral3.setNext(scene_jailcellgeneral4, "a");
scene_jailcellgeneral4.setNext(scene_offer_D0, "a");

scene_offer_D0.setNext(scene_offer_D1, "a");
scene_offer_D1.setNext(scene_offer_D2, "a");
scene_offer_D2.setNext(scene_offer_D3, "a");
scene_offer_D3.setNext(scene_offer_F, "a");

scene_offer_F.setNext(null, "continue");
