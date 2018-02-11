var getSystemConfigObject=null;
var confile=new getSystemConfigOther();
var platUrl=configfileObj.value.platUrl;

/**
 * 根据key获取配置值
 */
function getSystemConfig(_key){
	this.key=_key;
	this.value="";
	getSystemConfigObject=this;
	
	$.ajax({
		type : "POST",
		url :"SystemConfig.do?method=queryByKey",
		data : {
			key : this.key
		},
		async:false,
		dataType : "json",
		success : function(data) {
			if(data.tag=="success"){
				getSystemConfigObject.value=data.data;
			}else{
				getSystemConfigObject.value="";
			}				
		},
		error : function(msg) {
		}
	});
			
	this.getValue=function(){
		return this.value; 
	}
}


/**
 * 通过json的key字符串获取对应的值
 * @param _json
 * @param _key
 * @returns
 */
function getJsonValueByString(_json,_key){
	if(_key==null||_key==undefined){
		return false;
	}
	if(_json.length<1){
		return false;	
	}
	var exit=false;
	var value;
	for(var i=0;i<_json.length;i++){
		if(_json[i]==null){
			continue;
		}
	 	$.each( _json[i], function(i, n){ 
			if(i==_key){
				value=n;
				exit=true;
				return;
			}
		});
	}
	if(!exit){
		return "";
	}else{
		return value;
	}
}


/**
 * 根据key获取配置值
 */
var configfileObj=null;
function getSystemConfigFileUpload(){
	this.value=null;
	configfileObj=this;
	$.ajax({
		type : "POST",
		url :"SystemConfig.do?method=queryconfigfile",
		data : {
			configfile : "comConfig"
		},
		async:false,
		dataType : "json",
		success : function(data) {
			if(data.tag=="success"){
				if(data.data==null||data.data.length<1){
					return;
				}
				configfileObj.value=data.data[0];
			}else{
				configfileObj.value=null;
			}				
		},
		error : function(msg) {
		}
	});
			
	this.getValue=function(){
		if(this.value==null||this.value==undefined||this.value==""){
			return "";
		}
		var tempdata= new Array();
		if(this.value.officfile){
			var temp=this.value.officfile.toLowerCase().split(";");
			if(temp!=null&&temp.length>0){
				for(var i=0;i<temp.length;i++){
					if(temp[i]==null||temp[i]==""){
						continue;
					}
					tempdata.push("*."+temp[i]);
				}
			}
		}
		if(this.value.pdffile){
			var temp=this.value.pdffile.toLowerCase().split(";");
			if(temp!=null&&temp.length>0){
				for(var i=0;i<temp.length;i++){
					if(temp[i]==null||temp[i]==""){
						continue;
					}
					tempdata.push("*."+temp[i]);
				}
			}
		}
		if(this.value.voidefile){
			var temp=this.value.voidefile.toLowerCase().split(";");
			if(temp!=null&&temp.length>0){
				for(var i=0;i<temp.length;i++){
					if(temp[i]==null||temp[i]==""){
						continue;
					}
					tempdata.push("*."+temp[i]);
				}
			}
		}
		if(this.value.txtfile){
			var temp=this.value.txtfile.toLowerCase().split(";");
			if(temp!=null&&temp.length>0){
				for(var i=0;i<temp.length;i++){
					if(temp[i]==null||temp[i]==""){
						continue;
					}
					tempdata.push("*."+temp[i]);
				}
			}
		}
		if(this.value.htmlfile){
			var temp=this.value.htmlfile.toLowerCase().split(";");
			if(temp!=null&&temp.length>0){
				for(var i=0;i<temp.length;i++){
					if(temp[i]==null||temp[i]==""){
						continue;
					}
					tempdata.push("*."+temp[i]);
				}
			}
		}
		return tempdata.join(";"); 
	};
}


/**
 * 根据key获取配置值
 */
var configfileObj=null;
function getSystemConfigOther(_key){
	this.value=null;
	this.key=_key;
	configfileObj=this;
	$.ajax({
		type : "POST",
		url :"SystemConfig.do?method=queryconfigfile",
		data : {
			configfile : "comConfig"
		},
		async:false,
		dataType : "json",
		success : function(data) {
			if(data.tag=="success"){
				if(data.data==null||data.data.length<1){
					return;
				}
				configfileObj.value=data.data[0];
			}else{
				configfileObj.value=null;
			}				
		},
		error : function(msg) {
		}
	});
			
	this.getValue=function(){
		if(this.value==null||this.value==undefined||this.value==""){
			return "";
		}
//		if(this.key==null||this.key==undefined||this.key==""){
//			return;
//		}
		var tempdata= new Array();
		
		if(this.value.voidefile&&this.key=="voidefile"){
			var temp=this.value.voidefile.toLowerCase().split(";");
			if(temp!=null&&temp.length>0){
				for(var i=0;i<temp.length;i++){
					if(temp[i]==null||temp[i]==""){
						continue;
					}
					tempdata.push("*."+temp[i]);
				}
			}
		}
		
		if(this.value.picturefile&&this.key=="picturefile"){
			var temp=this.value.picturefile.toLowerCase().split(";");
			if(temp!=null&&temp.length>0){
				for(var i=0;i<temp.length;i++){
					if(temp[i]==null||temp[i]==""){
						continue;
					}
					tempdata.push("*."+temp[i]);
				}
			}
		}
		return tempdata.join(";"); 
	};
}





function specialcharacter(str){
	if(str==null||str==undefined){
		return str;
	}
	str=str.replace("'","\'");
	str=str.replace('"','\"');
	return str;
}


/**
 * 根据指定长度（英文）截取
 * @param str
 * @param n
 * @returns
 */
function SetSub(str,n){  
   var strReg=/[^\x00-\xff]/g;  
   var _str=str.replace(strReg,"**");  
   var _len=_str.length;  
   if(_len-n>=2){
	 var _newLen=Math.floor(n/2);  
	 var _strLen=str.length;  
	 for(var i=_newLen;i<=_strLen;i++){  
		 var _newStr=str.substr(0,i).replace(strReg,"**");  
		 if(_newStr.length>=n){  
			 return str.substr(0,i)+"...";  
			 break;  
		}
	 }  
   }else{  
	 return str;  
   }  
} 

function _SETByteLength(val,m){

	   return SetSub(val,m);
}



function _getByteLength(val){
  var ZHlength=0;
  var ENlength=0;
   for(var i=0;i<val.length;i++){
      if(val.substring(i,i+1).match(/[^\x00-\xff]/ig)!=null){
         ZHlength+=1;
      }else{
         ENlength+=1;
      }
   }
  return ZHlength*2+ENlength;
}

function specailChartUnicode(_str){
	if(_str==null||_str==undefined||_str==""){
		return _str;
	}
	var tempStr="";
	for( var i=0;i<_str.length; i++ )  
	{       
		var temp = _str.charCodeAt(i).toString(16);   
		tempStr += "\\u"+ new Array(5-String(temp).length).join("0") +temp; 
	}
	return tempStr;
}


//系统启用时间相关；
var SysStartTime={
	_startTime:null,
	_startYear:0,
	_startMonth:0,
	_startDay:0,
	_startDateStr:"",
	Init:function(){
		var config=new getSystemConfig("key_SystemStartTime");
		SysStartTime._startYear=parseInt(config.value.split("-")[0]);
		SysStartTime._startMonth=parseInt(config.value.split("-")[1].replace(/^0/,""));
		SysStartTime._startDay=parseInt(config.value.split("-")[2].replace(/^0/,""));
		SysStartTime._startTime=new Date(SysStartTime._startYear,SysStartTime._startMonth-1,SysStartTime._startDay);
		SysStartTime._startDateStr=SysStartTime._startYear+"年"+SysStartTime._startMonth+"月"+SysStartTime._startDay+"日";
	},
	CompareYMD:function(_year,_month,_day,_flag){
		_year=parseInt(_year);
		_month=parseInt(_month);
		_day=parseInt(_day);
		var tempDate=new Date(_year,_month-1,_day);
		if((tempDate.getTime()-SysStartTime._startTime.getTime())>0) {
			if(_flag){
				alert("系统于"+SysStartTime._startDateStr+"启用，"+_year+"年度无统计数据");
			}
			return false;
		}else{
			return true;
		}
	},
	CompareYM:function(_year,_month,_flag){
		_year=parseInt(_year);
		_month=parseInt(_month);
		var tempDate=SysStartTime.GetLastDay(_year,_month);
		if(SysStartTime.GetDayDiff(tempDate,SysStartTime._startTime)<0) {
			if(_flag){
				alert("系统于"+SysStartTime._startDateStr+"启用，"+_year+"年度无统计数据");
			}
			return true;
		}else{
			return false;
		}
	},
	CompareDATE:function(_date,_flag){
		if((_date.getTime()-SysStartTime._startTime.getTime())>0) {
			if(_flag){
				alert("系统于"+SysStartTime._startDateStr+"启用，"+_year+"年度无统计数据");
			}
			return true;
		}else{
			return false;
		}
	},
	GetLastDay:function(year,month)      
	{    
		 var new_year = year;    //取当前的年份      
		 var new_month = month;  //取下一个月的第一天，方便计算（最后一天不固定）  
		 if(new_month>12)            //如果当前大于12月，则年份转到下一年      
		 {      
		  new_month -=12;        //月份减      
		  new_year++;            //年份增      
		 }      
		 var new_date = new Date(new_year,new_month,1);                //取当年当月中的第一天      
		 return (new Date(new_date.getTime()-1000*60*60*24));//获取当月最后一天日期      
	},
	GetDayDiff:function(_start,_end){
		return _start.getTime()-_end.getTime();
	}
};


//加载等待效果
var BoostorLoading={
	Init:function(){
		$("body").append("<div id=\"boostor_loading\" class=\"loading\"></div>");
	},
	Reset:function(){
		$("#boostor_loading").css("position","absolute");
	},
	Show:function(){
		if($("#boostor_loading").length<1){
			BoostorLoading.Init();
		}
		$("#boostor_loading").css("display","block");
	},
	Hidden:function(){
		if($("#boostor_loading").length<1){
			return;
		}
		$("#boostor_loading").css("display","none");
	}
};


//初始化
$(function(){
	//SysStartTime.Init();
});


var BoostorGetPersonIcon={
	 id:null,
	 icon:null,
	 basepath:null,
	 elementid:null,
	 getIcon:function(_basepath,_id,_elemenid){
		 BoostorGetPersonIcon.id=_id;
		 BoostorGetPersonIcon.basepath=_basepath;
		 BoostorGetPersonIcon.elementid=_elemenid;
		 $.ajax({
			type : "POST",
			url :"HrmResource.do?method=querybyid",
			data : {
				id : BoostorGetPersonIcon.id
			},
			async:false,
			dataType : "json",
			success : function(data) {
				if(data.tag=="success"){
					if(data.data==null||data.data.messagerurl==null){
						$("#"+BoostorGetPersonIcon.elementid).attr("src","");
					}else{
						$("#"+BoostorGetPersonIcon.elementid).attr("src",platUrl+"/"+data.data.messagerurl.substring(1,data.data.messagerurl.length));
					}
				}
			},
			error : function(msg) {
			}
		});
	 }
}





function dataCheck(_year,_month){

		var nowTime = new Date(getServerCurrentDate().replace(/-/g,"/"));
		_month= parseInt(_month);
		if(_month==-1){
		if(SysStartTime._startYear>_year){
			alert("系统于"+SysStartTime._startDateStr+"启用，"+_year+"年度无统计数据");
			return false;
		}else if(nowTime.getFullYear()<_year){
			alert(_year+"年度无统计数据");
			return false;
		}
	 }else{
		 if(SysStartTime.CompareYM(_year,_month,true)){
			 return false;
		 }else{
			 if(daysBetween(nowTime,new Date(_year,(_month==-1?1:_month-1),1))<0){
				 alert(_year+"年度无统计数据");
				 return false;
			 }
		 }
	 }
		return true;
	}

/**
 * 比较时分的大小
 * @return
 */
function compareTime(startTime,endTime,monthAnswer){
	if(startTime!=null&&startTime!=""&&endTime!=null&&endTime!=""){
		//开始时分
		var startHour = parseInt(startTime.split(":")[0]);
		var startMinute = parseInt(startTime.split(":")[1]);
		//结束时分
		var endHour = parseInt(endTime.split(":")[0]);
		var endMinute = parseInt(endTime.split(":")[1]);
		//当前时分
		var nowTime = new Date(getServerCurrentDate().replace(/-/g,"/"));	 		
		var nowHour = nowTime.getHours();
		var nowMinute = nowTime.getMinutes();
		if(nowHour>startHour&&nowHour<endHour){
			//$("."+monthAnswer).css("display","");
			return false;
		}else if((nowHour==startHour&&nowHour!=endHour&&nowMinute>=startMinute)||
				(nowHour==endHour&&nowHour!=startHour&&nowMinute<=endMinute)){
			//$("."+monthAnswer).css("display","");
			return false;
		}else if(nowHour==startHour&&nowHour==endHour&&nowMinute>=startMinute&&nowMinute<=endMinute){
			//$("."+monthAnswer).css("display","");
			return false;
		}else if((nowHour<startHour)||(nowHour==startHour&&nowMinute<startMinute)){
			//$("."+monthAnswer).css("display","none");
			return null;
		}else{
			return true;
		}	
	}
	//$("."+monthAnswer).css("display","none");
	return true;
}



/**
 * 获取考核的月份
 */
function getAssessYearOrMonth(year,type){
	var result;
	$.ajax({
		type : "POST",
		url :"AllAssessMonth.do?method=getAssessYearOrMonth",
		data : {year:year,type:type},
		async:false,
		dataType : "json",
		success : function(data) {
			if(data.tag=="success"){
				result=  data.data;
			}			
		},
		error : function(msg) {
		}
	});	
	return result;
}


function CheckReadioBox(_obj){
	var items=document.getElementsByName(_obj.name);
	if(items==null||items.length<1){
		return;
	}
	for(var i=0;i<items.length;i++){
		var item=items[i];
		if(item.id!=_obj.id){
			switch(item.type){
			case "checkbox":
				item.checked=false;
				break;
			case "radio":
				item.checked=false;
				break;
			default:
				break;
			}
		}
	}
}


/**
 * 将以0结尾的浮点数字转为整数(1位小数)
 * @param val
 * @returns
 */
function getLastNotZero(val){
	var _val = parseInt(val);
	if(val==_val){
		return _val;
	}else{
		return val;
	}
}

/**
 * 获取业务字典响应的数据
 * @param name
 * @param age
 * @returns {User}
 */
function SystemDataDirectory(){ 
    this.dataArray ; 
    this.getSystemDataDirectory=function(type){
    	$.ajax({
    		type : "POST",
    		url :"SystemDataDirectory.do?method=querydetailkey",
    		data : {key:type},
    		async:false,
    		dataType : "json",
    		success : function(data) {
    			if(data.tag=="success"){
    				dataArray =  data.data;
    			}			
    		},
    		error : function(msg) {
    		}
    	});	
    };
    
    this.draw=function(target){
    	var array = new Array();
        for(var i=0;i<dataArray.length;i++){
        	if(i==0){
        		array.push("<option value='"+dataArray[i].value+"' selected='selected'>");
        	}else{
        		array.push("<option value='"+dataArray[i].value+"'>");
        	}
        	array.push(dataArray[i].name);
        	array.push("</option>");
        }
        $("#"+target).html(array.join(""));
    };
    this.drawSpecail=function(target){
    	var array = new Array();
        for(var i=0;i<dataArray.length;i++){
        	if(i==0){
        		if(dataArray[i].id!="bd35595c9ab04c77bd2f14e5621c5d5c"){
        			array.push("<option value='"+dataArray[i].value+"' selected='selected'>");
        		}else{
        			continue;
        		}
        	}else{
        		if(dataArray[i].id!="bd35595c9ab04c77bd2f14e5621c5d5c"){
        			array.push("<option value='"+dataArray[i].value+"'>");
        		}else{
        			continue;
        		}
        	}
        	array.push(dataArray[i].name);
        	array.push("</option>");
        }
        $("#"+target).html(array.join(""));
    };
}

function drawSelect(year,location,type,subtract,add){
	//系统启用时间
	var startYear = 0 ;
	var startMonth = 0 ;
	var config=new getSystemConfig("key_SystemStartTime");
	startYear=parseInt(config.value.split("-")[0]);
	startMonth=parseInt(config.value.split("-")[1].replace(/^0/,""));
	//服务器时间
	var nowYear = 0 ;
	var nowMonth = 0 ;
	//取服务器时间
	var nowTime = new Date(getServerCurrentDate().replace(/-/g,"/"));
	nowYear = parseInt(nowTime.getFullYear());
	nowMonth = parseInt(nowTime.getMonth()+1);
	//定义一个数组
	var array = new Array();
	if(type==1){
		array.push("<option value='-1'>全年</option>");
	}
	if(year>nowYear){
		return;
	}else if(startYear<nowYear&&year==nowYear){
		for(var i=1;i<=nowMonth;i++){
			if((subtract==true&&startMonth==i)||(add==true&&nowMonth==i)){
				array.push("<option value='"+i+"' selected='selected'>"+i+"月</option>");
			}else{
				array.push("<option value='"+i+"'>"+i+"月</option>");
			}
		}
	}else if(startYear<year&&year<nowYear){
		for(var j=1;j<=12;j++){
			if((subtract==true&&startMonth==j)||(add==true&&nowMonth==j)){
				array.push("<option value='"+j+"' selected='selected'>"+j+"月</option>");
			}else{
				array.push("<option value='"+j+"'>"+j+"月</option>");
			}
		}
	}else if(startYear==year&&startYear==nowYear){
		for(var k=startMonth;k<=nowMonth;k++){
			if((subtract==true&&startMonth==k)||(add==true&&nowMonth==k)){
				array.push("<option value='"+k+"' selected='selected'>"+k+"月</option>");
			}else{
				array.push("<option value='"+k+"'>"+k+"月</option>");
			}
		}
	}else{
		for(var y=startMonth;y<=12;y++){
			if((subtract==true&&startMonth==y)||(add==true&&nowMonth==y)){
				array.push("<option value='"+y+"' selected='selected'>"+y+"月</option>");
			}else{
				array.push("<option value='"+y+"'>"+y+"月</option>");
			}
		}
	}
	$("#"+location).html(array.join(""));
}

function drawYearSelect(location){
	//系统启用时间
	var startYear = 0 ;
	var startMonth = 0 ;
	//var config=new getSystemConfig("key_SystemStartTime");
	var config=Data_getSystemConfig;
	startYear=parseInt(config.value.split("-")[0]);
	startMonth=parseInt(config.value.split("-")[1].replace(/^0/,""));
	//服务器时间
	var nowYear = 0 ;
	var nowMonth = 0 ;
	//取服务器时间
	var nowTime = new Date(getServerCurrentDate().replace(/-/g,"/"));
	nowYear = parseInt(nowTime.getFullYear());
	nowMonth = parseInt(nowTime.getMonth()+1);
	//定义一个数组
	var array = new Array();
	for(var i=startYear;i<=nowYear;i++){
		if(i==nowYear){
			array.push("<option value='"+i+"' selected='selected'>"+i+"年</option>");
		}else{
			array.push("<option value='"+i+"'>"+i+"年</option>");
		}
		
	}
	$("#"+location).html(array.join(""));
}
