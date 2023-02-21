// ==UserScript==
// @name         Amazon Tamper
// @namespace    https://dogix.best/
// @version      3.0.6.9
// @description  Speedrun purchasing of AWH items
// @author       dogix#9999
// @match        https://us.amazon.com/dp/*/?m=A2L77EE7U53NWQ&tamper=1
// @match        https://www.amazon.com/gp/product/ajax/?asin=*&pc=*&experienceId=aodAjaxMain&autodetect=1
// @match        https://www.amazon.com/gp/product/ajax/?autocart=1&asin=*&m=A2L77EE7U53NWQ&experienceId=aodAjaxMain
// @icon         https://www.google.com/s2/favicons?domain=amazon.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function PDPCheck(){
        var title = document.getElementById("productTitle")
        var asin = document.location.href.split("/dp/")[1].split("/")[0]
        if (title == null)
        {
            title = document.getElementById("title")
            title.style.color = "#00ff00"
            var oid = document.getElementById("oid")
            if (oid != null)
            {
                title.innerHTML = "ATC button detected, now entering checkout..."
                document.location.href="https://us.amazon.com/gp/checkoutportal/enter-checkout.html?buyNow=1&skipCart=1&offeringID="+oid.value+"&quantity=1"
            }
            else
            {
                title.innerHTML = "ATC button not detected, redirecting to delayed popup checker..."
                document.location.href="https://www.amazon.com/gp/product/ajax/?asin="+asin+"&pc=dp&experienceId=aodAjaxMain&autodetect=1"
            }
            return
        }
        title.style.color = "#00ff00"
        if (document.getElementById("usedOfferListingID") != null)
        {
            title.innerHTML = "ATC button detected, now entering checkout..."
            document.location.href="https://us.amazon.com/gp/checkoutportal/enter-checkout.html?buyNow=1&skipCart=1&offeringID="+document.getElementById("usedOfferListingID").value+"&quantity=1"
            return
        }
        else
        {
            title.innerHTML = "ATC button not detected, redirecting to delayed popup checker..."
            document.location.href="https://www.amazon.com/gp/product/ajax/?asin="+asin+"&pc=dp&experienceId=aodAjaxMain&autodetect=1"
        }
    }
    function AODCheck()
    {
        var asin = document.location.href.split("?asin=")[1].split("&")[0]
        document.title = "Waiting for Stock "+asin+"..."
        let notif = document.getElementsByClassName("a-size-base a-text-bold")[0]
        notif.style.color = "#00ff00"
        notif.innerHTML= "Checking..."
        let warning = document.getElementsByClassName("a-size-base a-text-bold")[1]
        warning.style.color = "#ff0000"
        warning.innerHTML= "WARNING: Leaving this page open for extended periods of time may result in an IP or Account ban."
        let html = document.documentElement.innerHTML;
        if (html.includes("10158976011"))
        {
            html.split('\n').forEach(x2=>{
                if (x2.includes("Add to Cart from seller Amazon Warehouse"))
                {
                    let oid = x2.split("&quot;oid&quot;:&quot;")[1].split("&quot;")[0]
                    notif.innerHTML = "AOD success, now entering checkout..."
                    notif.style.color = "#000000"
                    document.body.style.background = "#00ff00"
                    document.location.href="https://us.amazon.com/gp/checkoutportal/enter-checkout.html?buyNow=1&skipCart=1&offeringID="+oid+"&quantity=1"
                    return
                }
            })
        }
        else{
            var searchoffers = (fetch("https://www.amazon.com/gp/product/ajax/?asin="+asin+"&m=A2L77EE7U53NWQ&experienceId=aodAjaxMain", {
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
            })).then(x=>{return x.text()})
            searchoffers.then(x=>{
                try{
                    let oid = x.split("oid&quot;:&quot;")[1].split("&quot;")[0]
                    notif.innerHTML = "Search offers detected, now entering checkout..."
                    notif.style.color = "#000000"
                    document.body.style.background = "#00ff00"
                    document.location.href="https://us.amazon.com/gp/checkoutportal/enter-checkout.html?buyNow=1&skipCart=1&offeringID="+oid+"&quantity=1"
                    return
                } catch{
                    notif.innerHTML = "Offer popout and search offers failed, refreshing soon..."
                    setTimeout(()=>{document.location.reload()}, 5000)
                }
            })
        }
    }
    function OldTamperCheck()
    {
        let asin = document.location.href.split("asin=")[1].split("&")[0]
        document.title = "Waiting for Stock "+asin
        try{
            let oid = document.documentElement.innerHTML.split("oid&quot;:&quot;")[1].split("&quot;")[0]
            document.title = "NOW REDIRECTING"
            document.body.style.background = "#00ff00"
            location.href="https://us.amazon.com/gp/checkoutportal/enter-checkout.html?buyNow=1&skipCart=1&offeringID="+oid+"&quantity=1"
        } catch{
            document.location.href = "https://us.amazon.com/dp/"+asin+"/?m=A2L77EE7U53NWQ&tamper=1"
        }
    }
    if (document.location.href.includes("/gp/"))
    {
        if (document.location.href.includes("autodetect"))
        {
            AODCheck()
        }
        else
        {
            OldTamperCheck()
        }
    }
    else
    {
        PDPCheck()
    }

})();
