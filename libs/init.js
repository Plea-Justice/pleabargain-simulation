console.log("LOADING init.js");

// Globabl Variables
var canvas = document.getElementById("canvas");

const manifest_filename = "manifest.json";

var manifest;   // Animation asset files for all conditions.
var condition;  // Ordered scene description for each experimental condition.

var assets = {};

var scenes = [];

// Contains color data of actors
var assetPalettes = [];

// SIMULATION ENTRY POINT
// Load the experiment manifest and proceed to load_condition().
function load_manifest() {

    console.log("Loading manifest " + manifest_filename);
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

    let manifest_filepath = manifest_filename;

    let queue = new createjs.LoadQueue(true);

    queue.on("fileload", (event) => {

        switch (event.item.type) {
            case "javascript":
                document.head.appendChild(event.result);
                break;

            case "manifest":
                manifest = event.result;

                if (event.result.conditions[condition_number - 1] != null) {
                    condition = event.result.conditions[condition_number - 1];
                    break;
                } else
                    alert("ERROR: Malformed condition: condition" + condition_number);

                break;

            case "json":
                if (event.result.condition != null) {
                    condition = event.result.condition;
                    break;
                }
                alert("ERROR: Malformed condition: " + condition_number);
                break;

            case "image":
                let img = event.item.src;
                img = img.slice(img.lastIndexOf("/") + 1).replace(/\..*$/, '');
                assets[img] = new createjs.Bitmap(event.result);
                break;

            default:
                alert("ERROR: Malformed experimental manifest.");
        } // switch

    }, this); // queue fileload event

    queue.on("complete", load_animate_assets, this);
    queue.loadManifest(manifest_filepath, false);
    queue.load();
}

// Handle any additional items requested by Animate exports (cached bitmaps, etc).
function anHandleFileLoad(evt, comp) {
    let images = comp.getImages();
    if (evt && (evt.item.type == "image")) { images[evt.item.id] = evt.result; }
}

function anHandleComplete(evt, comp) {
    let lib = comp.getLibrary();
    let ss = comp.getSpriteSheet();
    let queue = evt.target;
    let ssMetadata = lib.ssMetadata;
    for (i = 0; i < ssMetadata.length; i++) {
        ss[ssMetadata[i].name] = new createjs.SpriteSheet({ "images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames });
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
        queue.addEventListener("fileload", function (evt) { anHandleFileLoad(evt, comp) });
        queue.addEventListener("complete", function (evt) { anHandleComplete(evt, comp) });
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

        init_palette();

        for (const file of manifest.manifest) {
            if (file.match(/^(clip|actor)/)) {
                let name = file.replace(/\..*?$/, '').replace(/^.*\//, '');
                let comp = AdobeAn.getComposition(FILE_TO_ID[name]);
                let lib = comp.getLibrary();
                assets[name] = new lib[name]();
            }
        }

        // Create each scene.
        for (const sceneDescr of condition.scenes) {
            // Dialogue scenes consist of a background, foreground, actor, and script.
            // TODO: Jail scene for instance has no actor, instead uses image.
            let name, actor, script, fg, bg, scene;
            switch (sceneDescr.type) {
                case 'dialogue':
                case 'question':
                    actor = sceneDescr.actor ? new Actor(assets[sceneDescr.actor]) : null;
                    bg = assets[sceneDescr.bg] || null;
                    fg = assets[sceneDescr.fg] || null;

                    scene = new Scene(sceneDescr.name || null, sceneDescr.script || null, actor, bg, fg, sceneDescr.buttons || null);
                    scenes.push(scene);
                    break;
                case 'clip':
                    scene = new Clip(sceneDescr.name, assets[sceneDescr.clip]);
                    scenes.push(scene);
                    break;
                default:
                    throw Error('Invalid scene type.');
            }
        } // for
    } catch (err) {
        alert('An error has occured. Please contact the developer.');
        console.log(err);
        console.log('NOTE: Please ensure assets are exported with the most recent Animate,' +
            ' that the publishing script has been run, and that there are no assets' +
            ' with duplicate IDs.'
        );
        throw (err);
    }

    init();
}

// load palette from manifest, defaults if slot not present
function init_palette() {

    // Judge
    if ('one' in manifest.customizable_presets) {
        assetPalettes[1] = new Palette(manifest.customizable_presets.one);
    } else { 
        // default values
        let p = new Palette();
        p.setSkin("#fff9ce", "#ffc889");
        p.setHair("#999999", "#999999");
        p.setEye("#006600", "#006600");
        p.setOutfit("#333333", "#000000");
        p.setFigure(0);
        assetPalettes[1] = p;
    }

    // Defense Attorney 
    if ('two' in manifest.customizable_presets) {
        assetPalettes[2] = new Palette(manifest.customizable_presets.two);
    } else { 
        // default values
        let p = new Palette();
        p.setSkin("#f3d0a5", "#deba8a");
        p.setHair("#5b3607", "#5b3607");
        p.setEye("#4c9cf5", "#4c9cf5");
        p.setOutfit("#000134", "#30314a");
        p.setFigure(0);
        assetPalettes[2] = p;
    }
    
    // Prosecutor
    if ('three' in manifest.customizable_presets) {
        assetPalettes[3] = new Palette(manifest.customizable_presets.three);
    } else { 
        // default values
        let p = new Palette();
        p.setSkin("#ffc9a5", "#dca17a");
        p.setHair("#999999", "#999999");
        p.setEye("#00ccff", "#00ccff");
        p.setOutfit("#666666", "#333333");
        p.setFigure(0);
        assetPalettes[3] = p;
    }
}

console.log("LOADED init.js");