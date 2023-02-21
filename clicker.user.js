// ==UserScript==
// @name         Amazon Place Order Clicker
// @namespace    http://dogix.lol/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://us.amazon.com/gp/buy/spc/handlers/display.html?_from=cheetah
// @match        https://us.amazon.com/gp/buy/spc/handlers/display.html?hasWorkingJavascript=1
// @match        https://us.amazon.com/gp/checkoutportal/enter-checkout.html?buyNow=1&skipCart=1&offeringID=*&quantity=1
// @icon         https://www.google.com/s2/favicons?sz=64&domain=amazon.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var gotten = false
    setInterval(()=>{
        var element = document.getElementsByName("placeYourOrder1")[0];
        if (element != null)
        {
            if (!gotten){
                element.click()
                gotten = true;
            }
        }
    }, 500)
})();
