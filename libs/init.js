console.log("LOADING init.js");

// Globabl Variables
var canvas = document.getElementById("canvas");

var experiment_path = "experiments/";
const manifest_filename = "manifest.json";
const condition_file_prefix = "condition";

var manifest;   // Animation asset files for all conditions.
var condition;  // Ordered scene description for each experimental condition.

var actors = {};
var clips = {};
var images = {};

var scenes = [];

// SIMULATION ENTRY POINT
// Load the experiment manifest and proceed to load_condition().
function load_manifest() {

    let scenario = inParams["scenario"];

    if (scenario == null) {
        alert("ERROR: No scenario specified.")
        return;
    }

    experiment_path += scenario +'/';

    console.log("Loading manifest " + experiment_path + manifest_filename);
    let canvas = document.getElementById("canvas");
    
    // Loading message.
    let ctx = canvas.getContext("2d")
    ctx.fillStyle = "white";
    ctx.fillText("Loading simulation. Please wait, loading may take up to a minute.", 100, 100);

    // Read avatar features passed in by customizer.
    loadAvatarParams();

    let condition_number = inParams["condition"];

    if (condition_number == null) {
        alert("ERROR: No experimental condition specified.")
        return;
    }

    console.log("Experimental condition number: " + condition_number);

    let manifest_filepath = experiment_path + manifest_filename;
    let condition_filepath = experiment_path + condition_file_prefix + condition_number + ".json";

    let queue = new createjs.LoadQueue(true);

    queue.on("fileload", (event)=>{

        switch (event.item.type) {
        case "javascript":
            document.head.appendChild(event.result);
            break;
            
        case "manifest":
            manifest = event.result;
            break;

        case "json":
            if (event.result.condition != null) {
                condition = event.result.condition;
                break;
            }
            alert("ERROR: Malformed condition file: " + experiment_path + condition_file_prefix + condition_number + ".json")
            break;

        case "image":
            let img = event.item.src;
            img = img.slice(img.lastIndexOf("/")+1);
            images[img] = new createjs.Bitmap(event.result);
            break;

        default:
            alert("ERROR: Malformed experimental manifest.");
        } // switch

    }, this); // queue fileload event

    queue.on("complete", load_animate_assets, this);
    queue.loadManifest(manifest_filepath, false);
    queue.loadFile(condition_filepath, false);
    queue.load();
}

// Handle any additional items requested by Animate exports (cached bitmaps, etc).
function anHandleFileLoad(evt, comp) {
    let images=comp.getImages();	
    if (evt && (evt.item.type == "image")) { images[evt.item.id] = evt.result; }	
}

function anHandleComplete(evt,comp) {
    let lib=comp.getLibrary();
    let ss=comp.getSpriteSheet();
    let queue = evt.target;
    let ssMetadata = lib.ssMetadata;
    for(i=0; i<ssMetadata.length; i++) {
        ss[ssMetadata[i].name] = new createjs.SpriteSheet( {"images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames} );
    }
    AdobeAn.compositionLoaded(lib.properties.id);
}

function load_animate_assets(evt) {
    if (!window.FILE_TO_ID)
        alert('Error: FILE_TO_ID not found. Please report this error to a developer.');

    
    for (let id of Object.keys(AdobeAn.compositions)) {
        let comp = AdobeAn.getComposition(id);
        let lib = comp.getLibrary();
        let queue = new createjs.LoadQueue(false);
        queue.addEventListener("fileload", function(evt){anHandleFileLoad(evt,comp)});
        queue.addEventListener("complete", function(evt){anHandleComplete(evt,comp)});
        queue.loadManifest(lib.properties.manifest);
    }
    
    // TODO: A better method of loading is needed here.
    // Considering that we intend to load assets as needed, a chain of
    // LoadQueues may be what we want.
    setTimeout(arrange_scenes, 8000);
}

function arrange_scenes(evt) {
    try {
        if (condition == undefined || manifest == undefined)
            alert("ERROR: Did not load manifest or condition JSON.");
        
        for (const actor of manifest.actors) {
            let comp = AdobeAn.getComposition(FILE_TO_ID[actor]);
            let lib = comp.getLibrary();
            actors[actor] = new Actor(new lib[actor]());
        }

        for (const clip of manifest.clips) {
            let comp = AdobeAn.getComposition(FILE_TO_ID[clip]);
            let lib = comp.getLibrary();
            clips[clip] = new lib[clip]();
        }

        // Create each scene.
        for(const sceneDescr of condition.scenes) {
            // Dialogue scenes consist of a background, foreground, actor, and script.
            // TODO: Jail scene for instance has no actor, instead uses image.
            if (sceneDescr.script != undefined) {
                // TODO username must be passeed as a parameter.
                let name = sceneDescr.name;
                let actor = null;
                if (sceneDescr.actor != undefined)
                    actor = actors[sceneDescr.actor];
                let script = sceneDescr.script.replace(/@U/g, inParams["Name"]);
                let i = 0;
                while ((i = script.search(/@\d/)) != -1) {
                    let d  = Number(script[i+1]);
                    if (d == 0) {
                        script = script.replace("@0", "");
                    } else {
                    script = script.slice(0, i+1) + (d-1) + "~~~" + script.slice(i+2);
                    }
                }
                console.log(script);
                let bg = images[sceneDescr.bg];
                let fg = images[sceneDescr.fg];

                let scene = new Scene(name, script, actor, bg, fg);
                scenes.push(scene);
                if (sceneDescr.buttons != undefined)
                    scene.ButtonsToAdd = sceneDescr.buttons;
            
            // Cutscenes are premade scenes that consist of a movie clip.
            } else if (sceneDescr.clip != undefined) {
                let scene = new Clip(sceneDescr.name, clips[sceneDescr.clip])
                scenes.push(scene);

            } else {
                alert("ERROR: Malformed condition configuration.");
                console.log("ERROR! Problematic scene description. " + sceneDescr.name);
            }
        } // for
    } catch (err) {
        alert('An error has occured. Please contact the developer.');
        console.log(err);
        console.log('NOTE: Please ensure assets are exported with the most recent Animate,' +
                    ' that the publishing script has been run, and that there are no assets' +
                    ' with duplicate IDs.'
        );
        throw(err);
    }

    init();
}


console.log("LOADED init.js");