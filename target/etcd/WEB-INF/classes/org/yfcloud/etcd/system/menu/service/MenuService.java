package org.yfcloud.etcd.system.menu.service;

import org.yfcloud.etcd.system.menu.model.Menu;

import java.util.List;

/**
 * Created by Administrator on 2017/12/15 0015.
 */
public interface MenuService {
    List<Menu> getMenuList(String title);

    int saveOrUpdateMenu(Menu menu);

    int deleteMenu(String menuId);

    List<Menu> getListMenu();
}
