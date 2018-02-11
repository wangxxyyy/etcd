package org.yfcloud.etcd.system.menu.service.impl;

import org.springframework.stereotype.Service;
import org.yfcloud.etcd.common.CommonUtil;
import org.yfcloud.etcd.system.menu.dao.MenuMapper;
import org.yfcloud.etcd.system.menu.model.Menu;
import org.yfcloud.etcd.system.menu.service.MenuService;

import javax.annotation.Resource;
import java.util.*;

/**
 * Created by Administrator on 2017/12/15 0015.
 */
@Service
public class MenuSericeImpl implements MenuService {

    @Resource
    MenuMapper menuMapper;


    //菜单页面时查出列表
    @Override
    public List<Menu> getMenuList(String title) {
        List<Menu> list = menuMapper.getMenu(title);
        return list;
    }

    //保存或者更新菜单
    @Override
    public int saveOrUpdateMenu(Menu menu) {
        if(menu.getId()!=null&&!"".equals(menu.getId())){
            menuMapper.updateByPrimaryKeySelective(menu);
        }else {
            menu.setId( CommonUtil.getUUID());
            menu.setCreateDate(new Date());
            menu.setState(1);
            menuMapper.insertSelective(menu);
        }
        return 1;
    }

    //删除菜单
    @Override
    public int deleteMenu(String menuId) {
        String[] menuIdes = menuId.split(",");
        for(int i=0;i<menuIdes.length;i++){
            String id = menuIdes[i];
            menuMapper.deleteByPrimaryKey(id);
        }
        return 1;
    }

    //跳转到主页面查出菜单内容
    @Override
    public List<Menu> getListMenu() {
        List<Menu> menuList = menuMapper.getMenuList();
        return menuList;
    }
}
