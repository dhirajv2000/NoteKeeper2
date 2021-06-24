package com.notekeeper.controller;

import java.util.Map;

import org.apache.struts2.dispatcher.SessionMap;
import org.apache.struts2.interceptor.SessionAware;
import com.notekeeper.model.*;

public class AuthAction implements SessionAware {
	private String uname, password, sessionToken;
	private SessionMap<String, Object> session;

	public SessionMap<String, Object> getSession() {
		return session;
	}

	@Override
	public void setSession(Map<String, Object> session) {
		this.session = (SessionMap) session;
	}

	public String index() {
		return "success";
	}

	public String login() {
		UserBean user = new UserBean(uname, password, null, null, null);
		String result;
		String token = GetUUID.getUUID();
		if (UserDao.validate(user)) {
			result = "success";
			TokenDao.tokenMap(user.getUserid(), token);
			session.put("userid", user.getUserid());
			session.put("token", token);
			session.put("username", user.getUname());
		} else {
			result = "fail";
		}
		return result;
	}

	public String logout() {
		TokenDao.tokenInvalidate(sessionToken);
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

	public String getSessionToken() {
		return sessionToken;
	}

	public void setSessionToken(String sessionToken) {
		this.sessionToken = sessionToken;
	}

}
