package com.notekeeper.controller;

import java.util.ArrayList;
import java.util.List;

import com.notekeeper.model.UserDao;
import com.opensymphony.xwork2.ActionSupport;

public class GetStorageAction extends ActionSupport {
	private static final long serialVersionUID = 1L;
	private String dataList = null;
	private String id;
	
	public String getStorage() throws Exception {
		UserDao ud = new UserDao();
		dataList = ud.getNotes(id);
		return "SUCCESS";
	}

	public String getDataList() {
		return dataList;
	}

	public void setDataList(String dataList) {
		this.dataList = dataList;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
	
}