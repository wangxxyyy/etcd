package org.yfcloud.etcd.business.filter;

import org.yfcloud.etcd.system.user.model.User;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * Created by Administrator on 2017/12/21 0021.
 */
public class LoginFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

        //将ServletRequest转换成HttpServletRequest
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        String url = request.getRequestURI();
        if(url.indexOf("play")!=-1){
            HttpSession session = request.getSession();
            User user = (User) session.getAttribute("user");
            if(user==null){
                response.sendRedirect(request.getContextPath()+"/login.jsp");
            }else{
                filterChain.doFilter(servletRequest,servletResponse);
            }
        }else{
            filterChain.doFilter(servletRequest,servletResponse);
        }

    }

    @Override
    public void destroy() {

    }
}
