package com.notekeeper.controller;

import java.util.Map;

import org.apache.struts2.dispatcher.SessionMap;
import org.apache.struts2.interceptor.SessionAware;
import com.notekeeper.model.*;

public class LoginAction implements SessionAware {
	private String uname, password;
	private SessionMap<String, Object> session;

	@Override
	public void setSession(Map<String, Object> session) {
		this.session = (SessionMap) session;
	}

	public String login() {
		UserBean user = new UserBean(uname, password, null, null, null);
		UserDao ud = new UserDao();
		String result;
		if (ud.validate(user)) {
			result = "success";
			session.put("userid", user.getUserid());
		} else {
			result = "fail";
		}
		return result;
	}
	
	public String logout() {
		  session.invalidate();
		  return "success";
		 }

	public String getUname() {
		return uname;
	}

	public void setUname(String uname) {
		this.uname = uname;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
