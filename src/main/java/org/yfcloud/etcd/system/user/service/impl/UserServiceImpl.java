package org.yfcloud.etcd.system.user.service.impl;

import org.springframework.stereotype.Service;
import org.yfcloud.etcd.common.CommonUtil;
import org.yfcloud.etcd.system.user.dao.UserMapper;
import org.yfcloud.etcd.system.user.model.User;
import org.yfcloud.etcd.system.user.service.UserService;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

/**
 * Created by Administrator on 2017/12/14 0014.
 */
@Service
public class UserServiceImpl implements UserService {

    @Resource
    UserMapper userMapper;

    //用户登录
    @Override
    public User loginUser(String loginName, String loginPassword) {
        User user = userMapper.loginUser(loginName,loginPassword);
        return user;
    }



    //查出用户列表
    @Override
    public List<User> getUserList(String name) {
        List<User> list = userMapper.getUserList(name);
        return list;
    }

    //重置密码
    @Override
    public int resetPassword(String userId) {
        String passwd = "123456";
        userMapper.resetPassword(userId,passwd);
        return 1;
    }

    //添加或者更新用户
    @Override
    public int saveOrUpdateUser(User user) {
        if(user.getId()!=null&&!"".equals(user.getId())){
            userMapper.updateByPrimaryKeySelective(user);
        }else {
            user.setLoginPassword("123456");
            user.setId( CommonUtil.getUUID());
            user.setCreateDate(new Date());
            userMapper.insertSelective(user);
        }
        return 1;
    }

    //删除用户
    @Override
    public int deleteUser(String userId) {
        String [] ids = userId.split(",");
        for(int i=0;i<ids.length;i++){
            String id = ids[0];
            userMapper.deleteByPrimaryKey(id);
        }
        return 1;
    }

    //用户自己登陆进去页面修改密码
    @Override
    public int saveModifyPassword(String id, String newPassword) {
        userMapper.saveModifyPassword(id,newPassword);
        return 1;
    }
}
