package com.notekeeper.controller;

import java.util.ArrayList;
import java.util.List;

import com.notekeeper.model.UserDao;
import com.opensymphony.xwork2.ActionSupport;

public class GetAction extends ActionSupport {
	private static final long serialVersionUID = 1L;
	private String dataList = null;

	public String readJSON() throws Exception {
		UserDao ud = new UserDao();
		dataList = ud.readNote();
		return "SUCCESS";
	}

	public String getDataList() {
		return dataList;
	}

	public void setDataList(String dataList) {
		this.dataList = dataList;
	}
}