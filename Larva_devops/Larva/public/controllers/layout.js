
function Cell(  data ){
	this.data = data;
};


Cell.prototype.draw = function draw(canvas) {
	for(var i=0;i<this.data.length;i++){
		var server = this.data[i];
		// area with label as headline
		var serverDiv = document.createElement("section");
		var label = document.createElement("h3");
		label.appendChild(document.createTextNode(server.hostname.toUpperCase()));
		serverDiv.appendChild(label);
		
		//
		var area = document.createElement("DIV");
		area.className = "area";
		serverDiv.appendChild(area);

		drawNode(server.statusInfo,area);
		
		canvas.appendChild(serverDiv);
	}
};

function contains(arr, obj) {
  var i = arr.length;
  while (i--) {
    if (arr[i] === obj) {
      return true;
    }
  }
  return false;
}
var complexAttributes = ["OldestTime","Depth","Topics"];

function isComplexNode( statusInfo ){
	var complex = false;
	for(var key in statusInfo){
		if(contains(complexAttributes,key)){
			complex = true;
			break;
		}
	}
	return complex;
}

function drawNode(statusInfo,area){
	for(var key in statusInfo){
		if(typeof statusInfo[key] === "object"){
			if(isComplexNode(statusInfo[key])){
				var  unit = document.createElement("button");
				unit.className = "Stopped";
				var depth = 0;
				for(var attr in statusInfo[key]){
					if(attr === "Depth"){
						depth = statusInfo[key][attr];
					}
				}
				var label = document.createTextNode(key+'  -> '+depth);
				unit.appendChild(label);
				area.appendChild(unit);

				
			}else{
				var  unit = document.createElement("DIV");
				unit.className = "area";
				var label = document.createTextNode(key);
				unit.appendChild(label);
				area.appendChild(unit);
				drawNode(statusInfo[key],unit);
			}
		}else{
			var  unit = document.createElement("button");
			unit.className = statusInfo[key];
			var label = document.createTextNode(key);
			unit.appendChild(label);
			area.appendChild(unit);
		}
	}
};



