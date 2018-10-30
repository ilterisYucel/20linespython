if (typeof(Storage) !== "undefined") {
    if(!localStorage.getItem("minLevel")){
        localStorage.setItem("minLevel", 0);
    }
    if(!localStorage.getItem("maxLevel")){
        localStorage.setItem("maxLevel", 60);
    }
    if(!localStorage.getItem("itemTest")){
        var obj = [];
        for(var o = 0; o <= 60; o++){
            obj[o] = false;
        }
        setTimeout(function(){
            localStorage.setItem("itemTest", JSON.stringify(obj));
        },100);
    }
} else {
    console.log("No local storage.")
}

/*function checkLanguage() {
    navigator.globalization.getPreferredLanguage(
        function (language) {    
            alert('language: ' + language.value + '\n');
        },
        function () {
            alert('Error getting language\n');
        }
    );
}*/

var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;

var orient = (x >= y) ? 'l' : 'p';
    
var app;
var graphics = new PIXI.Graphics();

function menuPage(){
    
    stepX = x / 10;
    stepY = y / 10;
    
    stepInX = (6 * stepX) / 12;
    stepInY = (6 * stepY) / 12;
    
    graphics.beginFill(0x306998);
    graphics.drawRoundedRect(2 * stepX, 2 * stepY + stepInY, 6 * stepX, 2 * stepInY, 10);
    graphics.endFill();
    graphics.beginFill(0xFFD43B);
    graphics.drawRoundedRect(2 * stepX, 2 * stepY + 4 * stepInY, 6 * stepX, 2 * stepInY, 10);
    graphics.endFill();
    graphics.beginFill(0x646464);
    graphics.drawRoundedRect(2 * stepX, 2 * stepY + 7 * stepInY, 6 * stepX, 2 * stepInY, 10);
    graphics.endFill();
    /*graphics.beginFill(0x000000);
    graphics.drawRoundedRect(2 * stepX, 2 * stepY + 10 * stepInY, 6 * stepX, 2 * stepInY, 10);
    graphics.endFill();*/
    
    app.stage.addChild(graphics);
    
    var textSize = ('m' > orient) ? stepInY : stepInX;
    
    var text = new PIXI.Text("CHALLENGE", {fontFamily : "monospace", align : "center", fontSize : textSize + "px"});
    text.id = 0;
    text.position.x = x / 2;
    text.position.y = 2 * stepY + 2 * stepInY;
    text.anchor.x = 0.5;
    text.anchor.y = 0.5;
    text.buttonMode = true;
    text.interactive = true;
    text
        .on('pointerdown', onButtonDown)
        .on('pointerup', onButtonUp)
        .on('mousedown', onButtonDown)
        .on('mouseup', onButtonUp)
        .on('touchstart', onButtonDown)
        .on('touchend', onButtonUp)
    app.stage.addChild(text);
    
    var text1 = new PIXI.Text("LEVEL SELECT", {fontFamily : "monospace", align : "center", fontSize : textSize + "px"});
    text1.id = 1;
    text1.position.x = x / 2;
    text1.position.y = 2 * stepY + 5 * stepInY;
    text1.anchor.x = 0.5;
    text1.anchor.y = 0.5;
    text1.buttonMode = true;
    text1.interactive = true;
    text1
        .on('pointerdown', onButtonDown)
        .on('pointerup', onButtonUp)
        .on('mousedown', onButtonDown)
        .on('mouseup', onButtonUp)
        .on('touchstart', onButtonDown)
        .on('touchend', onButtonUp)
    app.stage.addChild(text1);
    
    var text2 = new PIXI.Text("HOW TO PLAY", {fontFamily : "monospace", align : "center", fontSize : textSize + "px"});
    text2.id = 2;
    text2.position.x = x / 2;
    text2.position.y = 2 * stepY + 8 * stepInY;
    text2.anchor.x = 0.5;
    text2.anchor.y = 0.5;
    text2.buttonMode = true;
    text2.interactive = true;
    text2
        .on('pointerdown', onButtonDown)
        .on('pointerup', onButtonUp)
        .on('mousedown', onButtonDown)
        .on('mouseup', onButtonUp)
        .on('touchstart', onButtonDown)
        .on('touchend', onButtonUp)
    app.stage.addChild(text2);
    
    /*var text3 = new PIXI.Text("HOW TO PLAY", {fontFamily : "monospace", align : "center", 
                              fontSize : textSize + "px", fill :     "0xFFFFFF"});
    text3.id = 3;
    text3.position.x = x / 2;
    text3.position.y = 2 * stepY + 11 * stepInY;
    text3.anchor.x = 0.5;
    text3.anchor.y = 0.5;
    text3.buttonMode = true;
    text3.interactive = true;
    text3
        .on('pointerdown', onButtonDown)
        .on('pointerup', onButtonUp)
        .on('mousedown', onButtonDown)
        .on('mouseup', onButtonUp)
        .on('touchstart', onButtonDown)
        .on('touchend', onButtonUp)
    app.stage.addChild(text3);*/
}

function onButtonDown(event) {
    this.data = event.data;
    this.isdown = true;
    this.alpha = 0.5;
    if(this.id === 0){
        setTimeout(function(){
            location.replace("./quest.html?quest=" + 0);
        },500);
    }
    else if(this.id === 1){
        setTimeout(function(){
            location.replace("./levelSelect.html?begin=0&end=10");
        },500);
    }
    else if(this.id === 2){
        setTimeout(function(){
            location.replace("./howToPlay.html?section=0");
        },500);
    
    }
    else if(this.id === 3){
    
    }
}

function onButtonUp() {
    this.isdown = false;
    this.alpha = 1.0;
}

window.onload = function(){
    app = new PIXI.Application(x, y, {backgroundColor : 0x2e3436});
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        alert(navigator.globalization.getPreferredLanguage);
    }
    checkLanguage();
    document.body.appendChild(app.view);
    menuPage();
}
