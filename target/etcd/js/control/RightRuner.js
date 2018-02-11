
function initflow(flowid,requestid,title,serverbase){
	var rightObject = document.getElementById('RightRuner');
	rightObject.initRightFlow(flowid,requestid,"nodeDBclick",title,serverbase);
}
function loadFlow(screen,xmlStr,isrunner,id,bj1,bj2,bj3,nodenames){
	var rightObject = document.getElementById('RightRuner');
	rightObject.loadFlow(screen,xmlStr,isrunner,id,bj1,bj2,bj3,nodenames);
}

function getFlowXML(){
	var rightObject = document.getElementById('RightRuner');
	return rightObject.getFlowXML();
}
function setNodeTextByMome(memo,content){
	var rightObject = document.getElementById('RightRuner');
	return rightObject.setNodeTextByMome(memo,content);
}
function setNodeTipByMome(memo,content){
	var rightObject = document.getElementById('RightRuner');
	return rightObject.setNodeTipByMome(memo,content);
}
/**
 * 增加FLEX按钮，并可以获取到XML
 * name:按钮名称
 * functionName:需要调用的JS方法名称，该JS方法需要带一个参数，flex会将XML传递
 * */
function addJSButton(name,functionName){
	var rightObject = document.getElementById('RightRuner');
	rightObject.addJSButton(name,functionName);
}

