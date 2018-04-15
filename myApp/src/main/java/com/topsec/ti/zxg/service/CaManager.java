package com.topsec.ti.zxg.service;

import com.topsec.ti.zxg.MagicjcConstants;
import com.topsec.ti.zxg.config.WebInitConfigure;
import com.topsec.ti.zxg.domain.ca.Authority;
import com.topsec.ti.zxg.domain.ca.Role;
import com.topsec.ti.zxg.domain.ca.User;
import com.topsec.ti.zxg.dto.DtoAuthority;
import com.topsec.ti.zxg.dto.DtoRole;
import com.topsec.ti.zxg.dto.DtoUser;
import com.topsec.ti.zxg.exception.MagicjcRuntimeException;
import com.topsec.ti.zxg.mapper.UserMapper;
import com.topsec.ti.zxg.repository.AuthorityRepository;
import com.topsec.ti.zxg.repository.RoleRepository;
import com.topsec.ti.zxg.repository.UserRepository;
import com.topsec.ti.zxg.utils.DtoUtils;
import com.topsec.ti.zxg.utils.WebPathUtils;
import com.topsec.ti.zxg.xml.AuthorityFormatter;
import com.topsec.tsm.base.persistence.support.LifeFiller;
import com.topsec.tsm.base.xml.XmlAccessException;
import com.topsec.tsm.util.xml.DefaultDocumentFormater;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.Validate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.util.*;

/**
 * Created by hx on 17-2-9.
 */
@Service
@Transactional(value = "txManager2")
public class CaManager implements CaService {
  @Autowired
  private PasswordEncoder passwordEncoder;
  @Autowired
  private WebInitConfigure webConfigure;

  @Autowired
  private BaseService baseService;

  @Autowired
  private UserMapper userMapper;
  @Autowired
  private UserRepository userRepository;

  @Autowired
  private RoleRepository roleRepository;

  @Autowired
  private AuthorityRepository authorityRepository;

  private Logger logger = LoggerFactory.getLogger(this.getClass());

  private static String USER = "用户";
  private static String ROLE = "角色";


  @Override
  public User getUserById(String id) {
    return null;
  }

  @Override
  public User getUserByName(String name) {
    return userRepository.findByName(name);
  }

  @Override
  public DtoUser updateUser(DtoUser dtoUser, String id) {

    Validate.notEmpty(dtoUser.getName());
    User user = baseService.getAndCheckObj(userRepository, id, USER);
    if(!dtoUser.getName().equals(user.getName())){
      if(userRepository.findByName(dtoUser.getName())!=null) {
        dtoUser.setNote("error,用户名重复,编号为" + dtoUser.getName());
        return dtoUser;
      }
    }
    baseService.validateFieldUnique(id, userRepository.findByName(dtoUser.getName()),dtoUser.getName());
    if (user != null && MagicjcConstants.USER_ADMIN.equals(user.getName())) {
      throw new MagicjcRuntimeException("不能修改admin帐号");
    }

    user.setName(dtoUser.getName());
    user.setAlias(dtoUser.getAlias());
    user.setLastModifiedTime(new Date());
    if (StringUtils.isNotBlank(dtoUser.getPassword())) {
      user.setPassword(passwordEncoder.encode(dtoUser.getPassword()));
    }
    user.setRoles(new HashSet(DtoUtils.copyArray(Role.class, dtoUser.getDtoRoles())));
    userRepository.saveAndFlush(user);
    return prepareDtoUserByUser(user);

  }

  @Override
  public DtoUser createUser(DtoUser dtoUser) {

    Validate.notEmpty(dtoUser.getName());
    Validate.notEmpty(dtoUser.getPassword());
    //baseService.validateFieldUnique(null, userRepository.findByName(dtoUser.getName()),dtoUser.getName());
    if(userRepository.findByName(dtoUser.getName())!=null) {
      dtoUser.setNote("error,用户名重复,为" + dtoUser.getName());
      return dtoUser;
    }
    User user = DtoUtils.copyObject(User.class, dtoUser);
    user.setId(null);
    user.setRoles(new HashSet(DtoUtils.copyArray(Role.class, dtoUser.getDtoRoles())));
    user.setPassword(passwordEncoder.encode(dtoUser.getPassword()));
    userRepository.saveAndFlush(user);
    dtoUser = prepareDtoUserByUser(user);
    return dtoUser;
  }

  private DtoUser prepareDtoUserByUser(User user) {
    DtoUser dtoUser = DtoUtils.copyObject(DtoUser.class, user);
    if (dtoUser != null) dtoUser.setPassword(null);
    return dtoUser;
  }

  @Override
  public List<DtoUser> getAllUser() {
//    List<User> allUser = userMapper.getAllUser();
    List<User> userList = userRepository.findAll();
    List<DtoUser> dtoUsers = new ArrayList<>();
    for (User user : userList) {
      if (user.getName().equalsIgnoreCase(MagicjcConstants.USER_ADMIN))
        continue;
      DtoUser dtoUser = prepareDtoUserByUser(user);
      dtoUser.setDtoRoles(new HashSet<>(DtoUtils.copyArray(DtoRole.class, user.getRoles())));
      dtoUsers.add(dtoUser);
    }

    return dtoUsers;
  }

  @Override
  public User getUser(String name, String password) {
    return null;
  }

  @Override
  public DtoUser deleteUser(String id) {
    User user =baseService.getAndCheckObj(userRepository, id, USER);
    if (user != null && MagicjcConstants.USER_ADMIN.equals(user.getName())) {
      throw new MagicjcRuntimeException("不能删除admin账户");
    }
    userRepository.delete(id);
    DtoUser dtoUser = new DtoUser();
    dtoUser.setId(id);
    return dtoUser;
  }

  @Override
  public Role getRoleByName(String name) {
    return null;
  }

  @Override
  public DtoRole createRole(DtoRole dtoRole) {
    Validate.notEmpty(dtoRole.getName());

    //baseService.validateFieldUnique(null, roleRepository.findByName(dtoRole.getName()),dtoRole.getName());
    if(roleRepository.findByName(dtoRole.getName())!=null) {
      dtoRole.setNote("error,角色名重复,为" + dtoRole.getName());
      return dtoRole;
    }
    Role role = DtoUtils.copyObject(Role.class, dtoRole);
    role.setId(null);
    role.setAuthorities(new HashSet(DtoUtils.copyArray(Authority.class, dtoRole.getDtoAuthorities())));
    roleRepository.saveAndFlush(role);
    DtoRole d = prepareDtoRoleByRole(role);
    return d;
  }

  private DtoRole prepareDtoRoleByRole(Role role) {
    DtoRole d = DtoUtils.copyObject(DtoRole.class, role);
    d.setDtoAuthorities(new HashSet<>(DtoUtils.copyArray(DtoAuthority.class, role.getAuthorities())));
    return d;
  }

  @Override
  public Role getRoleById(String id) {
    return null;
  }

  @Override
  public DtoRole updateRole(DtoRole dtoRole, String id) {

    Validate.notEmpty(dtoRole.getName());
    Validate.notEmpty(id);
    Role role = baseService.getAndCheckObj(roleRepository, id, ROLE);
    if(!dtoRole.getName().equals(role.getName())){
      if(roleRepository.findByName(dtoRole.getName())!=null) {
        dtoRole.setNote("error,角色名重复,编号为" + dtoRole.getName());
        return dtoRole;
      }
    }
    //baseService.validateFieldUnique(id, roleRepository.findByName(dtoRole.getName()),dtoRole.getName());
    if (role != null && MagicjcConstants.ROLE_ADMIN.equals(role.getName())) {
      throw new MagicjcRuntimeException("不能更新admin角色");
    }

    role.setName(dtoRole.getName());
    role.setAlias(dtoRole.getAlias());
    role.setNote(dtoRole.getNote());
    role.setAuthorities(new HashSet(DtoUtils.copyArray(Authority.class, dtoRole.getDtoAuthorities())));
    roleRepository.saveAndFlush(role);
    dtoRole = prepareDtoRoleByRole(role);
    return dtoRole;
  }

  @Override
  public DtoRole deleteRole(String id) {
    Role role = baseService.getAndCheckObj(roleRepository, id, ROLE);
    if (!role.getUsers().isEmpty()) {
      throw new MagicjcRuntimeException("该角色下面有用户,请先将用户删除");
    }
    if (role != null && MagicjcConstants.ROLE_ADMIN.equals(role.getName())) {
      throw new MagicjcRuntimeException("不能删除admin角色");
    }
    roleRepository.delete(id);
    DtoRole dtoRole = new DtoRole();
    dtoRole.setId(id);
    return dtoRole;
  }

  @Override
  public List<DtoRole> listAllRole() {
    List<Role> rmRoles = roleRepository.findAll();
    List<DtoRole> dtoRoles = new ArrayList<>();

    for (Role role : rmRoles) {
      if (MagicjcConstants.ROLE_ADMIN.equals(role.getName())) continue;
      DtoRole dtoRole = prepareDtoRoleByRole(role);
      dtoRoles.add(dtoRole);
    }
    return dtoRoles;
  }

  @Override
  public List<Role> getRoleByUserId(String userId) {
    return null;

  }

  @Override
  public List<Authority> getAuthoritiesByRoleId(String id) {
    return null;
  }

  @Override
  public List<Authority> getAuthoritiesByUserName(String username) {
    return authorityRepository.getAuthoritiesByUserName(username);
  }

  @Override
  public DtoUser getDtoUserWithAuthorities(User user) {
    DtoUser dtoUser = prepareDtoUserByUser(user);
    List<Authority> authorities = getAuthoritiesByUserName(user.getName());
    List<DtoAuthority> dtoAuthorities = DtoUtils.copyArray(DtoAuthority.class, authorities);
    dtoUser.setAuthorities(new HashSet<>(dtoAuthorities));
    return dtoUser;
  }


  @Override
  public void initializeAdmin() {
    String roleAdmin = MagicjcConstants.ROLE_ADMIN;
    String userAdmin = MagicjcConstants.USER_ADMIN;
    Role role = roleRepository.findByName(roleAdmin);
    if (role == null) {
      role = new Role();
      role.setName(roleAdmin);
      Authority authority = authorityRepository.findOne(MagicjcConstants.ADMIN_AUTHORITY);
      if (authority == null) {
        logger.warn("没有超级权限,无法初始化admin帐号");
        return;
      }
      role.getAuthorities().add(authority);
      roleRepository.saveAndFlush(role);
    }
    User user = userRepository.findByName(userAdmin);
    if (user == null) {
      user = new User();
      user.setName(userAdmin);
      user.setPassword(passwordEncoder.encode(webConfigure.getInitAdminPassword()));
      user.getRoles().add(role);
      userRepository.saveAndFlush(user);
    }

  }

  @Override
  public void initializeAuthorities() {
    DefaultDocumentFormater defaultDocumentFormater = new DefaultDocumentFormater();
    AuthorityFormatter authorityFormatter = new AuthorityFormatter();
    defaultDocumentFormater.setFormater(authorityFormatter);
    Authority authority;
    try {

      File file = new File(WebPathUtils.getWebAppRootPath(),MagicjcConstants.AUTHORITY_CONFIG_FILE);
      defaultDocumentFormater.importObjectFromFile(file.getAbsolutePath());
    } catch (XmlAccessException e) {
      e.printStackTrace();
      throw new MagicjcRuntimeException(e);
    }
    authority = authorityFormatter.getAuthority();
    if (authority != null) {
      initializeAuthority(authority);
    }
    initializeAdmin();
  }

  @Override
  public DtoAuthority getAllAuthority() {
    Authority authority=authorityRepository.getRoot();
    return DtoUtils.copyObjectRecursion(DtoAuthority.class, authority, new DtoUtils.DtoFilter<DtoAuthority, Authority>() {
      @Override
      public boolean isFiltered(DtoAuthority dst, Authority src) {
        if (MagicjcConstants.ADMIN_AUTHORITY.equals(src.getId()))return true;
        return false;
      }
    });
  }

  private void initializeAuthority(Authority authority) {
    Set<Authority> authorities = authority.getAuthorities();
    authority.setAuthorities(null);
    LifeFiller.fill(authority);
    authority.setUri("/" + authority.getId());
    authorityRepository.saveAndFlush(authority);
    initializeAuthority(authority, authorities);
  }

  private void initializeAuthority(Authority persist, Collection<Authority> types) {
    if (CollectionUtils.isNotEmpty(types)) {
      for (Authority type : types) {
        Collection<Authority> children = type.getAuthorities();
        type.setParent(persist);
        type.setAuthorities(null);
        LifeFiller.fill(type);
        type.setUri("/1");
        authorityRepository.saveAndFlush(type);
        initializeAuthority(type, children);
      }
    }
  }

}
