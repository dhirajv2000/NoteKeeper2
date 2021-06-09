package com.notekeeper.model;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UserDao {

	public Connection getConnection() {
		Connection con = null;
		GetConfig gc = new GetConfig();
		try {
			Class.forName("com.mysql.jdbc.Driver");
			con = DriverManager.getConnection(gc.getDbUrl(), gc.getDbUsername(), gc.getDbPassword());
		} catch (Exception e) {
			System.out.println(e);
		}
		return con;
	}
	
	public String insert(UserBean user) {
		Connection con = getConnection();
		String sql = "insert into userdb.user values(?,?,md5(?),?,?)";
		String result = "Data entered succesfully";
		try {
			PreparedStatement ps = con.prepareCall(sql);
			ps.setString(1, null);
			ps.setString(2, user.getUname());
			ps.setString(3, user.getPassword());
			ps.setString(4, user.getEmail());
			ps.setString(5, user.getPhone());
			ps.executeUpdate();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			result = "Data not entered";
		}
		return result;
	}
	
	public Boolean validate(UserBean user) {
		Connection con = getConnection();
		boolean status=false;
		String sql = "select * from userdb.user where username =? and password = md5(?)";
		try {
			PreparedStatement ps = con.prepareCall(sql);
			ps.setString(1, user.getUname());
			ps.setString(2, user.getPassword());
			ResultSet rs = ps.executeQuery();  
			status = rs.next();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return status;
	}
}
