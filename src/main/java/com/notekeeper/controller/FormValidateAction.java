package com.notekeeper.controller;

import com.notekeeper.model.UserDao;

public class FormValidateAction {
	private boolean isExists = false;
	private String value;
	
	public String checkValue() throws Exception {
		isExists = UserDao.checkUserName(value);
		return "SUCCESS";
	}
	
	public boolean isExists() {
		return isExists;
	}
	public void setExists(boolean isExists) {
		this.isExists = isExists;
	}

	public void setValue(String value) {
		this.value = value;
	}	
	
}
