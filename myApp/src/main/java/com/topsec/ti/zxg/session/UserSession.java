package com.topsec.ti.zxg.session;


import com.topsec.ti.zxg.domain.ca.User;

/**
 * Created by hx on 16-7-25.
 */
public class UserSession {
  private User user;
  private String id;

  public UserSession(User user, String id) {
    this.user = user;
    this.id = id;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  @Override
  public String toString() {
    return "UserSession{" +
            "user=" + user +
            ", id='" + id + '\'' +
            '}';
  }
}
