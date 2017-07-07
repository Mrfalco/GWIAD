var activePlot = 1;
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
	
}

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
	
window.setInterval(function(){//It keeps happening!, runs every 1 sec


}, 1000);