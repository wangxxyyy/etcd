var jsonMap={
		data:null,
        pushData:function(key,value){
        	if(jsonMap.data==null||jsonMap.data==undefined){
        		jsonMap.data='{"data":[';
        	}
        	jsonMap.data+='{"key":"'+key+'","value":"'+value+'"},';
        },
		getData:function(){
			if(jsonMap.data==null){
				return "";
			}
			jsonMap.data=jsonMap.data.substring(0, jsonMap.data.length-1);
			return jsonMap.data+=']}';
		},
		clearData:function(){
			jsonMap.data=null;
		}
};

var mapArray={
	data:new Array(),
	clearMap:function(){
		mapArray.data=[];
	},
	pushMap:function(_key,_value){
		if(mapArray.data==null||mapArray.data.length<1){
			mapArray.data.push(new mapObj(_key,_value));
			return;
		}
		var isExit=false;
		for(var i=0;i<mapArray.data.length;i++){
			var item=mapArray.data[i];
			if(item.key==_key){
				item.value+=";"+_value;
				isExit=true;
			}
		}
		if(!isExit){
			mapArray.data.push(new mapObj(_key,_value));
		}
	},
	getMap:function(){
		if(mapArray.data==null||mapArray.data.length<1){
			return "";
		}
		var tempData=new Array();
		for(var i=0;i<mapArray.data.length;i++){
			var item=mapArray.data[i];
			tempData.push(item.key+"@"+item.value);
		}
		return tempData.join("|");
	},
	setValue:function(_key,_value){
		if(mapArray.data==null||mapArray.data.length<1){
			return "";
		}
		for(var i=0;i<mapArray.data.length;i++){
			var item=mapArray.data[i];
			if(item.key==_key){
				item.value=_value;
			}
		}
	},
	getValue:function(_key){
		if(mapArray.data==null||mapArray.data.length<1){
			return "";
		}
		for(var i=0;i<mapArray.data.length;i++){
			var item=mapArray.data[i];
			if(item.key==_key){
				return item.value;
			}
		}
	}
};


function jsMap(){
	this.data=new Array();
	this.push=function(_key,_value){
		var exit=false;
		for(var i=0;i<this.data.length;i++){
			var item=this.data[i];
			if(item==null||item==undefined){
				continue;
			}
			if(item.key==_key){
				exit=true;
			}
		}
		if(!exit){
			this.data.push(new mapObj(_key,_value));
		}
	};
	this.setValue=function(_key,_value){
		for(var i=0;i<this.data.length;i++){
			var item=this.data[i];
			if(item==null||item==undefined){
				continue;
			}
			if(item.key==_key){
				item.value= _value;
			}
		}
	};
	this.getValue=function(_key){
		for(var i=0;i<this.data.length;i++){
			var item=this.data[i];
			if(item==null||item==undefined){
				continue;
			}
			if(item.key==_key){
				return	item.value;
			}
		}
		return null;
	};
}



function mapObj(_key,_value){
	this.key=_key;
	this.value=_value;
}