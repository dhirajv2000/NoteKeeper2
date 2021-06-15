package com.notekeeper.controller;

import java.util.List;

import org.json.*;

import com.notekeeper.model.*;
import com.opensymphony.xwork2.ActionSupport;

public class PostAction extends ActionSupport {
	private static final long serialVersionUID = -6765991741441442190L;
	private List<Note> data;
	public String writeJSON() {
		try {
			String userID = data.get(0).getId(); 
			System.out.println(data);
			data.remove(0);
			System.out.println(data);
			UserDao ud = new UserDao();
			ud.update(data, userID);
			
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
