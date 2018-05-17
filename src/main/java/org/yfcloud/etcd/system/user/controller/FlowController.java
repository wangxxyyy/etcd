package org.yfcloud.etcd.system.user.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.yfcloud.etcd.system.user.model.User;
import org.yfcloud.etcd.system.user.service.UserService;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2018/5/17 0017.
 */
@RestController
@RequestMapping("/user")
public class FlowController {

    @Resource
    UserService userServiceImpl;

    @RequestMapping("/getList/{name}")
    public List<User> getUserList(@PathVariable String name){
        List<User> list = null;
        try{
            list = userServiceImpl.getUserList(name);
        }catch (Exception e){
            e.printStackTrace();
        }
        return list;
    }
}
