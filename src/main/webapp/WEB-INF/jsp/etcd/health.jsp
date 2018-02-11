<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <base href="<%=basePath%>">
    <link rel="stylesheet" type="text/css" href="css/easyui/themes/default/easyui.css">
    <link rel="stylesheet" type="text/css" href="css/easyui/themes/icon.css">
    <link rel="stylesheet" type="text/css" href="css/demo.css">
    <script type="text/javascript" src="js/jquery-3.1.1.min.js"></script>
    <script type="text/javascript" src="js/easyui/jquery.easyui.min.js"></script>
    <script type="text/javascript">
        function doSearch(){
            $('#dg').treegrid('load',{
                title: $('#title').val(),
            });
        }

        function doRefresh() {
            $('#dg').datagrid('reload')
        }

        //添加菜单
        function addMenu(){
            var rows = $('#dg').treegrid('getSelections');
            if(rows.length==0){
                $('#dlg').dialog('open').dialog('setTitle','添加菜单');
                $('#fm').form('clear');
            }else if(rows.length==1){
                $('#dlg').dialog('open').dialog('setTitle','添加菜单');
                $('#fm').form('clear');
                var row = $('#dg').treegrid('getSelected');
                var id = row.id
                $("#parentId").val(id);
            }
        }

        //保存或者更新菜单
        function saveOrUpdateMenu(){
            $.ajax({
                type: "POST",
                url: "menu/saveOrUpdateMenu",
                async: false,
                dataType:"json",
                data:$("#fm").serialize(),
                success: function(data){
                    var _msg;
                    if(data==1){
                        _msg="保存菜单成功！"
                    }else if(data==0){
                        _msg="保存菜单失败！"
                    }
                    $.messager.show({
                        title:'消息提示',
                        msg:_msg,
                        timeout:2000,
                        showType:'slide'
                    });
                    $('#dlg').dialog('close');		// close the dialog
                    $('#dg').treegrid('reload');	// reload the user data
                },
                error:function(data){
                    $.messager.show({
                        title:'消息提示',
                        msg:"保存出错！ ",
                        timeout:2000,
                        showType:'slide'
                    });
                }
            });
        }

        //编辑菜单
        function editMenu(){
            var rows = $('#dg').datagrid('getSelections');
            if (rows.length>1){
                $.messager.show({
                    title:'消息提示',
                    msg:'只能选择一行进行编辑！',
                    timeout:2000,
                    showType:'slide'
                });
                return;
            }else if(rows.length==1){
                $('#dlg').dialog('open').dialog('setTitle','编辑');
                $('#fm').form('load',rows[0]);
            }else{
                $.messager.show({
                    title:'消息提示',
                    msg:'请选择编辑信息！',
                    timeout:2000,
                    showType:'slide'
                });
                return;
            }
        }

        //删除菜单
        function deleteMenu() {
            var id = "";
            var menuId = "";
            var rows = $('#dg').treegrid('getSelections');
            if(rows.length<1){
                $.messager.show({
                    title:'消息提示',
                    msg:'请选择需要删除的数据！',
                    timeout:2000,
                    showType:'slide'
                });
            }else{
                for(var i=0;i<rows.length;i++){
                    var row = rows[i];
                    id+= row.id+",";
                }
                menuId = id.substring(0,id.length-1);
                $.ajax({
                    type: "POST",
                    url: "menu/deleteMenu",
                    async: false,
                    dataType:"json",
                    data: {'menuId':menuId},
                    success: function(data){
                        var _msg;
                        if(data==1){
                            _msg="删除菜单成功！"
                        }else if(data==0){
                            _msg="删除菜单失败！"
                        }
                        $('#dg').treegrid('reload');
                        $.messager.show({
                            title:'消息提示',
                            msg:_msg,
                            timeout:2000,
                            showType:'slide'
                        });
                    },
                    error:function(data){
                        $.messager.show({
                            title:'删除异常！',
                            msg:_msg,
                            timeout:2000,
                            showType:'slide'
                        });
                    }
                });
            }
        }

    </script>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>集群健康状态界面</title>
    <title>Insert title here</title>
</head>
<body style="padding: 0 0;">
<div>
    <a href="javascript:void(0);" class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="addMenu()">添加</a>
    <a href="javascript:void(0);" class="easyui-linkbutton" iconCls="icon-edit" plain="true" onclick="editMenu()">编辑</a>
    <a href="javascript:void(0);" class="easyui-linkbutton" iconCls="icon-remove" plain="true" onclick="deleteMenu()">删除</a>
</div>
<div id="tb" style="padding:3px">
    <span>集群代理名字:</span>
    <input id="title" name="title" style="line-height:26px;border:1px solid #ccc">
    <a href="javascript:void(0);" class="easyui-linkbutton" iconCls="icon-search" onclick="doSearch()">查询</a>
    <a  href="javascript:void(0);" class="easyui-linkbutton" iconCls="icon-reload" onclick="doRefresh()">刷新</a>
    <table class="easyui-datagrid" style="width:100%;height:300px;"
           data-options="url:'etcd/getHealth',fitColumns:true,singleSelect:true">
        <thead>
        <tr>
            <th data-options="field:'nodeName',width:50,align:'center'">集群代理名字</th>
            <th data-options="field:'statusCode',width:20,align:'center'">集群运行状态码</th>
            <th data-options="field:'responseTime',width:20,align:'center'">集群响应时间</th>
            <th data-options="field:'result',width:50,align:'center'">集群答复结果</th>
        </tr>
        </thead>
    </table>
</div>
</body>
</html>