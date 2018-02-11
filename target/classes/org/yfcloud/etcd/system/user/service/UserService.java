package org.yfcloud.etcd.system.user.service;

import org.yfcloud.etcd.system.user.model.User;

import java.util.List;

/**
 * Created by Administrator on 2017/12/14 0014.
 */
public interface UserService {
    User loginUser(String loginName, String loginPassword);

    List<User> getUserList(String name);

    int resetPassword(String userId);

    int saveOrUpdateUser(User user);

    int deleteUser(String userId);

    int saveModifyPassword(String id, String newPassword);
}
