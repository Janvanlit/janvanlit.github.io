


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

