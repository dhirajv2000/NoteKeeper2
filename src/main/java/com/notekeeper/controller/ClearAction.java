package com.notekeeper.controller;

import com.notekeeper.model.UserDao;
import com.opensymphony.xwork2.ActionSupport;

public class ClearAction extends ActionSupport {
	private static final long serialVersionUID = 1L;
	private String userID;
	public String clearStorage() throws Exception {
		UserDao ud = new UserDao();
		ud.clearNotes(userID);
		return "SUCCESS";
	}
	public String getUserID() {
		return userID;
	}
	public void setUserID(String userID) {
		this.userID = userID;
	}
	
}