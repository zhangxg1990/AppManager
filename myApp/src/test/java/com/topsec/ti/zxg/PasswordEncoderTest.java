package com.topsec.ti.zxg;

import org.junit.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * Created by hx on 17-2-22.
 */
public class PasswordEncoderTest {
  @Test
  public void bCryptTest(){
    int t = 0;
    String password = "admin";
    System.out.println(password + " -> ");
    for (t = 1; t <= 10; t++) {
      BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
      String hashedPassword = passwordEncoder.encode(password);
      System.out.println(hashedPassword);
    }

    password = "MIKE123";
    System.out.println(password + " -> ");
    for (t = 1; t <= 10; t++) {
      BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
      String hashedPassword = passwordEncoder.encode(password);
      System.out.println(hashedPassword);
    }

  }
}
