// ==UserScript==
// @name         ForceTrack
// @namespace    http://awh.gay/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.amazon.com/hz/contact-us/foresight/hubgateway?ref=FTRACK_*|
// @icon         https://www.google.com/s2/favicons?sz=64&domain=amazon.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    console.log(document.location.href)
    if (document.location.href.includes("FTRACK_"))
    {
        var orderId = document.location.href.split("FTRACK_")[1].split('|')[0]
        console.log(orderId)
        var resp = fetch("https://www.amazon.com/hz/contact-us/foresight/ajax/retail-items/hubgateway?page=1&keyword="+orderId+"&ordersPerPage=6", {
            "credentials": "include",
            "headers": {
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/111.0",
                "Accept": "*/*",
                "Accept-Language": "en-US,en;q=0.5",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-origin",
                "Sec-GPC": "1",
                "Pragma": "no-cache",
                "Cache-Control": "no-cache"
            },
            "referrer": "https://www.amazon.com/hz/contact-us/foresight/hubgateway-items-2",
            "method": "GET",
            "mode": "cors"
        }).then(x=>{return x.text()})
        console.log(resp)
        resp.then(x=>{
            try{
                let itemid = x.split("obfuscatedLineItemId\":\"")[1].split("\"")[0]
                document.location.href="https://www.amazon.com/progress-tracker/package/?itemId="+itemid+"&orderId="+orderId+"&vt=YOUR_ORDERS"
                return
            } catch{
                document.location.href="https://amazon.com/orders"
            }
        })
    }
})();
