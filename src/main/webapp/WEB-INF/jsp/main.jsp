<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <base href="<%=basePath%>">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>后台管理界面</title>
    <link rel="stylesheet" type="text/css" href="css/easyui/themes/default/easyui.css">
    <link rel="stylesheet" type="text/css" href="css/easyui/themes/icon.css">
    <script type="text/javascript" src="js/jquery-3.1.1.min.js"></script>
    <script type="text/javascript" src="js/easyui/jquery.easyui.min.js"></script>
    <script type="text/javascript">
        function addTab(title, url) {
            if ($('#tabs').tabs('exists', title)) {
                $('#tabs').tabs('select', title);
            } else {
                var content = '<iframe scrolling="auto" frameborder="0"  src="'
                    + url + '" style="width:100%;height:100%;"></iframe>';
                $('#tabs').tabs('add', {
                    title : title,
                    content : content,
                    closable : true
                });
            }
        }

        function modifyPassword() {
            $('#dlg').dialog('open').dialog('setTitle', '修改密码');
            $('#fm').form('clear');
        }

        function saveModifyPassword() {
            var oldPassword = $("#loginPassword").val();
            var newPassword = $("#loginPassword1").val();
            var newPassword1 = $("#loginPassword2").val();
            if (newPassword != newPassword1) {
                $("#loginPasswordDesc").text("两次输入的密码不一致");
                return;
            }
            $.ajax({
                type : "POST",
                url : "user/saveModifyPassword",
                async : false,
                dataType : "json",
                data : {
                    'oldPassword' : oldPassword,
                    'newPassword' : newPassword
                },
                success : function(data) {
                    var _msg;
                    if (data == 1) {
                        _msg = "修改密码成功！"
                    } else if (data == 0) {
                        _msg = "修改密码失败！"
                    }
                    $.messager.show({
                        title : '消息提示',
                        msg : _msg,
                        timeout : 2000,
                        showType : 'slide'
                    });
                    $('#dlg').dialog('close'); // close the dialog
                    $('#dg').datagrid('reload'); // reload the user data
                },
                error : function(data) {
                    $.messager.show({
                        title : '消息提示',
                        msg : "修改出错！ ",
                        timeout : 2000,
                        showType : 'slide'
                    });
                }
            });
        }
    </script>
</head>
<body class="easyui-layout"
      style="margin: 0px 0px; width: 100%; height: 100%;">
<div data-options="region:'north'" style="height: 50px; background: #0099CC;">
    <div style="float: left; margin-top: 10px; font-size: 20px; font-weight: bold;">ETCD管理后台</div>
    <div style="float: right; margin-top: 20px;">
        <span style="margin-right: 10px">登录用户:${user.loginName}</span>
        <a href="javascript:void(0);" class="easyui-linkbutton" iconCls="icon-edit" plain="true" onclick="modifyPassword()">修改密码</a>
        <span style="margin-right: 10px"><a href="user/quitHome">退出</a></span>
    </div>
</div>
<div data-options="region:'south',split:true" style="height: 50px;"></div>
<div data-options="region:'west',split:true" title="菜单" style="width:200px;color:#fff;cursor: pointer;">
    <div class="easyui-accordion" style="width:99%;height:95%;">
        <c:forEach var="parent" items="${menuList}">
            <div title="${parent.title}" iconCls="icon-reload" style="overflow:auto;padding:10px;">
                <c:forEach var="menu" items="${parent.children}">
                    <span onclick="addTab('${menu.title}','${menu.url}')">${menu.title}</span><br/><br/>
                </c:forEach>
            </div>
        </c:forEach>
    </div>
</div>
<div data-options="region:'center'">
    <div id="tabs" class="easyui-tabs" style="width: 100%; height: 100%;">
    </div>
</div>

<div id="dlg" class="easyui-dialog" style="width: 490px; height: 230px; padding: 10px 20px" closed="true"
     buttons="#dlg-buttons">
    <form id="fm" method="#">
        <div class="fitem">
            <label>旧密码:</label> <input type="password" id="loginPassword"
                                       name="loginPassword" value="请输入旧密码">
        </div>
        <div class="fitem">
            <label>新密码:</label> <input type="password" id="loginPassword1"
                                       name="loginPassword1" value="请输入新密码">
        </div>
        <div class="fitem">
            <label>确认新密码:</label> <input type="password" id="loginPassword2"
                                         name="loginPassword2" value="请输确认新密码">
            <span style="width: 110px; font-style: normal; line-height: 49px; color: red; padding-left: 5px; font-size: 10px;"
                  id="loginPasswordDesc"></span>
        </div>
    </form>
    <div id="dlg-buttons">
        <a href="javascript:void(0);" class="easyui-linkbutton"
           iconCls="icon-ok" onclick="saveModifyPassword()">确定</a> <a
            href="javascript:void(0);" class="easyui-linkbutton"
            iconCls="icon-cancel" onclick="javascript:$('#dlg').dialog('close')">取消</a>
    </div>
</div>
</body>
</html>
