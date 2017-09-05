!function () {
    var e = '@charset "utf-8";html{overflow-y:scroll}html{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}article,aside,blockquote,body,button,code,dd,details,div,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,hr,input,legend,li,menu,nav,ol,p,pre,section,td,textarea,th,ul{margin:0;padding:0;border:0;outline:0;color:#333;font-size:100%;font-family:"Microsoft YaHei","微软雅黑",PingFang,"PingFang SC Medium", "Roboto","Helvetica Neue",Helvetica,Arialsans-serif,"Lucida Grande"}li{list-style:none}button,input,select{border:none;-webkit-appearance:none;appearance:none;outline:0;-webkit-tap-highlight-color:transparent;border-radius:0}img{vertical-align:top;border:none;}a{text-decoration: none;-webkit-touch-callout: none;-webkit-user-select: none;}a,input,button{-webkit-tap-highlight-color: transparent;}', d = document.createElement("style");
    if (document.getElementsByTagName("head")[0].appendChild(d), d.styleSheet) {
        d.styleSheet.disabled || (d.styleSheet.cssText = e)
    } else {
        try {
            d.innerHTML = e
        } catch (f) {
            d.innerText = e
        }
    }
}();

!function (x) {
    function w() {
        var a = r.getBoundingClientRect().width;
        a / v > 1024 && (a = 1024 * v), x.rem = a / 16, r.style.fontSize = x.rem + "px"
    }

    var v, u, t, s = x.document, r = s.documentElement, q = s.querySelector('meta[name="viewport"]'), p = s.querySelector('meta[name="flexible"]');
    if (q) {
        var o = q.getAttribute("content").match(/initial\-scale=(["']?)([\d\.]+)\1?/);
        o && (u = parseFloat(o[2]), v = parseInt(1 / u))
    } else {
        if (p) {
            var o = p.getAttribute("content").match(/initial\-dpr=(["']?)([\d\.]+)\1?/);
            o && (v = parseFloat(o[2]), u = parseFloat((1 / v).toFixed(2)))
        }
    }
    if (!v && !u) {
        var n = (x.navigator.appVersion.match(/android/gi), x.navigator.appVersion.match(/iphone/gi)), v = x.devicePixelRatio;
        v = n ? v >= 3 ? 3 : v >= 2 ? 2 : 1 : 1, u = 1 / v
    }
    if (r.setAttribute("data-dpr", v), !q) {
        if (q = s.createElement("meta"), q.setAttribute("name", "viewport"), q.setAttribute("content", "initial-scale=" + u + ", maximum-scale=" + u + ", minimum-scale=" + u + ", user-scalable=no"), r.firstElementChild) {
            r.firstElementChild.appendChild(q)
        } else {
            var m = s.createElement("div");
            m.appendChild(q), s.write(m.innerHTML)
        }
    }
    x.dpr = v, x.addEventListener("resize", function () {
        clearTimeout(t), t = setTimeout(w, 300)
    }, !1), x.addEventListener("pageshow", function (b) {
        b.persisted && (clearTimeout(t), t = setTimeout(w, 300))
    }, !1), "complete" === s.readyState ? s.body.style.fontSize = 12 * v + "px" : s.addEventListener("DOMContentLoaded", function () {
        s.body.style.fontSize = 12 * v + "px"
    }, !1), w()
}(window);
