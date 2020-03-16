console.log("LOADING params.js");
var outParams = [];

/* Highly optimized URL parameter parser
** from http://stackoverflow.com/a/3855394
*/
console.log("Parsing URL Parameters");
/*
var inParams = (function(a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
        var p=a[i].split('=', 2);
        if (p.length == 1)
            b[p[0]] = "";
        else
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
})(window.location.search.substr(1).split('&'));
*/

// new param parser
var inParams = [];
var urlparams = new URLSearchParams(window.location.search);
for (var pair of urlparams.entries()){
  inParams[pair[0]] = pair[1];
};

/**
 * This takes the URL that is stored by the embedded data section in qualtrics and
 * uses it to go back to the qualtrics survey. Result is going back to the qualtrics page.
 */
function exitToSurvey() {
  "use strict";
  let surl = manifest["survey"] + "?";
  for (var key in outParams) {
    let value = outParams[key];
    surl += "&" + key + "=" + value;
  }

  // Add the palette features
  //surl += "&" + "palette=" + window.location.search.substr(1);

  window.open(surl, "_self");
}

console.log("LOADED params.js");
