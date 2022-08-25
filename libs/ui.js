/* Copyright (C) 2021 The Plea Justice Project
 *
 * Please see https://pleajustice.org for information about this project's
 * licensing and how you can make a contribution.
 */

/* UI API
** Thomas Nelson 2017
** University of Massachusetts Lowell, Psychology Department
** ui.js handles instantiation and configuration of user interface elements
** for a scene.
*/
/*global createjs, RES_HEIGHT, RES_WIDTH, outputParams */

console.log('LOADING ui.js');

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
    console.log('UI constructed');

    this.render = function(script) {
    // draw UI framework
        this.Stage.addChild(this.Textbox.Container);
        // include advancer
        this.Stage.addChild(this.Advancer.Container);
        // add label
        // append text
        var font = '';
        
        switch(script.font){
            case 0:
                font = '';
                break;
            case 2: 
                font = 'bold';
                break;
            case 3:
                font = 'italic';
                break;
            case 4: 
                font = 'underline';
                break;
            case 5:
                font = 'bold italic';
                break;
            case 7:
                font = 'italic underline';
                break;
            case 6:
                font = 'bold underline';
                break;
            case 9:
                font = 'bold italic underline';
                break;
            default:
                break;

        }


        addTextOutput(this.Textbox, script.charBuffer, script.index - 1, font, script.spaces);
        
        
        //console.log(text.text);
        if (script.input == ' ') {
            this.Textbox.Background.alpha = 0.00;
        } else {
            this.Textbox.Background.alpha = 0.85;
        }
        
        
    };
    this.clear = function() {
        for(x in this.Textbox.Output){
            this.Textbox.Container.removeChild(this.Textbox.Output[x]);
        }
        this.Textbox.Output = {};
        this.Textbox.Line.graphics.clear();
    };
}

var TEX_WIDTH = 1400;
var TEX_HEIGHT = 240;
var TEX_PADDING = 20;
var TEX_MARGIN = 30;

/**
 * Defines text box styling.
 */
function Textbox() {
    console.log('Constructing Textbox Background');
    this.Background = new createjs.Shape();
    this.Background.name = 'Textbox Background Shape';
    this.Background.snapToPixel = true;
    this.Background.graphics.beginStroke('#101010');
    this.Background.graphics.setStrokeStyle(4);
    this.Background.graphics.beginFill('#EB9532');
    this.Background.graphics.drawRoundRect(0, 0, TEX_WIDTH, TEX_HEIGHT, 10);
    this.Background.alpha = 0.85;
    console.log('Constructing Text Output');
    this.Output = {
    };
    console.log('Constructing Textbox Container');
    this.Container = new createjs.Container();
    this.Container.name = 'Textbox Container';
    this.Container.x = (RES_WIDTH - TEX_WIDTH) / 2;
    this.Container.y = RES_HEIGHT - TEX_HEIGHT - TEX_PADDING;
    this.Container.addChild(this.Background, this.Output[0]);
    this.Line = new createjs.Shape();
    this.Container.addChild(this.Line);
    
    console.log('Textbox constructed');
}

var BUT_WIDTH = 240;
var BUT_HEIGHT = 80;
var BUT_HOR_PADDING = 50;

/**
 * Positions and Layers a new createjs.Text object for each change in font style
 * @param {Textbox} textbox 
 * @param {number} num 
 * @param {string} font 
 */
function addTextOutput(textbox, char, num, font, spaces){
    
    var lineThickness = 2;
    var isUnderlined = false;
    if(font.includes('underline')){
        font = font.replace('underline', '');
        isUnderlined = true;
        if(font.includes('bold')){
            lineThickness = 4;
        }
    }
    if(num === 0){
        textbox.Output = {
            0 : new createjs.Text('', font + ' 36px Arial', '#101010')
        };
        textbox.Output[0].name = 'Textbox Output Text';
        textbox.Output[0].textBaseline = 'top',
        textbox.Output[0].x = TEX_MARGIN;
        textbox.Output[0].y = TEX_MARGIN;
        textbox.Output[0].lineWidth = TEX_WIDTH - ADV_WIDTH - (ADV_PADDING) - (TEX_MARGIN * 2);
        textbox.Output[0].lineHeight = 48;
        textbox.Output[0].text = char;
        textbox.bounds = textbox.Output[0].getBounds();
        
    }
    else{
        var width = (textbox.Output[num - 1].x + textbox.Output[num - 1].getMeasuredWidth());
        var height = textbox.Output[num - 1].y;
        if(spaces.includes(num)){
            
            if((spaces[spaces.indexOf(num) + 1] - (num)) * 15 > (1130 - width)){
                height += 48;
                width = 30;
                isUnderlined = false;
                char = '';
            }
        }
        
        
        textbox.Output[num] = new createjs.Text('', font + ' 36px Arial', '#101010');
        textbox.Output[num].name = 'Textbox Output Text 2';
        textbox.Output[num].textBaseline = 'top',
        textbox.Output[num].x = width;
        textbox.Output[num].y = height;
        textbox.Output[num].lineWidth = TEX_WIDTH - ADV_WIDTH - (ADV_PADDING) - (TEX_MARGIN * 2);
        textbox.Output[num].lineHeight = 48;
        textbox.Output[num].text = char;
        
    }

    if(isUnderlined){
        textbox.Line.graphics.beginStroke('black').setStrokeStyle(lineThickness)
        .moveTo(textbox.Output[num].x, textbox.Output[num].y + 32)
        .lineTo(textbox.Output[num].x + textbox.Output[num].getMeasuredWidth(), textbox.Output[num].y + 32);
    }
    textbox.Container.addChild(textbox.Output[num]);
}


/**
 * Defines button styling and some functionality like when you click on the button, and it deactivates
 * after.
 * @param labeltext
 * @param horizontal
 * @param vertical
 */
function Button(parentFrame, labeltext, horizontal, vertical) {
    console.log('Constructing Button Background');
    this.Background = new createjs.Shape();
    this.Background.name = labeltext + ' Button Background Shape';
    this.Background.snapToPixel = true;
    this.Background.graphics.beginStroke('#000000');
    this.Background.graphics.setStrokeStyle(4);
    this.Background.graphics.beginFill('#FFC010');
    this.Background.graphics.drawRoundRect(0, 0, BUT_WIDTH, BUT_HEIGHT, 10);
    this.Background.alpha = 0.85;
    console.log('Constructing Button Label');
    this.Label = new createjs.Text('ERROR', 'bold 36px Arial', '#000000');
    this.Label.name = labeltext + ' Button Label';
    this.Label.textBaseline = 'middle';
    this.Label.textAlign = 'center';
    this.Label.x = BUT_WIDTH / 2;
    this.Label.y = BUT_HEIGHT / 2;
    this.Label.text = labeltext;
    this.parentFrame = parentFrame;
    this.Listener = (event)=>{
        console.log(this.Label.text + 'Button clicked');
        // store interaction
        outputParams[this.parentFrame.Scene.name] = this.Label.text;
        this.parentFrame.deactivate();
        this.parentFrame.transition();
    };
    console.log('Constructing Button Container');
    this.Container = new createjs.Container();
    this.Container.name = labeltext;
    if (0 <= horizontal <= 4) {
        this.Container.x = (((RES_WIDTH - TEX_WIDTH) / 2) + ((BUT_WIDTH + BUT_HOR_PADDING ) * horizontal));
    }
    if (0 <= vertical <= 7) {
        this.Container.y = (TEX_PADDING + ((TEX_PADDING + BUT_HEIGHT) * vertical));
    }
    this.Container.addChild(this.Background, this.Label);
    this.name = labeltext + ' Button';

    console.log('button constructed');

    this.setPosition = function(horizontal, vertical) {
        if (0 <= horizontal <= 4) {
            this.Container.x = (((RES_WIDTH - TEX_WIDTH) / 2) + ((BUT_WIDTH + BUT_HOR_PADDING) * horizontal));
        }
        if (0 <= vertical <= 7) {
            this.Container.y = (TEX_PADDING + ((TEX_PADDING + BUT_HEIGHT) * vertical));
        }
    };
    this.deactivate = function() {
        this.Container.alpha = 0;
    };
}

function buttonLayout(n, i) {
    let x = 1 , y = 3;
    const ieven = i % 2 === 0;
    const ilastrow3 = i - Math.floor(n / 3) * 3 > -1;
    const neven = n % 2 === 0;
    const ndiv3 = n % 3 === 0;

    // Rows of three if n is divisible by three.
    if (ndiv3)              { x += i % 3; y += Math.floor(i / 3); }

    // Otherwise if n is even, do rows of two.
    else if (neven)         { x += ieven ? 0.5 : 1.5; y += Math.floor(i / 2); }

    // If neither, group in rows of three except for the last row.
    else if (!ilastrow3)    { x += i % 3; y += Math.floor(i / 3); }

    // If there are two buttons in the last row, distribute them like in even.
    else if (n % 3 != 1)    { x += ieven ? 0.5 : 1.5; y += Math.floor(i / 3); }

    // If there is only one button in the last row, center it.
    else                    { x += 1; y += Math.floor(i / 3); }

    return [x, y];
}

var ADV_PADDING = 30;
var ADV_WIDTH = TEX_HEIGHT - (ADV_PADDING * 2);
var ADV_HEIGHT = ADV_WIDTH / 2;

/**
 * Define advancer styling and position.
 */
function Advancer() {
    console.log('Constucting Advancer Background');
    this.Background = new createjs.Shape();
    this.Background.name = 'Advancer Background Shape';
    this.Background.snapToPixel = true;
    this.Background.graphics.beginStroke('#000000');
    this.Background.graphics.setStrokeStyle(4);
    this.Background.graphics.beginFill('#FFC010');
    this.Background.graphics.drawRoundRect(0, 0, ADV_WIDTH, ADV_HEIGHT, 10);
    console.log('Constructing Advancer Label');
    this.Label = new createjs.Text('', 'bold 80px Courier New', '#000000');
    this.Label.name = 'Advancer Label';
    this.Label.textBaseline = 'middle';
    this.Label.textAlign = 'center';
    this.Label.x = ADV_WIDTH / 2;
    this.Label.y = ADV_HEIGHT / 2;
    //    this.Label.text = "\u25B8\u25B8";
    console.log('Constructing Advancer Container');
    this.Container = new createjs.Container();
    this.Container.name = 'Advancer Container';
    this.Container.addChild(this.Background, this.Label);
    this.Container.x =
        (RES_WIDTH - (RES_WIDTH - TEX_WIDTH) / 2) - ADV_WIDTH - ADV_PADDING;
    this.Container.y =
        RES_HEIGHT - TEX_HEIGHT - TEX_PADDING + ADV_PADDING + ADV_HEIGHT;
    this.Container.alpha = 0.25;
    this.name = 'Advancer';

    console.log('Advancer constructed');

    this.activate = function() {
        this.Container.alpha = 1;
        this.Label.text = '>>';
    };
    this.deactivate = function() {
        this.Container.alpha = 0.25;
        this.Label.text = '';
    };
}

console.log('LOADED ui.js');
