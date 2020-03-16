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
//   - array of potential buttons
//   - index of current position in Scene (cloned from Script)
//   - length of Scene (cloned from Script)

/**
 * A method for rendering Actors to the canvas with a script, background and foreground
 * image. Render function function is important for drawing the scene to
 * the canvas.
 * @param scenename
 * @param script
 * @param actor
 * @param background
 * @param foreground
 */
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
  this.MC = null;
  console.log("Scene " + this.name + " constructed");

  // render the scene contextually based on the state of the Script traversal
  this.render = function(stage) {
    stage.addChild(this.Background);
    if (this.Actor != null)
      this.Actor.draw(stage, this.Script);
    stage.addChild(this.Foreground);
  }
}

// Clip defines a fully-animated Movieclip and points to the scene which follows
//  - Movieclip (createjs structure)

/**
 * A method to play a premade clip to the canvas. A clip is a fully-animated Movieclip.
 * @param clipname
 * @param movieclip
 */
function Clip(clipname, movieclip){
  this.name = clipname;
  this.MC = movieclip;
  this.Script = null;
  this.Buttons = [];
  this.index = this.MC.currentFrame;
  this.length = this.MC.totalFrames;
  console.log("Clip " + this.name + " constructed");
}

/**
 * A method for storing the information needed for palettizing, and determining
 * what Actors to use for simulations.
 * <p>
 * The function methods are used to give data to the palette so the palette can
 * set the colors locally.
 * @see Palette
 */
function AvatarCustomizer(){
  console.log("Beginning to construct Avatar Customizer")
  this.name = "avatar_customizer";
  this.MC = null;       // Movieclip
  this.Script = null;
  this.Buttons = [];
  this.index = 0;
  this.length = 1000000;
  this.actor = null;
  this.actorM = null;
  this.actorF = null;
  this.palette = null; //avatarPalette;

  console.log("Avatar Customizer constructed");

  this.setActorF = function(customAvatar) {
    this.actor = customAvatar;
  }
  this.setActorM = function(customAvatar) {
    this.actor = customAvatar;
  }
  this.setSkin = function(A, B) {
    this.palette.setSkin(A, B);
  }
  this.setHair = function(A, B) {
    this.palette.setHair(A, B);
  }
  this.setEye = function(A, B) {
    this.palette.setEye(A, B);
  }
  this.setOutfit = function(A, B) {
    this.palette.setOutfit(A, B);
  }
  this.setPalette = function(Pal) {
    this.palette = Pal;
  }
}

// Frame defines everything rendered in a single frame of animation.
//  - user interface (text box, label for speaking character, interface framework, and any prompts)
//  - animated scene

/**
 * Define rendered data in a single frame of animation. This includes all UI objects as well as animated clips. This also maintains
 * methods for transitioning between scenes.
 * <p>
 * Define transition functions for specific buttons. Especially the final transition functions.
 * These buttons are used to transition from the simulation back to qualtrics.
 * @param stage
 * @param scenes
 */
function Frame(stage, scenes) {
  this.Stage = stage;
  this.UI = new UI(this.Stage);
  this.Scenes = scenes;
  this.Index = 0;
  if (scenes.length < 1)
    alert("ERROR: Frame() - scenes array empty.");
  this.Scene = scenes[this.Index];
  console.log(this.Scene);
  console.log("Frame constructed");
  // TODO: unify Listener functions using event.target
  // TODO: make button behavior more modular
  // TODO: create a proper end of simulation system (attempt to transition to null? Create an end of survey object?)
  this.advanceListener = function(event) {
    console.log("Advancer clicked");
    this.deactivate();
    this.transition();
  }
  this.yesListener = function(event) {
    console.log("Yes Button clicked");
    // store interaction
    console.log(event);
    outParams[this.Scene.name] = "yes";
    this.deactivate();
    this.transition();
  }
  this.render = function() {
    // If the current Scene is a Scene (not a MovieClip)
    if (this.Scene instanceof Scene) {
      this.Stage.removeAllChildren();
      this.Scene.Script.parseChar();
      this.Scene.render(this.Stage); //
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
    else if (this.Scene instanceof AvatarCustomizer) {
      this.Stage.removeAllChildren();
      this.Stage.update();
      // TODO: Render UI of Avatar Customizer
      // trigger this.transition(); when begin button is clicked.
      // if(next) {this.transition();}
    }
    else {
      alert("ERROR: Frame.render() - invalid Frame.Scene");
    }
  }
  this.transition = function() {
    if (this.Index < this.Scenes.length -1) {
      this.Index++;
      console.log("Transitioning to " + this.Scenes[this.Index].name);
      this.Stage.removeAllChildren();
      this.deactivate();
      this.UI.clear();
      //reset previous Scene to original state
      if (this.Scene.Script != null)
        this.Scene.Script.initialize();
      //reset previous Clip to original state
      if (this.Scene.MC != null)
        this.Scene.MC.gotoAndPlay(0);
        this.Scene = this.Scenes[this.Index];
      this.Scene.index = 0;
    } else {
      exitToSurvey();
    }
      // TODO we've reached the end. Present options.
  }

  //Activate all buttons in the Scene - making them visible and enable their event handlers
  this.activate = function() {
    console.log("Button Activation");
    if (this.Scene instanceof Scene) {
      console.log("Activating Advancer");
      this.UI.Advancer.activate();
      this.advanceListener = this.advanceListener.bind(this);
      this.UI.Advancer.Container.addEventListener("click", this.advanceListener);
      console.log("Advancer activated");
      
      if (this.Scene.ButtonsToAdd != undefined && this.Scene.ButtonsToAdd instanceof Array) {
        for (let i = 0; i < this.Scene.ButtonsToAdd.length; i++){
          console.log("Activating Button");
          buttonName = this.Scene.ButtonsToAdd[i];
          button = this.Scene.Buttons[buttonName] = new Button(this, buttonName, 1 + (i%2?2:0), 3 + Math.floor(i/2));
          this.yesListener = this.yesListener.bind(this);
          button.Container.addEventListener("click", button.Listener);
          this.Stage.addChild(this.Scene.Buttons[buttonName].Container);
          console.log(buttonName + " Button activated");
        }
      }
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
