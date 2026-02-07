


    mkTool("random-uuid", function() {
        console.log("Generating random UUIDs");
        //for (var t = parseInt($("#random-uuid-how-many").val(), 10), n = "", r = 0; r < t; r++) {
        for (var t = parseInt(5, 10), n = "", r = 0; r < t; r++) {
            var x = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
            x = x.replace(/x/g, function(e) {
                var a = parseInt(Math.random() * 16, 10);
                return a.toString(16)
            }),
            x = x.replace(/y/g, function(e) {
                var a = ["8", "9", "a", "b"]
                  , u = parseInt(Math.random() * 4, 10)
                  , o = a[u];
                return o
            }),
            n += x,
            r != t - 1 && (n += "\n")
        }
        console.log("Generated UUIDs: " + n);
        return n
    }, {
        allowEmptyText: !0
    })


