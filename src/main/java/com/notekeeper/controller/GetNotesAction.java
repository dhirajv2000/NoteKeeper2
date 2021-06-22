package com.notekeeper.controller;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;

import com.notekeeper.model.UserDao;
import com.opensymphony.xwork2.ActionSupport;

public class GetNotesAction extends ActionSupport {
	private static final long serialVersionUID = 1L;
	private String dataList = null;
	private String id;
	
	public String getNotes() throws Exception {
		dataList = UserDao.getNotes(id);
		JSONArray ja = new JSONArray(dataList);
		return "SUCCESS";
	}

	public String getDataList() {
		return dataList;
	}

	public void setDataList(String dataList) {
		this.dataList = dataList;
	}

	public void setId(String id) {
		this.id = id;
	}
	
	
}