/**
 * 对Ztree封装
 * zqz
 * 如果要修改请讨论
 */
var ztreeControlinstance;
function ZtreeControl(treeid,baseurl,treeclick){
	this.treeId = treeid;
    this.firstNode=null;
    this.firstNodeId="";
    this.baseUrl = baseurl;
    this.treeObj = null;
    this.currentid = "";
    this.treeclick = treeclick;
    ztreeControlinstance = this;
    this.serverURL = "";
	this.setting = {
			view: {
				dblClickExpand : false
			},
			check : {  
		        enable : false  
		    },  
		    data : {  
		        simpleData : {  
		            enable : true  
		        }  
		    },callback: {
		    	onClick: this.treeclick,
		    	onNodeCreated: null
            }
	 };
	 this.loadingZtree = function(url){
		this.serverURL = this.baseUrl+url;
		$.ajax({
	     	type: "POST",
    		url:  this.serverURL,
     		dataType:"json",
     		success:function(data){
     			if(data==null){
     				return;
     			}
     			if(data==null||data.length<1){
     				return;
     			}
     			ztreeControlinstance.firstNodeId=data[0].id;
	  	  		$.fn.zTree.init($("#"+ztreeControlinstance.treeId),ztreeControlinstance.setting,data);
	  	  		ztreeControlinstance.treeObj =  $.fn.zTree.getZTreeObj(ztreeControlinstance.treeId);
	  	  		ztreeControlinstance.setSelectByid(ztreeControlinstance.firstNodeId);
	     	}
			});
	  };
	  this.setSelectByid = function(id){
		    if(id==null||id==""||id.length<0){
		    	id = ztreeControlinstance.firstNodeId;
		    }
			var selectObj=this.treeObj.getNodeByParam("id", id, null);
			this.treeObj.selectNode(selectObj,false);
			this.treeObj.expandNode(selectObj);
			var self = this;
			window.setTimeout(function(){
				self.treeclick(null,id, selectObj, null);
			}, 500)
			
	  };
	  this.setSelectByidNoClick = function(id){
			var selectObj=this.treeObj.getNodeByParam("id", id, null);
			this.treeObj.selectNode(selectObj,false);
			this.treeObj.expandNode(selectObj);
	  };
	  this.getParentById = function(id){
		  var selectObj=this.treeObj.getNodeByParam("id", id, null);
		  if(selectObj.getParentNode()!=null){
			 return  selectObj.getParentNode();
		  }else{
			  return null;
		  }
	  };
	  this.refresh = function(id){
		  $.ajax({
		     	type: "POST",
	    		url:  this.serverURL,
	     		dataType:"json",
	     		success:function(data){
	     			ztreeControlinstance.firstNodeId=data[0].id;
		  	  		$.fn.zTree.init($("#"+ztreeControlinstance.treeId),ztreeControlinstance.setting,data);
		  	  		ztreeControlinstance.treeObj =  $.fn.zTree.getZTreeObj(ztreeControlinstance.treeId);
		  	  		ztreeControlinstance.setSelectByid(id);
		     	}
				});
	  };
	  this.refreshNoclick = function(id){
		  $.ajax({
		     	type: "POST",
	    		url:  this.serverURL,
	     		dataType:"json",
	     		success:function(data){
	     			ztreeControlinstance.firstNodeId=data[0].id;
		  	  		$.fn.zTree.init($("#"+ztreeControlinstance.treeId),ztreeControlinstance.setting,data);
		  	  		ztreeControlinstance.treeObj =  $.fn.zTree.getZTreeObj(ztreeControlinstance.treeId);
		  	  		ztreeControlinstance.setSelectByidNoClick(id);
		     	}
				});
	  };
}