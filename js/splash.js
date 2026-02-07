 

// version 24-6-2024

var isBusy=false;
var splashTime=3000;
var versionfile="0;0";
var origbackground = document.body.style.background;
if (typeof isDebug === 'undefined') {
  var isDebug = false;
}


function setbgcolor(color) {
  origbackground = document.body.style.background;
  document.body.style.background = color;
  var bgtonormaltm = setTimeout(bgtonormalfunc, 15000);
  //console.log("setbgcolor " + color);
}

function bgtonormalfunc() {
  document.body.style.background = origbackground;
}


function log(s) {
  if (isDebug) {
    dt = new Date().toLocaleString()
    console.log(dt + " " + s);
  }
}

function getversionfile() {
  $.ajax({
      type: "GET",
      url: "/version.txt",
      encode: true,
    }).done(function (data) {
      console.log(data);
      versionfile=data;
    });
}
var toggleInfopane = function () {
  log("toggleinfopane");
  if($('#div-infopane').is(':visible')){
    $("#div-infopane").hide();
  }else{
    var v = versionfile.split(";");
    $("#div-infopane-version").html(v[0]);
    $("#div-infopane-versiondt").html(v[1]);
    $("#div-infopane").show();
  }
}
function hideSplash() {
  log("hideSplash");
  $("#splashDiv").hide();
  //$("splashDiv").classList.add('splash-hidden');
}

function showSplash() {
  $("#splashDiv").show();
  getversionfile() ;
  var splashtm = setTimeout(hideSplash, splashTime);
}

function showBusydiv() {
  $("#div-busy").show();
  isBusy = true;
}

function hideBusydiv() {
  log("hidebusyDiv");
  $("#div-busy").hide();
  isBusy = false;
}




var styles = `
.splash {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 95%;
    width: 95%;
    background-color: rgb(0,0,0);
    transition: all ease-in-out 600ms;
    z-index: 99;
}

.splash-info {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: auto;
    border: 3px solid green;
    padding: 10px;
    width: 500px;
    height: 250px;
    background-color: white;
    text-align: center;
    
}

#div-btn-infopane
{
     position: fixed;
     bottom: 0px;
     right: 0px;
     width: 25px;
     height: 25px;
     overflow: hidden;
     
}

#div-infopane {
    display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: auto;
    border: 3px solid green;
    padding: 10px;
    width: 500px;
    height: 250px;
    background-color: white;
}
#divInfopaneButton {text-align:center;}
#div-busy { display:none;}
`

var styleSheet = document.createElement("style")
styleSheet.innerText = styles
document.head.appendChild(styleSheet)

var newdiv = document.createElement("div");
newdiv.setAttribute("id", "splashDiv");
newdiv.setAttribute("class", "splash");
document.body.appendChild(newdiv);

newdiv2 = document.createElement("div");
newdiv2.setAttribute("id", "splash-info");
newdiv2.setAttribute("class", "splash-info");
newdiv2.innerHTML = '{{splashtext}}<img src="/images/splash.gif" />';
newdiv.appendChild(newdiv2);

newdiv = document.createElement("div");
newdiv.setAttribute("id", "div-infopane");
newdiv.setAttribute("class", "div-infopane");
newdiv.innerHTML = 'version on load:<span id="div-infopane-version">unknown</span> build:<span id="div-infopane-versiondt"></span><br/>{{infotext}}<br/>';
document.body.appendChild(newdiv);
newdiv2 = document.createElement("div");
newdiv2.setAttribute("id", "divInfopaneButton");
newdiv2.setAttribute("class", "divInfopaneButton");
newdiv2.innerHTML = '<button type="button" class="btn btn-success" value="Close" onclick="toggleInfopane();">Close</button>';
newdiv.appendChild(newdiv2);

newdiv = document.createElement("div");
newdiv.setAttribute("id", "div-btn-infopane");
newdiv.setAttribute("class", "div-btn-infopane");
newdiv.onclick = toggleInfopane;
newdiv.innerHTML = '<img src="/images/infopane.png" width="25px" height="25px" />';
document.body.appendChild(newdiv);

newdiv = document.createElement("div");
newdiv.setAttribute("id", "div-busy");
newdiv.setAttribute("class", "div-busy");
newdiv.innerHTML = 'Busy, please wait.<img src="/images/plant.gif" />';
document.body.appendChild(newdiv);

val = "";
s=$('#splash-info').html();
s=s.replace("{{splashtext}}", val);
$('#splash-info').html(s);
//val = "mapmaxx=" + mapmaxx + " mapmaxy=" + mapmaxy + "<br>";
val += " z=" +window.innerWidth + " zz=" + window.innerHeight + "<br>";

s=$('#div-infopane').html();
s=s.replace("{{infotext}}", val);
$('#div-infopane').html(s);
showSplash();
