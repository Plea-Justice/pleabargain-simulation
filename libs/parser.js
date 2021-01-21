/* script parser API
** Thomas Nelson 2016
** University of Massachusetts Lowell, Psychology Department
** parser.js creates a script traversal system, by which a given inputString
** is iteratively traversed (as invoked on the framerate by the renderer)
** in order to ascertain and store animation and character output buffer
** values.
*/
/*global inputParams */

console.log('LOADING parser.js');
// NOTE: for now this system works by iterative parsing of a script, but this
// should be later re-written to allow for non-iterative parsing.

// Script defines a parsable text script which describes the behavior of an
// actor in a given scene. The script takes a properly formatted text string,
// which describes the content of the text presented in an actor's textbox
// prompt.
/**
 * Script method for giving text to Scenes and for the draw method. Parses the
 * input string and determines what mouth movement to make. The inputString is
 * given to the textbox to display as well.
 * @param inputString
 * @see draw
 */
function Script (inputString) {

    // Replace the @U control character with the particpant's name.
    let script = inputString.replace(/@U/g, inputParams['Name']);

    // Replace @N (where N is a number) with pause controls.
    script = script.replace(/@(\d+);/g, (m, p1)=>''.padEnd(Number(p1), '~'));

    const m = script.match(/@[a-zA-Z\d]+?;/g);

    if (m)
        m.map(str => str.match(/@([a-zA-Z\d]+?);/)).forEach(arr => {
            if (inputParams[arr[1]])
                script = script.replace(arr[0], inputParams[arr[1]]);
            else
                alert(`Error: Variable "${arr[1]}" was not passed from Qualtrics.`);
        });

    // Clean up any stray spaces.
    script = script.replace(/  +/g, ' ');

    this.input = script;
    this.length = this.input.length;
    this.initialize = function() {
        this.index = 0;
        this.charBuffer = '';
        this.lastCharBuffer = '';
        this.commandBuffer = null;
        this.animBuffer = 'pause';
        this.lastAnimBuffer = 'pause';
        console.log('Parsable Script initialized');
    };
    this.initialize();
    console.log('Parsable Script constructed');
    // parse an individual character, at the present index of the Script
    // TODO: Rename to parseCur? Up for consideration on refactoring pass.
    this.parseChar = function() {
        switch (this.input[this.index]) {
        // TODO: consider adding _, which works as ~ but closes the mouth.
        case '~':
            this.lastCharBuffer = this.charBuffer;
            this.lastAnimBuffer = this.animBuffer;
            this.charBuffer = '';
            if (this.animBuffer == ' ')
                this.animBuffer = 'pause';
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
            this.animBuffer = 'pause';
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
        // TODO: parsePrev gives the previous character , for contextual buffer
        // manipulation
        // TODO: parseNext gives the next character, for contextual
        // buffer manipulation
        // TODO: parseIndex gives character as a specific
        // index.
        // NOTE: perhaps the other parse function should all use this function?
    };
}

console.log('LOADED parser.js');
