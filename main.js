var activePlot = 1;
var day = 1;
var year = 1;
var season = "Summer";
var grown = 0;
var selectedPlant = 0;
var plantStorage = [];
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

//Format [Name,Grow time,Best season,Modifier,Death Season,Multi yield?,Yields,Yield time]
var plants = [
["Wheat", 8,"Fall", -2,"Winter",false],
["Grapes", 12,"Spring",-3,"Winter",false],
["Potato",15,"",0,"Winter",false],
["Tomato",20,"",0,"Winter",true,3,5],
["Carrot",9,"",0,"Winter",false],
["Jalapeno",10,"",0,"Winter"],
];

function activeMenu(page){//This is where the menu tabs change
	document.getElementById ("farmWindow").className = 'hide';//SHUT. DOWN. EVERYTHING.
	document.getElementById ("farmBar").className = 'hide';
	document.getElementById ("factoryWindow").className = 'hide';
	document.getElementById ("factoryBar").className = 'hide';
	document.getElementById ("resturantWindow").className = 'hide';
	document.getElementById ("resturantBar").className = 'hide';
	changePlot(10);
	if (page == 1){
		document.getElementById ("farmWindow").className = 'activeWindow';//Turn on only what is needed.
		document.getElementById ("farmBar").className = 'activeBar';
	}
	if (page == 2){
		document.getElementById ("factoryWindow").className = 'activeWindow';
		document.getElementById ("factoryBar").className = 'activeBar';	
	}
	if (page == 3){
		document.getElementById ("resturantWindow").className = 'activeWindow';
		document.getElementById ("resturantBar").className = 'activeBar';	
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
		updatePlotDisplay()
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
		if (plantStorage[i] != undefined && plantStorage[i] != 0){
			x += 1;
			if (x < 6){
				document.getElementById ("storCon1").innerHTML += "<div class ='storBlock'><img src='Icon/"+ i +".png'><div> : " + plantStorage[i] + "</div></div>";
			}
			else{
				document.getElementById ("storCon2").innerHTML += "<div class ='storBlock'><img src='Icon/"+ i +".png'><div> : " + plantStorage[i] + "</div></div>";
			}
		}
	}
}

function changePlant(id){
	document.getElementById ("p"+selectedPlant).style.backgroundColor = "white";
	document.getElementById ("sCropName").innerHTML = plants[id][0];
	document.getElementById ("sCropTime").innerHTML = plants[id][1] + " days";
	selectedPlant = id;
	document.getElementById ("p"+selectedPlant).style.backgroundColor = "lightgrey";
}

function plant(){
	plot["growing" + activePlot] = plants[selectedPlant][0];
	plot["growId" + activePlot] = selectedPlant;
	if (season == plants[selectedPlant][2]){
		plot["time" + activePlot] = plants[selectedPlant][1] - plants[selectedPlant][3];
	}
	else {
		plot["time" + activePlot] = plants[selectedPlant][1];
	}
	updatePlotDisplay()
}
	
window.setInterval(function(){//runs every 10 sec
day += 1;
var x = 9;
if (day > 90){
	day = 1;
	if (season == "Summer"){
		season = "Fall";
	}
	if (season == "Fall"){
		season = "Winter";
	}
	if (season == "Winter"){
		season = "Spring";
		year += 1;
	}
	if (season == "Spring"){
		season = "Summer";
	}

}
while(x != 0){
	plot["time" + x] -= 1;
	if (plot["time" + x] != -1){
		if (plot["time" + x] == 0){
			if (plantStorage[plot["growId" + x]] == undefined){
				plantStorage[plot["growId" + x]] = 0;
			}
			plantStorage[plot["growId" + x]] += 1;
			plot["growing" + x] = "Nothing";
			updatePlotDisplay();
			var y = 0;
			for (i = 0; i < plantStorage.length; i++) {
				if (plantStorage[i] != NaN){
					y += plantStorage[i];
				}
			} 
			updateStorage();
		}
		
	}	
	x -= 1;
}

document.getElementById ("season").innerHTML = season;
document.getElementById ("day").innerHTML = day;
document.getElementById ("year").innerHTML = year;

}, 10000);