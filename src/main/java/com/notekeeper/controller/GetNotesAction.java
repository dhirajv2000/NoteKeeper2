//Retrieves notes from database for rendering on browser
package com.notekeeper.controller;

import com.notekeeper.model.TokenDao;
import com.notekeeper.model.UserDao;
import com.opensymphony.xwork2.ActionSupport;

public class GetNotesAction extends ActionSupport {
	private static final long serialVersionUID = 1L;
	private String dataList = null;
	private String sessionToken;
	private int statusCode;

	public String getNotes() throws Exception {
		if (!TokenDao.checkValidity(sessionToken)) {
			statusCode = 401;
			return "SUCCESS";
		}
		dataList = UserDao.getNotes(sessionToken);
		statusCode = 200;
		return "SUCCESS";
	}

	public String getDataList() {
		return dataList;
	}

	public void setDataList(String dataList) {
		this.dataList = dataList;
	}

	public void setSessionToken(String sessionToken) {
		this.sessionToken = sessionToken;
	}

	public int getStatusCode() {
		return statusCode;
	}

}