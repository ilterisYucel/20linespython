var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;
    
var code = JSON.parse(localStorage.getItem("codeText"));
var level = parseInt(getAllUrlParams().level);
    
var codeArea = document.getElementById("codeArea");
var outputArea = document.getElementById("outputArea");
var buttonDiv = document.getElementById("buttonDiv");
var runButton = document.getElementById("runButton");
var editButton = document.getElementById("editButton");
var backButton = document.getElementById("backButton");

codeArea.style.boxSizing = "border-box";
outputArea.style.boxSizing = "border-box";
buttonDiv.style.boxSizing = "border-box";

codeArea.style.width = 0.9 * x + "px";
codeArea.style.height = 0.4 * y + "px";
codeArea.style.marginTop = 0.05 * y + "px";
codeArea.style.marginLeft = 0.05 * x + "px";
codeArea.style.padding = "16px";

buttonDiv.style.width = x + "px";
buttonDiv.style.height = 0.1 * y + "px";
buttonDiv.style.margin = "0 auto";
buttonDiv.style.paddingLeft = 0.2 * x + "px";
buttonDiv.style.paddingTop = 0.02 * y + "px";

runButton.style.width = 0.2 * x + "px";
runButton.style.height = 0.06 * y +  "px";

editButton.style.width = 0.2 * x + "px";
editButton.style.height = 0.06 * y +  "px";

backButton.style.width = 0.2 * x + "px";
backButton.style.height = 0.06 * y +  "px";

outputArea.style.width = 0.9 * x + "px";
outputArea.style.height = 0.2 * y + "px";
outputArea.style.marginLeft = 0.05 * x + "px";
outputArea.style.marginTop = 0.1* y + "px";
outputArea.style.padding = "16px";

function editFunction(){
    codeArea.removeAttribute("readonly");
}

function backFunc(){
    window.location.assign("./game.html?level=" + level + "&flag=" + true)
}

function parseForTextArea(script) {
	return script.replace(/print\((\_|.*)\)$/gmi,'document["outputArea"].value = document["outputArea"].value + str($1) + "\\n"');
}

function runFunc() {
	document.getElementById("outputArea").value = "";
	var script = document.getElementById("script");
	var base_script = document.getElementById("base_script").innerHTML.trim();
	script.innerHTML = base_script + "\n";
	script.innerHTML += parseForTextArea(codeArea.value);
	console.log(script.innerHTML);
	try {
		brython();
	} catch (err) {
		/*//console.log(Object.keys(err));
		//console.log(err.args);
		console.log(err.__class__.__name__);
		//console.log(err.$py_error);
		//console.log(err.$stack);
		//console.log(err.$line_info);
		//console.log(err.__cause__);
		//console.log(err.__C__);
		//console.log(err.__suppress_C__);
		//console.log(err.text);
		console.log(err.offset);
		console.log(err.lineno-base_script.split(/\n/).length);
		console.log(err.msg);
		//console.log(err.filename);*/
		document.getElementById("outputArea").value = err.__class__.__name__ + ": " + err.msg + " on line: " + (err.lineno-base_script.split(/\n/).length) + "\n";
	}
}

function getAllUrlParams(url) {

    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

    var obj = {};

    if (queryString) {

        queryString = queryString.split('#')[0];

        var arr = queryString.split('&');

        for (var i=0; i<arr.length; i++) {
            var a = arr[i].split('=');

            var paramNum = undefined;
            var paramName = a[0].replace(/\[\d*\]/, function(v) {
                paramNum = v.slice(1,-1);
                return '';
            });

            var paramValue = typeof(a[1])==='undefined' ? true : a[1];

            paramName = paramName.toLowerCase();
            paramValue = paramValue.toLowerCase();

            if (obj[paramName]) {
                if (typeof obj[paramName] === 'string') {
                    obj[paramName] = [obj[paramName]];
                }
                if (typeof paramNum === 'undefined') {
                    obj[paramName].push(paramValue);
                }
                else {
                    obj[paramName][paramNum] = paramValue;
                }
            }
            else {
                obj[paramName] = paramValue;
            }
        }
    }

  return obj;
}


window.onload = function(){
    codeArea.value = code;

}
