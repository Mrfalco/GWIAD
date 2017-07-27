var activePlot = 1;
var day = 1;
var year = 1;
var season = "Summer";
var ctrl = false;
var grown = 0;
var selectedPlant = 0;
var storage = [];
var plantStorage2 = [];
var activeStor = storage;
var sTruck = 1;
var truck = {
	vehicles:1,
	level1:0,
	transporting1:"Nothing",
	transportId1:-1,
	capacity1:10,
	sendTotal1:0,
}
var pick = {
	metalChance:0.40,
	pMetalChance:0.30,
	gGemChance:0.30,
	pGemChance:0,
	growing5:"Nothing",
	growing6:"Nothing",
	growing7:"Nothing",
	growing8:"Nothing",
	growing9:"Nothing",
	dupe:1,
	nothingC:0,
}

//Format [Name,Grow time,Best season,Modifier,yield,Death Season,Multi yield?,Yields,Yield time]
var metals = [
["Coal",100],
["Iron",80],
];

var pMetals = [
["Nothing",1000],
["Copper",100],
["Silver",80],
]

var gGem = [
["Nothing",1000],
["Adamite",100],
["Moldavite",80],
]

var pGem = [
["Nothing",1000],
["Agrellite",100],
["Sugilite",80],
]

function dig(){
	var x = 0;
	x = Math.random();
	console.log("Selected:" + x);
	if (x < pick.metalChance){
		reward(metals,0,false);
		console.log("Metal");
	}
	else if (x < pick.pMetalChance + pick.metalChance){
		reward(pMetals,200,true);
		console.log("PMetal");
	}
	else if (x < pick.gGemChance + pick.pMetalChance + pick.metalChance){
		reward(gGem,400,true);
		console.log("Green Gem");
	}
	else if (x < pick.pGemChance + pick.gGemChance + pick.pMetalChance + pick.metalChance){
		reward(pGem,600,true);
		console.log("Purple Gem");
	}
	updateStorage();
}

function reward(type,mul,nothMod){
	var totChance = 0;
	var x = 0;
	for (i = type.length - 1; i >= 0; i--) {
		totChance += type[i][1];
	}
	x = Math.floor(Math.random() * (totChance - 0 + 1)) + 0;//(max - min + 1)) + min
	if (nothMod){//is there a chance for noting in this catagory?
		x += pick.nothingC;//add the nothing chance mod
		if (x > totChance){//check to see if our nothing mod pushed chance over max
			x -= (x - totChance);//and set to max instead if so
		}
	}
	var y = 0;
	while (type[y][1] < x){
		x -= type[y][1];
		y += 1;
	}
	if (storage[y + mul] == undefined){
		storage[y + mul] = 0;
	}
	if(type[y][0] == "Nothing"){//Check to see if pick is dud
		document.getElementById ("pickYield").innerHTML = 'Got Nothing!';
	}
	else {//Not dud? give reward
		storage[y + mul] += pick.dupe;
		document.getElementById ("pickYield").innerHTML = 'Got ' + pick.dupe + " " + type[y][0];
	}

}

function activeMenu(page){//This is where the menu tabs change
	document.getElementById ("farmWindow").className = 'hide';//SHUT. DOWN. EVERYTHING.
	document.getElementById ("farmBar").className = 'hide';
	document.getElementById ("kitchenWindow").className = 'hide';
	document.getElementById ("kitchenBar").className = 'hide';
	document.getElementById ("resturantWindow").className = 'hide';
	document.getElementById ("resturantBar").className = 'hide';
	changePlot(10);
	if (page == 1){
		document.getElementById ("farmWindow").className = 'activeWindow';//Turn on only what is needed.
		document.getElementById ("farmBar").className = 'activeBar';
	}
	if (page == 2){
		document.getElementById ("kitchenWindow").className = 'activeWindow';
		document.getElementById ("kitchenBar").className = 'activeBar';	
	}
	if (page == 3){
		document.getElementById ("resturantWindow").className = 'activeWindow';
		document.getElementById ("resturantBar").className = 'activeBar';	
	}
}

function activeMenu2(page){//This is where the menu tabs change
	document.getElementById ("shipBar").className = 'hide';
	document.getElementById ("kitBut4").style.backgroundColor = 'white';
	if (page == 4){
		document.getElementById ("kitBut4").style.backgroundColor = 'lightgrey';
		document.getElementById ("shipBar").className = 'activeBar2';
	}
}

var storOpen = false
function openStorage(){
	if (storOpen){
		document.getElementById ("storCon2").style.height = "0px";
		document.getElementById ("ar").innerHTML = "▼";
		storOpen = false;
	}
	else {
		document.getElementById ("storCon2").style.height = "200px";
		document.getElementById ("ar").innerHTML = "▲";
		storOpen = true;
	}
}

function changePlot(page){//This is where the menu tabs change
	
	if (page != 10){
		document.getElementById ("plotDis" + activePlot).className = 'farmPlot';
		activePlot = page;
		activePlotB = "plot" + page;
		updatePlotDisplay();
	}	
}
	
function updatePlotDisplay(){
	document.getElementById ("plotDis" + activePlot).className = 'farmPlot2';
	document.getElementById ("plotGrowing").innerHTML = plot["growing" + activePlot];
	document.getElementById ("plotNum").innerHTML = activePlot;
	document.getElementById ("plantBut").disabled = true;
	if(plot["time" + activePlot] <= 0){
		document.getElementById ("plantBut").disabled = false;
	}
}

function updateStorage(){
	var x = 0;
	document.getElementById ("storCon1").innerHTML = "";
	document.getElementById ("storCon2").innerHTML = "";
	for (i = 0; i < storage.length; i++){
		if (activeStor[i] != undefined && activeStor[i] != 0){
			x += 1;
			if (x < 6){
				document.getElementById ("storCon1").innerHTML += "<div class ='storBlock'><img src='Icon/"+ i +".png'><div> : " + activeStor[i] + "</div></div>";
			}
			else{
				document.getElementById ("storCon2").innerHTML += "<div class ='storBlock'><img src='Icon/"+ i +".png'><div> : " + activeStor[i] + "</div></div>";
			}
		}
	}
}

function changeStor(id){
	activeStor = id;
	updateStorage();
	document.getElementById ("storBarA").style.backgroundColor = "white";
	document.getElementById ("storBarB").style.backgroundColor = "white";
	if (id == plantStorage){document.getElementById ("storBarA").style.backgroundColor = "lightgrey";}
	else {document.getElementById ("storBarB").style.backgroundColor = "lightgrey";}
}

function changePlant(id,zone){
	document.getElementById ("p"+zone+selectedPlant).style.backgroundColor = "white";
	selectedPlant = id;
	document.getElementById ("p"+zone+selectedPlant).style.backgroundColor = "lightgrey";
	if(zone=="a"){
		document.getElementById ("sCropName").innerHTML = plants[id][0];
		document.getElementById ("sCropTime").innerHTML = plants[id][1] + " days";
		document.getElementById ("sCropYield").innerHTML ="Yields " + plants[id][4];
		if (ctrl && document.getElementById ("plantBut").disabled == false){plant();}
	}
	if(zone=="b"){
		document.getElementById ("sendBut").disabled = false;
		if (plantStorage[id] != undefined){
			document.getElementById ("sendBut").max = plantStorage[id];
		}
		else {
			document.getElementById ("sendBut").value = 0;
			document.getElementById ("sendBut").disabled = true;
		}
	}
}

function plant(){
	plot["growing" + activePlot] = plants[selectedPlant][0];
	plot["growId" + activePlot] = selectedPlant;
	document.getElementById ("Growth"+activePlot).style.height = 5 + "px";
	document.getElementById ("Growth"+activePlot).style.marginTop = 140 + "px";
	if (season == plants[selectedPlant][2]){
		plot["time" + activePlot] = plants[selectedPlant][1] - plants[selectedPlant][3];
	}
	else {
		plot["time" + activePlot] = plants[selectedPlant][1];
	}
	updatePlotDisplay()
}

window.onload = function(){
	updateStorage();
}

function send(id){
	if (plantStorage[truck["transportId" + id]] > 0){
		if (plantStorage2[truck["transportId" + id]] == undefined){
			plantStorage2[truck["transportId" + id]] = 0;
		}
		if (truck["sendTotal"+id] >= truck["capacity" + id]){
			plantStorage2[truck["transportId" + id]] += truck["capacity" + id];
			truck["sendTotal"+id] -= truck["capacity" + id];
		}
		else if (truck["sendTotal"+id] > 0){
			plantStorage2[truck["transportId" + id]] += truck["sendTotal"+id];
			truck["sendTotal"+id] = 0;
		}
		document.getElementById ("sShipAmount").innerHTML = truck["sendTotal"+sTruck];
		if(truck["sendTotal"+id] == 0){
			document.getElementById ("sShipAmount").innerHTML = "";
			document.getElementById ("sShipItem").innerHTML = "nothing";
		}
		updateStorage();
	}	
}

function setSend(){
	truck["transporting"+sTruck] = plants[selectedPlant][0];
	truck["transportId"+sTruck] = selectedPlant;
	truck["sendTotal"+sTruck] = document.getElementById ("sendBut").value * 1;//stupid math fudging to make sure this is a number not a string.
	plantStorage[truck["transportId" + sTruck]] -= truck["sendTotal"+sTruck];
	document.getElementById ("sShipItem").innerHTML = truck["transporting"+sTruck]; 
	document.getElementById ("sShipAmount").innerHTML = truck["sendTotal"+sTruck];
	updateStorage();
}

var activeCus = 0;
var curCus = 0;
var customers = [[]];
var dish = [//Dish Name,Base Value,Ingredient 1 by Id,Ing1 Amt,Ing2 (undefined if none from here on),Ing2Amt... up to 5
	["Fresh Bread",1.25,0,5],
	["Spicy Mashed Potato",2.00,2,2,5,1]
];
var menu = [0,1];
var tempC=0;


document.addEventListener('keydown', function(event) {
    if(event.keyCode == 17) {
        ctrl = true;
}});
document.addEventListener('keyup', function(event) {
    if(event.keyCode == 17) {
        ctrl = false;
}});
	
window.setInterval(function(){//runs every 10 sec
day += 1;
var x = 9;
if (day > 90){
	day = 1;
	switch(season){
		case "Summer":
			season = "Fall";
			break;
		case "Fall":
			season = "Winter";
			break;
		case "Winter":
			season = "Spring";
			year += 1;
			break;
		case "Spring":
			season = "Summer";
			break;
	}
}


document.getElementById ("season").innerHTML = season;
document.getElementById ("day").innerHTML = day;
document.getElementById ("year").innerHTML = year;

}, 10000);