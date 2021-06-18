package com.notekeeper.controller;

import java.util.List;

import org.json.*;

import com.notekeeper.model.*;
import com.opensymphony.xwork2.ActionSupport;

public class DeleteNoteAction extends ActionSupport {
	private static final long serialVersionUID = -6765991741441442190L;
	private List<Note> data;

	public String deleteNote() {
		try {
			String userID = data.get(0).getId();
			String noteID = data.get(1).getId();
			data.remove(0);
			UserDao ud = new UserDao();
			ud.deleteNote(userID, noteID);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

	public List<Note> getData() {
		return data;
	}

	public void setData(List<Note> data) {
		this.data = data;
	}
}