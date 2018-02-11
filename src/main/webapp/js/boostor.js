var boostorUeditorObj=null;
function boostorUeditor(){
	boostorUeditorObj=this;
	this.BufferHtml=null;
	this.BufferBackground=null;
	this.BufferBasepath=null;
	this.BufferPadding=null;
	this.Render=function(_tag,_basePath,_data,_background,_padding){
		this.BufferHtml=_data;
		this.BufferBasepath=_basePath;
		this.BufferBackground=_background;
		this.BufferPadding=_padding;
		if(_tag==null||_tag==undefined||_tag==""){
			return;
		}
		var iframeStr="<iframe width=\"100%\" id=\"boostorUeditor_0\" src=\""+_basePath+"Js/ueditor/show.html\" height=\"100%\" id=\"boostorueditor_0\" frameBorder=\"0\"></iframe>";
		$("#"+_tag).append(iframeStr);
	};
	this.SetContent=function(){
		var showObj=document.getElementById("boostorUeditor_0").contentWindow;
		showObj.setHTMLContent(this.BufferHtml,this.BufferBasepath,this.BufferBackground,this.BufferPadding);
	};
}