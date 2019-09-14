/**
 * This function is no longer required due to the current implementation.
 * @param jsonFile 
 * @param flow 
 */
function loadFlow(jsonFile, flow) {
	console.log("LOADING JSON: " + jsonFile);

	$.get(jsonFile)
	.done(function() {
		$.getJSON(jsonFile, function(data) {
			console.log("LOADED JSON: " + jsonFile);
			console.log("DATA: " + data);
			initializeFirstFrame(data);
		});
	}).fail(function() {
		console.log("ERROR: JSON NOT FOUND");
		flow = null;
	})
}

/**
 * Not used at all. (Deprecated)
 * @param flow 
 * @param name 
 * @param di 
 * @param si 
 */
function getScene(flow, name, di, si) {
	if (flow.scenes[name] == null) {
		alert('ERROR: unable to find scene "' + name + '" in flow ' + flow);
	} else {
		if (flow.scenes[name].type == "cutscene") {
			// TODO: more robust syntax check
			if (clips[name] == null)
				alert('ERROR: unable to find clip "' + name +'" in clips bindings: ' + clips);
			else {
				var newClip = new Clip(name,
				                       clips[name]);
				// if (flow.scenes[name].next.trigger == "auto") {
				newClip.setNext(flow.scenes[name].next.jump, 0, 0); // TODO: handling for alternative triggers
				//}
				return newClip;
			}
		} else if (flow.scenes[name].type == "dialogue") {
			// TODO: more robust syntax check
			if (di >= flow.scenes[name].dialogue.length)
				alert('ERROR: attempt to access out of bounds dialogue element');
			else if (actors[flow.scenes[name].dialogue[di].actor] == null)
				alert('ERROR: unable to find actor "' + flow.scenes[name].dialogue[di].actor + '" in actors bindings: ' + actors);
			else if (si >= flow.scenes[name].dialogue[di].strings.length)
				alert('ERROR: attempt to access out of bounds dialogue string element');
			else {
				var newScene = new Scene(name + "_" + di + "-" + si,
				                         flow.scenes[name].dialogue[di].strings[si],
				                         actors[flow.scenes[name].dialogue[di].actor],
				                         new createjs.Bitmap(flow.scenes[name].background),
				                         new createjs.Bitmap(flow.scenes[name].foreground));
				// if string is ultimate in sequence
				if (si == flow.scenes[name].dialogue[di].strings.length - 1) {
					// and if dialogue is ultimate in sequence
					if (di == flow.scenes[name].dialogue.length - 1) {
						// Jump to next cutscene/clip in flow
						newScene.setNext(flow.scenes[name].next.jump, 0, 0); // TODO: handling for trigger variants
					} else {
						// Jump to next dialogue sequence in cutscene
						newScene.setNext(name, di + 1, 0); // advance to next dialogue sequence
					}
				} else {
					// Jump to next string in dialogue sequence
					newScene.setNext(flow.scenes[name], di, si + 1);
				}
				return newScene;
			}
		} else {
			alert('ERROR: undefined flow scene type :' + flow.scenes[name].type);
		}
	}
}

/**
 * Not used at all (Deprecated) 
 * @param flow 
 * @param sceneName 
 * @see setNext
 */
function getScenes(flow, sceneName) {
	var sceneArray = [];
	var i = 0;
	while (i < flow.scenes.length) {
		// if indexed scene matches provided scene name
		console.log("TESTING: " + sceneName);
		console.log("TEST222: " + flow.scenes[i].name);
		if (flow.scenes[i].name == sceneName) {
			// process cutscene clips
			if (flow.scenes[i].type == "cutscene") {
				var newClip = new Clip(flow.scenes[i].name,
			                               clips[flow.scenes[i].name]);
				console.log("CHECKING NEXT: " + flow.scenes[i].next.jump + " 0 0 a");
				newClip.setNext(flow.scenes[i].next.jump);
				// add clip to array
				sceneArray[sceneArray.length] = newClip;

			// process dialogue scenes
			} else if (flow.scenes[i].type == "dialogue") {
				// for each dialogue sequence in scene
				for (var j = 0; j < flow.scenes[i].dialogue.length; j++) {
					// for each string in sequence
					for (var k = 0; k < flow.scenes[i].dialogue[j].strings.length; k++) {
						console.log("Processing Scene: " + flow.scenes[i].name + "-" + flow.scenes[i].dialogue[j].actor + j + "-" + k);
						var newScene = new Scene(flow.scenes[i].name + "-" + flow.scenes[i].dialogue[j].actor + j + "-" + k,
						                         flow.scenes[i].dialogue[j].strings[k],
						                         actors[flow.scenes[i].dialogue[j].actor],
						                         new createjs.Bitmap(flow.scenes[i].background),
						                         new createjs.Bitmap(flow.scenes[i].foreground));
						console.log("CHECKING NEXT: " + flow.scenes[i].next.jump + " " + j + " " + k + " a");
						var transition = "a"; // TODO: determine transition index from JSON
						// set previous string in sequence to advance to new one
						if (sceneArray.length > 0)
							sceneArray[(sceneArray.length)-1].setNext(flow.scenes[i].name + "-" + flow.scenes[i].dialogue[j].actor + j + "-" + k, "a");
						// add new scene to the array
						sceneArray[sceneArray.length] = newScene;
					}
				}
				                         
			} else
				alert("ERROR: Unprocessable scene type: " + flow.scenes[i].type);
			break;
		} else
			i++;
	}
	// assume set scene transition of final array element to next scene
	if (sceneArray.length > 0)
		sceneArray[(sceneArray.length)-1].setNext(flow.scenes[i].next.jump, "a");
	return sceneArray;
}



