/*global createjs, AdobeAn, init, loadAvatarParams,
    Actor, Scene, Clip, Palette, FILE_TO_ID, condition_number
 */
console.log('LOADING init.js');

// Globabl Variables
var manifest;   // Animation asset files for all conditions.
var condition;  // Ordered scene description for each experimental condition.
var assets = {};        // Object to load asset descriptions into.
var assetPalettes = []; // Contains actor palettes.

// SIMULATION ENTRY POINT
// Load the experiment manifest and proceed to load_filelist().
function load_manifest() {
    console.log('Loading Manifest...');

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillText('Loading simulation. Please wait, loading may take up to a minute.', 100, 100);

    const queue = new createjs.LoadQueue(true);
    queue.on('fileload', (event) => {
        self.manifest = event.result;
    }, this); // queue fileload event
    queue.on('complete', load_filelist, this);
    queue.loadFile('manifest.json');
}

// Load each resource in the manifest's file list.
function load_filelist() {
    if (manifest.conditions[condition_number - 1] != null) {
        self.condition = manifest.conditions[condition_number - 1];
    } else {
        alert('ERROR: Malformed condition: condition' + condition_number);
    }

    // Initialize assetPalettes.
    // This must be done before executing asset JavaScript resources.
    init_palette();

    if (manifest.resources.length > 0) {

        const queue = new createjs.LoadQueue(true);
        queue.on('fileload', (event) => {
            let img;
            switch (event.item.type) {
            // Preload.js automatically injects <script> tags so no 'javascript'.
            case 'javascript':
                break;
            case 'image':
                img = event.item.src;
                img = img.slice(img.lastIndexOf('/') + 1).replace(/\..*$/, '');
                assets[img] = new createjs.Bitmap(event.result);
                break;

            default:
                alert('ERROR: Manifest references a resource other than an image or JavaScript.');
            } // switch

        }, this); // queue fileload event
        queue.on('complete', load_animate_assets, this);

        console.log('Loading resources...');
        queue.loadManifest(manifest.resources, true, 'assets/');
    } else {
        console.log('No resources to load.');
        init();
    }

}

// These lines have been commented out, see load_animate_assets for why.
// Handle any additional items requested by Animate exports (cached bitmaps,
// etc).
// function anHandleFileLoad(evt, comp) {
//     let images = comp.getImages();
//     if (evt && (evt.item.type == 'image')) {
//         images[evt.item.id] = evt.result;
//     }
// }

// function anHandleComplete(evt, comp) {
//     let lib = comp.getLibrary();
//     AdobeAn.compositionLoaded(lib.properties.id);
// }

function load_animate_assets() {

    if (!window.FILE_TO_ID)
        alert('Error: FILE_TO_ID not found. Please report this error to a developer.');

    // This code exists to load additional files such as with assets that use
    // cached bitmap files. These are no-longer reccomended as they add
    // complexity to uploads and file management in the researcher console.
    // Additionally, the chained file-loading makes the loading process unruly.
    // for (let id of Object.keys(AdobeAn.compositions)) {
    //     let comp = AdobeAn.getComposition(id);
    //     let lib = comp.getLibrary();
    //     let queue = new createjs.LoadQueue(false);
    // queue.addEventListener('fileload', function (evt) {
    //     anHandleFileLoad(evt, comp);
    // });
    // queue.addEventListener('complete', function (evt) {
    //     anHandleComplete(evt, comp);
    // });
    //     queue.loadManifest(lib.properties.manifest);
    // }

    init();
}

// Prepares scene and returns it
function generate_scene(i) {
    try {
        if (condition == undefined || manifest == undefined)
            alert('ERROR: Did not load manifest or condition JSON.');

        if (i == 0) {
            for (const file of manifest.resources) {
                if (file.match(/^(clip|actor)/)) {
                    let name = file.replace(/\..*?$/, '').replace(/^.*\//, '');
                    let comp = AdobeAn.getComposition(FILE_TO_ID[name]);
                    let lib = comp.getLibrary();
                    assets[name] = new lib[name]();
                }
            }
        }

        // Create scene.
        let sceneDescr = condition.scenes[i];
        // Dialogue scenes consist of a background, foreground, actor, and
        // script. TODO: Jail scene for instance has no actor, instead uses
        // image.
        let actor, fg, bg, scene;
        switch (sceneDescr.type) {
        case 'dialogue':
        case 'question':
            actor = sceneDescr.actor
                ? new Actor(assets[sceneDescr.actor])
                : null;
            bg = assets[sceneDescr.bg] || null;
            fg = assets[sceneDescr.fg] || null;

            scene = new Scene(
                sceneDescr.name || null,
                sceneDescr.script || null,
                actor,
                bg,
                fg,
                sceneDescr.buttons || null,
                sceneDescr.embedded || null
            );
            return scene;
        case 'clip':
            scene = new Clip(sceneDescr.name, assets[sceneDescr.clip]);
            return scene;
        default:
            throw Error('Invalid scene type.');
        }
    } catch (err) {
        alert('An error has occured. Please contact the developer.');
        console.log(err);
        console.log('NOTE: Please ensure assets are exported with the most recent Animate,' +
            ' that the publishing script has been run, and that there are no assets' +
            ' with duplicate IDs.'
        );
        throw (err);
    }
}

/**
 * Load the default palette slots. Override with presets defined in the manifest
 * and give the highest precedence to a palette in the URL query string sent by
 * the avatar customizer.
 */
function init_palette() {
    // TODO: All references to colors by names ('skin', 'outfit', etc.) should
    // be replaced with dynamic color slot numbers.
    const defaultColorSlots = Object.freeze({
        // Slot 1 - Judge
        1: {
            skin: '#fff9ce',
            skinDark: '#ffc889',
            hair: '#999999',
            hairDark: '#999999',
            eye: '#006600',
            eyeDark: '#006600',
            outfit: '#333333',
            outfitDark: '#000000',
        },
        // Slot 2 - Defense Attorney
        2: {
            skin: '#f3d0a5',
            skinDark: '#deba8a',
            hair: '#5b3607',
            hairDark: '#5b3607',
            eye: '#4c9cf5',
            eyeDark: '#4c9cf5',
            outfit: '#000134',
            outfitDark: '#30314a',
        },
        // Slot 3 - Prosecutor
        3: {
            skin: '#ffc9a5',
            skinDark: '#dca17a',
            hair: '#999999',
            hairDark: '#999999',
            eye: '#00ccff',
            eyeDark: '#00ccff',
            outfit: '#666666',
            outfitDark: '#333333'
        }
    });

    for (let i = 0; i < 10; i++) {
        const p = assetPalettes[i] = new Palette();

        if (i in defaultColorSlots) {
            const dflt = defaultColorSlots[i];
            p.setSkin(dflt.skin, dflt.skinDark);
            p.setHair(dflt.hair, dflt.hairDark);
            p.setEye(dflt.eye, dflt.eyeDark);
            p.setOutfit(dflt.outfit, dflt.outfitDark);
        }

        if (i in manifest.customizable_presets) {
            Object.assign(p, manifest.customizable_presets[i]);
        }
    }
    // Override defaults and presets with requested parameters.
    loadAvatarParams();
}

console.log('LOADED init.js');