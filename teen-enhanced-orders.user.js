// ==UserScript==
// @name         Teen Order Page
// @namespace    https://dogix.best/
// @version      2.0.6.9
// @description  Archivable orders on Teen accounts
// @author       dogix#9999
// @match        *.amazon.com/gp/css/order-history*
// @match        *.amazon.com/gp/your-account/order-history*
// @icon         https://www.google.com/s2/favicons?domain=amazon.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    setTimeout(()=>{

        function getCookie(cname) {
            let name = cname + "=";
            let decodedCookie = decodeURIComponent(document.cookie);
            let ca = decodedCookie.split(';');
            for(let i = 0; i <ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }
    var session_id = getCookie("session-id")
    document.getElementsByClassName("a-color-secondary value").forEach(x=>{
        var content = x.innerHTML
        if (content.match("ltr"))
        {
            var order_id = content.split(">")[1].split("<")[0]
            var i = document.createElement('a');
            i.setAttribute("href", "https://www.amazon.com/gp/css/order-history/archive/?ie=UTF8&archiveRequest=1&orderIds="+order_id+"&token="+session_id);
            i.innerHTML = "[archive] "
            x.parentNode.appendChild(i);
            i = document.createElement('a');
            i.setAttribute("href", "https://www.amazon.com/hz/contact-us/foresight/hubgateway?ref=FTRACK_"+order_id+"|");
            i.innerHTML = "[ftrack]"
            x.parentNode.appendChild(i);
        }
    })
    if (document.getElementById("bia_content") != null)
    {
        document.getElementById("bia_content").remove()
    }
    }, 4000);
})();
