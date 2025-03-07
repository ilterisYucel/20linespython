var path = "./assets/images/";
var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;
    
var begin = parseInt(getAllUrlParams().begin);
var end = parseInt(getAllUrlParams().end);
var minLevel = parseInt(localStorage.getItem("minLevel"));
var maxLevel = parseInt(localStorage.getItem("maxLevel"));
var itemTest = JSON.parse(localStorage.getItem("itemTest"));
var lang = JSON.parse(localStorage.getItem("language"));
var activeColors = [0x306998, 0xFFD43B, 0x646464];
var buttonName = ["QUESTION ", "SORU "];

if (begin === maxLevel+1) {
    location.replace("./levelSelect.html?begin="+(maxLevel === maxLevel - maxLevel%10 ? maxLevel : maxLevel - maxLevel%10)+"&end="+(maxLevel+1));
}

var count = end - begin;
var orient = (x >= y) ? 'l' : 'p';
   
var app;
var graphics = new PIXI.Graphics();

function menuPage(){

    stepX = x / 10;
    stepY = y / 10;
    
    stepInX = (6 * stepX) / 30;
    stepInY = (6 * stepY) / 30;
    
    var texture = new PIXI.Texture.fromImage(path + "button.png");
    var texture1 = new PIXI.Texture.fromImage(path + "button1.png");
    var texture2 = new PIXI.Texture.fromImage(path + "button2.png");
    var texture3 = new PIXI.Texture.fromImage(path + "button3.png");
    
    var textureArr = [texture, texture1, texture2];
    
    for(var i = 0; i < count; i++){
        if(itemTest[begin + i]){
            var button3 = new PIXI.Sprite(texture3);
            button3.id = begin + i;
            button3.position.x = 5 * stepX;
            button3.position.y = 2 * stepY + (3 * i + 2) * stepInY;
            button3.width = 3 * stepX;
            button3.height = 2 * stepInY;
            button3.interactive = true;
            button3.buttonMode = true;
            button3.anchor.x = 0.5;
            button3.anchor.y = 0.5;
            button3.firstX = 5 * stepX;
            button3.firstY = 2 * stepY + (3 * i + 2) * stepInY;
            button3
                .on('mousedown', onDragStart)
                .on('touchstart', onDragStart)
        
                .on('mouseup', onDragEnd)
                .on('mouseupoutside', onDragEnd)
                .on('touchend', onDragEnd)
                .on('touchendoutside', onDragEnd)

                .on('mousemove', onDragMove)
                .on('touchmove', onDragMove);
            app.stage.addChild(button3);
            /*graphics.beginFill(0x000000, 0.5);
            graphics.drawRect(3.5 * stepX, 2 * stepY + (3 * i + 1) * stepInY, 3 * stepX, 2 * stepInY);
            graphics.endFill();*/
        }else{
            button = new PIXI.Sprite(textureArr[i % 3]);
            button.id = begin + i;
            button.position.x = 5 * stepX;
            button.position.y = 2 * stepY + (3 * i + 2) * stepInY;
            button.width = 3 * stepX;
            button.height = 2 * stepInY;
            button.interactive = true;
            button.buttonMode = true;
            button.anchor.x = 0.5;
            button.anchor.y = 0.5;
            button.firstX = 5 * stepX;
            button.firstY = 2 * stepY + (3 * i + 2) * stepInY;
            button
                .on('mousedown', onDragStart)
                .on('touchstart', onDragStart)
        
                .on('mouseup', onDragEnd)
                .on('mouseupoutside', onDragEnd)
                .on('touchend', onDragEnd)
                .on('touchendoutside', onDragEnd)

                .on('mousemove', onDragMove)
                .on('touchmove', onDragMove);
            app.stage.addChild(button);
            /*graphics.beginFill(activeColors[i % 3]);
            graphics.drawRect(3.5 * stepX, 2 * stepY + (3 * i + 1) * stepInY, 3 * stepX, 2 * stepInY);
            graphics.endFill();*/
        }
    }
        
    app.stage.addChild(graphics);
    
    for(var j = 0; j < count; j++){
        var fontColor = itemTest[begin + j] ? "#d3d7cf" : "#000000"
        if(orient === 'p'){
            var text = new PIXI.Text(buttonName[lang] + (begin + j), {fontFamily : "monospace", fill : fontColor, fontStyle : "bold", align : "center", fontSize : (1.5 * stepInX) + "px"});
        }
        else{
            var text = new PIXI.Text(buttonName[lang] + (begin + j), {fontFamily : "monospace", fill : fontColor, fontStyle : "bold", align : "center", fontSize : (1.5 * stepInY) + "px"});        
        }
        text.id = (begin + j);
        text.position.x = x / 2;
        text.position.y = 2 * stepY + (3 * j + 2) * stepInY;
        text.anchor.x = 0.5;
        text.anchor.y = 0.5;
        text.buttonMode = true;
        text.interactive = true;
        text.firstX = x / 2;
        text.firstY = 2 * stepY + (3 * j + 2) * stepInY;
        text
            .on('mousedown', onDragStart)
            .on('touchstart', onDragStart)
        
            .on('mouseup', onDragEnd)
            .on('mouseupoutside', onDragEnd)
            .on('touchend', onDragEnd)
            .on('touchendoutside', onDragEnd)

            .on('mousemove', onDragMove)
            .on('touchmove', onDragMove);
        app.stage.addChild(text);
    }
    
    /*var texture = PIXI.Texture.fromImage(path);
    var nextArr = new PIXI.Sprite(texture);*/
    
    if(orient === 'p'){
        var nextArr = new PIXI.Text("\u27a4", {fontSize : 8 * stepInX, fill : "#FFD43B"})
    }
    else{
        var nextArr = new PIXI.Text("\u27a4", {fontSize : 8 * stepInY, fill : "#FFD43B"})   
    }
    nextArr.position.x = 9 * stepX - stepInX;
    nextArr.position.y = y / 2;
    nextArr.anchor.x = 0.5;
    nextArr.anchor.y = 0.5;
    nextArr.buttonMode = true;
    nextArr.interactive = true;
    nextArr.direction = "right";
    
    nextArr
            .on('pointerdown', onArrowDown)
            .on('pointerup', onArrowUp)
            .on('mousedown', onArrowDown)
            .on('mouseup', onArrowUp)
            .on('touchstart', onArrowDown)
            .on('touchend', onArrowUp)
    
    app.stage.addChild(nextArr);

    /*var prevArr = new PIXI.Sprite(texture);*/
    
    if(orient === 'p'){
        var prevArr = new PIXI.Text("\u27a4", {fontSize : 8 * stepInX, fill : "#306998"})
    }
    else{
        var prevArr = new PIXI.Text("\u27a4", {fontSize : 8 * stepInY, fill : "#306998"})    
    }
    prevArr.position.x = 1 * stepX + stepInX;
    prevArr.position.y = y / 2;
    prevArr.anchor.x = 0.5;
    prevArr.anchor.y = 0.5;
    prevArr.buttonMode = true;
    prevArr.interactive = true;
    prevArr.direction = "left";
    prevArr.rotation += Math.PI;

    
    prevArr
            .on('pointerdown', onArrowDown)
            .on('pointerup', onArrowUp)
            .on('mousedown', onArrowDown)
            .on('mouseup', onArrowUp)
            .on('touchstart', onArrowDown)
            .on('touchend', onArrowUp)          
    app.stage.addChild(prevArr);
    
    var font = ('m' > orient) ? (y / 18) : (x / 18);

    var back = new PIXI.Text("\u27a4", {fontSize : 3 * font + "px", fill : "#646464"});
    back.anchor.x = 0.5;
    back.anchor.y = 0.5;
    back.position.x = x / 2;
    back.position.y = stepY;
    back.rotation -= Math.PI / 2;
    back.buttonMode = true;
    back.interactive = true;
    back
        .on('mousedown', goBack)
        .on('touchstart', goBack);
   app.stage.addChild(back);    
    
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

function onDragStart(event) {
    this.data = event.data;
    this.dragging = true;
    this.alpha = 0.5;
    var level = this.id;
    setTimeout(function(){
        
        window.location.assign("./quest.html?quest=" + level);
    },500);
}

function onDragMove(){
}

function onDragEnd() {
    this.dragging = false;
    this.alpha = 1.0;
    this.position.x = this.firstX;
}

function onArrowDown(event){
    this.data = event.data;
    this.isdown = true;
    if(this.direction === "right"){
        if(end === maxLevel+1){
            setTimeout(function(){
                window.location.assign("./levelSelect.html?begin=0&end=10");
            },500);        
        }
        else if(end + 10 > maxLevel){
            setTimeout(function(){
                window.location.assign("./levelSelect.html?begin=" + (begin + 10) + "&end=" + (maxLevel+1));
            },500);
        }
        else{
            setTimeout(function(){
                window.location.assign("./levelSelect.html?begin=" + (begin + 10) + "&end=" + (end + 10));
            },500);            
        }
    }else{
        if(end === maxLevel+1){
            setTimeout(function(){
                window.location.assign("./levelSelect.html?begin=" + (begin - 10) + "&end=" + begin);
            },500);        
        }
        else if(begin === minLevel){
            setTimeout(function(){
                window.location.assign("./levelSelect.html?begin=" + (maxLevel === maxLevel - maxLevel%10 ? maxLevel : maxLevel - maxLevel%10) + "&end=" + (maxLevel+1));
            },500); 
        }
        else{
            setTimeout(function(){
                window.location.assign("./levelSelect.html?begin=" + (begin - 10) + "&end=" + (end - 10));
            },500);         
        }
    }
}

function onArrowUp(){
    this.isdown = false;
}

function goBack() {
    setTimeout(function(){
        window.location.assign("./index.html");
    },500);  
}

window.onload = function(){
    app = new PIXI.Application(x, y, {backgroundColor : 0x2e3436});
    document.body.appendChild(app.view);
    menuPage();
    
    document.addEventListener("deviceready", function() {
    	document.addEventListener("backbutton", goBack);	
    });
}
