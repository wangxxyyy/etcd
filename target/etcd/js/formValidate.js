/**
 * 表单验证
 * 引入 ： <script type="text/javascript" src="Js/common/formValidate.js"></script>
 * 单独调用说明
 * _checkLength(obj,length) //验证长度
 * 
 *  _checkisNaN(obj)//验证是否数字
 *  
 *  _checkrepeat(obj,requestData) //验证是否存在相同信息
 *  
 *  _checkNull(obj) //验证不能为空
 *  
 *  
 */



/**
 * 统一验证集合
 *使用： _fromcheck(obj,values) 验证成功返回true,反之 false
 * 
 * 判断长度，数字 ，空
 * @param obj 需要判断的对象
 * @param values 判断对应的值
 * 参数说明：url:请求地址;data:请求的数据;ts:重复后需要提示的信息;returnValue与后台返回值得对比值
 * var requestData={"url":"www.xxxx.xxx","data":{"a":"1","b":"2"},"ts":"已存在相同名称目录","returnValue":"false"};
 * 参数说明length:判断长度;nan:验证是否是数字;isnull:验证是否为空;requestData:是否存在相同信息的对象;pos:保留几位小数
 * var values={"length":20,"nan":"nan","isnull":"isnull","pos":"1","requestData":requestData}; 
 * @returns {Boolean} 为空返回false
 */
function _fromcheck(obj,values){
	var returnFlag=true;
	if(values.isnull){//不能为空
		if(!_checkNull(obj))return false;
	}
	
	if(values.length){
		if(!_checkLength(obj,values.length))return false;
	}
	if(values.nan){//是否数字
		if(! _checkisNaN(obj))return false;
	}
	
	if(values.type){//是否为日期格式
		if(! _checkisDate(obj))return false;
	}
	
	if(values.requestData){//验证数据库是否有相同信息
		_checkrepeat(obj,values.requestData);
		if (!isRepeat) return false;
	}
	
	if(values.pos){//验证数据库是否有相同信息
		obj.value=_getNum(obj.value,values.pos);
	}
	
	if(values.nan&&values.max){//验证数据库是否有相同信息
		if(! __checkMaxRange(obj,values.max-0))return false;
	}
	
	if(values.nan&&values.min){//验证数据库是否有相同信息
		if(! __checkMinRange(obj,values.min-0))return false;
	}	
	
	return true;
}

function __checkMaxRange(obj,max){
	if($.trim(obj.value)){
		if(($.trim(obj.value)-0)>max){
			$('#vaSpanid'+obj.name).empty();
			$('#vaSpanid'+obj.name).remove();
			document.getElementById(obj.id).style.border="1px dashed red";
			$("#"+obj.id).after("<span id='vaSpanid"+obj.name+"' style='color:red;display:none'>&nbsp;&nbsp;高于最大值"+max+"</span>");
			$('#vaSpanid'+obj.name).show(10);
			return false;
		}else{
			$('#vaSpanid'+obj.name).hide();
			document.getElementById(obj.id).style.border="1px solid #ddd";
			$('#vaSpanid'+obj.name).remove();
			return true;
		}
		//return isNaN($.trim(obj.value))==false?false:true;
	}
}


function __checkMinRange(obj,min){
	if($.trim(obj.value)){
		if(($.trim(obj.value)-0)<min){
			$('#vaSpanid'+obj.name).empty();
			$('#vaSpanid'+obj.name).remove();
			document.getElementById(obj.id).style.border="1px dashed red";
			$("#"+obj.id).after("<span id='vaSpanid"+obj.name+"' style='color:red;display:none'>&nbsp;&nbsp;低于最小值"+min+"</span>");
			$('#vaSpanid'+obj.name).show(10);
			return false;
		}else{
			$('#vaSpanid'+obj.name).hide();
			document.getElementById(obj.id).style.border="1px solid #ddd";
			$('#vaSpanid'+obj.name).remove();
			return true;
		}
		//return isNaN($.trim(obj.value))==false?false:true;
	}
}



function _getNum(count,pos){
		return  Math.round(count*Math.pow(10, pos))/Math.pow(10, pos);;
	}


$(function(){
	$(".must").each(function(i){	
		var _value=$.trim($(this).val());
		var _text=$.trim($(this).text());
		if(_value!=null&&_value!=undefined&&_value!=""){
			return;
		}
		if(_text!=null&&_text!=undefined&&_text!=""){
			return;
		}
		$(this).after("<img class='sys-img' id='sys-img"+$(this).attr("id")+"' src='Images/errorico.gif' align='middle' style='vertical-align:middle;width:7px;height:14px;'  />");
		
	}).blur(function(){
		$(this).siblings("#sys-img"+$(this).attr("id")).hide();
	});
	
	
	/*
	$("body").resize(function() {
		alert()
		$(".resetwidth").each(function(i){
			debugger
			var parentw=$(this).parent().css("width");
			var tempparent=parentw.replace(/[^0-9]+/ig,"");
			var boostorwidth=$(this).parent().attr("boostorwidth");
			$(this).css("width",((tempparent-0)-(boostorwidth-0))+"px");
		});
	});
	*/
	$(".resetwidth").each(function(i){
		var width=$(this).css("width");
		/*
		var parentw=$(this).parent().css("width");
		var tempparent=parentw.replace(/[^0-9]+/ig,"");
		var tempwidth=width.replace(/[^0-9]+/ig,"");
		$(this).parent().attr("boostorwidth",(tempparent-0)-(tempwidth-0));
		*/
		$(this).css("width",width);
	});
});
	

var isRepeat=false;
function _checkrepeat(obj,requestData){
	isRepeat=false;
	requestData.data.name=obj.value;
	$.ajax({
		type : "POST",
		url :requestData.url,
		data : requestData.data,
		async:false,
		dataType : "json",
		success : function(data) {
			if((data.data+'')==(requestData.returnValue+'')){
				$('#vaSpanid'+obj.name).empty();
				$('#vaSpanid'+obj.name).remove();
				document.getElementById(obj.id).style.border="1px dashed red";
				$("#"+obj.id).after("<span id='vaSpanid"+obj.name+"' style='color:red;display:none'>&nbsp;&nbsp;*"+requestData.ts+"</span>");
				$('#vaSpanid'+obj.name).show(10);
				isRepeat= false;
			}else{
				$('#vaSpanid'+obj.name).hide();
				document.getElementById(obj.id).style.border="1px solid #ddd";
				$('#vaSpanid'+obj.name).remove();
				isRepeat= true;
			}				
		},
		error : function(msg) {
			alert("错误的请求格式！");
			isRepeat= false;
		}
	});
}

/**
 * 判断是否是数字
 * @param obj
 * @returns
 */
function _checkisNaN(obj){
	if($.trim(obj.value)){
		if(isNaN($.trim(obj.value))){
			$('#vaSpanid'+obj.name).empty();
			$('#vaSpanid'+obj.name).remove();
			document.getElementById(obj.id).style.border="1px dashed red";
			$("#"+obj.id).after("<span id='vaSpanid"+obj.name+"' style='color:red;display:none'>&nbsp;&nbsp;数字格式</span>");
			$('#vaSpanid'+obj.name).show(10);
			return false;
		}else{
			$('#vaSpanid'+obj.name).hide();
			document.getElementById(obj.id).style.border="1px solid #ddd";
			$('#vaSpanid'+obj.name).remove();
			return true;
		}
		//return isNaN($.trim(obj.value))==false?false:true;
	}
	
	
}

/**
 * 判断不能为kong
 * @param obj 需要判断的对象
 * @returns {Boolean} 为空返回false
 */
function _checkNull(obj){
	if($.trim(obj.value)=="" || $.trim(obj.value)==null || $.trim(obj.value)=='null' || $.trim(obj.value)=="undefined"){
		$('#vaSpanid'+obj.name).empty();
		$('#vaSpanid'+obj.name).remove();
		document.getElementById(obj.id).style.border="1px dashed red";
		$("#"+obj.id).after("<span id='vaSpanid"+obj.name+"' style='color:red;display:none'>&nbsp;&nbsp;必填</span>");
		$('#vaSpanid'+obj.name).show(10);
		return false;
	}else{
		$('#vaSpanid'+obj.name).hide();
		document.getElementById(obj.id).style.border="1px solid #ddd";
		$('#vaSpanid'+obj.name).remove();
		return true;
	}
	
}

/**
 * 判断输入长度
 * @param obj 需要判断的对象
 * @param length 长度
 * @returns {Boolean} 超出长度返回false
 */
function _checkLength(obj,length){
	
	$('#vaSpanid'+obj.name).hide();
	document.getElementById(obj.id).style.border="1px solid #ddd";
	$('#vaSpanid'+obj.name).remove();
	//再次判断是否超出字符串长度
	var val=$.trim(obj.value);
	if(val.length>length){  //sizeof(val,"utf-16")
		document.getElementById(obj.id).style.border="1px dashed red";
		$("#"+obj.id).after("<span id='vaSpanid"+obj.name+"' style='color:red;display:none'>&nbsp;&nbsp;已超出长度</span>");
		$('#vaSpanid'+obj.name).show(10);
		return false;
	}else{
		$('#vaSpanid'+obj.name).hide();
		document.getElementById(obj.id).style.border="1px solid #ddd";
		$('#vaSpanid'+obj.name).remove();
		return true;
	}
};


   /* 失去焦点时验证
	*  obj:标签对象 填：this
	*  isSel:是否需要验证，true:需要验证，false:不需要验证，     默认是true
	*/
	function validateBlur(obj,isSel,length){
		if(isSel){
			if($.trim(obj.value)=="" || $.trim(obj.value)==null || $.trim(obj.value)=='null' || $.trim(obj.value)=="undefined"){
				$('#vaSpanid'+obj.name).empty();
				$('#vaSpanid'+obj.name).remove();
				document.getElementById(obj.id).style.border="1px dashed red";
				$("#"+obj.id).after("<span id='vaSpanid"+obj.name+"' style='color:red;display:none'>&nbsp;必填</span>");
				$('#vaSpanid'+obj.name).show(10);
			}else{
				$('#vaSpanid'+obj.name).hide();
				document.getElementById(obj.id).style.border="1px solid #ddd";
				$('#vaSpanid'+obj.name).remove();
				//再次判断是否超出字符串长度
				if($.trim(obj.value).length>length){
					document.getElementById(obj.id).style.border="1px dashed red";
					$("#"+obj.id).after("<span id='vaSpanid"+obj.name+"' style='color:red;display:none'>&nbsp;&nbsp;已超出长度</span>");
					$('#vaSpanid'+obj.name).show(10);
				}else{
					$('#vaSpanid'+obj.name).hide();
					document.getElementById(obj.id).style.border="1px solid #ddd";
					$('#vaSpanid'+obj.name).remove();
					
				}
			}
		
		}
	}
	/* 失去焦点时验证
	*  ids:标签对象id 请通过Jquery数组传过来 如：
	*  var idArr = new Array($("#id"),$("#name"));
	*		if(validatesubmit(idArr)){
	*			return;
	*		} 
	*/
	function validatesubmit(ids,lengths){	
		if(ids==null||ids==undefined||ids.length<1){
			return false;
		}
		var isexit=false;
		for(var i=0;i<ids.length;i++){
			if(ids[i]==null ){
				continue;
			}
			if( $.trim(ids[i].val())==null ||$.trim(ids[i].val())==""|| $.trim(ids[i].val())=='null' || $.trim(ids[i].val())=="undefined"){
				$("#vaSpanid"+ids[i][0].name).remove();
				ids[i].css("border","1px dashed red");
				ids[i].after("<span id='vaSpanid"+ids[i][0].name+"' style='color:red;display:none'>&nbsp;&nbsp;必填</span>");
				$("#vaSpanid"+ids[i][0].name).show(10);
				isexit=true;
			}else{
				$("#vaSpanid"+ids[i][0].name).hide(10);
				ids[i].css("border","1px solid #ddd");
				$("#vaSpanid"+ids[i][0].name).remove();
				for(var j = 0;j<lengths.length;j++){
					var falg =false;
					if($.trim(ids[i].val()).length>lengths[j]){
						ids[i].css("border","1px dashed red");
						ids[i].after("<span id='vaSpanid"+ids[i][0].name+"' style='color:red;display:none'>&nbsp;&nbsp;已超出长度</span>");
						$("#vaSpanid"+ids[i][0].name).show(10);
						falg=true;
						isexit=true;
						break;
					}
				}
				if(!falg){
					$("#vaSpanid"+ids[i][0].name).hide(10);
					ids[i].css("border","1px solid #ddd");
					$("#vaSpanid"+ids[i][0].name).remove();
				}
			
				
			}
		}
		return isexit;
	}
	var sizeof = function(str, charset){
	    var total = 0,
	        charCode,
	        i,
	        len;
	    charset = charset ? charset.toLowerCase() : '';
	    if(charset === 'utf-16' || charset === 'utf16'){  
	        for(i = 0, len = str.length; i < len; i++){
	            charCode = str.charCodeAt(i);
	            if(charCode <= 0x007f) {
	                total += 1;
	            }else if(charCode <= 0xffff){
	                total += 2;
	            }else{
	                total += 4;
	            }
	        }
	    }else{
	        for(i = 0, len = str.length; i < len; i++){
	            charCode = str.charCodeAt(i);
	            if(charCode <= 0x007f) {
	                total += 1;
	            }else if(charCode <= 0x07ff){
	                total += 2;
	            }else if(charCode <= 0xffff){
	                total += 3;
	            }else{
	                total += 4;
	            }
	        }
	    }
	    return total;
	};
	
	
	
	
	/** 获取小数 小数位数
	 * @param value
	 * @returns
	 */
	function _getNumberPoint(value){
        if(value==null||value==''||isNaN(value)){   
        	return -1;
        }
        var tempvalue=value+"";
		var decimalIndex=tempvalue.indexOf('.');   
		if(decimalIndex=='-1'){   
			return 0;   
		}else{   
			var decimalPart=tempvalue.substring(decimalIndex+1,tempvalue.length); 
			return decimalPart.length;
		}   
	}
	
	
	/** 显示自定义提示
	 * @param obj
	 * @param msg
	 */
	function _showUserDefinedMsg(obj,msg,show){
		if(obj==null||obj==undefined){
			return;
		}
		if(msg==null||msg==""){
			return;
		}
		if($('#vaSpanid'+obj.id).length>0){
			return;
		}
		document.getElementById(obj.id).style.border="1px dashed red";
		$("#"+obj.id).after("<span id='vaSpanid"+obj.id+"' style='color:red;display:none'>&nbsp;&nbsp;"+msg+"</span>");
		$('#vaSpanid'+obj.id).show(10);
	}
	/** 删除自定义提示
	 * @param obj
	 */
	function _removeUserDefinedMsg(obj){
		$('#vaSpanid'+obj.id).hide();
		document.getElementById(obj.id).style.border="1px solid #ddd";
		$('#vaSpanid'+obj.id).remove();
	}
	
	/**
	 * 是否为日期格式
	 * @param obj
	 * @returns {Boolean}
	 */
	function _checkisDate(obj){
		var a = /^(\d{4})-(\d{2})-(\d{2})$/;
		if (!a.test(obj.value)) { 
			return false  ;
		} else{
			return true ;
		}	
	} 
	
	
	