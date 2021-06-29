//Provides details about the session to client
package com.notekeeper.controller;

import java.util.List;
import java.util.ArrayList;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class SessionAction extends ActionSupport {
	private static final long serialVersionUID = 1L;
	private List<String> sessionDetails = null;

	public String execute() throws Exception {
		HttpSession session = ServletActionContext.getRequest().getSession(false);
		sessionDetails = new ArrayList<String>();
		String sessionId = session.getAttribute("userid").toString();
		String sessionUser = session.getAttribute("username").toString();
		String sessionToken = session.getAttribute("token").toString();
		sessionDetails.add(sessionId);
		sessionDetails.add(sessionUser);
		sessionDetails.add(sessionToken);
		return "SUCCESS";
	}

	public List<String> getSessionDetails() {
		return sessionDetails;
	}

	public void setSessionDetails(List<String> sessionDetails) {
		this.sessionDetails = sessionDetails;
	}

}