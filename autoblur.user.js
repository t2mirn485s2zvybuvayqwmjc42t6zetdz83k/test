// ==UserScript==
// @name         Sensitive Info Autoblur
// @namespace    http://awh.gay/
// @version      0.1
// @description  blur location and name details automatically
// @author       You
// @match        https://*.amazon.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=amazon.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var i = document.createElement('style');
    i.innerHTML = "bdi, .trigger-text, #contextualIngressPt {color: transparent; text-shadow: 0 0 7px rgba(0,0,0,0.7);} "
    document.head.appendChild(i)
})();
