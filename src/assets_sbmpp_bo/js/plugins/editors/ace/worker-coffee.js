"no use strict";(function(e){if(typeof e.window!="undefined"&&e.document)return;e.console=function(){var e=Array.prototype.slice.call(arguments,0);postMessage({type:"log",data:e})},e.console.error=e.console.warn=e.