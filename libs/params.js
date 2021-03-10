/* Copyright (C) 2021 The Plea Justice Project
 *
 * Please see https://pleajustice.org for information about this project's
 * licensing and how you can make a contribution.
 */

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
    // Pass on any parameters passed in...
    let surl = manifest['survey'] + '?' + window.location.search.substr(1);

    // Pass on any new variables.
    for (var key in outputParams) {
        let value = outputParams[key];
        surl += '&' + key + '=' + value;
    }

    window.open(surl, '_self');
}

console.log('LOADED params.js');
