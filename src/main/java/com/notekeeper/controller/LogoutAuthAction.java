//Performs logout
package com.notekeeper.controller;

import com.notekeeper.model.*;
import com.opensymphony.xwork2.ActionSupport;

public class LogoutAuthAction extends ActionSupport {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String sessionToken;

	public String logout() {
		TokenDao.tokenInvalidate(sessionToken);
		return "success";
	}

	public String getSessionToken() {
		return sessionToken;
	}

	public void setSessionToken(String sessionToken) {
		this.sessionToken = sessionToken;
	}

}