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
