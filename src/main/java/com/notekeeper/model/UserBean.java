package com.notekeeper.model;

public class UserBean {
	private String uname, password, email, phone;
	private String userid;

	public UserBean() {
		super();
	}

	public UserBean(String uname, String password, String email, String phone, String userid) {
		super();
		this.uname = uname;
		this.password = password;
		this.email = email;
		this.phone = phone;
		this.userid = userid;
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

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

}
