package org.yfcloud.etcd.system.menu.dao;

import org.yfcloud.etcd.system.menu.model.Menu;

import java.util.List;

public interface MenuMapper {
    int deleteByPrimaryKey(String id);

    int insert(Menu record);

    int insertSelective(Menu record);

    Menu selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(Menu record);

    int updateByPrimaryKey(Menu record);

    List<Menu> getMenu(String title);

    List<Menu> getMenuList();
}