//Saves notes recieved in the payload
package com.notekeeper.controller;

import java.util.List;
import com.notekeeper.model.*;
import com.opensymphony.xwork2.ActionSupport;

public class SaveNotesAction extends ActionSupport {
	private static final long serialVersionUID = -6765991741441442190L;
	private List<Note> data;
	private int statusCode;

	public String saveNotes() {
		try {
			String noteID, noteContent, noteTitle;
			String sessionToken = data.get(0).getId();
			if (!TokenDao.checkValidity(sessionToken)) {
				statusCode = 401;
				return SUCCESS;
			}
			data.remove(0);
			for (int i = 0; i < data.size(); i++) {
				noteID = data.get(i).getId();
				noteTitle = data.get(i).getTitle();
				noteContent = data.get(i).getContent();
				if (noteContent.replaceAll("\\<.*?\\>", "").length() > 240)
					continue;
				UserDao.saveNotes(noteID, noteTitle, noteContent, sessionToken);
			}
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
