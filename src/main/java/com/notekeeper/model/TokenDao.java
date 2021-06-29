//Class for maintaining tokens and verifying validity
package com.notekeeper.model;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class TokenDao {

	public static Connection getConnection() {
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

	public static void tokenMap(String userID, String token) {
		Connection con = getConnection();
		try {
			String sql = "insert into userdb.tokens values(?,?, now())";
			PreparedStatement ps = con.prepareCall(sql);
			ps.setString(1, userID);
			ps.setString(2, token);
			ps.executeUpdate();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public static void tokenInvalidate(String sessionToken) {
		Connection con = getConnection();
		try {
			String sql = "delete from userdb.tokens where userdb.tokens.token = ?";
			PreparedStatement ps = con.prepareCall(sql);
			ps.setString(1, sessionToken);
			ps.executeUpdate();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public static boolean checkValidity(String sessionToken) {
		Connection con = getConnection();
		boolean validity = false;
		try {
			String sql = "select TIME_TO_SEC(TIMEDIFF(NOW(), createtime)) from userdb.tokens where userdb.tokens.token = ?";
			PreparedStatement ps = con.prepareCall(sql);
			ps.setString(1, sessionToken);
			ResultSet rs = ps.executeQuery();
			rs.next();
			int elapsedTime = Integer.parseInt(rs.getString(1));
			if (elapsedTime < 10000) {
				validity = true;
			} else {
				tokenInvalidate(sessionToken);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return validity;
	}
}
