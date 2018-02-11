/**
 * 各个目录权限控制类
 * zqz
 * 如要修改请小组讨论后修改
 * 类构造方法参数说明：_id(当前目录的id),_baseUrl(工程访问地址)
 * 权限判断 type: "0":完全控制 ;"1":编辑权限;"2":共享权限;"3":添加内容;"4":定向学习;"5":目录默认共享 ;"6":目录默认定向 
 */
var EduPermitInstance;
var diag = null;
function EduPermit(_id,_baseUrl,_permiType){
	this.id = _id;
	this.baseurl = _baseUrl;
	this.EduPermitServerUrl = "EduPermitManage.do";
	EduPermitInstance = this;
	this.eduManageTable = null;
	///管理权限
	this.structureType = "4";//默认范围类型为人员
	this.permiType = _permiType;
	this.classify = null;
	this.safelevel = null;
	this.safetr = null;
	this.shownametd = null;
	this.selectDataId = null;
	this.currentPermit = null;
	this.PPermit = "-9;";
	this.selectPermType = null;
	///定向权限
	this.dxCurrentPermit = null;
	this.eduManageTable2 = null;
	///资料默认共享权限
	this.mrCurrentPermit = null;
	this.eduManageTable3 = null;
	///资料上传权限
	this.scCurrentPermit = null;
	this.eduManageTable4 = null;
	///资料默认定向权限
	this.mrdxCurrentPermit = null;
	this.eduManageTable5 = null;
	this._edupermitid = "";
	//主键拥有的权限-不带人员的查询；
	this.noPersonPermit=null;
	//来源
	this.source=null;
	
	this.getAjaxUrl = function(method){
		return this.baseurl + this.EduPermitServerUrl+"?method="+method;
	};
	
	this.getEduPermitData = function(){
		document.getElementById("primtdata_div").style.display = "block";
		document.getElementById("qxselect_div").style.display = "none";
	    $.ajax({
			type : "POST",
			url :this.getAjaxUrl("permquerymanage"),
		    data: {directoryId:this.id},
			dataType : "json",
			success : function(data) {
				EduPermitInstance.drawPermit(data);
			},
			error : function(msg) {
				 alert("权限获取失败，请检查网络或重新登录");
				 return;
			}
		});
		
	};
	this.drawPermitType = function(){
		//#################张兴林于2014年5月21日修改（系统集成后无法显示下拉列表）###############
		$(eduPermittype).html(this.getPermiType("0")); 
		//eduPermittype.innerHTML = this.getPermiType();
		//#################张兴林于2014年5月21日修改（系统集成后无法显示下拉列表）###############
	};
	this.drawPermit = function(data){
		var eduManagertr= new Array();
		/*
		eduManagertr.push('<tr class="title"><td width="40%" style="text-align:left"><input onclick="selectAll(this,\'0\');" id="select_all" type="checkbox">角色名称</td><td width="20%">范围类型</td><td width="20%">权限类型</td><td width="10%">权限范围</td><td width="10%" align="left">操作</a></td></tr>');
		*/
		eduManagertr.push('<tr class="title"><td width="40%" style="text-align:left"><input onclick="selectAll(this,\'0\');" id="select_all" type="checkbox">角色名称</td><td width="20%">范围类型</td><td width="20%">权限类型</td><td width="10%">权限范围</td></tr>');
		
		var eduManagertr2= new Array();
		eduManagertr2.push('<tr class="title"><td width="40%" style="text-align:left"><input onclick="selectAll(this,\'1\');" id="select_all" type="checkbox">角色名称</td><td width="20%">范围类型</td><td width="20%">权限类型</td><td width="20%">权限范围</td></tr>');
		
		var eduManagertr3= new Array();
		eduManagertr3.push('<tr class="title"><td width="40%" style="text-align:left"><input onclick="selectAll(this,\'2\');" id="select_all" type="checkbox">角色名称</td><td width="20%">范围类型</td><td width="20%">权限类型</td><td width="20%">权限范围</td></tr>');
		
		var eduManagertr4= new Array();
		eduManagertr4.push('<tr class="title"><td width="40%" style="text-align:left"><input onclick="selectAll(this,\'3\');" id="select_all" type="checkbox">角色名称</td><td width="20%">范围类型</td><td width="20%">权限类型</td><td width="20%">权限范围</td></tr>');
		
		var eduManagertr5= new Array();
		eduManagertr5.push('<tr class="title"><td width="40%" style="text-align:left"><input onclick="selectAll(this,\'4\');" id="select_all" type="checkbox">角色名称</td><td width="20%">范围类型</td><td width="20%">权限类型</td><td width="20%">权限范围</td></tr>');
		if(data.rows!=null&&data.total>0){
			var result = data.rows;
			var edupermit;
			this.currentPermit = new Array();
			this.dxCurrentPermit = new Array();
			this.scCurrentPermit = new Array();
			this.mrCurrentPermit = new Array();
			this.mrdxCurrentPermit = new Array();
			for(var i=0;i<result.length;i++){
				edupermit = result[i];
				if(edupermit.classify=="4"||edupermit.classify=="2"){
					if((eduManagertr2.length-1)%2==0){
						eduManagertr2.push('<tr name="tr0"><td width="40%" style="text-align:left"><input onclick="chanageBox(this);" type="checkbox" id="'+edupermit.id+'"/>&nbsp;'+edupermit.structureIdFormat+'</td><td width="20%">'+edupermit.structureTypeFormat+'</td><td width="20%">'+edupermit.classifyFormat+'</td><td width="20%">'+edupermit.safeRangeFormat+'</td></tr>');
					}else{
						eduManagertr2.push('<tr name="tr1" class="change"><td width="40%" style="text-align:left"><input onclick="chanageBox(this);" type="checkbox" id="'+edupermit.id+'"/>&nbsp;'+edupermit.structureIdFormat+'</td><td width="20%">'+edupermit.structureTypeFormat+'</td><td width="20%">'+edupermit.classifyFormat+'</td><td width="20%">'+edupermit.safeRangeFormat+'</td></tr>');
					}
					this.dxCurrentPermit.push(edupermit.id);
				}else if(edupermit.classify=="5"){
					if((eduManagertr3.length-1)%2==0){
						eduManagertr3.push('<tr name="tr0"><td width="40%" style="text-align:left"><input onclick="chanageBox(this);" type="checkbox" id="'+edupermit.id+'"/>&nbsp;'+edupermit.structureIdFormat+'</td><td width="20%">'+edupermit.structureTypeFormat+'</td><td width="20%">'+edupermit.classifyFormat+'</td><td width="20%">'+edupermit.safeRangeFormat+'</td></tr>');
					}else{
						eduManagertr3.push('<tr name="tr1" class="change"><td width="40%" style="text-align:left"><input onclick="chanageBox(this);" type="checkbox" id="'+edupermit.id+'"/>&nbsp;'+edupermit.structureIdFormat+'</td><td width="20%">'+edupermit.structureTypeFormat+'</td><td width="20%">'+edupermit.classifyFormat+'</td><td width="20%">'+edupermit.safeRangeFormat+'</td></tr>');
					}
					this.mrCurrentPermit.push(edupermit.id);
				}else if(edupermit.classify=="3"){
					if((eduManagertr4.length-1)%2==0){
						eduManagertr4.push('<tr name="tr0"><td width="40%" style="text-align:left"><input onclick="chanageBox(this);" type="checkbox" id="'+edupermit.id+'"/>&nbsp;'+edupermit.structureIdFormat+'</td><td width="20%">'+edupermit.structureTypeFormat+'</td><td width="20%">'+edupermit.classifyFormat+'</td><td width="20%">'+edupermit.safeRangeFormat+'</td></tr>');
					}else{
						eduManagertr4.push('<tr name="tr1" class="change"><td width="40%" style="text-align:left"><input onclick="chanageBox(this);" type="checkbox" id="'+edupermit.id+'"/>&nbsp;'+edupermit.structureIdFormat+'</td><td width="20%">'+edupermit.structureTypeFormat+'</td><td width="20%">'+edupermit.classifyFormat+'</td><td width="210%">'+edupermit.safeRangeFormat+'</td></tr>');
					}
					this.scCurrentPermit.push(edupermit.id);
				}else if(edupermit.classify=="6"){
					if((eduManagertr5.length-1)%2==0){
						eduManagertr5.push('<tr name="tr0"><td  style="text-align:left" width="40%"><input onclick="chanageBox(this);" type="checkbox" id="'+edupermit.id+'"/>&nbsp;'+edupermit.structureIdFormat+'</td><td width="20%">'+edupermit.structureTypeFormat+'</td><td width="20%">'+edupermit.classifyFormat+'</td><td width="20%">'+edupermit.safeRangeFormat+'</td></tr>');
					}else{
						eduManagertr5.push('<tr name="tr1" class="change"><td  style="text-align:left" width="40%"><input onclick="chanageBox(this);" type="checkbox" id="'+edupermit.id+'"/>&nbsp;'+edupermit.structureIdFormat+'</td><td width="20%">'+edupermit.structureTypeFormat+'</td><td width="20%">'+edupermit.classifyFormat+'</td><td width="20%">'+edupermit.safeRangeFormat+'</td></tr>');
					}
					this.mrdxCurrentPermit.push(edupermit.id);
				}else{
					if((eduManagertr.length-1)%2==0){
						eduManagertr.push('<tr name="tr0"><td  style="text-align:left" width="40%"><input onclick="chanageBox(this);" type="checkbox" id="'+edupermit.id+'"/>&nbsp;'+edupermit.structureIdFormat+'</td><td width="20%">'+edupermit.structureTypeFormat+'</td><td width="20%">'+edupermit.classifyFormat+'</td><td width="20%">'+edupermit.safeRangeFormat+'</td></tr>');
					}else{
						eduManagertr.push('<tr name="tr1" class="change"><td  style="text-align:left" width="40%"><input onclick="chanageBox(this);" type="checkbox" id="'+edupermit.id+'"/>&nbsp;'+edupermit.structureIdFormat+'</td><td width="20%">'+edupermit.structureTypeFormat+'</td><td width="20%">'+edupermit.classifyFormat+'</td><td width="20%">'+edupermit.safeRangeFormat+'</td></tr>');
					}
					/*
					if((eduManagertr.length-1)%2==0){
						eduManagertr.push('<tr name="tr0"><td style="text-align:left" width="40%"><input onclick="chanageBox(this);" type="checkbox" id="'+edupermit.id+'"/>&nbsp;'+edupermit.structureIdFormat+'</td><td width="20%">'+edupermit.structureTypeFormat+'</td><td width="20%">'+edupermit.classifyFormat+'</td><td width="10%">'+edupermit.safeRangeFormat+'</td><td width="10%" align="left"><img style="margin-top:-3px" align="absmiddle" src="Images/images/icon_7.png" /> <a style="cursor:hand" onclick="chanageSelect(\''+edupermit.id+'\',\''+edupermit.classify+'\')" class="edit">编辑</a></td></tr>');
					}else{
						eduManagertr.push('<tr name="tr1" class="change"><td width="40%" style="text-align:left"><input onclick="chanageBox(this);" type="checkbox" id="'+edupermit.id+'"/>&nbsp;'+edupermit.structureIdFormat+'</td><td width="20%">'+edupermit.structureTypeFormat+'</td><td width="20%">'+edupermit.classifyFormat+'</td><td width="10%">'+edupermit.safeRangeFormat+'</td><td width="10%" align="left"><img style="margin-top:-3px" align="absmiddle" src="Images/images/icon_7.png" /> <a style="cursor:hand" onclick="chanageSelect(\''+edupermit.id+'\',\''+edupermit.classify+'\')" class="edit">编辑</a></td></tr>');
					}
					*/
					this.currentPermit.push(edupermit.id);
					}
				}
		}
		//#################张兴林于2014年5月21日修改（系统集成到平台后执行报错：未知的运行时异常）###############
		$(eduManageTable).html(eduManagertr.join("")); 
		$(eduManageTable2).html(eduManagertr2.join(""));
		$(eduManageTable3).html(eduManagertr3.join(""));
		$(eduManageTable4).html(eduManagertr4.join(""));
		$(eduManageTable5).html(eduManagertr5.join(""));
		if((this.checkPermit("1")||this.checkPermit("2"))&&!this.checkPermit("0")){
			 var _input = document.getElementsByTagName("input");
			 for(var i=0;i<_input.length;i++){
				 _input[i].style.display = "none";
			 }
		}
		/*
		this.eduManageTable.innerHTML = eduManagertr.join("");
		this.eduManageTable2.innerHTML = eduManagertr2.join("");
		this.eduManageTable3.innerHTML = eduManagertr3.join("");
		*/
		//#################张兴林于2014年5月21日修改（系统集成到平台后执行报错：未知的运行时异常）###############
	};
	
	
	
	this.opendialog = function (){
		var companyurl=this.baseurl+"Hrm/StructureCompany.jsp";
		var subcompanyurl=this.baseurl+"Hrm/StructureSubCompany.jsp";
		var departmenturl=this.baseurl+"Hrm/StructureDepartment.jsp";
		var persionurl=this.baseurl+"Hrm/StructurePerson.jsp";
		var showurl="";
		var _type;
		_type = this.structureType;	
		switch(_type){
			case "4":
				showurl=persionurl;
				dialogtitle="人员选择";
				break;
			case "1":
				dialogtitle="全委选择";
				showurl=companyurl;
				break;
			case "2":
				dialogtitle="分部选择";
				showurl=subcompanyurl;
				break;
			case "3":
				dialogtitle="部门选择";
				showurl=departmenturl;
				break;
			default:
				break;
		}
		
		if(diag==null){
			diag=new Dialog();
		}
		diag.Title = dialogtitle;
		diag.Width = 750;
		diag.Height = 500;
		diag.URL = showurl;
		diag.ShowButtonRow=false;
		diag.OKEvent = function(){setDialogCallBackData(diag.innerFrame.contentWindow.getData(),"");diag.close();};
		diag.show();
		return;
	};
	this.opendialogSelect = function (id,currentPermit){
		var showurl = this.baseurl+"Education/permit/selectTypeChanage.jsp?perimttype="+this.permiType+"&currentPermit="+currentPermit+"&id="+id;
		if(diag==null){
			diag=new Dialog();
		}
		diag.Title = "编辑权限";
		diag.Width = 300;
		diag.Height = 200;
		diag.URL = showurl;
		diag.ShowButtonRow=false;
		diag.OKEvent = function(){setDialogCallBackData(diag.innerFrame.contentWindow.getData(),"yes");diag.close();};
		diag.show();
	}
	this.getPermiType = function(type){
		var typeTemp = this.permiType.split(";");
		var result = "";
		if(type=="0"){
			for(var i=0;i<typeTemp.length;i++){
				switch(typeTemp[i]){
				case "0":
					result+="<option value='0'>完全控制</option>";
					break;
				case "1":
					result+="<option value='1'>编辑权限</option>";
					break;
				default:
					break;
				}
			}
		}else if(type=="1"){
			if(this.permiType.indexOf("4")>-1){
				result+="<option value='4'>定向</option>";
			}
			if(this.permiType.indexOf("2")>-1){
				result+="<option value='2'>共享</option>";
			}
		}
		return result;
	};
	
	this.setSelectName = function(data){
		if (data == null || data == "") {
			return;
		}
		var selectData = eval("("+data+")");
		if (selectData.data == null || selectData.data.length < 1) {
			return;
		}
		this.selectDataId = new Array();
		var seletHTML = new Array();
		for (var i = 0; i < selectData.data.length; i++) {
			seletHTML.push(selectData.data[i].value);
			this.selectDataId.push(selectData.data[i].key);
		}
		this.shownametd.innerHTML = seletHTML.join(";");
	};
	this.savaPermit = function(){
		type = this.selectPermType;
		var _classify = null;
		var _safeRange =  null;
		var _structureType = null;
		var _selectDataIds = null;
		var _source = null;
		if(this.selectDataId==null||this.selectDataId.length<=0){
				alert("请选择范围类型后添加!");
				return;
		}
		if(this.selectPermType=="0"||this.selectPermType=="4"){
			_classify =  this.classify[this.classify.selectedIndex].value;
		}else{
			_classify =  this.selectPermType;
		}
		_safeRange =  this.safelevel[this.safelevel.selectedIndex].value;
		_structureType = this.structureType;
		_selectDataIds = this.selectDataId.join(";");
		_source = this.source;
	    $.ajax({
			type : "POST",
			url :this.getAjaxUrl("saveorupdate"),
		    data: {directoryId:this.id,structureId:_selectDataIds,classify:_classify,safeRange:_safeRange,structureType:_structureType,sourceFlag:_source},
			dataType : "json",
			success : function(data) {
				alert("添加成功！");
				EduPermitInstance.clear();
				EduPermitInstance.getEduPermitData();
			},
			error : function(msg) {
				 alert("添加失败，请检查网络或重新登录");
				 return;
			}
		});
		
	};
	this.deletePermit = function(type){
		var ids = "";
		if(type=="0"){
			if(this.currentPermit==null||this.currentPermit.length<=0)return;
			for(var i=0;i<this.currentPermit.length;i++){
				if(document.getElementById(this.currentPermit[i]).checked){
					ids+=this.currentPermit[i]+";";
				}
			}
		}else if(type=="1"){
			if(this.dxCurrentPermit==null||this.dxCurrentPermit.length<=0)return;
			for(var i=0;i<this.dxCurrentPermit.length;i++){
				if(document.getElementById(this.dxCurrentPermit[i]).checked){
					ids+=this.dxCurrentPermit[i]+";";
				}
			}
			
		}else if(type=="2"){
			if(this.mrCurrentPermit==null||this.mrCurrentPermit.length<=0)return;
			for(var i=0;i<this.mrCurrentPermit.length;i++){
				if(document.getElementById(this.mrCurrentPermit[i]).checked){
					ids+=this.mrCurrentPermit[i]+";";
				}
			}
			
		}else if(type=="3"){
			if(this.scCurrentPermit==null||this.scCurrentPermit.length<=0)return;
			for(var i=0;i<this.scCurrentPermit.length;i++){
				if(document.getElementById(this.scCurrentPermit[i]).checked){
					ids+=this.scCurrentPermit[i]+";";
				}
			}
			
		}else if(type=="4"){
			if(this.mrdxCurrentPermit==null||this.mrdxCurrentPermit.length<=0)return;
			for(var i=0;i<this.mrdxCurrentPermit.length;i++){
				if(document.getElementById(this.mrdxCurrentPermit[i]).checked){
					ids+=this.mrdxCurrentPermit[i]+";";
				}
			}
			
		}
		if(ids!=""&&ids.length>2){
			$.ajax({
				type : "POST",
				url :this.getAjaxUrl("delete"),
			    data: {id:ids},
				dataType : "json",
				success : function(data) {
					alert("范围类型删除成功！");
					EduPermitInstance.getEduPermitData();
				},
				error : function(msg) {
					 alert("范围类型删除失败，请检查网络或重新登录");
					 return;
				}
			});
		}else{
			 alert("请先选择要删除的范围类型!");
		}
		
	};
	this.updataPermit = function(currentid,selecttype){
		 $.ajax({
				type : "POST",
				url :this.getAjaxUrl("updataClassifyById"),
			    data: {id:currentid,classify:selecttype},
				dataType : "json",
				success : function(data) {
					alert("范围类型修改成功！");
					EduPermitInstance.clear();
					EduPermitInstance.getEduPermitData();
				},
				error : function(msg) {
					 alert("权限修改失败，请检查网络或重新登录");
					 return;
				}
			});
	};
	this.clear = function(){
			this.shownametd.innerHTML = "";
			this.selectDataId = null;
	};
	this.initPermitContorl = function(){
		this.eduManageTable = document.getElementById("eduManageTable");
		this.structureType = "4";
		this.permiType = _permiType;
		this.classify = document.getElementById("eduPermittype");
		this.safelevel = document.getElementById("safelevel");
		this.safetr = document.getElementById("safetr");
		this.shownametd = document.getElementById("shownametd");
		
		this.source = document.getElementById("source").value;
		
		this.eduManageTable2 = document.getElementById("eduManageTable2");		
		this.eduManageTable3 = document.getElementById("eduManageTable3");
		this.eduManageTable4 = document.getElementById("eduManageTable4");
		this.eduManageTable5 = document.getElementById("eduManageTable5");
		this.getEduPermitData();
		this.drawPermitType();
	};
	this.initPPermit = function(eduid){
		if(this._edupermitid!=eduid){
			this.PPermit = this.getPPermit(eduid);
			_edupermitid = eduid;
		}
	};
	this.getPPermit = function(eduid){
		var _permit;
		$.ajax({
			type : "POST",
			url :this.getAjaxUrl("queryPermByid"),
		    data: {id:eduid},
			dataType : "json",
			async:false,
			success : function(data) {
				if(data!=null&&data.data!=null){
					_permit = data.data.join(";");
				}else{
					_permit = "-9";
				}
				
			},
			error : function(msg) {
				 _permit = "-9;"
				 alert("获取权限失败，请检查网络或重新登录");
				 return;
			}
		});
		return _permit;
	};
	this.checkPermit = function(type){
		//权限判断 type: "0":完全控制 ;"1":编辑权限;"2":共享权限;"3":添加内容;"4":定向学习;"5":目录默认
		var result = false;
		if(this.PPermit.indexOf(type)>-1){
			result = true;
		}
		return result;
	};
	
	///############张兴林添加--用于判断专题等是否已经设置相关权限；###################################
	this.initPermitNoPerson=function(eduid){
		this.noPersonPermit=null;
		this.noPersonPermit=this.getNoPersonPermit(eduid);
	};
	
	this.permitExitChect=function(type){
		if(type==null||type==""||type==undefined){
			return false;
		}
		if(this.noPersonPermit==null){
			return null;
		}
		var temptypes=type.split(",");
		for(var i=0;i<temptypes.length;i++){
			if(this.noPersonPermit.indexOf(temptypes[i])>-1){
				return true;
			}
		}
		return false;
	};
	this.getNoPersonPermit = function(eduid){
		var _permit;
		$.ajax({
			type : "POST",
			url :this.getAjaxUrl("queryPermByidNoPerson"),
		    data: {id:eduid},
			dataType : "json",
			async:false,
			success : function(data) {
				if(data!=null&&data.data!=null&&data.tag=="success"){
					_permit = data.data.join(";");
				}else{
					_permit = "-9";
				}
			},
			error : function(msg) {
				 _permit = "-9;"
				 alert("获取权限失败，请检查网络或重新登录");
				 return;
			}
		});
		return _permit;
	};
	///###############################################
	
}
function opendialog(){
	EduPermitInstance.opendialog();
}

function righttypeChange(obj){
		var selectbutton = document.getElementById("selectbutton");
		selectbutton.style.display = "block";
		if(EduPermitInstance.structureType!=obj[obj.selectedIndex].value){
			EduPermitInstance.shownametd.innerHTML = "";
			EduPermitInstance.selectDataId = null;
		}
		EduPermitInstance.structureType = obj[obj.selectedIndex].value;
		if(EduPermitInstance.structureType=="4"){
			EduPermitInstance.safetr.style.display = "none";
			this.safelevel.options[0].selected = true;    
		}else{
			if(EduPermitInstance.structureType=="1"){
				EduPermitInstance.selectDataId = new Array();
				selectbutton.style.display = "none";
				//获取内容
				var content;
				$.ajax({
					type : "POST",
					url :"Hrmcompany.do?method=queryDefault",
					async:false,
					dataType : "json",
					success : function(data) {
						if(data.tag=="success"){
							content = data.data[0].companyname;
						}
					},
					error : function(msg) {
					}
				});
				EduPermitInstance.shownametd.innerHTML = content;
				//EduPermitInstance.shownametd.innerHTML = "成都市发展和改革委员会";
				EduPermitInstance.selectDataId.push("1");
			}
			EduPermitInstance.safetr.style.display="block";
		}
	
}
function setDialogCallBackData(data,isselect) {
	if(isselect&&isselect=="yes"){
		updataPermit(data.split(";")[0],data.split(";")[1]);
	}else{
		EduPermitInstance.setSelectName(data);
	}
}
function savaPermit(){
	
	EduPermitInstance.savaPermit();
	
}
function deletePermit(type){
	EduPermitInstance.deletePermit(type);	
	
}
function updataPermit(id,type){
	EduPermitInstance.updataPermit(id,type);
}
function selectAll(obj,type){
	if(type=="0"){
		if(EduPermitInstance.currentPermit==null||EduPermitInstance.currentPermit.length<=0)return;
		for(var i=0;i<EduPermitInstance.currentPermit.length;i++){
			document.getElementById(EduPermitInstance.currentPermit[i]).checked = obj.checked;
			chanageBox(document.getElementById(EduPermitInstance.currentPermit[i]));
		}
	}else if(type=="1"){
		if(EduPermitInstance.dxCurrentPermit==null||EduPermitInstance.dxCurrentPermit.length<=0)return;
		for(var i=0;i<EduPermitInstance.dxCurrentPermit.length;i++){
			document.getElementById(EduPermitInstance.dxCurrentPermit[i]).checked = obj.checked;
			chanageBox(document.getElementById(EduPermitInstance.dxCurrentPermit[i]));
		}
	}else if(type=="2"){
		if(EduPermitInstance.mrCurrentPermit==null||EduPermitInstance.mrCurrentPermit.length<=0)return;
		for(var i=0;i<EduPermitInstance.mrCurrentPermit.length;i++){
			document.getElementById(EduPermitInstance.mrCurrentPermit[i]).checked = obj.checked;
			chanageBox(document.getElementById(EduPermitInstance.mrCurrentPermit[i]));
		}
	}else if(type=="3"){
		if(EduPermitInstance.scCurrentPermit==null||EduPermitInstance.scCurrentPermit.length<=0)return;
		for(var i=0;i<EduPermitInstance.scCurrentPermit.length;i++){
			document.getElementById(EduPermitInstance.scCurrentPermit[i]).checked = obj.checked;
			chanageBox(document.getElementById(EduPermitInstance.scCurrentPermit[i]));
		}
	}else if(type=="4"){
		if(EduPermitInstance.mrdxCurrentPermit==null||EduPermitInstance.mrdxCurrentPermit.length<=0)return;
		for(var i=0;i<EduPermitInstance.mrdxCurrentPermit.length;i++){
			document.getElementById(EduPermitInstance.mrdxCurrentPermit[i]).checked = obj.checked;
			chanageBox(document.getElementById(EduPermitInstance.mrdxCurrentPermit[i]));
		}
	}
}
function chanageSelect(id,classify){
	EduPermitInstance.opendialogSelect(id,classify);
}
function addPermit(type){
	initSelectContorl();
	document.getElementById("primtdata_div").style.display = "none";
	document.getElementById("qxselect_div").style.display = "block";
	EduPermitInstance.selectPermType = type;
	var _showprimtname = document.getElementById("showprimtname");
	if(type=="0"){
		$(eduPermittype).html(EduPermitInstance.getPermiType("0")); 
		_showprimtname.style.display = "none";
		document.getElementById("glselect_td").style.display = "block";
	}else if(type=="4"){
		$(eduPermittype).html(EduPermitInstance.getPermiType("1")); 
		_showprimtname.style.display = "none";
		document.getElementById("glselect_td").style.display = "block";
	}else{
		if(type=="3"){
			_showprimtname.innerHTML = "上传权限";
		}else if(type=="4"){
			_showprimtname.innerHTML = "定向选择";
			
		}else if(type=="5"){
			_showprimtname.innerHTML = "默认共享权限";
			
		}else if(type=="6"){
			_showprimtname.innerHTML = "默认定向权限";
		}
		_showprimtname.style.display = "block";
		document.getElementById("glselect_td").style.display = "none";
	}
}
function chanageBox(obj){
	if(obj.checked){
		obj.parentNode.parentNode.className = "over";
	}else{
		if(obj.parentNode.parentNode.name=="tr1"){
			obj.parentNode.parentNode.className = "change";
		}else{
			obj.parentNode.parentNode.className = "";
		}
	}
}
function initSelectContorl(){
	document.getElementById("eduPermittype").value = "0";
	document.getElementById("righttype").value = "4";
	document.getElementById("safelevel").value = "0";
	document.getElementById("safetr").style.display="none";
	EduPermitInstance.clear();	
	document.getElementById("selectbutton").style.display = "block";
	EduPermitInstance.structureType = "4";
}
function backlb(){
	initSelectContorl();
	document.getElementById("primtdata_div").style.display = "block";
	document.getElementById("qxselect_div").style.display = "none";
}
function getServerCurrentDate(){
	var mydate = null;
	$.ajax({
		type : "POST",
		url :"EduPermitManage.do?method=getServerDate",
		dataType : "json",
		async:false,
		success : function(data) {
			if(data!=null&&data!="0"&&data.length>3){
				mydate = data;
			}else{
				alert("获取服务器时间失败，请检查网络或重新登录");
				mydate = null;
			}
			
		},
		error : function(msg) {
			 alert("获取服务器时间失败，请检查网络或重新登录");
			 mydate = null;
		}
	});
	return mydate;
}

 /**
  * 分页缓存
  * @returns {Number}
  */
 function getPaginationSize(){
	 //下面执行查询方法
		var pageSize = 0;
		$.ajax({
			type : "POST",
			url :"PaginationShow.do?method=getPaginationSize",
			dataType : "json",
			async:false,
			success : function(data) {
				if(data.tag=="success"){
					pageSize = data.data;
					$(".pagination-page-list").val(pageSize);
					$("#tg").datagrid({
						pageSize:pageSize
					});
				}else{
					alert("获取服务器时间失败，请检查网络或重新登录");
				}
				
			},
			error : function(msg) {
				 alert("获取服务器时间失败，请检查网络或重新登录");
			}
		});
		//绑定事件
		$(".pagination-page-list").bind("change",function() {
			var pageSize = $(".pagination-page-list").val();
			 $.ajax({
					type : "POST",
					url :'PaginationShow.do?method=saveOrUpdatePaginationShow',
				    data: {pageSize:pageSize},
					dataType : "json",
					success : function(data) {
						if(data.tag=="success"){
							getPaginationSize();
						}
					},
					error : function(msg) {
						alert("发生未知 错误！");
					}
			});
	   });
		return pageSize;
   }
    /**
     * 返回调用
     */
    function deltailBack(){
		$("#boostor_main_div").css("display","block");
		$('#tg').datagrid('load');
		$("#boostor_detail_iframe").css("display","none");
		$("#boostor_detail_iframe").attr("src","");
	} 

