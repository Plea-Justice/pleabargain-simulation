/* renderer API
** Thomas Nelson 2017
** University of Massachusetts Lowell, Psychology Department
** renderer.js renders a given dialog scene. It contains class definitions for
** the rendering of a Frame, a Clip, and a Scene.
*/
console.log("LOADING renderer.js");
// Scene defines the animated scene
//   - script string
//   - animated actor
//   - background elements
//   - foreground elements
//   - array of potential next scenes/clips
//   - array of potential buttons
//   - index of current position in Scene (cloned from Script)
//   - length of Scene (cloned from Script)
function Scene(scenename, script, actor, background, foreground) {
  // TODO: incorporate button instantiation into Scene instantiation
  this.name = scenename;
  // create script object from script string
  if (typeof(script) === 'string')
    this.Script = new Script(script);
  else if (script instanceof Script)
    this.Script = script;
  else
    alert("ERROR: Scene constructor - invalid script received: " + script);
  // Each scene possesses one animated actor
  this.Actor = actor;
  // and background
  this.Background = background;
  // and foreground
  this.Foreground = foreground;
  // any buttons
  this.Buttons = [];
  // indexing
  this.index = this.Script.index;
  this.length = this.Script.length;
  // Next Scene is initially Null
  this.Next = [];
  this.MC = null;
  console.log("Scene " + this.name + " constructed");

  // render the scene contextually based on the state of the Script traversal
  this.render = function(stage) {
    stage.addChild(this.Background);
    if (this.Actor != null)
      this.Actor.draw(stage, this.Script);
    stage.addChild(this.Foreground);
  }
  this.setNext = function(nextScene, index) {
    // reinitialize as empty array if null
    if (this.Next == null)
      this.Next = []
    // set value at given index to be nextScene
    this.Next[index] = nextScene;
    console.log("Next scene set for " + index);
  }
}

// Clip defines a fully-animated Movieclip and points to the scene which follows
//  - Movieclip (createjs structure)
//  - Next Scene (stored at this.Next)
function Clip(clipname, movieclip){
  this.name = clipname;
  this.MC = movieclip;
  this.Next = null;
  this.Script = null;
  this.Buttons = [];
  this.index = this.MC.currentFrame;
  this.length = this.MC.totalFrames;
  console.log("Clip " + this.name + " constructed");

  this.setNext = function(nextScene) {
    this.Next = nextScene;
    console.log("Next scene set"); 
  }
}

// Frame defines everything rendered in a single frame of animation.
//  - user interface (text box, label for speaking character, interface framework, and any prompts)
//  - animated scene
function Frame(stage, initialscene) {
  this.Stage = stage;
  this.UI = new UI(this.Stage);
  this.Scene = initialscene;
  console.log("Frame constructed");
  // TODO: unify Listener functions using event.target
  // TODO: make button behavior more modular
  // TODO: create a proper end of simulation system (attempt to transition to null? Create an end of survey object?)
  this.advanceListener = function(event) {
    console.log("Advancer clicked");
    this.deactivate();
    this.transition("a");
  }
  this.eventListener = function(event) {
    console.log("Event Listener triggered.");
    // perform button function
    console.log("Event Target Name: " + event.target.name);
    switch (event.target.name) {
      case ">>":
        console.log("Performing Advancer Function");
        this.deactivate();
        this.transition("a");
        break;
      case locale.prompt["acceptoffer"]:
        console.log("Performing Accept Offer Function");
        outParams[this.Scene.name] = "accepted";
        this.deactivate();
        exitToSurvey();
        break;
      case locale.prompt["rejectoffer"]:
        console.log("Performing Reject Offer Function");
        outParams[this.Scene.name] = "rejected";
        this.deactivate();
        exitToSurvey();
        break;
      default:
        console.log("Event Target not found");
        alert("ERROR: Renderer Event Listener - Invalid Event Target: " + event.target.name + " from " + event.target);
        //TODO: for (let t in this.Scene.transitions) transition(t);
        break;
    }
    // deactivate buttons
    // transition function
  }
  this.yesListener = function(event) {
    console.log("Yes Button clicked");
    // store interaction
    outParams[this.Scene.name] = "yes";
    this.deactivate();
    this.transition("yes");
  }
  this.noListener = function(event) {
    console.log("No Button clicked");
    // store interaction
    outParams[this.Scene.name] = "no";
    this.deactivate();
    this.transition("no");
  }
  this.acceptListener = function(event) {
    console.log("Accept Button clicked");
    // store interaction
    outParams[this.Scene.name] = "accept";
    this.deactivate();
    //exit to survey
    exitToSurvey();
  }
  this.declineListener = function(event) {
    console.log("Decline Button clicked");
    // store interaction
    outParams[this.Scene.name] = "decline";
    this.deactivate();
    //exit to survey
    exitToSurvey();
  }
  this.pleadguiltyListener = function(event) {
    console.log("Plead Guilty Button clicked");
    // store interaction
    outParams[this.Scene.name] = "pleadguilty";
    this.deactivate();
    //exit to survey
    exitToSurvey();
  }
  this.rejectofferListener = function(event) {
    console.log("Reject Offer Button clicked");
    // store interaction
    outParams[this.Scene.name] = "rejectoffer";
    this.deactivate();
    //exit to survey
    exitToSurvey();
  }
  this.render = function() {
    // If the current Scene is a Scene (not a MovieClip)
    if (this.Scene instanceof Scene) {
      this.Stage.removeAllChildren();
      this.Scene.Script.parseChar();
      this.Scene.render(this.Stage);
      this.UI.render(this.Scene.Script);
      this.Scene.index = this.Scene.Script.index;
      this.Stage.update();
    }
    // If the current Scene is a Clip
    else if (this.Scene instanceof Clip) {
      this.Stage.removeAllChildren();
      this.Stage.addChild(this.Scene.MC);
      this.Scene.index = this.Scene.MC.currentFrame;
      this.Stage.update();
      // if Clip has ended, automatically transition to next Scene
      if (this.Scene.index == this.Scene.length - 1) {
        console.log("Clip Concluded");
        this.transition();
      }
    }
    else {
      alert("ERROR: Frame.render() - invalid Frame.Scene");
    }
  }
  this.transition = function(index) {
    if (this.Scene.Next != null) {
      if (this.Scene.Next[index] != null) {
        console.log("Transitioning through index '" + index + "' to " + this.Scene.Next[index].name);
        this.Stage.removeAllChildren();
        this.deactivate();
        this.UI.clear();
        //reset previous Scene to original state
        if (this.Scene.Script != null)
          this.Scene.Script.initialize();
        //reset previous Clip to original state
        if (this.Scene.MC != null)
          this.Scene.MC.gotoAndPlay(0);
        this.Scene = this.Scene.Next[index];
        this.Scene.index = 0;
      }
      else if (index == null) {
        console.log("Transitioning to " + this.Scene.Next.name);
        this.Stage.removeAllChildren();
        this.deactivate();
        this.UI.clear();
        //reset previous Scene to original state
        if (this.Scene.Script != null)
          this.Scene.Script.initialize();
        //reset previous Clip to original state
        if (this.Scene.MC != null)
          this.Scene.MC.gotoAndPlay(0);
        this.Scene = this.Scene.Next;
        this.Scene.index = 0;
      }
      else
        alert("ERROR: Frame.transition(" +index +"); failed to find Next Scene at index " + index);
    }
    else
      alert("ERROR: Frame.transition(" + index + "); failed to find Next Scene Array");
  }
  //Activate all buttons in the Scene - making them visible and enable their event handlers
  this.activate = function() {
    console.log("Button Activation");
    for (let key in this.Scene.Next) {
      console.log("DEBUG: key found as " + key);
      if (key == "a") {
        this.UI.Advancer.activate();
        this.eventListener = this.eventListener.bind(this);
        this.UI.Advancer.Container.addEventListener("click", this.eventListener);
        console.log("Advancer activated");
      } else {
        this.Scene.Buttons[key] = new Button(key, 1, 1);
        this.eventListener = this.eventListener.bind(this);
        this.Scene.Buttons[key].Container.addEventListener("click", this.eventListener);
        this.Stage.addChild(this.Scene.Buttons[key].Container);
      }
    }
    if ("a" in this.Scene.Next) {
      console.log("Activating Advancer");
      this.UI.Advancer.activate();
      this.advanceListener = this.advanceListener.bind(this);
      this.UI.Advancer.Container.addEventListener("click", this.advanceListener);
      console.log("Advancer activated");
    }
    if ("yes" in this.Scene.Next) {
      console.log("Activating Yes Button");
      this.Scene.Buttons["yes"] = new Button("yes", 3, 3);
      this.yesListener = this.yesListener.bind(this);
      this.Scene.Buttons["yes"].Container.addEventListener("click", this.yesListener);
      this.Stage.addChild(this.Scene.Buttons["yes"].Container);
      console.log("Yes Button activated");
    }
    if ("no" in this.Scene.Next) {
      console.log("Activating No Button");
      this.Scene.Buttons["no"] = new Button("no", 3, 5);
      this.noListener = this.noListener.bind(this);
      this.Scene.Buttons["no"].Container.addEventListener("click", this.noListener);
      this.Stage.addChild(this.Scene.Buttons["no"].Container);
      console.log("No Button activated");
    }
    if ("accept" in this.Scene.Next) {
      console.log("Activating Accept Button");
      this.Scene.Buttons["accept"] = new Button("accept", 1, 3);
      this.acceptListener = this.acceptListener.bind(this);
      this.Scene.Buttons["accept"].Container.addEventListener("click", this.acceptListener);
      this.Stage.addChild(this.Scene.Buttons["accept"].Container);
      console.log("Accept Button activated");
    }
    if ("decline" in this.Scene.Next) {
      console.log("Activating Decline Button");
      this.Scene.Buttons["decline"] = new Button("decline", 1, 5);
      this.declineListener = this.declineListener.bind(this);
      this.Scene.Buttons["decline"].Container.addEventListener("click", this.declineListener);
      this.Stage.addChild(this.Scene.Buttons["decline"].Container);
      console.log("Decline Button activated");
    }
    if ("pleadguilty" in this.Scene.Next) {
      console.log("Activating Plead Guilty Button");
      this.Scene.Buttons["pleadguilty"] = new Button("pleadguilty", 1, 4);
      this.pleadguiltyListener = this.pleadguiltyListener.bind(this);
      this.Scene.Buttons["pleadguilty"].Container.addEventListener("click", this.pleadguiltyListener);
      this.Stage.addChild(this.Scene.Buttons["pleadguilty"].Container);
      console.log("Plead Guilty Button activated");
    }
    if ("rejectoffer" in this.Scene.Next) {
      console.log("Activating Reject Offer Button");
      this.Scene.Buttons["rejectoffer"] = new Button("rejectoffer", 3, 4);
      this.rejectofferListener = this.rejectofferListener.bind(this);
      this.Scene.Buttons["rejectoffer"].Container.addEventListener("click", this.rejectofferListener);
      this.Stage.addChild(this.Scene.Buttons["rejectoffer"].Container);
      console.log("Reject Offer Button activated");
    }
  }
  //Deactivate all buttons in the Scene - disabling their event handlers
  this.deactivate = function() { 
    if (this.UI.Advancer != null) {
      this.UI.Advancer.deactivate();
      this.UI.Advancer.Container.removeEventListener("click", this.advanceListener);
    console.log("Advancer deactivated");
    }
    if (this.Scene.Buttons["yes"] != null) {
      this.Scene.Buttons["yes"].deactivate();
      this.Scene.Buttons["yes"].Container.removeEventListener("click", this.yesListener);
    console.log("Yes Button deactivated");
    }
    if (this.Scene.Buttons["no"] != null) {
      this.Scene.Buttons["no"].deactivate();
      this.Scene.Buttons["no"].Container.removeEventListener("click", this.noListener);
    console.log("No Button deactivated");
    }
  }
}

console.log("LOADED renderer.js");
