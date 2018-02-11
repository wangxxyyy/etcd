package org.yfcloud.etcd.system.user.dao;

import org.yfcloud.etcd.system.user.model.User;

import java.util.List;

public interface UserMapper {
    int deleteByPrimaryKey(String id);

    int insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);

    User loginUser(String loginName, String loginPassword);

    void resetPassword(String userId, String passwd);

    List<User> getUserList(String name);

    void saveModifyPassword(String id, String newPassword);
}