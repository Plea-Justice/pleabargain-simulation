/*global inputParams, urlParams, manifest */

console.log('LOADING params.js');
var outputParams = [];

// New Parameter Parser
self.inputParams = [];
self.urlParams = new URLSearchParams(window.location.search);
for (var pair of urlParams.entries()){
    inputParams[pair[0]] = pair[1];
}

/**
 * This takes the URL that is stored by the embedded data section in qualtrics
 * and uses it to go back to the qualtrics survey. Result is going back to the
 * qualtrics page.
 */
function exitToSurvey() {
    'use strict';
    let surl = manifest['survey'] + '?';
    for (var key in outputParams) {
        let value = outputParams[key];
        surl += '&' + key + '=' + value;
    }

    // Pass on any parameters passed in.
    surl += '&' + window.location.search.substr(1);

    window.open(surl, '_self');
}

console.log('LOADED params.js');
