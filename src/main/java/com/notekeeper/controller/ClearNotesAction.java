package com.notekeeper.controller;

import com.notekeeper.model.TokenDao;
import com.notekeeper.model.UserDao;
import com.opensymphony.xwork2.ActionSupport;

public class ClearNotesAction extends ActionSupport {
	private static final long serialVersionUID = 1L;
	private String sessionToken;
	private int statusCode;

	public String clearNotes() throws Exception {
		if (!TokenDao.checkValidity(sessionToken)) {
			statusCode = 401;
			return "SUCCESS";
		}
		UserDao.clearNotes(sessionToken);
		statusCode = 200;
		return "SUCCESS";
	}

	public void setSessionToken(String sessionToken) {
		this.sessionToken = sessionToken;
	}

	public int getStatusCode() {
		return statusCode;
	}
}