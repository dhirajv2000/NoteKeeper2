package com.notekeeper.controller;

import java.util.List;

import org.json.*;

import com.notekeeper.model.*;
import com.opensymphony.xwork2.ActionSupport;

public class SaveNotesAction extends ActionSupport {
	private static final long serialVersionUID = -6765991741441442190L;
	private List<Note> data;

	public String saveNotes() {
		try {
			String noteID, noteContent, noteTitle;
			String userID = data.get(0).getId();
			data.remove(0);
			UserDao ud = new UserDao();
			for (int i = 0; i < data.size(); i++) {
				noteID = data.get(i).getId();
				noteTitle = data.get(i).getTitle();
				noteContent = data.get(i).getContent();
				ud.saveNotes(noteID, noteTitle, noteContent, userID);
			}
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
