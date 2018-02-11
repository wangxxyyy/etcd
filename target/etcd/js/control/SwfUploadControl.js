/**
 * SWFUpload上传封装类
 * _uploadurl:附件上传后台action Url；
 * _progressTarget：界面显示
 * SWFUpload_0_0
 */
var _swfUploadControl=new Array();
var _swfUploadObjIndex=0;
//,_queueStatus,_exitFileDiv,_exitFiles, _buttonwidth, _buttonheight, _params
function SwfUploadControl(_baseUrl,_uploadurl, _progressTarget, _cancelButtonId,
		_placeholderid, _buttonwidth, _buttonheight,_filetypes) {
	this.swfup=null;
	this.idArray=new Array();
	this.uploadurl=_uploadurl;
	this.progressTarget=_progressTarget;
	this.cancelButtonId=_cancelButtonId;
	this.placeholderid=_placeholderid;
	this.buttonwidth=_buttonwidth;
	this.buttonheight=_buttonheight;
	this.params=null;
	_swfUploadControl.push(this);
	this.swfUploadObjId=null;
	
	this.queueStatus=null;
	this.exitFileDiv=null;
	this.exitFiles=null;
	this.selectFileCount=0;
	this.queuecomplete=false;
	this.haveStartUpload=false;
	this.hiddenInputId=null;
	
	this.filetypes="*.*";
	
	if(_filetypes!=null&&_filetypes!=undefined&&_filetypes!=""){
		this.filetypes=_filetypes;
	}
	
	
	this.settings = {
		flash_url : "Js/swfupload/swfupload.swf",
		upload_url : _uploadurl,
		post_params : this.params,
		file_size_limit : "0",
		file_types : this.filetypes,
		file_types_description : "All Files",
		file_upload_limit : 100,
		file_queue_limit : 0,
		custom_settings : {
			progressTarget : this.progressTarget,
			cancelButtonId : this.cancelButtonId
		},
		debug : false,

		// Button Settings
		button_image_url : _baseUrl+"Js/swfupload/images/add.png",
		button_text:"选取多个文件",
		button_text_left_padding:20,
		button_height:18,
		button_width:100,
		button_placeholder_id : this.placeholderid,
		button_text_style:".button { font-family: Helvetica, Arial, sans-serif; font-size: 12pt; } .buttonSmall { font-size: 10pt; }",
		//button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,
		button_cursor: SWFUpload.CURSOR.HAND,
		//button_width : this.buttonwidth == null ? 61 : this.buttonwidth,
		//button_height : this.buttonheight == null ? 22 : this.buttonheight,

		// The event handler functions are defined in handlers.js
		file_queued_handler : fileQueued,
		file_queue_error_handler : fileQueueError,
		upload_start_handler : uploadStart,
		upload_progress_handler : uploadProgress,
		upload_error_handler : uploadError,
		queue_complete_handler : queueComplete,
		upload_success_handler : uploadSuccess,
		file_dialog_complete_handler : fileDialogComplete,
		swfupload_loaded_handler : null
	};
	
	/**
	 * 附件上传控件初始化
	 */
	this.initSwfUpload = function() {
		this.swfup = new SWFUpload(this.settings);
		this.swfUploadObjId="SWFUpload_"+_swfUploadObjIndex;
		_swfUploadObjIndex++;
	};
	
	/**
	 * 开始文件上传
	 */
	this.startUpload=function(){
		this.swfup.startUpload();
		this.haveStartUpload=true;
	};
	this.cancelQueue=function(){
		this.swfup.cancelQueue();
	};
	
	
	
	this.setQueueStatus=function(_queueStatus){
		this.queueStatus=_queueStatus;
	};
	this.setExitFileDiv=function(_exitFileDiv){
		this.exitFileDiv=_exitFileDiv;
	};
	this.setExitFiles=function(_exitFiles){
		this.exitFiles=_exitFiles;
	};
	this.setParams=function(_params){
		this.params=_params;
		if(this.params==null||this.params==undefined){
			return ;
		}
		this.settings["post_params"]=this.params;
	};	
	this.setHiddenInputId=function(id){
		this.hiddenInputId=id;
	};
	
	
	
	
	/**
	 * 附件上传完成后更新上传信息
	 */
	this.setQueueStatus=function(numFilesUploaded) {
		this.queuecomplete=true;
		if(this.hiddenInputId!=null&&this.hiddenInputId!=undefined){
			var docids = document.getElementById(this.hiddenInputId);
			docids.value=this.getIdArray();
		}
		
		if(this.queueStatus!=null&&this.queueStatus!=undefined){
			var status = document.getElementById(this.queueStatus);
			status.innerHTML = numFilesUploaded + " 附件" + (numFilesUploaded === 1 ? "" : "s") + "上传成功";
		}
		
	};
	
	/**
	 * 设置文件选择对话框选择文件数量
	 */
	this.setSelectFileCount=function(num){
		this.selectFileCount+=num;
	};
	
	
	/**
	 * 获取当前SWFUpload对象ID
	 */
	this.getSwfUploadId=function(){
		return this.swfUploadObjId;
	};
	
	/**
	 * 添加附件上传后得到的附件主键ID
	 */
	this.idArrayPush=function(id){
		if(this.idArray==null||this.idArray==undefined){
			this.idArray=new Array();
		}
		var tempid=eval("("+id+")");
		if(tempid==null||tempid.length<1){
			return;
		}
		for(var j=0;j<tempid.length;j++){
			var isExit=false;
			for(var i=0;i<this.idArray.length;i++){
				if(this.idArray[i]==tempid[j]){
					isExit=true;
				}
			}
			if(isExit){
				continue;
			}else{
				this.idArray.push(tempid[j]);
			}
		}
		
	};
	
	/**
	 * 获取文件是否上传完成
	 */
	this.getQueueComplete=function(){
		if(this.selectFileCount==null||this.selectFileCount<1){
			return true;
		}
		return this.queuecomplete;
	};
	
	/**
	 * 获取全部附件主键，主键之间使用;分割
	 */
	this.getIdArray=function(){
		return this.idArray.join(";");
	};
	
	
	/**
	 * 重新设置已经存在的附件数据
	 */
	this.setExitFilesData=function(data){
		this.exitFiles=data;
	};
	/**
	 * 根据已经上传的附件画出附件列表；
	 */
	this.drawExitFile=function(){
		if(this.exitFiles==null||this.exitFiles==undefined){
			return;
		}
		if(this.exitFiles.length<1){
			return;
		}
		if(this.exitFileDiv==null||this.exitFileDiv==undefined||this.exitFileDiv==""){
			return;
		}
		var docExitFileDiv=document.getElementById(this.exitFileDiv);
		if(docExitFileDiv==null||docExitFileDiv==undefined){
			return;
		}
		
		var HTMLData=new Array();
		HTMLData.push("<table width=\"100%\" border=\"1\" cellspacing=\"0\" cellpadding=\"0\">");
		HTMLData.push("<colgroup><col width=\"50%\"></col><col width=\"25%\"></col><col width=\"25%\"></col></colgroup>");
		for(var i=0;i<this.exitFiles.length;i++){
			HTMLData.push("<tr>");
			HTMLData.push("<td>");
			HTMLData.push(this.exitFiles[i].name);
			HTMLData.push("</td>");
			HTMLData.push("<td>");
			HTMLData.push("<a href=\"javascript:void(0)\" onclick=\"downloadClick(\""+this.exitFiles[i].url+"\");\">下载</a>");
			HTMLData.push("</td>");
			HTMLData.push("<td>");
			HTMLData.push("<a href=\"javascript:void(0)\" onclick=\"deleteClick(\""+this.exitFiles[i].id+"\");\">删除</a>");
			HTMLData.push("</td>");
			HTMLData.push("</tr>");
		}
		HTMLData.push("</table>");
		docExitFileDiv.innerHTML=HTMLData.join(" ");
	};
	
	this.HaveFiles=function(){
		var file=this.swfup.getFile(0);
		if(file==null){
			return false;
		}else{
			return true;
		}
	};
	this.reSetUploadLimit=function(_num){
		if(_num==null||_num==""){
			return;
		}
		window.setTimeout(function(){
			this.swfup.setFileUploadLimit(_num);
		}, 100);
	};
	
	this.reSetFileTypes=function(_num,_description){
		if(_num==null||_num==""){
			return;
		}
		window.setTimeout(function(){
			this.swfup.setFileTypes(_num,_description);
		}, 100);
	};
}












/**
 * 上传操作--实现等待附件上传完成后执行表单提交操作
 * @param callback 附件上传完成后执行回调事件
 */
var currentUploadIndex=0;
function btStartAllUpload(callback){
	setTimeout(function(){
		if(_swfUploadControl.length>currentUploadIndex){
			var currentUpload=_swfUploadControl[currentUploadIndex];
			if(!currentUpload.haveStartUpload){
				currentUpload.startUpload();
				btStartAllUpload(callback);
			}else if(currentUpload.getQueueComplete()){
				currentUploadIndex++;
				btStartAllUpload(callback);
			}else{
				btStartAllUpload(callback);
			}
		}else{
			callback();
			return;
		}
	},100);
}


/**
 * 根据ID获取SWFUpload对象
 * @param id
 * @returns
 */
function getSwfUpload(id){
	if(_swfUploadControl==null){
		_swfUploadControl=new Array();
	}
	
	for(var i=0;i<_swfUploadControl.length;i++){
		var item=_swfUploadControl[i];
		var tempId=id.substring(0,item.getSwfUploadId().length);
		if(item.getSwfUploadId()==tempId){
			return item;
		}
	}
}

/**
 * SWFUpload回调函数
 * @param file
 * @param server
 * @param received
 */
function uploadSuccess(file, server, received){
 	var progress = new FileProgress(file,this.customSettings.progressTarget);
	progress.setComplete();
	progress.setStatus("文件已上传完成!");
	progress.toggleCancel(false);
	
	if(_swfUploadControl==null){
		_swfUploadControl=new Array();
	}
	
	var obj=getSwfUpload(file.id);
	obj.idArrayPush(server);
}
/**
 * SWFUpload回调函数
 * @param object
 * @param numFilesUploaded
 */
function queueComplete(object,numFilesUploaded) {
	if(_swfUploadControl==null){
		_swfUploadControl=new Array();
	}
	var obj=getSwfUpload(object.movieName);
	obj.setQueueStatus(numFilesUploaded);
}

/**
 * SWFUpload回调函数
 * @param object
 * @param selected
 * @param queued
 * @param total
 */
function fileDialogComplete(object,selected, queued, total){
	var obj=getSwfUpload(object.movieName);
	obj.setSelectFileCount(total);
	if (total > 0) {
		document.getElementById(this.customSettings.cancelButtonId).disabled = false;
	}
};
