


mkTool("tag", function(n) {
    var r="";
    console.log("Converting tag numbers");
    n = n.replace(/\r\n/g, "\n");
    for (var t = n.split("\n"), r = "", e = 0; e < t.length; e++) {
        console.log("Tag:" + t[e]);
        var o = t[e];
        // 32.0.0.123.250.223.167
        if (/(\d+\.\d+\.\d+\.\d+\.\d+\.\d+\.\d+)/.test(o)) {
            var a = o.split(".");
            console.log("size=" + a.length);
            if (a.length === 7) {
                //console.log("Converting tag: " + o);
                var b4 = new BigNumber(a[3],10);
                var b3= new BigNumber(a[4],10);
                var b2 = new BigNumber(a[5],10);
                var b1 = new BigNumber(a[6],10);
            } else {
                b1=0;
                b2=0;
                b3=0;
                b4=0;
                r += "err:" + o; // If it doesn't match the expected format, keep the original
            }
        } else if (/0......../.test(o)) {
            var a = o.substr(1).match(/../g);
            var o1= o.substr(1);
            console.log("Converting tag: " + o1 + " size=" + a.length);
            if (a.length === 4) {
                //console.log("Converting tag: " + o);
                var b1 = new BigNumber(a[0],16);
                var b2 = new BigNumber(a[1],16);
                var b3 = new BigNumber(a[2],16);
                var b4 = new BigNumber(a[3],16);
            } else {
                b1=0;
                b2=0;
                b3=0;
                b4=0;
                r += "err:" + o; // If it doesn't match the expected format, keep the original
            }
        } else if (/[1-9].*/.test(o)) {
            var a = o.toString(16).match(/../g);
            console.log("Converting tag: " + o + " size=" + a.length);
            if (a.length === 4) {
                //console.log("Converting tag: " + o);
                var b1 = new BigNumber(a[0],16);
                var b2 = new BigNumber(a[1],16);
                var b3 = new BigNumber(a[2],16);
                var b4 = new BigNumber(a[3],16);
            } else {
                b1=0;
                b2=0;
                b3=0;
                b4=0;
                r += "err:" + o; // If it doesn't match the expected format, keep the original
            }
        } else {
            r += "No conversion done. " + o;
        }

        var r1 = "";
        r1 += b1.toString(16);
        r1 += "."+b2.toString(16);
        r1 += "."+b3.toString(16);
        r1 += "."+b4.toString(16);
        $('input[name="inp-hex"]').val(""+r1);
        r += "HEX: " + r1+"\n";
        console.log(r1);

        var r25 = "";
        r25 = "0"+pad(b1.toString(16),2) + pad(b2.toString(16),2) + pad(b3.toString(16),2) + pad(b4.toString(16),2);
        r += "KG25: " + r25+"\n";
        $('input[name="inp-kg25"]').val(""+r25);
        console.log(r25);

        r25 = "32.0.0."+pad(b4.toString(10),2) + "."  + pad(b3.toString(10),2) + "." + pad(b2.toString(10),2) + "." + pad(b1.toString(10),2);
        r += "KG15: " + r25+"\n";
        $('input[name="inp-kg15"]').val(""+r25);
        console.log(r25);

        var c = new BigNumber("0"+pad(b1.toString(16),2) + pad(b2.toString(16),2) + pad(b3.toString(16),2) + pad(b4.toString(16),2),16);
        r25 = c.toString(10);
        $('input[name="inp-hcp"]').val(""+r25);
        r += "HCP: " + r25+"\n";

        r25 = ""+pad(b4.toString(16),2) + pad(b3.toString(16),2) + pad(b2.toString(16),2) + pad(b1.toString(16),2);
        r += "UNIFI: " + r25+"\n";
        $('input[name="inp-unifi"]').val(""+r25);
        console.log(r25);
        
        //r += a[0] + "." + a[1] + "." + a[2] + "." + a[3];


        console.log(r);
    }
    console.log("Generated tags: " + n);
    return r;
})

