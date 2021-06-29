//Reads database configuration from properties file
package com.notekeeper.model;

import java.util.Properties;
import java.io.*;

public class GetConfig {
	private String dbUrl, dbUsername, dbPassword;

	public GetConfig() {
		String filePath = "config.properties";
		Properties props;
		props = new Properties();
		try {
			InputStream ip = getClass().getClassLoader().getResourceAsStream(filePath);
			props.load(ip);
			this.dbUrl = props.getProperty("dbUrl");
			this.dbUsername = props.getProperty("dbUsername");
			this.dbPassword = props.getProperty("dbPassword");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public String getDbUrl() {
		return dbUrl;
	}

	public String getDbUsername() {
		return dbUsername;
	}

	public String getDbPassword() {
		return dbPassword;
	}

}
