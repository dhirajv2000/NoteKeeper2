package com.notekeeper.controller;

import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class SessionAction extends ActionSupport {
	private static final long serialVersionUID = 1L;
	private String sessionId = null;

	public String execute() throws Exception {
		HttpSession session = ServletActionContext.getRequest().getSession(false);
		sessionId = session.getAttribute("userid").toString();
		return "SUCCESS";
	}

	public String getsessionId() {
		return sessionId;
	}

	public void setsessionId(String sessionId) {
		this.sessionId = sessionId;
	}
}