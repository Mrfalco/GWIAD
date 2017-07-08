var activePlot = 1;
var day = 1;
var year = 1;
var season = "Summer";
var grown = 0;
var selectedPlant = 0;
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
	
}

var plants = [["wheat", 8,"Fall", -2],["Grapes", 12,"Spring",-3]];

function activeMenu(page){//This is where the menu tabs change
	document.getElementById ("farmWindow").className = 'hide';//SHUT. DOWN. EVERYTHING.
	document.getElementById ("farmBar").className = 'hide';
	document.getElementById ("factoryWindow").className = 'hide';
	document.getElementById ("factoryBar").className = 'hide';
	document.getElementById ("resturantWindow").className = 'hide';
	document.getElementById ("resturantBar").className = 'hide';
	changePlot(10);
	if (page == 1){
		document.getElementById ("farmWindow").className = 'active';//Turn on only what is needed.
		document.getElementById ("farmBar").className = 'active';
	}
	if (page == 2){
		document.getElementById ("factoryWindow").className = 'active';
		document.getElementById ("factoryBar").className = 'active';	
	}
	if (page == 3){
		document.getElementById ("resturantWindow").className = 'active';
		document.getElementById ("resturantBar").className = 'active';	
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

function changePlant(id){
	document.getElementById ("sCropName").innerHTML = plants[id][0];
	document.getElementById ("sCropTime").innerHTML = plants[id][1] + " days";
	selectedPlant = id;
}

function plant(){
	plot["growing" + activePlot] = plants[selectedPlant][0];
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
	if (plot["time" + x] != -1){
		if (plot["time" + x] == 0){
			grown += 1;
			plot["growing" + x] = "Nothing";
			updatePlotDisplay();
		}
		plot["time" + x] -= 1;
		document.getElementById ("temp").innerHTML = grown;
	}	
	x -= 1;
}
document.getElementById ("season").innerHTML = season;
document.getElementById ("day").innerHTML = day;
document.getElementById ("year").innerHTML = year;

}, 10000);