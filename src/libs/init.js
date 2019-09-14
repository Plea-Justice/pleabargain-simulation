// NULL FRAME is overwritten once initial frame has been completely loaded.
var frame = null;
var canvas = null;
var stage = null;
var flow = null;

// CHECKS FOR MODULES
/**
 * Method used for initializing the json. 
 * This has been abandoned.
 */
function initModule() {
        console.log("Beginning Initialization");
	// LOAD FLOW
	console.log("Loading Flow");

	// remainder of initialization occurs after flow is loaded from json
	// see initializeFirstFrame for continuation
	if (inParams["module"] == null) {
		console.log("FATAL ERROR: no module provided");
		alert("FATAL ERROR: no module provided");
	} else
		loadFlow("modules/" + inParams["module"] + ".json", flow);
}

/**
 * Another abandoned method for when we use the json files.
 * @param jsonData 
 */
function initializeFirstFrame(jsonData) {
	console.log("Initializing for First Frame");
        flow = jsonData;
	console.log("FLOW: " + JSON.stringify(flow));

	// IDENTIFY CANVAS AND CREATE STAGE
	console.log("Creating canvas and stage");
        canvas = document.getElementById("canvas");
        canvas.getContext("2d").font = "300px Garamond";
        canvas.getContext("2d").fillStyle = "#C0C0C0";
        canvas.getContext("2d").textAlign = "center";
        canvas.getContext("2d").textBaseline = "middle";
        stage = new createjs.Stage(canvas);

        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = 9/16 * window.innerWidth + "px"; 

	// CREATE INITIAL SCENE FROM FLOW SCENE INDEX 0
	if (flow != null) {
		var initialScene = getScenes(flow, "prologue")[0];
		console.log(getScenes(flow, "prologue")[0]);
		frame = new Frame(stage, initialScene);
	} else
		console.log("FLOW NOT LOADED: " + flow);

	// CONFIGURE EVENT HANDLER
	console.log("Setting up Event Handling");
        createjs.Ticker.addEventListener("tick", tick);
	if (inParams["mode"] == "fast") {
		alert("DEBUG: FAST MODE ACTIVE");
		createjs.Ticker.setInterval(1);
        } else
		createjs.Ticker.setInterval(1000/24);


	console.log("Initialization Finished");
}

// DEFINE FRAME TICK PROCESSING
/**
 * Define tick function used for animation features. It sets the size of the
 * canvas and initializes the frame.
 */
function tick() {
	// RESIZE CANVAS SUCH THAT CONTENT IS SCALED
	if ((window.innerWidth * 9/16) < window.innerHeight) {	// if width is limiting factor
		canvas.style.width = window.innerWidth + "px";
		canvas.style.height = 9/16 * window.innerWidth + "px";
	} else {  // if height is limiting factor
		// NOTE: decrementing by 4 prevents display of scrollbar on most browsers
		canvas.style.width = 16/9 * (window.innerHeight - 4) + "px";
		canvas.style.height = (window.innerHeight - 4) + "px";
	}
	// TODO: Insert character selection alternative control flow
	
	// Frame initializes as initialScene
	// FRAME ADVANCEMENT
	if (frame != null) {
		if (frame.Scene.index < frame.Scene.length) {
			frame.render();
		} else if (frame.Scene.index == frame.Scene.length) {
			frame.activate();
			stage.update();
			frame.Scene.index++;
		} else {
			// DO NOTHING
			// keep this loop clear for event capturing.
		}

	
	}
		
}

