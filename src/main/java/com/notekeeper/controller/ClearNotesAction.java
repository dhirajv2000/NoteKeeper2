package com.notekeeper.controller;

import com.notekeeper.model.UserDao;
import com.opensymphony.xwork2.ActionSupport;

public class ClearNotesAction extends ActionSupport {
	private static final long serialVersionUID = 1L;
	private String userID;
	public String clearNotes() throws Exception {
		UserDao.clearNotes(userID);
		return "SUCCESS";
	}
	public String getUserID() {
		return userID;
	}
	public void setUserID(String userID) {
		this.userID = userID;
	}
	
}