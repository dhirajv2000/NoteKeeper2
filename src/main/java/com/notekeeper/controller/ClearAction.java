package com.notekeeper.controller;

import java.util.List;

import com.notekeeper.model.Note;
import com.notekeeper.model.UserDao;
import com.opensymphony.xwork2.ActionSupport;

public class ClearAction extends ActionSupport {
	private static final long serialVersionUID = 1L;
	private List<Note> data;

	public String clearJSON() throws Exception {
		UserDao ud = new UserDao();
		ud.clearNote();
		return "SUCCESS";
	}

	public List<Note> getData() {
		return data;
	}

	public void setData(List<Note> data) {
		this.data = data;
	}

	

	
}


