var requiredMajorVersion = 11;
var requiredMinorVersion = 1;
var requiredRevision = 0;
var hasProductInstall = DetectFlashVer(6, 0, 65);
var hasRequestedVersion = DetectFlashVer(requiredMajorVersion, requiredMinorVersion, requiredRevision);

if ( hasProductInstall && !hasRequestedVersion ) {
	var MMPlayerType = (isIE == true) ? "ActiveX" : "PlugIn";
	var MMredirectURL = window.location;
    document.title = document.title.slice(0, 47) + " - Flash Player Installation";
    var MMdoctitle = document.title;

	AC_FL_RunContent(
		"src", "Js/control/playerProductInstall",
		"FlashVars", "MMredirectURL="+MMredirectURL+'&MMplayerType='+MMPlayerType+'&MMdoctitle='+MMdoctitle+"",
		"width", "100%",
		"height", "100%",
		"align", "middle",
		"id", "RightRunerDesigner",
		"quality", "high",
		"bgcolor", "#ffffff",
		"name", "RightRunerDesigner",
		"allowScriptAccess","sameDomain",
		"type", "application/x-shockwave-flash",
		"pluginspage", "http://www.adobe.com/go/getflashplayer"
	);
} else if (hasRequestedVersion) {
	AC_FL_RunContent(
			"src", "Js/control/RightRunerDesigner",
			"width", "100%",
			"height", "100%",
			"align", "middle",
			"id", "RightRunerDesigner",
			"quality", "high",
			"bgcolor", "#ffffff",
			"name", "RightRunerDesigner",
			"allowScriptAccess","sameDomain",
			"type", "application/x-shockwave-flash",
			"pluginspage", "http://www.adobe.com/go/getflashplayer"
	);
  } else {  
    var alternateContent = 'Alternate HTML content should be placed here. '
  	+ 'This content requires the Adobe Flash Player. '
   	+ '<a href=http://www.adobe.com/go/getflash/>Get Flash</a>';
    document.write(alternateContent);  // insert non-flash content
  }
function init(flowid){
	window.setTimeout("initflow('"+flowid+"')", 2000);
}
function initflow(flowid){
	addJSButton("保存","showXML");//增加按钮范例
	var rightObject = document.getElementById('RightRunerDesigner');
	rightObject.initRightFlow(flowid,"nodeDBclick");
}
function loadFlow(xmlStr){
	window.setTimeout("loadFlowTimeout('"+xmlStr+"')", 2000);
}

function loadFlowTimeout(xmlStr){
	var rightObject = document.getElementById('RightRunerDesigner');
	rightObject.loadFlow(xmlStr);
}

function getFlowXML(){
	var rightObject = document.getElementById('RightRunerDesigner');
	return rightObject.getFlowXML();
}

/**
 * 增加FLEX按钮，并可以获取到XML
 * name:按钮名称
 * functionName:需要调用的JS方法名称，该JS方法需要带一个参数，flex会将XML传递
 * */
function addJSButton(name,functionName){
	var rightObject = document.getElementById('RightRunerDesigner');
	rightObject.addJSButton(name,functionName);
}
/**
 * 增加按钮范例的回调
 * */
/*
function showXML(ruselt){
	alert(ruselt);
}
*/

/**
 * FLEX节点双击响应的JS事件
 * id:节点id
 * type:节点类型
 * 如需要扩展参数需要在FLEX里面进行扩展
 * */
/*function nodeDBclick(id,type){
	alert(id);
	alert(type);
}
*/
