package com.notekeeper.controller;

import com.notekeeper.model.*;

public class CreateUserAction {
	private String uname, password, email, phone;

	public String execute() {
		UserBean user = new UserBean(uname, password, email, phone, null);
		UserDao ud = new UserDao();
		ud.insert(user);
		return "Data entered succesfully";
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

}
