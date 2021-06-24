package com.notekeeper.controller;

import java.util.List;
import java.util.ArrayList;

import com.notekeeper.model.GetUUID;
import com.notekeeper.model.TokenDao;
import com.notekeeper.model.UserBean;
import com.notekeeper.model.UserDao;
import com.opensymphony.xwork2.ActionSupport;

public class LoginAuth extends ActionSupport {
	private static final long serialVersionUID = 1L;
	private String sessionToken = null;
	private String uname, password;

	public String execute() throws Exception {
		UserBean user = new UserBean(uname, password, null, null, null);
		String result;
		String token = GetUUID.getUUID();
		if (UserDao.validate(user)) {
			result = "SUCCESS";
			TokenDao.tokenMap(user.getUserid(), token);
			sessionToken = token;
		} else {
			result = "fail";
		}
		return result;
	}

	public String getSessionToken() {
		return sessionToken;
	}

	public void setSessionToken(String sessionToken) {
		this.sessionToken = sessionToken;
	}

	public void setUname(String uname) {
		this.uname = uname;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}