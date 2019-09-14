/* script parser API
** Thomas Nelson 2016
** University of Massachusetts Lowell, Psychology Department
** parser.js creates a script traversal system, by which a given inputString 
** is iteratively traversed (as invoked on the framerate by the renderer)
** in order to ascertain and store animation and character output buffer
** values.
*/
console.log("LOADING parser.js");
// NOTE: for now this system works by iterative parsing of a script, but this should be later re-written to allow for non-iterative parsing.

// Script defines a parsable text script which describes the behavior of an actor in a given scene. The script takes a properly formatted
// text string, which describes the content of the text presented in an actor's textbox prompt.
/**
 * Script method for giving text to Scenes and for the draw method. Parses the input string and determines what mouth movement to make. 
 * The inputString is given to the textbox to display as well.
 * @param inputString
 * @see draw 
 */
function Script (inputString) {
  this.input = inputString;
  this.length = this.input.length;
  this.initialize = function() {
    this.index = 0;
    this.charBuffer = "";
    this.lastCharBuffer = "";
    this.commandBuffer = null;
    this.animBuffer = "pause";
    this.lastAnimBuffer = "pause";
    console.log("Parsable Script initialized");
  }
  this.initialize();
  console.log("Parsable Script constructed");
  // parse an individual character, at the present index of the Script
  // TODO: Rename to parseCur? Up for consideration on refactoring pass.
  this.parseChar = function() {
    switch(this.input[this.index]) {
      case '~': // TODO: consider adding _, which works as ~ but closes the mouth.
        this.lastCharBuffer = this.charBuffer;
        this.lastAnimBuffer = this.animBuffer;
        this.charBuffer = '';
        if (this.animBuffer = ' ')
          this.animBuffer = "pause";
        else
          this.animBuffer = this.animBuffer;
        this.index++;
        break;
      case '.':
      case ',':
      case '!':
      case '?':
      case ';':
      case ':':
      case '\'':
      case '"':
      case '(':
      case ')':
      case '$':
      case '-':
      case '=':
        this.lastCharBuffer = this.charBuffer;
        this.lastAnimBuffer = this.animBuffer;
        this.charBuffer = this.input[this.index];
        this.animBuffer = "pause";
        this.index++;
        break;
      default:
        this.lastCharBuffer = this.charBuffer;
        this.charBuffer = this.input[this.index];
        this.lastAnimBuffer = this.animBuffer;
        // half-speed animation
        if (this.index % 2 == 1) {
          this.animBuffer = this.input[this.index];
        }
        this.index++;
        break;
    }
	// TODO: parsePrev gives the previous character , for contextual buffer manipulation
	// TODO: parseNext gives the next character, for contextual buffer manipulation
	// TODO: parseIndex gives character as a specific index. (NOTE: perhaps the other parse function should all use this function?)
  }
}

console.log("LOADED parser.js");
