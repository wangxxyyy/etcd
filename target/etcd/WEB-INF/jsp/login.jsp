<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <base href="<%=basePath%>">
    <title>云帆ETCD管理系统</title>
    <link href="css/login.css"  rel="stylesheet" />
    <script type="text/javascript" src="js/jquery-3.1.1.min.js"></script>
    <script type="text/javascript">
        function login(){
            var  loginName = $("#loginName").val();
            var  loginPassword = $("#loginPassword").val();
            $("#loginNameDesc").text("");
            $("#loginPasswordDesc").text("");
            if(loginName == ""){
                $("#loginNameDesc").text("请输入账号");
                return;
            }
            if(loginPassword==""){
                $("#loginPasswordDesc").text("请输入密码");
                return;
            }
            $.ajax({
                type: "POST",
                url: "user/login",
                async: false,
                dataType:"json",
                data: {'loginName':loginName,'loginPassword':loginPassword},
                success: function(data){
                    if(data==1){
                        window.location.href="home/index";
                    }else if(data==0){
                        $("#loginNameDesc").text("用户名或密码错误");
                    }
                },
                error:function(data){
                    alert("登录出错！");
                }
            });
        }
    </script>
</head>
<div class="logo_box">
    <h3>云帆ETCD管理系统</h3>
    <form action="#" name="f" method="post">
        <div class="input_outer">
            <input type="text" name="loginName" class="text" id="loginName" placeholder="输入用户名" style="color: #FFFFFF !important" >
            <span style="width:110px;font-style:normal; line-height: 49px; color:red; padding-left:5px;font-size: 10px;" id="loginNameDesc"></span>
        </div>
        <div class="input_outer">
            <input  type="password" name="loginPassword" class="text" id="loginPassword" placeholder="请输入密码" style="color: #FFFFFF !important; position: absolute; z-index: 100;">
            <span  style="width:110px;font-style:normal; line-height: 33px; color:red; padding-left:5px;font-size: 10px" id="loginPasswordDesc"></span>
        </div>
        <div class="mb2">
            <a class="act-but submit" href="javascript:;" style="color: #FFFFFF" onclick="login()">登录</a>
        </div>
        <input name="savesid" value="0" id="check-box" class="checkbox" type="checkbox">
        <span>记住用户名</span>
        <span><a href="#" class="login-fgetpwd" style="color: #FFFFFF">忘记密码？</a></span>
    </form>
</div>
</body>
</html>

