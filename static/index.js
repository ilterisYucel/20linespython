if (typeof(Storage) !== "undefined") {
    if(!localStorage.getItem("minLevel")){
        localStorage.setItem("minLevel", 0);
    }
    if(!localStorage.getItem("maxLevel")){
        localStorage.setItem("maxLevel", 39);
    }
    if(!localStorage.getItem("itemTest")){
        var obj = [];
        for(var o = 0; o <= 39; o++){
            obj[o] = false;
        }
        setTimeout(function(){
            localStorage.setItem("itemTest", JSON.stringify(obj));
        },100);
    }
} else {
    console.log("No local storage.")
}

var lang = 0;
if (window.Intl && typeof window.Intl === 'object') {
    console.log('API available');
    if(window.navigator.language == 'tr' || window.navigator.userLanguage == 'tr'){
        lang = 1;
    }
}

localStorage.setItem("language", lang);
path = "./assets/images/"

var buttonName = [path + "button_challenge.png", path + "button_mucadele.png"];
var buttonName1 = [path + "button_question-select.png", path + "button_soru-sec.png"];
var buttonName2 = [path + "button_how-to-play.png", path + "button_nasil-oynanir.png"];
var buttonName3 = [path + "button_sources.png", path + "button_kaynaklar.png"];
var logoPath = path + "20_l_py_a.png";

var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;

var orient = (x >= y) ? 'l' : 'p';
    
var app;
var graphics = new PIXI.Graphics();

function dashedLine(graphics, beginX, beginY, endX, endY, color)
{   
    step = Math.abs(beginY - endY) / 100;
    graphics.lineStyle(x / 100, color, 0.4);
    for(var i = 1; i < 101; i++)
    {
        if(i % 2 === 0)
        {
            graphics.lineTo(beginX, beginY + (i * step));
        }
        else
        {
            graphics.moveTo(beginX, beginY + (i * step));
        }
    }
    
    graphics.endFill();  
}

function menuPage(){
    
    stepX = x / 10;
    stepY = y / 10;
    
    stepInX = (4 * stepX) / 12;
    stepInY = (4 * stepY) / 12;
    
    dashedLine(graphics, 1 * stepX, 0.05 * y , x, 0.95 * y, 0x646464);
    dashedLine(graphics, 9 * stepX, 0.05 * y , x, 0.95 * y, 0x646464);
    
    app.stage.addChild(graphics);
     
    var texture = new PIXI.Texture.fromImage(buttonName[lang]);
    var texture1 = new PIXI.Texture.fromImage(buttonName1[lang]);
    var texture2 = new PIXI.Texture.fromImage(buttonName2[lang]);
    var texture3 = new PIXI.Texture.fromImage(buttonName3[lang]);
    var logoTexture = new PIXI.Texture.fromImage(logoPath);
    
    button = new PIXI.Sprite(texture);
    button1 = new PIXI.Sprite(texture1);
    button2 = new PIXI.Sprite(texture2);
    button3 = new PIXI.Sprite(texture3);
    logo = new PIXI.Sprite(logoTexture);
    
    logo.position.x = x / 2;
    logo.position.y = 2 * stepY;
    logo.width =  3 * stepY;
    logo.height = 3 * stepY;
    logo.anchor.x = 0.5;
    logo.anchor.y = 0.5;
    
    app.stage.addChild(logo);
    
    button.id = 0;
    button.position.x = x / 2;
    button.position.y = 4 * stepY + 1 * stepInY;
    button.firstX =  x / 2;
    button.firstY = 4 * stepY + 1 * stepInY;
    button.width = 4 * stepX;
    button.height = 2 * stepInY
    button.anchor.x = 0.5;
    button.anchor.y = 0.5;
    button.buttonMode = true;
    button.interactive = true;
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
        
    button1.id = 1;
    button1.position.x = x / 2;
    button1.position.y = 4 * stepY + 4 * stepInY;
    button1.firstX = x / 2;
    button1.firstY = 4 * stepY + 4 * stepInY;
    button1.width = 4 * stepX;
    button1.height = 2 * stepInY
    button1.anchor.x = 0.5;
    button1.anchor.y = 0.5;
    button1.buttonMode = true;
    button1.interactive = true;
    button1
        .on('mousedown', onDragStart)
        .on('touchstart', onDragStart)
        
        .on('mouseup', onDragEnd)
        .on('mouseupoutside', onDragEnd)
        .on('touchend', onDragEnd)
        .on('touchendoutside', onDragEnd)

        .on('mousemove', onDragMove)
        .on('touchmove', onDragMove);
        
    app.stage.addChild(button1);
    
    button2.id = 2;
    button2.position.x = x / 2;
    button2.position.y = 4 * stepY + 7 * stepInY;
    button2.firstX = x / 2;
    button2.firstY = 4 * stepY + 7 * stepInY;
    button2.width = 4 * stepX;
    button2.height = 2 * stepInY
    button2.anchor.x = 0.5;
    button2.anchor.y = 0.5;
    button2.buttonMode = true;
    button2.interactive = true;
    button2
        .on('mousedown', onDragStart)
        .on('touchstart', onDragStart)
        
        .on('mouseup', onDragEnd)
        .on('mouseupoutside', onDragEnd)
        .on('touchend', onDragEnd)
        .on('touchendoutside', onDragEnd)

        .on('mousemove', onDragMove)
        .on('touchmove', onDragMove);
        
    app.stage.addChild(button2);
    
    /*button3.id = 3;
    button3.position.x = x / 2;
    button3.position.y = 4 * stepY + 10 * stepInY;
    button3.firstX = x / 2;
    button3.firstY = 4 * stepY + 10 * stepInY;
    button3.width = 4 * stepX;
    button3.height = 2 * stepInY
    button3.anchor.x = 0.5;
    button3.anchor.y = 0.5;
    button3.buttonMode = true;
    button3.interactive = true;
    button3
        .on('mousedown', onDragStart)
        .on('touchstart', onDragStart)
        
        .on('mouseup', onDragEnd)
        .on('mouseupoutside', onDragEnd)
        .on('touchend', onDragEnd)
        .on('touchendoutside', onDragEnd)

        .on('mousemove', onDragMove)
        .on('touchmove', onDragMove);
        
    app.stage.addChild(button3)*/
    /*graphics.beginFill(0x306998);
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
    
    /*app.stage.addChild(graphics);*/
    
    /*var textSize = ('m' > orient) ? stepInY : stepInX;
    
    var text = new PIXI.Text(buttonName[lang], {fontFamily : "monospace", align : "center", fontSize : textSize + "px"});
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
    
    var text1 = new PIXI.Text(buttonName1[lang], {fontFamily : "monospace", align : "center", fontSize : textSize + "px"});
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
    
    var text2 = new PIXI.Text(buttonName2[lang], {fontFamily : "monospace", align : "center", fontSize : textSize + "px"});
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

function onDragStart(event) {
    this.data = event.data;
    this.dragging = true;
    this.alpha = 0.5;

}

function onDragEnd(){
    this.alpha = 1.0;
    this.position.x = this.firstX;
    this.dragging = false;
}

function onDragMove(){
    if (this.dragging){
        var newPosition = this.data.getLocalPosition(this.parent);
        if(newPosition.x - this.width / 2 >= 0 && newPosition.x + this.width / 2 <= x){
            this.position.x = newPosition.x;
            if(Math.abs(this.position.x - this.firstX) >= this.width / 2){
                if(this.id === 0){
                    var itemTest = JSON.parse(localStorage.getItem("itemTest"));
                    var level = 0;
                    for(var i = 0; i < itemTest.length; i++){
                        if(!itemTest[i]){
                            level = i;
                            break;
                        }
                    }
                    setTimeout(function(){
                        location.replace("./quest.html?quest=" + level);
                    },500);
                }
                else if(this.id === 1){
                    setTimeout(function(){
                        location.replace("./levelSelect.html?begin=0&end=10");
                    },500);
                }
                else if(this.id === 2){
                    setTimeout(function(){
                        //location.replace("./howToPlay.html?section=0");
                    },500);
    
                }
                else if(this.id === 3){
    
                }
            }
        }
    }

}
window.onload = function(){
    app = new PIXI.Application(x, y, {backgroundColor : 0x2e3436});
    document.body.appendChild(app.view);
    menuPage();
    
    document.addEventListener("deviceready", function() {
    	document.addEventListener("backbutton", function() {
    		if (navigator.app) {
    			navigator.app.exitApp();
    		} else if (navigator.device) {
    			navigator.device.exitApp();
    		} else {
    			window.close();
    		}
    	});
    });
}
