var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;


var keywordArr = ['False', 'None', 'True', 'and', 'as', 'assert', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield'];

var builtInArr = ["abs", "all", "any", "ascii", "bin", "bool", "bytearray", "bytes", "callable", "chr", "classmethod",
"compile", "complex", "delattr", "dict", "dir", "divmod", "enumerate", "eval", "exec", "filter", "float", "format", 
"frozenset", "getattr", "globals", "hasattr", "hash", "help", "hex", "id", "input", "int", "isinstance", "issubclass",
"iter", "len", "list", "locals", "map", "max", "memoryview", "min", "next", "object", "oct", "open", "ord", "pow", 
"print", "property", "range", "repr", "reversed", "round", "set", "setattr", "slice", "sorted", "staticmethod", "str",
"sum", "super", "tuple", "type", "vars", "zip", "__import__", "self", "__init__"];

var formatChars = [" ", "(", ")", "+", "-", "*", "/", "%", ".", "[", "]", "{", "}", ":", "=", "!",
"<", ">", ","];

var intChars = ["0","1", "2", "3", "4", "5", "6", "7", "8", "9"];

var app;
var level = parseInt(getAllUrlParams().level);
var qFlag = JSON.parse(getAllUrlParams().flag)
var levelData = [];
var codelines = [];
var orient = (y >= x) ? 'p' : 'l';
var itemTest = JSON.parse(localStorage.getItem("itemTest"));
var font = orient < 'm' ? y / 30 : (8 * y / 10) / 30;
var fFont = (orient < 'm') ? y : x;
var coef_base = (orient < 'm') ? y / x : x / y;
var coef = coef_base > 2 / 3 ? 1.2 : 1.0;
var lang = JSON.parse(localStorage.getItem("language"));
var lockDict = {};

let xhr = new XMLHttpRequest();
xhr.open("GET", "assets/questions/code" + level + ".json", false);
xhr.send();

if (xhr.status < 200 || xhr.status >= 300) {
	console.log("XHR failed.");
} else {
	levelData = JSON.parse(xhr.responseText);
}

function createCodeLine(x, y, text, app)
{
    this.text = convertToCode(text);
    this.app = app;

    var line = new MultiStyleText(this.text,
    {
      "default": {
        fontFamily: "monospace",
        fontSize: font + "px",
        fill: "#d3d7cf",
        align: "left"
      
      
       },
       
       "kw" : {
          fill: "#FFFFFF",
          fontWeight: "bold"
       },
       
       "bf" : {
          fill: "#BED6FF" 
       
       },
       
       "dt" : {    
          fill: "#edd400"
       },
       
       "int" : {
          fill : "#ce5c00"
       },
       
       "flt" : {
          fill: "#EFC090"
       },
       
       "comment" :{
            fill : "#888a85"
       }
       
    });

    line.interactive = true;
    line.buttonMode = true;

    line
        // events for drag start
        .on('mousedown', onDragStart)
        .on('touchstart', onDragStart)
        // events for drag end
        .on('mouseup', onDragEnd)
        .on('mouseupoutside', onDragEnd)
        .on('touchend', onDragEnd)
        .on('touchendoutside', onDragEnd)
        // events for drag move
        .on('mousemove', onDragMove)
        .on('touchmove', onDragMove);

    // move the sprite to its designated position
    line.position.x = x;
    line.position.y = y;

    // add it to the stage
    this.app.stage.addChild(line);
    return line;
}

function createPage()
{
    this.app = app;
    graphics = new PIXI.Graphics();
    var texture = new PIXI.Texture.fromImage("./assets/images/run.png");
    var texture1 = new PIXI.Texture.fromImage("./assets/images/tip.png");
    var texture2 = new PIXI.Texture.fromImage("./assets/images/question.png");
    var texture3 = new PIXI.Texture.fromImage("./assets/images/glass.png");
    runButton = new PIXI.Sprite(texture);
    helpButton = new PIXI.Sprite(texture1);
    qButton = new PIXI.Sprite(texture2);
    glassButton = new PIXI.Sprite(texture3);
    runButton.interactive = true;
    runButton.buttonMode = true;
    runButton
            .on('mousedown', run)
            .on('touchstart', run);
            
    helpButton.interactive = true;
    helpButton.buttonMode = true;
    helpButton
            .on('mousedown', help)
            .on('touchstart', help);
    qButton.interactive = true;
    qButton.buttonMode = true;
    qButton
            .on('mousedown', quest)
            .on('touchstart', quest);
    glassButton.interactive = true;
    glassButton.buttonMode = true;
    glassButton
            .on('mousedown', glass)
            .on('touchstart', glass);
            
    var fontBack = ('m' > orient) ? (y / 20) : (x / 20);        
    back = new PIXI.Text("\u27a4", {fontSize : fontBack + "px", fill : "#FFFFFF"});
    back
        .on('mousedown', goBack)
        .on('touchstart', goBack);
    if (orient === 'p')
    {
        graphics.beginFill(0x000000);
        graphics.drawRect(0, y / 10, x, y / 10);
        graphics.endFill();
        for(var i = 0; i < getMaxIndent(); i++)
        {
            dashedLine(graphics, i * (2 * font), 2 * (y /  10), x, y);
        }
            
        runButton.position.x = x - y / 10;
        runButton.position.y = y / 10 + y / 40;
        runButton.width = y / 20;
        runButton.height = y / 20;
        
        helpButton.position.x = x - 3 * y / 10;
        helpButton.position.y = y / 10 + y / 40;
        helpButton.width = y / 20;
        helpButton.height = y / 20;
        
        qButton.position.x = x - 2 * y / 10;
        qButton.position.y = y / 10 + y / 40;
        qButton.width = y / 20;
        qButton.height = y / 20;
        
        glassButton.position.x = x - 4 * y / 10;
        glassButton.position.y = y / 10 + y / 40;
        glassButton.width = y / 20;
        glassButton.height = y / 20;
        
        back.anchor.x = 0.5;
        back.anchor.y = 0.5;
        back.position.x = x / 10 - x / 20;
        back.position.y = y / 10 + y / 20;
        back.rotation += Math.PI;
        back.buttonMode = true;
        back.interactive = true;

        
    }
    else
    {
        graphics.beginFill(0x000000);
        graphics.drawRect(x / 10, 0, x / 10, y);
        graphics.endFill();
        
        for(var i = 0; i < getMaxIndent(); i++)
        {
            dashedLine(graphics, i * (2 * font) + (2 * x / 10), 0, x, y);
        }
        runButton.anchor.x = 0.5;
        runButton.position.x = x / 10 + x / 20;
        runButton.position.y = x / 20 - y / 20;
        runButton.width = y / 20;
        runButton.height = y / 20;
        runButton.rotate += Math.PI / 2;
        
        helpButton.anchor.x = 0.5;
        helpButton.position.x = x / 10 + x / 20;
        helpButton.position.y = x / 20 +  3 * y / 20;
        helpButton.width = y / 20;
        helpButton.height = y / 20;
        helpButton.rotate = Math.PI / 2;
        
        qButton.anchor.x = 0.5;        
        qButton.position.x = x / 10 + x / 20;
        qButton.position.y = x / 20 + y / 20;
        qButton.width = y / 20;
        qButton.height = y / 20;
        qButton.rotate = Math.PI / 2;
        
        glassButton.anchor.x = 0.5;        
        glassButton.position.x = x / 10 + x / 20;
        glassButton.position.y = x / 20 + 5 * y / 20;
        glassButton.width = y / 20;
        glassButton.height = y / 20;
        glassButton.rotate = Math.PI / 2;
        

        back.anchor.x = 0.5;
        back.anchor.y = 0.5;
        back.position.x = x / 10 + x / 20;
        back.position.y = y - x / 20;
        back.rotation += Math.PI;
        back.buttonMode = true;
        back.interactive = true;
        
    }
    
    this.app.stage.addChild(graphics);
    this.app.stage.addChild(runButton);
    this.app.stage.addChild(helpButton);
    this.app.stage.addChild(qButton);
    this.app.stage.addChild(glassButton)
    this.app.stage.addChild(back);
}

function redraw() {
    graphics.clear();
    if (orient === 'p') {
        graphics.beginFill(0x000000);
        graphics.drawRect(document.body.scrollLeft+0, y / 10, document.body.scrollLeft+x, y / 10);
        graphics.endFill();
        var dashedLineBeginY = document.body.scrollTop > 2 * (y /  10) ? 0 : 2 * (y /  10)-document.body.scrollTop;
        for(var i = 0; i < getMaxIndent(); i++)
        {
            dashedLine(graphics, i * (2 * font), document.body.scrollTop+dashedLineBeginY, x, document.body.scrollTop+y);
        }
        
        runButton.position.x = document.body.scrollLeft+x - y / 10;
        runButton.position.y = y / 10 + y / 40;
        
        helpButton.position.x = document.body.scrollLeft+x - 3 * y / 10;
        helpButton.position.y = y / 10 + y / 40;
        
        qButton.position.x = document.body.scrollLeft+x - 2 * y / 10;
        qButton.position.y = y / 10 + y / 40;
        
        glassButton.position.x = document.body.scrollLeft+x - 4 * y / 10;
        glassButton.position.y = y / 10 + y / 40;
        
        back.position.x = document.body.scrollLeft+ x / 10 - x / 20;
        back.position.y = y / 10 + y / 20;
    } else {
        graphics.beginFill(0x000000);
        graphics.drawRect(x / 10, document.body.scrollTop+0, x / 10, document.body.scrollTop+y);
        graphics.endFill();
        
        for(var i = 0; i < getMaxIndent(); i++)
        {
            dashedLine(graphics, i * (2 * font) + (2 * x / 10), document.body.scrollTop+0, x, document.body.scrollTop+y);
        }
        runButton.position.x = x / 10 + x / 20;
        runButton.position.y = document.body.scrollTop+x / 20 - y / 20;
        
        helpButton.position.x = x / 10 + x / 20;
        helpButton.position.y = document.body.scrollTop+x / 20 +  3 * y / 20;
              
        qButton.position.x = x / 10 + x / 20;
        qButton.position.y = document.body.scrollTop+x / 20 + y / 20;
        
        glassButton.position.x = x / 10 + x / 20;
        glassButton.position.y = document.body.scrollTop +  x / 20 + 5 * y / 20;
        

        back.position.x = x / 10 + x / 20;
        back.position.y = document.body.scrollTop+y - x / 20;
    }
}

function dashedLine(graphics, beginX, beginY, endX, endY)
{   
    step = Math.abs(beginY - endY) / 100;
    graphics.lineStyle(2, 0xeeeeec, 0.1);
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

function run()
{
    var val = true;
    var items = [];
    var indentBegin = (orient < 'm') ? (2 * (x / 10) + 2) : 2;
    
    for(var i = 0; i < codelines.length-1; i++)
    {
        if(codelines[i+1].position.y < codelines[i].position.y)
        {
            val = false;
        }
    }
    
    for(var j = 0; j < codelines.length; j++)
    {
        if(codelines[j].position.x !== indentBegin + (codelines[j].xInd) * (2 * font) )
        {
            val = false;
        }
    }
    
    if(val){
        itemTest[level] = true;
        localStorage.setItem("itemTest", JSON.stringify(itemTest));
        level++;
		setTimeout(function() {
			createModal(val);
			setTimeout(function() {
			    window.location.assign("./quest.html?quest="+level);
			},1000);
		},500);
    }else{
		setTimeout(function() {
			items = createModal(val);
			setTimeout(function() {
			    app.stage.removeChild(items[0]);
			    app.stage.removeChild(items[1]);
			},1000);
		},500);        
    }
}

function help()
{
    var helpLines = controlHelpStatus();
    var xStep = 2 * font;
    var yStep = getMaxLineHeight() + font / 4;
    var indentBeginX = (orient < 'm') ? (2 * (x / 10) + 2) : 2;
    var indentBeginY = (orient < 'm') ?  2 : (2 * (y / 10) + 2);
    if(helpLines.length <= 3 )
    {
        for(var i = 0; i < helpLines.length; i++)
        {
            codelines[helpLines[i]].position.x = indentBeginX + codelines[helpLines[i]].xInd * xStep;
            codelines[helpLines[i]].position.y = indentBeginY + codelines[helpLines[i]].yInd * yStep;
            codelines[helpLines[i]].helpStatus = true;
            codelines[helpLines[i]].buttonMode = false;
            codelines[helpLines[i]].interactive = false;           
        }
    }
    else
    {
        var j = 0;
        while(j < 3)
        {
            var ind = random(0, helpLines.length-1);
            if(!(codelines[helpLines[ind]].helpStatus))
            {
                codelines[helpLines[ind]].position.x = indentBeginX + codelines[helpLines[ind]].xInd * xStep;
                codelines[helpLines[ind]].position.y = indentBeginY + codelines[helpLines[ind]].yInd * yStep;
                codelines[helpLines[ind]].helpStatus = true;
                codelines[helpLines[ind]].buttonMode = false;
                codelines[helpLines[ind]].interactive = false; 
                j++;            
            }
        }
    
    }
    
}

function quest()
{
    this.isdown = true;
    //this.alpha = 0.5;
    setTimeout(function(){
        //window.location.assign("./quest.html?quest=" + level);
        createQuestPage();
        document.getElementsByTagName("body")[0].style["overflow-x"] = "hidden";
        document.getElementsByTagName("body")[0].style["overflow-y"] = "hidden";
    },500);

}

function controlHelpStatus()
{
    var helpItems = [];
    
    for(var i = 0; i < codelines.length; i++)
    {
        if(!(codelines[i].helpStatus))
        {
            helpItems.push(i);
        }
    }
    return helpItems;
}
 

function createGame()
{
    this.app = app;
    var lines = levelData.slice(0, levelData.length-2);
    var yLocs = levelData[levelData.length-2].split(',');
    var xLocs = levelData[levelData.length-1].split(',');
    var indexArr = fillArr(lines.length, false);
    
    if(orient === 'p')
    {
        for(var i = 0; i < lines.length; i++)
        {   
            if(!qFlag){
                var rndInd = getEmptyInd(indexArr);
                indexArr[rndInd] = true;
                var xLoc = 2  + 4 * font;
                var yLoc =  3 * y / 4  + ((rndInd + 1) * font + 2);              
                var line = createCodeLine(xLoc, yLoc, lines[i], this.app)
                line.xInd = parseInt(xLocs[i]);
                line.yInd = parseInt(yLocs[i]);
                console.log(line.xInd + ' ' + line.yInd);
                line.helpStatus = false;
                line.lockStatus = false;
                line.id = i;
                codelines.push(line);
            }else{
                var lineInf = JSON.parse(localStorage.getItem("linesInf"))
                console.log(lineInf[i]);
                var line = createCodeLine(lineInf[i][0], lineInf[i][1], lines[i], this.app);
                line.helpStatus = lineInf[i][2];
                line.lockStatus = lineInf[i][3];
                line.interactive = lineInf[i][4];
                line.buttonMode = lineInf[i][5];
                line.xInd = lineInf[i][6];
                line.yInd = lineInf[i][7];
                line.alpha = lineInf[i][8];
                line.id = i;
                codelines.push(line);
            
            }
        }
    }
    else
    {
        for(var i = 0; i < lines.length; i++)
        {
            if(!qFlag){
                var rndInd = getEmptyInd(indexArr);
                indexArr[rndInd] = true;
                var xLoc = 2 * (x / 10) + 2 + 4 * font;
                var yLoc = 3 * y / 4 + ((rndInd + 1) * font + 2);
                var line = createCodeLine(xLoc, yLoc, lines[i], this.app)
                line.xInd = parseInt(xLocs[i]);
                line.yInd = parseInt(yLocs[i]);
                line.helpStatus = false;
                line.lockStatus = false;
                line.id = i;
                codelines.push(line);
            }else{
                var lineInf = JSON.parse(localStorage.getItem("linesInf"))
                console.log(lineInf[i]);
                var line = createCodeLine(lineInf[i][0], lineInf[i][1], lines[i], this.app);
                line.helpStatus = lineInf[i][2];
                line.lockStatus = lineInf[i][3];
                line.interactive = lineInf[i][4];
                line.buttonMode = lineInf[i][5];
                line.xInd = lineInf[i][6];
                line.yInd = lineInf[i][7];
                line.alpha = lineInf[i][8];
                codelines.push(line);
            
            }
        }    
    }
}

function getMaxLineWidth(arr){
    var max = 0;
    for(var i = 0; i < arr.length; i++)
    {
        if(arr[i].length > max)
        {
            max = arr[i].length;
        }
    }
    return max;
}

function getMaxLineHeight()
{
    max = 0;
    for(var i = 0; i < codelines.length; i++)
    {
        if(codelines[i].height > max)
        {
            max = codelines[i].height;
        }
    }
    return max;
}

function getMaxIndent()
{
    max = 0;
    var xLocs = levelData[levelData.length-1].split(',');
    for(var i = 0; i < xLocs.length; i++)
    {
        if(parseInt(xLocs[i]) > max)
        {
            max = parseInt(xLocs[i]);
        
        }
    }
    return max + 1;

}

function random(begin, end){
    return Math.floor(Math.random() * (end+1)) + begin;
}

function getEmptyInd(arr)
{
    var ind = random(0, arr.length-1);
    while(arr[ind] != false)
    {
        ind = (ind + 1) % arr.length;
    }
    return ind;
}

function fillArr(length, val)
{
    var arr = [];
    for(var i = 0; i < length; i++)
    {
        arr[i] = val;
    }
    
    return arr
}

function controlCodeArea(line, nx ,ny)
{
    codeAreaBeginX = 0;
    CodeAreaBeginY = 0;
    codeAreaEndX = 0;
    codeAreaEndY = 0;
    
    if(orient === 'p')
    {
        codeAreaBeginX = 0;
        codeAreaBeginY = 2 * (y / 10);
        codeAreaEndX = x;
        codeAreaEndY = y;
    }
    
    else
    {
        codeAreaBeginX = 2 * (x / 10);
        codeAreaBeginY = 0
        codeAreaEndX = x;
        codeAreaEndY = y;
    }
    
    return codeAreaBeginX + 2 <= nx && codeAreaEndX - 2 >= nx + 10 && codeAreaBeginY + 2 <= ny && codeAreaEndY - 2 >= ny + line.height;
}

function parseLines() {
	var indentBegin = (orient < 'm') ? (2 * (x / 10) + 2) : 2;
	var indent = "\t";
	
	var codeArray = [];
	for (var i = 0; i < codelines.length; i++) {
		codeArray.push({
			code : codelines[i].text.replace(/(<\/?kw>|<\/?bf>|<\/?dt>|<\/?int>|<\/?flt>|<\/?comment>)/gi,"").trim(),
			indent : Math.round((codelines[i].position.x - indentBegin)/(2*font)),
			order : codelines[i].position.y
		});
	}
	codeArray.sort(function(a,b){ return a.order - b.order});
	
	var codeText = "";
	for (var i = 0; i < codeArray.length; i++) {
		codeText += indent.repeat(codeArray[i].indent) + codeArray[i].code + "\n";
	}
	return codeText;
}

function glass(){
    var codeText = parseLines();
    var linesInf = [];
    var xStep = 2 * font;
    var yStep = getMaxLineHeight() + font / 4;
    var indentBegin = (orient < 'm') ? (2 * (x / 10) + 2) : 2;
    var yBegin = (orient < 'm') ?  2 : (2 * (y / 10) + 2);
    for(var i = 0; i < codelines.length; i++){
        var lineInf = [];
        lineInf[0] = codelines[i].position.x;
        lineInf[1] = codelines[i].position.y;
        lineInf[2] = codelines[i].helpStatus;
        lineInf[3] = codelines[i].lockStatus;
        lineInf[4] = codelines[i].interactive;
        lineInf[5] = codelines[i].buttonMode;
        lineInf[6] = codelines[i].xInd;
        lineInf[7] = codelines[i].yInd;
        lineInf[8] = codelines[i].alpha;
        linesInf.push(lineInf);
    }
    localStorage.setItem("linesInf", JSON.stringify(linesInf));
    localStorage.setItem("codeText", JSON.stringify(codeText));
    setTimeout(function(){
        window.location.assign("./terminal.html?level=" + level);
    },1000);
}

function onDragStart(event)
{

    this.data = event.data;
    this.dragging = true;
    if(this.lockStatus){
        for(var i = 1; i < lockDict[this.id].length; i++){
            app.stage.removeChild(lockDict[this.id][i])
        }
        this.lockStatus = false;
    }
}

function onDragEnd()
{
    this.dragging = false;
    var tmp_position = this.position.x - codeAreaBeginX;
    if(tmp_position % (font * 2) !== 2)
    {
        this.position.x = this.position.x - (tmp_position % (font * 2)) + 2; 
    }
    if (this.position.x < codeAreaBeginX) {
        this.position.x += font * 2;
    }
    
    endFunc(this);
    this.data = null;
}

function onDragMove()
{
    
    if (this.dragging)
    {
        var newPosition = this.data.getLocalPosition(this.parent);
        if(controlCodeArea(this, newPosition.x, newPosition.y))
        {
            this.position.x = newPosition.x;
            this.position.y = newPosition.y;
        }
    }
}

function endFunc(line){
    var list = [];
    line.lockStatus = true;
    list.push(line);
    var g = new PIXI.Graphics();
    g.beginFill(0x000000, 0.7);
    g.drawRect(line.position.x + line.width, line.position.y, 8 * font, font);
    g.endFill();
    app.stage.addChild(g);
    list.push(g);
    
    var lock = new PIXI.Text("lock", {fontFamily: "monospace", fontSize: font + "px",fill: "#FFFFFF", align: "center"});
    lock.position.x = line.position.x + line.width;
    lock.position.y = line.position.y;
    lock.interactive = true;
    lock.buttonMode = true;
    lock
        .on('mousedown', function(){lockFunc(list);})
        .on('touchstart', function(){lockFunc(list);});
    app.stage.addChild(lock);
    list.push(lock);

    var unlock = new PIXI.Text("unlock", {fontFamily: "monospace", fontSize: font + "px",fill: "#FFFFFF", align: "center"});
    unlock.position.x = line.position.x + line.width + 4 * font;
    unlock.position.y = line.position.y;
    unlock.interactive = true;
    unlock.buttonMode = true;
    unlock
        .on('mousedown', function(){unlockFunc(list);})
        .on('touchstart', function(){unlockFunc(list);});
    app.stage.addChild(unlock);
    list.push(unlock);
    lockDict[line.id] = list;
    
    setTimeout(function(){
        for(var i = 1; i < list.length; i++){
            app.stage.removeChild(list[i]);
        }
    },3000); 
    
}

function lockFunc(list){
    list[0].helpStatus = true;
    list[0].alpha = 0.5;
    list[0].lockStatus = false;
    for(var i = 1; i < list.length; i++){
        app.stage.removeChild(list[i]);
    }
}

function unlockFunc(list){
    list[0].helpStatus = false;
    list[0].alpha = 1;
    list[0].lockStatus = false;
    for(var i = 1; i < list.length; i++){
        app.stage.removeChild(list[i]);
    }
}

function convertToCode(text)
{
  var temp = "";
  var result = "";
  
  var temp1 = "";
  var result1 = "";
  var last = "";
  
  var matched = false;
  var matched1 = false;
  
  if (text[0] == '#'){
    return "<comment>" + text + "</comment>";
  }
  
  for(var i = 0; i < text.length; i++)
  {
    if( (i === 0 || text[i-1] != "\\") && (text[i] === "\"" || text[i] === "'")){
        if(matched1){
            matched1 = false;
            
        }else{
            matched1 = true;
        }
    }
    if(formatChars.includes(text[i]))
    {
    
      if(keywordArr.includes(temp) && !matched1)
      {
        //temp keywordlerden biri ise
        temp = "<kw>" + temp + "</kw>";
        result += temp;
        temp = "";
      
      }
      
      else if (builtInArr.includes(temp) && !matched1)
      {
        //temp built in fonksiyonlardan biri ise
        temp = "<bf>" + temp + "</bf>";
        result += temp;
        temp = "";
      
      }
      
      else
      {
        //hiçbiri değilse
        result += temp;
        temp = "";
      
      }
      
      result += text[i];
    }
    
    
    else if(i == text.length -1)
    {
      //textin sonuna ulaşıldığında temp'te hala kalanlar varsa
      temp += text[i];
      if(keywordArr.includes(temp) && !matched1){
        temp = "<kw>" + temp + "</kw>";
      }
      result += temp;
      temp = "";
    
    }
    
    else
    {
      //tüm karakterleri en az bir kere temp'e at.
      temp += text[i];
    }
  
  
  }
  
  for(var j = 0; j < result.length; j++)
  {
    if( (j === 0 || result[j-1] != "\\") && (result[j] === "\"" || result[j] === "'"))
    {
      if(matched && result[j] === last)
      {
        temp1 = "<dt>" + temp1 + result[j] + "</dt>";
        result1 += temp1;
        temp1 = "";
        matched = false;
        last = "";
      
      }
      else if(matched && result[j] !== last)
      {
        temp1 += result[j];
      
      }
      
      else
      {
        result1 += temp1;
        temp1 = "";
        temp1 += result[j];
        last = result[j];
        matched = true;
      
      }
    
    }
    
    else if(intChars.includes(result[j]) && !matched)
    {
      temp2 = "";
      var k = 0;
      for(k = j; k < result.length; k++)
      {
        if(!(intChars.includes(result[k])) && result[k] !== '.')
        {
          break;
        }
        else
        {
          temp2 += result[k];
        }
      }
      if(temp2.includes("."))
      {
        temp2 = "<flt>" + temp2 + "</flt>";
      }
      else
      {
        temp2 = "<int>" + temp2 + "</int>";
      }
      temp1 += temp2;
      temp1 = (k < result.length) ? (temp1 + result[k]) : (temp1);
      result1 += temp1;
      temp1 = "";
      j = k;
      
    
    }
    
    else if(j === result.length -1)
    {
      //textin sonuna ulaşıldığında temp'te hala kalanlar varsa
      temp1 += result[j];
      result1 += temp1;
      temp1 = "";
    
    }
    
    else
    {
      //tüm karakterleri en az bir kere temp'e at.
      temp1 += result[j];
    }
  
  }
  
  return result1;

}

function checkScroll() {
    if (document.body.scrollLeft !== lastScrollX || document.body.scrollTop !== lastScrollY) {
        redraw();
        lastScrollX = document.body.scrollLeft;
        lastScrollY = document.body.scrollTop;
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
function createModal(condition)
{
    var items = [];
    var graphicModal = new PIXI.Graphics();
    graphicModal.beginFill(0x000000, 0.5);
    graphicModal.drawRect(0, 0, x, y);
    graphicModal.endFill();
    if(condition)
    {
        var line = new PIXI.Text("\u2714", {fontFamily : "monospace", fontSize :  8 * font + "px" ,
                                        align : "center",  fill : "#e60000", fontWeight: "bold"});
    }else{
        var line = new PIXI.Text("\u2716", {fontFamily : "monospace", fontSize :  8 * font  + "px" ,
                                        align : "center",  fill : "#005ce6", fontWeight: "bold"});    
    }
    line.anchor.x = 0.5;
    line.anchor. y = 0.5;
    line.position.x = x / 2;
    line.position.y = y / 2;
    
    app.stage.addChild(graphicModal);
    app.stage.addChild(line);
    
    items.push(graphicModal);
    items.push(line);
    return items;

}

function createQuestPage(){

    var questData = {};
    var list = [];
    
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "assets/questions/quest" + level + ".json", false);
    xhr.send();

    if (xhr.status < 200 || xhr.status >= 300) {
	    console.log("XHR failed.");
    } else {
	    questData = JSON.parse(xhr.responseText);
    }
    
    var questText = "";
    var questTitle = questData[lang].title;
    
    var graphicsQuest = new PIXI.Graphics();
    graphicsQuest.beginFill(0x888a85);
    graphicsQuest.drawRect(document.body.scrollLeft, document.body.scrollTop+0, x, y);
    graphicsQuest.endFill();
    
    graphicsQuest.beginFill(0x2e3436);
    graphicsQuest.drawRect(document.body.scrollLeft, document.body.scrollTop+y / 10, x, y / 10);
    graphicsQuest.endFill();
    
    graphicsQuest.beginFill(0x555753);
    graphicsQuest.drawRect(document.body.scrollLeft , document.body.scrollTop+9 * (y / 10), x, (y / 10));
    graphicsQuest.endFill();
    
    for(var i = 0; i < questData[lang].content.length; i++){
        questText += questData[lang].content[i];
        questText += "\n\n";
    }
    
    app.stage.addChild(graphicsQuest);
    list.push(graphicsQuest);
    
    var title = new PIXI.Text(questTitle, 
                          {
                            fontSize: fFont / (20 * coef) + 'px', 
                            fontFamily: "monospace", 
                            fill : "#eeeeec",  
                            fontWeight: "bold", 
                            align : "center" 
                          });
    title.anchor.x = 0.5;
    title.anchor.y = 0.5;
    title.position.x = x / 2 + document.body.scrollLeft;
    title.position.y = document.body.scrollTop + y / 10 + y /20;
    app.stage.addChild(title);
    list.push(title);
    
    var content = new PIXI.Text(questText, 
                          {
                            fontSize: fFont / (30 * coef) + 'px', 
                            fontFamily: "monospace", 
                            fill : "#D8D8D8",  
                            fontStyle: "oblique",
                            fontWeight: "bold", 
                            wordWrap : true,
                            wordWrapWidth : x
                          });
                          
    content.anchor.x = 0.5;
    content.position.x = x / 2 + document.body.scrollLeft;
    content.position.y = document.body.scrollTop + 2 * y / 10 + y /20;
    app.stage.addChild(content); 
    list.push(content);
    var text = ["<<<<BACK>>>>", "<<<GERİ>>>>"] 
    var go = new PIXI.Text(text[parseInt(lang)], 
                          {
                            fontSize: fFont / 20 + 'px', 
                            fontFamily: "monospace", 
                            fill : "#edd400",  
                            fontWeight: "bold", 
                            align : "center" 
                          });
    go.anchor.x = 0.5;
    go.anchor.y = 0.5;
    go.position.x = x / 2 + document.body.scrollLeft;
    go.position.y = document.body.scrollTop+9 * y / 10 + y /20;
    go.interactive = true;
    go.buttonMode = true;
    go
      .on('mousedown', function(){backFunc(list);})
      .on('touchstart', function(){backFunc(list);});
      
    app.stage.addChild(go);
    list.push(go);   
}

function backFunc(list) {
    this.isdown = true;
    this.alpha = 0.5;
    setTimeout(function(){
        for(var i = 0; i < list.length; i++){
            app.stage.removeChild(list[i]);
        }
        document.getElementsByTagName("body")[0].style["overflow-x"] = "scroll";
        document.getElementsByTagName("body")[0].style["overflow-y"] = "scroll";
    },500);
}

function goBack() {
    setTimeout(function(){
        window.location.assign("./index.html");
    },500);  
}

window.onload = function(){
    app = new PIXI.Application(window.innerWidth  + (getMaxLineWidth(levelData.slice(0, levelData.length-2)) * font + getMaxIndent() * 2 * font), 
                                        window.innerHeight*2, {backgroundColor : 0x2e3436});
    document.body.appendChild(app.view);
    
    createPage();
    createGame();
    canvasElement = document.getElementsByTagName("canvas")[0];
    canvasElement.style.width = window.innerWidth + (getMaxLineWidth(levelData.slice(0, levelData.length-2)) * font + getMaxIndent() * 2 * font) + "px";
    canvasElement.style.height = (window.innerHeight*2)+"px";
        
    setInterval(checkScroll,20);
    lastScrollX = 0;
    lastScrollY = 0;
}
