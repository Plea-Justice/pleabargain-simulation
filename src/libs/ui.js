/* UI API
** Thomas Nelson 2017
** University of Massachusetts Lowell, Psychology Department
** ui.js handles instantiation and configuration of user interface elements
** for a scene.
*/
console.log("LOADING ui.js");

// UI defines the properties and rendering routine for the User Interface
//   - interface framework (textbox and buttons)
//   - label for actor (disputed feature, not in MVP)
//   - new text to display in text field

/**
 * Define textboxes, and advancer buttons. Takes a stage as a parameter
 * and renders the needed items to the canvas.
 * @param stage 
 */
function UI(stage) {
  this.Stage = stage;
  this.Textbox = new Textbox();
  this.Advancer = new Advancer();
  console.log("UI constructed");

  this.render = function(script) {
    // draw UI framework
    this.Stage.addChild(this.Textbox.Container);
    // include advancer
    this.Stage.addChild(this.Advancer.Container);
    // add label
    // append text
    this.Textbox.Output.text += script.charBuffer;
    if (script.input == " ") {
      this.Textbox.Background.alpha = 0.00;
    } else {
      this.Textbox.Background.alpha = 0.85;
    }
  }
  this.clear = function() {
    this.Textbox.Output.text = "";
  }
}

var TEX_WIDTH = 1400;
var TEX_HEIGHT = 240;
var TEX_PADDING = 20;
var TEX_MARGIN = 30;

/**
 * Defines text box styling.
 */
function Textbox() { 
  console.log("Constructing Textbox Background");
  this.Background = new createjs.Shape();
  this.Background.name = "Textbox Background Shape";
  this.Background.snapToPixel = true;
  this.Background.graphics.beginStroke("#101010");
  this.Background.graphics.setStrokeStyle(4);
  this.Background.graphics.beginFill("#EB9532");
  this.Background.graphics.drawRoundRect(0, 0, TEX_WIDTH, TEX_HEIGHT, 10);
  this.Background.alpha = 0.85;
  console.log("Constructing Text Output");
  this.Output = new createjs.Text("", "bold 36px Arial", "#101010");
  this.Output.name = "Textbox Output Text"
  this.Output.textBaseline = "top";
  this.Output.x = TEX_MARGIN;
  this.Output.y = TEX_MARGIN;
  this.Output.lineWidth = TEX_WIDTH - ADV_WIDTH - (ADV_PADDING) - (TEX_MARGIN * 2);
  this.Output.lineHeight = 48;
  this.Output.text = "";
  console.log("Constructing Textbox Container");
  this.Container = new createjs.Container();
  this.Container.name = "Textbox Container";
  this.Container.x = (RES_WIDTH - TEX_WIDTH) / 2;
  this.Container.y = RES_HEIGHT - TEX_HEIGHT - TEX_PADDING;
  this.Container.addChild(this.Background, this.Output);
  console.log("Textbox constructed");
}

var BUT_WIDTH = 240;
var BUT_HEIGHT = 80;
var BUT_HOR_PADDING = 50;

/**
 * Defines button styling and some functionality like when you click on the button, and it deactivates
 * after.
 * @param labeltext 
 * @param horizontal 
 * @param vertical 
 */
function Button(parentFrame, labeltext, horizontal, vertical) {
  console.log("Constructing Button Background");
  this.Background = new createjs.Shape();
  this.Background.name = labeltext + " Button Background Shape";
  this.Background.snapToPixel = true;
  this.Background.graphics.beginStroke("#000000");
  this.Background.graphics.setStrokeStyle(4);
  this.Background.graphics.beginFill("#FFC010");
  this.Background.graphics.drawRoundRect(0, 0, BUT_WIDTH, BUT_HEIGHT, 10);
  this.Background.alpha = 0.85;
  console.log("Constructing Button Label");
  this.Label = new createjs.Text("ERROR", "bold 36px Arial", "#000000");
  this.Label.name = labeltext + " Button Label";
  this.Label.textBaseline = "middle";
  this.Label.textAlign = "center";
  this.Label.x = BUT_WIDTH / 2;
  this.Label.y = BUT_HEIGHT / 2;
  this.Label.text = labeltext;
  this.parentFrame = parentFrame;
  this.Listener = (event)=>{
    console.log(this.Label.text + "Button clicked");
    // store interaction
    outParams[this.parentFrame.Scene.name] = this.Label.text;
    this.parentFrame.deactivate();
    this.parentFrame.transition();
  };
  console.log("Constructing Button Container");
  this.Container = new createjs.Container();
  this.Container.name = labeltext + " Button Container";
  if (0 <= horizontal <= 4) {
    this.Container.x = (((RES_WIDTH - TEX_WIDTH) / 2) + ((BUT_WIDTH + BUT_HOR_PADDING ) * horizontal));
  }
  if (0 <= vertical <= 7) {
    this.Container.y = (TEX_PADDING + ((TEX_PADDING + BUT_HEIGHT) * vertical));
  } 
  this.Container.addChild(this.Background, this.Label);
  this.name = labeltext + " Button";
//    console.log("Registering Button for Mouseover");
//    this.Container.addEventListener("click", function(event) { window.open("https://survey.az1.qualtrics.com/jfe/form/SV_8360jRMQgSbxaTz?ID=DEMO1", "_self") });
  console.log("button constructed");

  this.setPosition = function(horizontal, vertical) {
    if (0 <= horizontal <= 4) {
      this.Container.x = (((RES_WIDTH - TEX_WIDTH) / 2) + ((BUT_WIDTH + BUT_HOR_PADDING) * horizontal));
    }
    if (0 <= vertical <= 7) {
      this.Container.y = (TEX_PADDING + ((TEX_PADDING + BUT_HEIGHT) * vertical));
    }
  }
  this.deactivate = function() {
    this.Container.alpha = 0;
  }
}

ADV_PADDING = 30;
ADV_WIDTH = TEX_HEIGHT - (ADV_PADDING * 2);
ADV_HEIGHT = ADV_WIDTH / 2;

/**
 * Define advancer styling and position.
 */
function Advancer() {
  console.log("Constucting Advancer Background");
  this.Background = new createjs.Shape();
  this.Background.name = "Advancer Background Shape";
  this.Background.snapToPixel = true;
  this.Background.graphics.beginStroke("#000000");
  this.Background.graphics.setStrokeStyle(4);
  this.Background.graphics.beginFill("#FFC010");
  this.Background.graphics.drawRoundRect(0, 0, ADV_WIDTH, ADV_HEIGHT, 10);
  console.log("Constructing Advancer Label");
  this.Label = new createjs.Text("", "bold 80px Courier New", "#000000");
  this.Label.name = "Advancer Label";
  this.Label.textBaseline = "middle";
  this.Label.textAlign = "center";
  this.Label.x = ADV_WIDTH / 2;
  this.Label.y = ADV_HEIGHT / 2;
//    this.Label.text = "\u25B8\u25B8";
  console.log("Constructing Advancer Container");
  this.Container = new createjs.Container();
  this.Container.name = "Advancer Container";
  this.Container.addChild(this.Background, this.Label);
  this.Container.x = (RES_WIDTH - (RES_WIDTH - TEX_WIDTH) / 2) - ADV_WIDTH - ADV_PADDING;
  this.Container.y = RES_HEIGHT - TEX_HEIGHT - TEX_PADDING + ADV_PADDING + ADV_HEIGHT;
  this.Container.alpha = 0.25;
this.name = "Advancer";
  console.log("Advancer onclick function");
  this.onclick = function(event) {
    frame.transition();
  }
  console.log("Advancer constructed");

  this.activate = function() {
    this.Container.alpha = 1;
    this.Label.text = ">>";
  }
  this.deactivate = function() {
    this.Container.alpha = 0.25;
    this.Label.text = "";
  }
}

console.log("LOADED ui.js");
