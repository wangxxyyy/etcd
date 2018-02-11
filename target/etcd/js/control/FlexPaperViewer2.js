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
		"id", "FlexPaperViewer",
		"quality", "high",
		"bgcolor", "#ffffff",
		"name", "FlexPaperViewer",
		"allowScriptAccess","sameDomain",
		"type", "application/x-shockwave-flash",
		"pluginspage", "http://www.adobe.com/go/getflashplayer"
	);
} else if (hasRequestedVersion) {
	AC_FL_RunContent(
			"src", "Js/control/FlexPaperViewer",
			"width", "100%",
			"height", "100%",
			"align", "middle",
			"id", "FlexPaperViewer",
			"quality", "high",
			"bgcolor", "#ffffff",
			"name", "FlexPaperViewer",
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
function SetFlexPaperViewerPath(path){
	setTimeout(function(){
		var flexPaperViewer = document.getElementById('FlexPaperViewer');
		try{
			if(flexPaperViewer.SetPdfPath(path)){
				return;
			}
		}catch(e){
			SetFlexPaperViewerPath(path);
		}
		},100);
}
