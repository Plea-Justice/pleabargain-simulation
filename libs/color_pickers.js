/*
 * Avatar Customization implementation
 * Jacky McGrath 2019
 * University of Massachusetts Lowell Psychology Department
 * color_pickers.js includes the classes used to select colors for the avatars eyes,
 * hair, shirt, and skin.
 */


class ColorPicker {

    constructor(width, height, target, selected)
    {
        // height + width in pixels
        // target is the canvas the color picker shall be drawn on
        this.width = width;
        this.height = height;
        this.target = target;
        this.selectedColor = selected;

        this.currentColor;
        this.currentHex = "#aaaaaa";
        this.secondaryHex = "#777777"; // secondary color for shadows/highlights

        this.target.width = this.width;
        this.target.height = this.height;

        this.ctx = this.target.getContext("2d");

        // cursor for picker, x/y is starting position
        this.pickerCursor = { x: 0, y: 0, width: 10, height: 10};
        
        // start event listeners
        this.eventListeners();
    }

    draw() {
        // fill with rainbow
        let gradient = this.ctx.createLinearGradient(0, 0, this.width, 0);
        gradient.addColorStop(0.00, "rgb(255, 0, 0");
        gradient.addColorStop(0.16, "rgb(255, 255, 0");
        gradient.addColorStop(0.33, "rgb(0, 255, 0");
        gradient.addColorStop(0.49, "rgb(0, 255, 255");
        gradient.addColorStop(0.66, "rgb(0, 0, 255");
        gradient.addColorStop(0.83, "rgb(255, 0, 255");
        gradient.addColorStop(1.00, "rgb(255, 0, 0");

        // set gradient
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);

        // fill with black and white, vertically
        // this will overlay over the existing rainbow gradient
        //  to create a saturation scale on the vertical axis
        gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
        gradient.addColorStop(0.5, "rgba(0, 0, 0, 0)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 1)");

        // set gradient
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);

        // draw the color picker cursor
        this.ctx.beginPath();
        this.ctx.arc(this.pickerCursor.x, this.pickerCursor.y, this.pickerCursor.width, 0, Math.PI * 2);
        this.ctx.strokeStyle = "black";
        this.ctx.stroke();
        this.ctx.closePath();
    }

    // called when mouse is down, gets RGB of the pixel the cursor is on
    pickCurrentColor(){
        let imgdata = this.ctx.getImageData(this.pickerCursor.x, this.pickerCursor.y, 1, 1);
        // extract RGB from imgdata
        let r = imgdata.data[0];
        let g = imgdata.data[1];
        let b = imgdata.data[2];

        // current color stored as rgb(x, x, x);
        this.currentColor = 'rgb(' + r + ', ' + g + ', ' + b + ')';
        this.selectedColor.style.backgroundColor = this.currentColor;

        //current color stored as hex
        this.currentHex = "#" + ("000000" + ((r << 16) | (g << 8) | b).toString(16)).slice(-6);

        let colorOffset = 30;
        this.secondaryHex = this.generateSecondaryColor(r, g, b, colorOffset);
    }

    // generate secondary color
    /* secondary color is darkened version of primary color, except for when the primary color is black.
    */
    generateSecondaryColor(r, g, b, colorOffset)
    {
        if (r <= 15 && g <= 15 && b <= 15)
        {
            r += colorOffset;
            if (r > 255) r = 255;
            g += colorOffset;
            if (g > 255) g = 255;
            b += colorOffset;
            if (b > 255) b = 255;
        }
        else
        {
            r -= colorOffset;
            if (r < 0) r = 0;
            g -= colorOffset;
            if (g < 0) g = 0;
            b -= colorOffset;
            if (b < 0) b = 0;
        }
        return "#" + ("000000" + ((r << 16) | (g << 8) | b).toString(16)).slice(-6);
    }

    // function that andles events
    eventListeners() {
        let mouseDown = false;

        // move picker cursor to follow the mouse cursor
        const onMouseMove=(e) =>{
            let newposX = e.layerX;
            let newposY = e.layerY;
            this.pickerCursor.x = newposX;
            this.pickerCursor.y = newposY;

            if (mouseDown)
                this.pickCurrentColor();
        }

        // fuctions for pressing mouse down, releasing mouse, and moving mouse off the canvas
        const onMouseDown=(e) =>{
            mouseDown = true;
            this.pickCurrentColor();
        }
        const onMouseUp=(e) =>{
            mouseDown = false;
        }
        const onMouseOut=(e) =>{
            mouseDown = false;
        }

        this.target.addEventListener("mousemove", function(event){onMouseMove(event)});
        this.target.addEventListener("mousedown", function(event){onMouseDown(event)});
        this.target.addEventListener("mouseup", function(event){onMouseUp(event)});
        this.target.addEventListener("mouseout", function(event){onMouseOut(event)});

    }
}

// very similar to normal color picker, only difference is the gradients drawn
// are changed to be a range of human skin tones and generation of secondary color
class SkinColorPicker extends ColorPicker {

    draw() {

        //fill with skin tone
        let gradient = this.ctx.createLinearGradient(0, 0, this.width, 0);
        gradient.addColorStop(0, "rgb(104, 81, 65)");
        gradient.addColorStop(.5, "rgb(226, 168, 152)");
        gradient.addColorStop(1, "rgb(237, 216, 199)");

        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);

        // fill with black and white
        gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
        gradient.addColorStop(0, "rgba(255, 255, 255, .5)");
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
        gradient.addColorStop(0.5, "rgba(0, 0, 0, 0)");
        gradient.addColorStop(1, "rgba(0, 0, 0, .5)");

        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.ctx.beginPath();
        this.ctx.arc(this.pickerCursor.x, this.pickerCursor.y, this.pickerCursor.width, 0, Math.PI * 2);
        this.ctx.strokeStyle = "black";
        this.ctx.stroke();
        this.ctx.closePath();
    }

    // generate secondary color
    /* if the color is a "light color" (r + g + b over their midpoint) needs to subtract to create a darker
        secondary color, otherwise lightens the channels to create a lighter secondary color
    */
    generateSecondaryColor(r, g, b, colorOffset)
    {
        if (((r + g + b) / 3) <= 100)
        {
            r += colorOffset;
            if (r > 255) r = 255;
            g += colorOffset;
            if (g > 255) g = 255;
            b += colorOffset;
            if (b > 255) b = 255;
        }
        else
        {
            r -= colorOffset;
            if (r < 0) r = 0;
            g -= colorOffset;
            if (g < 0) g = 0;
            b -= colorOffset;
            if (b < 0) b = 0;
        }
        return "#" + ("000000" + ((r << 16) | (g << 8) | b).toString(16)).slice(-6);
    }

}