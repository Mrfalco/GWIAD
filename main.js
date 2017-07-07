
function activeMenu(page){//This is where the menu tabs change
	document.getElementById ("farmWindow").className = 'hide';//SHUT. DOWN. EVERYTHING.
	document.getElementById ("farmBar").className = 'hide';
	document.getElementById ("factoryWindow").className = 'hide';
	document.getElementById ("factoryBar").className = 'hide';
	document.getElementById ("resturantWindow").className = 'hide';
	document.getElementById ("resturantBar").className = 'hide';
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
		
	
window.setInterval(function(){//It keeps happening!, runs every 1 sec


}, 1000);