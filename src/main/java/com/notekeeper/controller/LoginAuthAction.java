//Performs login authentication and token generation
package com.notekeeper.controller;

import com.notekeeper.model.GetUUID;
import com.notekeeper.model.TokenDao;
import com.notekeeper.model.UserBean;
import com.notekeeper.model.UserDao;
import com.opensymphony.xwork2.ActionSupport;

public class LoginAuthAction extends ActionSupport {
	private static final long serialVersionUID = 1L;
	private String sessionToken = null;
	private String uname, password;
	private int statusCode;

	public String execute() throws Exception {
		UserBean user = new UserBean(uname, password, null, null, null);
		String token = GetUUID.getUUID();
		if (UserDao.validate(user)) {
			TokenDao.tokenMap(user.getUserid(), token);
			sessionToken = token;
			statusCode = 200;
		} else {
			statusCode = 403;
		}
		return "SUCCESS";
	}

	public int getStatusCode() {
		return statusCode;
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