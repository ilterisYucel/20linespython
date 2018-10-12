var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;
    

var quest = parseInt(getAllUrlParams().quest);
var orient = (y >= x) ? 'p' : 'l';
var fFont = (orient < 'm') ? y : x;
var graphics = new PIXI.Graphics();
var questData = {};
    
let xhr = new XMLHttpRequest();
xhr.open("GET", "assets/questions/quest" + quest + ".json", false);
xhr.send();

if (xhr.status < 200 || xhr.status >= 300) {
	console.log("XHR failed.");
} else {
	questData = JSON.parse(xhr.responseText);
}

function createPage(app){

    this.app = app;
    
    var questText = "";
    var questTitle = questData["title"];
    
    graphics.beginFill(0x2e3436);
    graphics.drawRect(0, y / 10, x, y / 10);
    graphics.endFill();
    
    graphics.beginFill(0x555753);
    graphics.drawRect(0 , 9 * (y / 10), x, (y / 10));
    graphics.endFill();
    
    for(var i = 0; i < questData["content"].length; i++){
        questText += questData["content"][i];
        questText += "\n\n";
    }
    
    this.app.stage.addChild(graphics);
    
    var title = new PIXI.Text(questTitle, 
                          {
                            fontSize: fFont / 20 + 'px', 
                            fontFamily: "monospace", 
                            fill : "#eeeeec",  
                            fontWeight: "bold", 
                            align : "center" 
                          });
    title.anchor.x = 0.5;
    title.anchor.y = 0.5;
    title.position.x = x / 2;
    title.position.y = y / 10 + y /20;
    this.app.stage.addChild(title);
    
    var content = new PIXI.Text(questText, 
                          {
                            fontSize: fFont / 30 + 'px', 
                            fontFamily: "monospace", 
                            fill : "#D8D8D8",  
                            fontStyle: "oblique",
                            fontWeight: "bold", 
                            //align : "center" 
                          });
                          
    content.anchor.x = 0.5;
    content.position.x = x / 2;
    content.position.y = 2 * y / 10 + y /20;
    this.app.stage.addChild(content); 
    
    var go = new PIXI.Text("<<<<START>>>>", 
                          {
                            fontSize: fFont / 20 + 'px', 
                            fontFamily: "monospace", 
                            fill : "#edd400",  
                            fontWeight: "bold", 
                            align : "center" 
                          });
    go.anchor.x = 0.5;
    go.anchor.y = 0.5;
    go.position.x = x / 2;
    go.position.y = 9 * y / 10 + y /20;
    go.interactive = true;
    go.buttonMode = true;
    go
      .on('mousedown', goFunc)
      .on('touchstart', goFunc);
      
    this.app.stage.addChild(go);   
}

function goFunc() {
    this.isdown = true;
    this.alpha = 0.5;
    setTimeout(function(){
        window.location.assign("./game.html?level=" + quest);
    },500);
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
    var app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor : 0x888a85});
    document.body.appendChild(app.view);
    
    createPage(app);

}
