


mkTool("ip-to-hex", function(e) {
    e.replace(/\r\n/g, "\n");
    for (var i = e.split("\n"), t = "", v = 0; v < i.length; v++) {
        var l = i[v]
          , g = /(\d+\.\d+\.\d+\.\d+)/.exec(l);
        if (g) {
            var n = function(r) {
                for (; r.length < 2; )
                    r = "0" + r;
                return r
            }
              , S = function(r) {
                for (; r.length < 8; )
                    r = "0" + r;
                return r
            }
              , b = n
              , j = S
              , d = g[1]
              , a = d.split(".")
              , u = parseInt(a[3], 10)
              , I = u.toString(16)
              , f = parseInt(a[2], 10)
              , p = f.toString(16)
              , c = parseInt(a[1], 10)
              , w = c.toString(16)
              , s = parseInt(a[0], 10)
              , k = s.toString(16)
              , T = u + f * 256 + c * 256 * 256 + s * 256 * 256 * 256
              , o = T.toString(16);
            o = "0x" + S(o),
            t += n(k) + "." + n(w) + "." + n(p) + "." + n(I) + " (" + o + ")"
        } else
            t += l;
        t += "\n"
    }
    return t
})


mkTool("hex-to-dec", function(n) {
    n = n.replace(/\r\n/g, "\n");
    for (var t = n.split("\n"), r = "", e = 0; e < t.length; e++) {
        var o = t[e];
        if (/(\w+)/.test(o)) {
            var a = new BigNumber(o,16);
            r += a.toString(10)
        } else
            r += o;
        r += "\n"
    }
    return r
})

mkTool("dec-to-hex", function(n) {
    n = n.replace(/\r\n/g, "\n");
    for (var t = n.split("\n"), r = "", e = 0; e < t.length; e++) {
        var o = t[e];
        if (/(\d+)/.test(o)) {
            var a = new BigNumber(o,10);
            r += a.toString(16)
        } else
            r += o;
        r += "\n"
    }
    return r
})

