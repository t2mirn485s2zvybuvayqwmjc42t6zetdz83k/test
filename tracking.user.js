// ==UserScript==
// @name         Better Amazon Tracking
// @namespace    https://dogix.best/
// @version      2.0.6.9
// @description  Updates the order details page to include mobile tracking information
// @author       dogix#9999
// @match        *.amazon.com/gp/your-account/order-details*
// @icon         https://www.google.com/s2/favicons?domain=amazon.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    setTimeout(()=>{
        let order_id_object = document.getElementsByClassName("order-date-invoice-item")[1];
        let order_id = order_id_object.children[0].innerHTML
        var starter = "www"
        if (document.location.href.match("smile.amazon.com"))
        {
            starter = "smile"
        }
        let text_html = (fetch("https://"+starter+".amazon.com/gp/css/summary/print.html?orderID="+order_id, {
            "credentials": "include",
            "headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:103.0) Gecko/20100101 Firefox/103.0",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.5",
                "Upgrade-Insecure-Requests": "1",
                "Sec-Fetch-Dest": "document",
                "Sec-Fetch-Mode": "navigate",
                "Sec-Fetch-Site": "none",
                "Sec-Fetch-User": "?1",
                "Sec-GPC": "1",
                "Pragma": "no-cache",
                "Cache-Control": "no-cache"
            },
            "method": "GET",
            "mode": "cors"
        })).then(x=>{return x.text();})
        text_html.then(x=>{
            let status = document.getElementsByClassName("shipment-top-row")[0].getElementsByClassName("a-text-bold")[0];
            var ship_stat = x.split("<b class=\"sans\"><center>")[1].split("<")[0].trim()
            status.innerHTML = status.innerHTML + " - " + ship_stat

            var delivery = x.split("Shipping Speed:")[1].split("<")[2].split(">")[1]
            order_id_object.innerHTML += " | "+delivery
        })
    }, 5000);
})();
