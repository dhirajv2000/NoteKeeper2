package com.notekeeper.controller;

import java.util.List;

import com.notekeeper.model.UserDao;
import com.opensymphony.xwork2.ActionSupport;

public class ClearAction extends ActionSupport {
	private static final long serialVersionUID = 1L;
	private String dataList = null;

	public String clearJSON() throws Exception {
		UserDao ud = new UserDao();
		ud.clearNote();
		return "SUCCESS";
	}

	public String getDataList() {
		return dataList;
	}

	public void setDataList(String dataList) {
		this.dataList = dataList;
	}
}


