var datagridcount=0;
var dataGridObject=new Array();
function dataGrid(_columnHead,_columnWidth,_columnType,_columnKey,_container){
	this.columnHead=_columnHead;
	this.columnWidth=_columnWidth;
	this.columnType=_columnType;
	this.columnKey=_columnKey;
	this.container=_container;
	this.initState=false;
	this.datagridindex=0;
	
	this.init=function(){
		datagridcount=datagridcount+1;
		dataGridObject.push(this);
		this.datagridindex=datagridcount;
		
		
		if(this.container==null||this.container==undefined){
			return;
		}
		var html=new Array();
		if(this.columnHead==null||this.columnHead==undefined||this.columnHead.length<1){
			html.push("<span>DataGrid列定义异常</span>");
		}
		//创建表格全局
		html.push("<table width=\"100%\" border=\"0\" cellspacing=\"1\" cellpadding=\"0\" class=\"form_tab_1\">");
		
		//设置列宽
		html.push("<colgroup>");
		for(var wid=0;wid<this.columnWidth.length;wid++){
			html.push("<col width=\""+this.columnWidth[wid]+"\"/>");
		}		
		html.push("</colgroup>");
		
		
		html.push("<tr width=\"100%\" class=\"title\">");
		for(var col=0;col<this.columnHead.length;col++){
			html.push("<td class=\"\">"+this.columnHead[col]+"</td>");
		}
		html.push("</tr>");
		html.push("<tr>");
		html.push("<td colspan=\""+this.columnHead.length+"\" style='padding:0;border:0;'>");
		html.push("<div id=\"datagridcontainer\" name=\"datagridcontainer\" style=\"width:100%;height:100%;border:0;\">");
		html.push("</div>");
		html.push("</tr>");
		html.push("</table>");
		$("#"+this.container).html(html.join(" "));
	};
	
	
	this.requstData=function(_url,_requstData){
		$.ajax({
			type : "POST",
			url :_url,
			data : _requstData,
			dataType : "json",
			success : function(data) {
				if(data.tag=="success"){
					dataGridObject[0].clearData();
					dataGridObject[0].setData(data.rows,data.total);
				}else{
					//alert(data.msg);
				}				
			},
			error : function(msg) {
			}
		});
	};
	
	
	this.clearData=function(){
		$("#datagridcontainer").html("");
	};
	
	
	this.setData=function(_data,total){
		var dataHtml=new Array();
		if(_data==null||_data==undefined||_data.length<1){
			dataHtml.push("<span>没有相关记录</span>");
		}else if(this.columnKey==null||this.columnKey==undefined){
			return;
		}else{
			dataHtml.push("<table width=\"100%\" border=\"0\" cellspacing=\"1\" cellpadding=\"0\" class=\"form_tab_1\">");
			//设置列宽
			dataHtml.push("<colgroup>");
			for(var wid=0;wid<this.columnWidth.length;wid++){
				dataHtml.push("<col width=\""+this.columnWidth[wid]+"\"/>");
			}		
			dataHtml.push("</colgroup>");
			for(var i=0;i<_data.length;i++){
				if(i%2==0){
					dataHtml.push("<tr width=\"100%\" name=\"tr0\">");
				}else{
					dataHtml.push("<tr width=\"100%\" name=\"tr1\" class=\"change\">");
				}
				
				var item=_data[i];
				for(var k=0;k<this.columnKey.length;k++){
					//特殊处理；
					var eValue=""; 
					var customType="";
					if(this.columnKey[k]=='button'){
						eValue=this.columnHead[k];
					}else if(this.columnKey[k]=='configValue'){
						customType=eval('item.dataType');
						eValue=eval('item.'+this.columnKey[k]);
					}else{
						eValue=eval('item.'+this.columnKey[k]);
					}
					//特殊处理
					dataHtml.push("<td>");
					dataHtml.push(this.getColumnHtml(k,eValue,this.columnKey[k],i,item,customType));
					dataHtml.push("</td>");
				}		
				dataHtml.push("</tr>");
			}
			dataHtml.push("</table>");
		}
		$("#datagridcontainer").html(dataHtml.join(" "));
	};
	
	
	this.getColumnHtml=function(_colindex,_data,_key,_rowIndex,_rowData,_customType){
		if(this.columnType==null||this.columnType==undefined||this.columnType.length<=_colindex){
			return _data;
		}
		var returnHtml="";
		var key=_key==null||_key==undefined?"":_key;
		var docId="input_"+_rowIndex;
		var docType=_customType==null||_customType==undefined||_customType==""?this.columnType[_colindex]:_customType;
		
		switch(docType){
		case "inputtext":
			returnHtml="<input id=\""+docId+"\" name=\""+docId+"\" type=\"text\"  value=\""+_data+"\">";
			break;
		case "inputnumber":
			returnHtml="<input id=\""+docId+"\" name=\""+docId+"\" type=\"text\"  value=\""+_data+"\" onblur=\"inputDataTypeCheck('"+_rowData.id+"',this,'number')\">";
			break;
		case "inputDateMMdd":
			returnHtml="<input id=\""+docId+"\" name=\""+docId+"\" type=\"text\"  value=\""+_data+"\" onfocus=\"WdatePicker({el:'"+docId+"',dateFmt:'MMdd'})\">";
			break;
		case "inputDatedd":
			returnHtml="<input id=\""+docId+"\" name=\""+docId+"\" type=\"text\"  value=\""+_data+"\" onfocus=\"WdatePicker({el:'"+docId+"',dateFmt:'dd'})\">";
			break;
		case "inputdate":
			returnHtml="<input id=\""+docId+"\" name="+docId+"\" type=\"text\"  value=\""+_data+"\" onfocus=\"WdatePicker({el:'"+docId+"',dateFmt:'yyyy-MM-dd'})\">";
			break;
		case "button":
			if(_rowData.dataType=="inputnumber"){
				returnHtml="<input type=\"button\"  value=\""+_data+"\" onclick=\"saveClick('"+_rowData.id+"','_"+_rowIndex+"','number')\">";
			}else{
				returnHtml="<input type=\"button\"  value=\""+_data+"\" onclick=\"saveClick('"+_rowData.id+"','_"+_rowIndex+"')\">";
			}
			break;
		case "select":
			break;	
		default:
			returnHtml=_data;
			break;
		}
		return returnHtml;
	};
}

function saveClick(_id,docId,type){
	var data=$("#input"+docId).val();
	if(type!=null&&type!=undefined){
		switch (type){
		case 'number':
			if(!dataCheckNumber(data)){
				return;
			}
		case 'text':
			break;
		default:
			break;
		}
	}
	
	
	$.ajax({
		type : "POST",
		url :'SystemConfig.do?method=saveorupdate',
		data : {id:_id,configValue:data},
		dataType : "json",
		success : function(data) {
			if(data.tag=="success"){
				alert("保存成功!");
			}else{
				alert("保存失败!");
			}				
		},
		error : function(msg) {
		}
	});
}

function inputDataTypeCheck(id,obj,type){
	if(id==null||id==undefined||id==""){
		return;
	}
	if(type==null||type==undefined||type==""){
		return;
	}
	switch (type){
	case 'number':
		dataCheckNumber($(obj).val());
		break;
	case 'text':
		break;
	default:
		break;
	}
}



function dataCheckNumber(value){
	if(!(/^\d+$/.test(value))){ 
		   alert("请输入正确数据格式");
		   return false;
	}else{
		return true;
	}
}





var bufferData={
	datas:new Array(),
	getData:function(key){
		if(bufferData.datas==null||bufferData.datas.length<1){
			return null;
		}
		for(var i=0;i<bufferData.datas.length;i++){
			if(bufferData.datas[i].key==key){
				return value;
			}
		}
	},
	setData:function(key,value){
		if(bufferData.datas==null){
			bufferData.datas=new Array();
		}
		if(bufferData.datas.length<1){
			bufferData.push(new mapData(key,value));
			return;
		}
		var exit=false;
		for(var i=0;i<bufferData.datas.length;i++){
			if(bufferData.datas[i].key==key){
				bufferData.datas[i]=value;
				exit=true;
			}
		}
		if(!exit){
			bufferData.push(new mapData(key,value));
		}
	}
}

function mapData(_key,_value){
	this.key=_key;
	this.value=_value;
}

