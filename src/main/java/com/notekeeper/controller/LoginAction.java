package com.notekeeper.controller;

import com.notekeeper.model.*;

public class LoginAction {
	private String uname, password;

	public String login() {
		UserBean user = new UserBean(uname, password, null, null);
		UserDao ud = new UserDao();
		String result;
		if (ud.validate(user)) {
			result = "success";
		} else {
			result = "fail";
		}
		return result;
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
