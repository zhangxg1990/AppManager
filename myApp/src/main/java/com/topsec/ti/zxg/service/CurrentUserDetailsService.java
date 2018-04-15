package com.topsec.ti.zxg.service;

import com.topsec.ti.zxg.domain.ca.Authority;
import com.topsec.ti.zxg.domain.ca.CurrentUser;
import com.topsec.ti.zxg.domain.ca.Role;
import com.topsec.ti.zxg.domain.ca.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.io.UnsupportedEncodingException;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by hx on 2016/5/17.
 */
@Service
@Transactional(value = "txManager2")
public class CurrentUserDetailsService implements UserDetailsService {
    @Autowired
    private  CaService caService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    //获取用户,返回角色和权限
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if(!StringUtils.isEmpty(username))
            try {
                username = new String(username.getBytes("ISO-8859-1"),"UTF-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
        User user = caService.getUserByName(username);
        if (user == null) {
            throw new UsernameNotFoundException(username);
        }
        //String password= passwordEncoder.encode(user.getPassword());
        String password= user.getPassword();
        UserDetails u = new CurrentUser(user,password,createAuthorityList(user));
        return u;
    }

    private Collection<? extends GrantedAuthority> createAuthorityList(User user) {
        Set<GrantedAuthority> result =  new HashSet<>();
        List<Authority> authorities = caService.getAuthoritiesByUserName(user.getName());
        for (Authority au:authorities) {
            result.add(new SimpleGrantedAuthority(au.getId()));
        }
        return result;
    }
    private Collection<? extends GrantedAuthority> createRoleList(User user) {
        StringBuilder  permission = new StringBuilder();
        List<Role> roles = caService.getRoleByUserId(user.getId());
        for (Role  role:roles) {
            permission.append(role.getPermissionconfig());

        }
        return  AuthorityUtils.commaSeparatedStringToAuthorityList(permission.toString());
    }
}
