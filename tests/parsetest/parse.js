function message(inputString) {
  this.input = inputString;
  this.index = 0;
  this.charBuffer = "";
  this.commandBuffer = null;
  this.frameBuffer;
}

message.prototype = {
  constructor: message,
  parseChar:function () {
    switch(this.input[this.index]) {
      case '~':
        this.charBuffer = ""
        this.index++;
        break;
      case '.':
        this.charBuffer = '.';
	this.frameBuffer = "pause";
        this.index++;
        break;
      case ' ':
        this.charBuffer = ' ';
	this.frameBuffer = "pause";
        this.index++;
        break;
      default:
        this.charBuffer = this.input[this.index];
	this.frameBuffer = "speak";
	this.index++;
        break;
    }
  },
  flip:function () {
    //call parseChar to set buffers
      this.parseChar();
      testprint(this.charBuffer); //TODO: actual print system
    //call textdisplay system using charBuffer
    //call frame system using frameBuffer
    //call command system using commandBuffer
  }
}

//TODO: output:
//Following will be replaced with frame loop layer api calls, most likely.

var testDisplayString = "";
var testDisplayLoc = document.querySelector('#jive');

function testprint(character) {
  testDisplayString += character;
  alert(testDisplayString);
  testDisplayLoc.textContent = testDisplayString;
}
