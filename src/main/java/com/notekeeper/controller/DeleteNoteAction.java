package com.notekeeper.controller;

import java.util.List;

import org.json.*;

import com.notekeeper.model.*;
import com.opensymphony.xwork2.ActionSupport;

public class DeleteNoteAction extends ActionSupport {
	private static final long serialVersionUID = -6765991741441442190L;
	private List<Note> data;
	private int statusCode;

	public String deleteNote() {
		try {
			String sessionToken = data.get(0).getId();
			if (!TokenDao.checkValidity(sessionToken)) {
				statusCode = 401;
				return SUCCESS;
			}
			String noteID = data.get(1).getId();
			data.remove(0);
			UserDao.deleteNote(sessionToken, noteID);
			statusCode = 200;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

	public int getStatusCode() {
		return statusCode;
	}

	public void setData(List<Note> data) {
		this.data = data;
	}
}