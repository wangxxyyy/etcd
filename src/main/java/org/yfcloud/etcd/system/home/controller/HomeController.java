package org.yfcloud.etcd.system.home.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.yfcloud.etcd.system.menu.model.Menu;
import org.yfcloud.etcd.system.menu.service.MenuService;
import org.yfcloud.etcd.system.user.model.User;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * Created by Administrator on 2017/12/14 0014.
 */
@Controller
@RequestMapping("/home")
public class HomeController {


    @Resource
    MenuService menuServiceImpl;

    @RequestMapping("/index")
    public ModelAndView view(HttpServletRequest request){
        ModelAndView view = new ModelAndView();
        try {
            HttpSession session = request.getSession();
            User user = (User) session.getAttribute("user");
            view.addObject("user",user);
            List<Menu> menuList = menuServiceImpl.getListMenu();
            view.addObject("menuList",menuList);
            view.setViewName("main");
        }catch (Exception e){
            e.printStackTrace();
        }
            return view;
    }
}
