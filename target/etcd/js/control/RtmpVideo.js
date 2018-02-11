
var isIE  = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
var isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;

function ControlVersion()
{
	var version;
	var axo;
	var e;


	try {
		axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
		version = axo.GetVariable("$version");
	} catch (e) {
	}

	if (!version)
	{
		try {
			
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");

			version = "WIN 6,0,21,0";

			axo.AllowScriptAccess = "always";

			version = axo.GetVariable("$version");

		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
			version = axo.GetVariable("$version");
		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
			version = "WIN 3,0,18,0";
		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			version = "WIN 2,0,0,11";
		} catch (e) {
			version = -1;
		}
	}
	
	return version;
}

function GetSwfVer(){
	var flashVer = -1;
	
	if (navigator.plugins != null && navigator.plugins.length > 0) {
		if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
			var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
			var flashDescription = navigator.plugins["Shockwave Flash" + swVer2].description;
			var descArray = flashDescription.split(" ");
			var tempArrayMajor = descArray[2].split(".");			
			var versionMajor = tempArrayMajor[0];
			var versionMinor = tempArrayMajor[1];
			var versionRevision = descArray[3];
			if (versionRevision == "") {
				versionRevision = descArray[4];
			}
			if (versionRevision[0] == "d") {
				versionRevision = versionRevision.substring(1);
			} else if (versionRevision[0] == "r") {
				versionRevision = versionRevision.substring(1);
				if (versionRevision.indexOf("d") > 0) {
					versionRevision = versionRevision.substring(0, versionRevision.indexOf("d"));
				}
			} else if (versionRevision[0] == "b") {
				versionRevision = versionRevision.substring(1);
			}
			var flashVer = versionMajor + "." + versionMinor + "." + versionRevision;
		}
	}
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) flashVer = 4;
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) flashVer = 3;
	else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) flashVer = 2;
	else if ( isIE && isWin && !isOpera ) {
		flashVer = ControlVersion();
	}
	return flashVer;
}

function DetectFlashVer(reqMajorVer, reqMinorVer, reqRevision)
{
	versionStr = GetSwfVer();
	if (versionStr == -1 ) {
		return false;
	} else if (versionStr != 0) {
		if(isIE && isWin && !isOpera) {
			// Given "WIN 2,0,0,11"
			tempArray         = versionStr.split(" "); 	// ["WIN", "2,0,0,11"]
			tempString        = tempArray[1];			// "2,0,0,11"
			versionArray      = tempString.split(",");	// ['2', '0', '0', '11']
		} else {
			versionArray      = versionStr.split(".");
		}
		var versionMajor      = versionArray[0];
		var versionMinor      = versionArray[1];
		var versionRevision   = versionArray[2];

		if (versionMajor > parseFloat(reqMajorVer)) {
			return true;
		} else if (versionMajor == parseFloat(reqMajorVer)) {
			if (versionMinor > parseFloat(reqMinorVer))
				return true;
			else if (versionMinor == parseFloat(reqMinorVer)) {
				if (versionRevision >= parseFloat(reqRevision))
					return true;
			}
		}
		return false;
	}
}

function AC_AddExtension(src, ext)
{
  var qIndex = src.indexOf('?');
  if ( qIndex != -1)
  {
    var path = src.substring(0, qIndex);
    if (path.length >= ext.length && path.lastIndexOf(ext) == (path.length - ext.length))
      return src;
    else
      return src.replace(/\?/, ext+'?'); 
  }
  else
  {
    if (src.length >= ext.length && src.lastIndexOf(ext) == (src.length - ext.length))
      return src;  // Already have extension
    else
      return src + ext;
  }
}

function AC_Generateobj(objAttrs, params, embedAttrs) 
{ 
    var str = '';
    if (isIE && isWin && !isOpera)
    {
  		str += '<object ';
  		for (var i in objAttrs)
  			str += i + '="' + objAttrs[i] + '" ';
  		str += '>';
  		for (var i in params)
  			str += '<param name="' + i + '" value="' + params[i] + '" /> ';
  		str += '</object>';
    } else {
  		str += '<embed ';
  		for (var i in embedAttrs)
  			str += i + '="' + embedAttrs[i] + '" ';
  		str += '> </embed>';
    }

    document.write(str);
}

function AC_FL_RunContent(){
  var ret = 
    AC_GetArgs
    (  arguments, ".swf", "movie", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
     , "application/x-shockwave-flash"
    );
  AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs);
}

function AC_GetArgs(args, ext, srcParamName, classid, mimeType){
  var ret = new Object();
  ret.embedAttrs = new Object();
  ret.params = new Object();
  ret.objAttrs = new Object();
  for (var i=0; i < args.length; i=i+2){
    var currArg = args[i].toLowerCase();    

    switch (currArg){	
      case "classid":
        break;
      case "pluginspage":
        ret.embedAttrs[args[i]] = args[i+1];
        break;
      case "src":
      case "movie":	
        args[i+1] = AC_AddExtension(args[i+1], ext);
        ret.embedAttrs["src"] = args[i+1];
        ret.params[srcParamName] = args[i+1];
        break;
      case "onafterupdate":
      case "onbeforeupdate":
      case "onblur":
      case "oncellchange":
      case "onclick":
      case "ondblClick":
      case "ondrag":
      case "ondragend":
      case "ondragenter":
      case "ondragleave":
      case "ondragover":
      case "ondrop":
      case "onfinish":
      case "onfocus":
      case "onhelp":
      case "onmousedown":
      case "onmouseup":
      case "onmouseover":
      case "onmousemove":
      case "onmouseout":
      case "onkeypress":
      case "onkeydown":
      case "onkeyup":
      case "onload":
      case "onlosecapture":
      case "onpropertychange":
      case "onreadystatechange":
      case "onrowsdelete":
      case "onrowenter":
      case "onrowexit":
      case "onrowsinserted":
      case "onstart":
      case "onscroll":
      case "onbeforeeditfocus":
      case "onactivate":
      case "onbeforedeactivate":
      case "ondeactivate":
      case "type":
      case "codebase":
        ret.objAttrs[args[i]] = args[i+1];
        break;
      case "id":
      case "width":
      case "height":
      case "align":
      case "vspace": 
      case "hspace":
      case "class":
      case "title":
      case "accesskey":
      case "name":
      case "tabindex":
        ret.embedAttrs[args[i]] = ret.objAttrs[args[i]] = args[i+1];
        break;
      default:
        ret.embedAttrs[args[i]] = ret.params[args[i]] = args[i+1];
    }
  }
  ret.objAttrs["classid"] = classid;
  if (mimeType) ret.embedAttrs["type"] = mimeType;
  return ret;
}

/** ****������������Flex****** */
function InitViewer(divid){// ����������
var videoMain = new Array();
var _div = document.getElementById(divid);
var _divWidth=_div.offsetWidth;
var _divHeigth=_div.offsetHeight;
videoMain.push('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"');
videoMain.push('id="RtmpVideo" width="'+_divWidth+'" height="'+_divHeigth+'"');
videoMain.push('codebase="http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab">');
videoMain.push('<param name="movie" value="Test/SWF/RtmpVideo.swf" />');
videoMain.push('<param name="quality" value="high" />');
videoMain.push('<param name="bgcolor" value="#ffffff" />');
videoMain.push('<param name="allowScriptAccess" value="sameDomain" />');
videoMain.push('<param name="allowfullscreen" value="true" />');
videoMain.push('<embed src="Test/SWF/RtmpVideo.swf" quality="high" bgcolor="#869ca7"');
videoMain.push('width="'+_divWidth+'" height="'+_divHeigth+'" name="RtmpVideo" align="middle"');
videoMain.push('play="true"	loop="false" quality="high"	allowScriptAccess="sameDomain"');
videoMain.push('type="application/x-shockwave-flash" pluginspage="http://www.adobe.com/go/getflashplayer">');
videoMain.push('</embed></object>');
_div.innerHTML = videoMain.join("");
}
var count=0;
// ##################�������###########################
function play(url,postion,_width,_height){
	count=0;
	PlayByUrl(url,postion,_width,_height);
}
function stop(){
	count=0;
	PlayStop();
}
function pause(_pause){
	count=0;
	PlayPause(_pause);
}
var voideTotalTime=0;
var currentPostion=0;
var id="";
var requestUrl="";
var openfrom=-1;
var openfromKey="";
//获取视频总时间回调--由播放器自动回调
function CallBackTotalTime(data){
	//ִ�л�ȡ��Ƶ��ʱ���ִ�з���ʱ��󷽷���
	voideTotalTime=data;
	//提交视频总时间长度
	videorecord(id,-1,voideTotalTime);
}
function CallBackCurrPostion(data){
	//ִ�л�ȡ��Ƶ��ʱ���ִ�з���ʱ��󷽷���
	currentPostion=data;
	//提交视频总时间长度
	videorecord(id,currentPostion,voideTotalTime);
}

function getVoideTotalTime(){
	return voideTotalTime;
}
function getCurrentPostion(){
	return currentPostion;
}
function setContentId(_id){
	id=_id;
}
function setRequestUrl(_url){
	requestUrl=_url;
}
function setOpenfrom(_openfrom){
	openfrom=_openfrom;
}
function setOpenfromKey(_openfromKey){
	openfromKey=_openfromKey;
}

function CallBackVideoSize(_width,_height){
	alert(_width+"_"+_height);
}

function getVideoSize(){
	setTimeout(function(){
		var rtmpVideo = document.getElementById('RtmpVideo');
		try{
			count++;
			var videoSize=rtmpVideo.GetVideoSize();
			if(videoSize!=""){
				var size= videoSize.split(':');
				updateVideoSize(id,size[0],size[1]);
				return;
			}else{
				getVideoSize();
			}
		}catch(e){
			if(count>50){
				return;
			}
			getVideoSize();
		}
		},100);
}



// #####################�ڲ�����###########################
function PlayByUrl(url,postion,_width,_height){
	setTimeout(function(){
		var rtmpVideo = document.getElementById('RtmpVideo');
		try{
			count++;
			rtmpVideo.PlayByUrl(url,postion,_width,_height,0,0);
			getVideoSize();
		}catch(e){
			if(count>50){
				return;
			}
			PlayByUrl(url,postion,_width,_height);
		}
		},100);
}
function PlayPause(_pause){
	setTimeout(function(){
		var rtmpVideo = document.getElementById('RtmpVideo');
		try{
			count++;
			var currentPostion=rtmpVideo.PlayPause(_pause);
			//ִ�л�ȡ���Ž��ʱ��󷽷���
			currentPostion=currentPostion;
			//提交视频播放进度
			videorecord(id,currentPostion,voideTotalTime);
		}catch(e){
			if(count>50){
				return;
			}
			PlayPause();
		}
		},100);
}
function PlayStop(url){
	setTimeout(function(){
		var rtmpVideo = document.getElementById('RtmpVideo');
		try{
			count++;
			var currentPostion=rtmpVideo.PlayStop();
			//ִ�л�ȡ���Ž��ʱ��󷽷���
			currentPostion=currentPostion;
			//提交视频播放进度
			videorecord(id,currentPostion,voideTotalTime);
		}catch(e){
			if(count>50){
				return;
			}
			PlayStop();
		}
		},100);
}

function GetCurrentProgress(){
		var rtmpVideo = document.getElementById('RtmpVideo');
		try{
			var currentPostion=rtmpVideo.GetCurrentProgress();
			voideTotalTime=rtmpVideo.GetVideoTotalTime();
			//提交视频播放进度
			videorecord(id,currentPostion,voideTotalTime);
		}catch(e){
		}
}




function PlayStopForClose(){
	var rtmpVideo = document.getElementById('RtmpVideo');
	var currentPostion=rtmpVideo.PlayStop();
	videorecord(id,currentPostion,voideTotalTime);
}


//记录视频总时间以及播放进度时间
function videorecord(id,progressRecord,progressTime){
	var closeurl=requestUrl+'EduDataContentStudyRec.do?method=insertstudyrecvideo';
	$.ajax({
		type : "POST",
		url :closeurl,
		async:false,
		data:{progressRecord : progressRecord,
			progressTime:progressTime,
			eduDataContentId:id,
			source:openfrom,
			sourcePrimaryKey:openfromKey
			},
		dataType : "json",
		success : function(data) {
			if(data.tag=="success"){
				
			}else{
				alert(data.faild);
			}				
		},
		error : function(msg) {
		}
	});
}

//提交视频尺寸信息
function updateVideoSize(_id,_width,_height){
	var closeurl=requestUrl+'EduDataBase.do?method=updateVideoSize';
	$.ajax({
		type : "POST",
		url :closeurl,
		async:false,
		data:{id : _id,
			width:_width,
			height:_height
			},
		dataType : "json",
		success : function(data) {
			if(data.tag=="success"){
				
			}else{

			}				
		},
		error : function(msg) {
		}
	});
}
//
//select * from EduDataContentStudyRec where EduDataContentId='1da455333a1b4efc97e738ad2c89ab92' order by RecordTime desc 
//
//select *from EduDataContent where id='1da455333a1b4efc97e738ad2c89ab92'

