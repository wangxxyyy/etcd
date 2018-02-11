package org.yfcloud.etcd.system.menu.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.yfcloud.etcd.system.menu.model.Menu;
import org.yfcloud.etcd.system.menu.service.MenuService;
import org.yfcloud.etcd.system.user.model.User;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * Created by Administrator on 2017/12/15 0015.
 */
@Controller
@RequestMapping("/menu")
public class MenuController {

    @Resource
    MenuService menuServiceImpl;

    //菜单管理页面跳转
    @RequestMapping("/index")
    public ModelAndView menuIndex(){
        ModelAndView view = new ModelAndView();
        try {
            view.setViewName("menu/menuIndex");
        }catch (Exception e){
            e.printStackTrace();
        }
        return view;
    }

    //查出菜单列表
    @RequestMapping("/list")
    @ResponseBody
    public List<Menu> menuList(String title){
        List<Menu> list = null;
        try {
            list = menuServiceImpl.getMenuList(title);
        }catch (Exception e){
            e.printStackTrace();
        }
        return list;
    }

    //添加或者更新菜单
    @RequestMapping("/saveOrUpdateMenu")
    @ResponseBody
    public int saveOrUpdateMenu(HttpServletRequest request, Menu menu){
        int state = 0;
        try{
            HttpSession session = request.getSession();
            User user = (User) session.getAttribute("user");
            String createUserId = user.getId();
            menu.setCreateUserId(createUserId);
            state = menuServiceImpl.saveOrUpdateMenu(menu);
        }catch (Exception e){
            e.printStackTrace();
        }
        return state;
    }

    @RequestMapping("/deleteMenu")
    @ResponseBody
    public int deleteMenu(String menuId){
        int state = 0;
        try{
            state = menuServiceImpl.deleteMenu(menuId);
        }catch (Exception e){
            e.printStackTrace();
        }
        return state;
    }
}
