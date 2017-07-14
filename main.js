var activePlot = 1;
var day = 1;
var year = 1;
var season = "Summer";
var ctrl = false;
var grown = 0;
var selectedPlant = 0;
var plantStorage = [];
var plantStorage2 = [];
var activeStor = plantStorage;
var sTruck = 1;
var truck = {
	vehicles:1,
	level1:0,
	transporting1:"Nothing",
	transportId1:-1,
	capacity1:10,
	sendTotal1:0,
}
var plot = {
	growing1:"Nothing",
	growing2:"Nothing",
	growing3:"Nothing",
	growing4:"Nothing",
	growing5:"Nothing",
	growing6:"Nothing",
	growing7:"Nothing",
	growing8:"Nothing",
	growing9:"Nothing",
	time1:-1,
	time2:-1,
	time3:-1,
	time4:-1,
	time5:-1,
	time6:-1,
	time7:-1,
	time8:-1,
	time9:-1,
	growId1:0,
	growId2:0,
	growId3:0,
	growId4:0,
	growId5:0,
	growId6:0,
	growId7:0,
	growId8:0,
	growId9:0,
	
}

//Format [Name,Grow time,Best season,Modifier,yield,Death Season,Multi yield?,Yields,Yield time]
var plants = [
["Wheat", 8,"Fall", -2,5,"Winter",false],
["Grapes", 12,"Spring",-3,9,"Winter",false],
["Potato",15,"",0,2,"Winter",false],
["Tomato",20,"",0,4,"Winter",true,3,5],
["Carrot",9,"",0,2,"Winter",false],
["Jalapeno",10,"",0,4,"Winter"],
];

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
}

function updateStorage(){
	var x = 0;
	document.getElementById ("storCon1").innerHTML = "";
	document.getElementById ("storCon2").innerHTML = "";
	for (i = 0; i < plantStorage.length; i++){
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
		document.getElementById ("plantBut").disabled = true;
		if(plot["time" + activePlot] <= 0){
			document.getElementById ("plantBut").disabled = false;
		}
		if (ctrl){plant();}
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
		else {
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
	truck["sendTotal"+sTruck] = document.getElementById ("sendBut").value;
	plantStorage[truck["transportId" + sTruck]] -= truck["sendTotal"+sTruck];
	document.getElementById ("sShipItem").innerHTML = truck["transporting"+sTruck];
	document.getElementById ("sShipAmount").innerHTML = truck["sendTotal"+sTruck];
	updateStorage();
}

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
var Gr = 5;
while(x != 0){
	if (plot["time" + x] != -1){
		plot["time" + x] -= 1;
		if (plot["time" + x] == 0){
			if (plantStorage[plot["growId" + x]] == undefined){
				plantStorage[plot["growId" + x]] = 0;
			}
			plantStorage[plot["growId" + x]] += plants[plot["growId" + x]][4];
			plot["growing" + x] = "Nothing";
			document.getElementById ("Growth"+x).style.height = 0 + "px";
			document.getElementById ("Growth"+x).style.marginTop = 140 + "px";
			document.getElementById ("Growth"+x).style.transitionDuration = "0s";
			updatePlotDisplay();
			var y = 0;
			for (i = 0; i < plantStorage.length; i++) {
				if (plantStorage[i] != NaN){
					y += plantStorage[i];
				}
			} 
			updateStorage();
		}
		else if(plot["time" + x] > 0){
			Gr = ((plants[plot["growId" + x]][1] - plot["time" + x])*(130 / plants[plot["growId" + x]][1]));
			document.getElementById ("Growth"+x).style.transitionDuration="10s" ;
			document.getElementById ("Growth"+x).style.height = Gr + "px";
			document.getElementById ("Growth"+x).style.marginTop = 140 - Gr + "px";
		}
		
	}	
	x -= 1;
}
x = truck.vehicles;
while(x != 0){
	send(x);
	x -= 1;
}

document.getElementById ("season").innerHTML = season;
document.getElementById ("day").innerHTML = day;
document.getElementById ("year").innerHTML = year;

}, 10000);