var paths = ["./assets/images/how_to_play0.png", "./assets/images/how_to_play1.png"];
var arrow = "./assets/images/arrow.png";
var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;
    

var section = parseInt(getAllUrlParams().section);
var orient = (x >= y) ? 'l' : 'p';
var step = ('m' > orient) ? (y / 12) : (x / 12);
var xStart = ('m' > orient) ? ((x - (step * 12)) / 2) : 0;
var yStart = ('m' > orient) ? 0 : ((y - (step * 12)) / 2);
const pageText = " <l>P</l> <e>A</e> <v>G</v> <e>E</e> ";

function howToPage(app){

    this.app = app;

    var texture = PIXI.Texture.fromImage(arrow);
    var nextArr = new PIXI.Sprite(texture);
    var prevArr = new PIXI.Sprite(texture);
    
    var texture1 = PIXI.Texture.fromImage(paths[section]);
    var image = new PIXI.Sprite(texture1);
    
    if (orient === 'p'){
        createLevelLine(pageText + section, x / 2, yStart / 2, 'p', step, this.app);
        
        image.position.x = xStart;
        image.position.y = yStart;
        image.width = step * 12;
        image.height = step * 12;
        
        nextArr.anchor.x = 0.5;
        nextArr.anchor.y = 0.5;
        nextArr.position.x = x / 2 + step;
        nextArr.position.y = yStart + 12.75 * step;
        nextArr.width = step;
        nextArr.height = step / 2;
        nextArr.buttonMode = true;
        nextArr.interactive = true;
        nextArr.direction = "right";
        nextArr.rotation += Math.PI;
    
        nextArr
            .on('pointerdown', onArrowDown)
            .on('pointerup', onArrowUp)
            .on('mousedown', onArrowDown)
            .on('mouseup', onArrowUp)
            .on('touchstart', onArrowDown)
            .on('touchend', onArrowUp)
            
        prevArr.anchor.x = 0.5;
        prevArr.anchor.y = 0.5;
        prevArr.position.x = x / 2 - step;
        prevArr.position.y = yStart + 12.75 * step;
        prevArr.width = step;
        prevArr.height = step / 2;
        prevArr.buttonMode = true;
        prevArr.interactive = true;
        prevArr.direction = "left";

    
        prevArr
            .on('pointerdown', onArrowDown)
            .on('pointerup', onArrowUp)
            .on('mousedown', onArrowDown)
            .on('mouseup', onArrowUp)
            .on('touchstart', onArrowDown)
            .on('touchend', onArrowUp) 
    }else{
        createLevelLine(pageText + section, xStart / 2, y / 2, 'l', step, this.app);
        
        image.position.x = xStart;
        image.position.y = yStart;
        image.width = step * 12;
        image.height = step * 12;
        
        nextArr.anchor.x = 0.5;
        nextArr.anchor.y = 0.5;
        nextArr.position.x = xStart + 12.75 * step;
        nextArr.position.y = y / 2 - step;
        nextArr.width = step;
        nextArr.height = step / 2;
        nextArr.buttonMode = true;
        nextArr.interactive = true;
        nextArr.direction = "right";
        nextArr.rotation += Math.PI / 2;
    
        nextArr
            .on('pointerdown', onArrowDown)
            .on('pointerup', onArrowUp)
            .on('mousedown', onArrowDown)
            .on('mouseup', onArrowUp)
            .on('touchstart', onArrowDown)
            .on('touchend', onArrowUp)
        
        prevArr.anchor.x = 0.5;
        prevArr.anchor.y = 0.5;
        prevArr.position.x = xStart + 12.75 * step;
        prevArr.position.y = y / 2 + step;
        prevArr.width = step;
        prevArr.height = step / 2;
        prevArr.buttonMode = true;
        prevArr.interactive = true;
        prevArr.rotation -= Math.PI / 2;
        prevArr.direction = "left";

    
        prevArr
            .on('pointerdown', onArrowDown)
            .on('pointerup', onArrowUp)
            .on('mousedown', onArrowDown)
            .on('mouseup', onArrowUp)
            .on('touchstart', onArrowDown)
            .on('touchend', onArrowUp)     
    
    }
    
    app.stage.addChild(image);
    app.stage.addChild(nextArr);
    app.stage.addChild(prevArr);
    
}

function createLevelLine(text, x, y, orient, step, app)
{
    this.text = text;
    this.app = app;
    if(orient === 'l'){
        var line = new MultiStyleText(this.text,
        {
            "default": {
                fontFamily: "monospace",
                fontSize: step / 2 + "px",
                fill: "0xD3D3D3",
                align: "center",
                wordWrap: true,
                wordWrapWidth: 1
      
                },
       
            "l" : {
                fill: "0xe60000"
                
                },
       
            "e" : {
                fill: "0x2eb82e" 
       
                },
       
            "v" : {    
                fill: "0x005ce6"
            }
            
       });
       
       line.anchor.y = 0.5;

    }else{
        var line = new MultiStyleText(this.text,
        {
            "default": {
                fontFamily: "monospace",
                fontSize: step / 2 + "px",
                fill: "0xD3D3D3",
                align: "center"
      
                },
       
            "l" : {
                fill: "0xe60000"
                
                },
       
            "e" : {
                fill: "0x2eb82e" 
       
                },
       
            "v" : {    
                fill: "0x005ce6"
            }
            
       });
       
       line.anchor.x = 0.5;
           
    }

    line.position.x = x;
    line.position.y = y;
    
    this.app.stage.addChild(line);
    
}

function onArrowDown(event){
    this.data = event.data;
    this.isdown = true;
    if(this.direction === "right"){
        if(section === 1){
            setTimeout(function(){
                location.replace("./howToPlay.html?section=0");
            },500);        
        }else{
            setTimeout(function(){
                location.replace("./howToPlay.html?section=1");
            },500);            
        }
    }else{
        if(section === 0){
            setTimeout(function(){
                location.replace("./howToPlay.html?section=1");
            },500);        
        }else{
            setTimeout(function(){
                location.replace("./howToPlay.html?section=0");
            },500);            
        }

    }
}

function onArrowUp(){
    this.isdown = false;
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

function goBack() {
    setTimeout(function(){
        window.location.assign("./index.html");
    },500);  
}

window.onload = function(){
    var app = new PIXI.Application(x, y, {backgroundColor : 0x2e3436});
    document.body.appendChild(app.view);
    howToPage(app);
    
    document.addEventListener("deviceready", function() {
    	document.addEventListener("backbutton", goBack);	
    };
}
