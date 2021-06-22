package com.notekeeper.model;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.json.*;

import com.notekeeper.model.*;

public class UserDao {

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

	public static String insert(UserBean user) {
		Connection con = getConnection();
		String sql = "Insert into userdb.user values(?,?,md5(?),?,?,?)";
		String result = "Data entered succesfully";
		try {
			PreparedStatement ps = con.prepareCall(sql);
			ps.setString(1, null);
			ps.setString(2, user.getUname());
			ps.setString(3, user.getPassword());
			ps.setString(4, user.getEmail());
			ps.setString(5, user.getPhone());
			ps.setString(6, null);
			ps.executeUpdate();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			result = "Data not entered";
		}
		return result;
	}

	public static Boolean validate(UserBean user) {
		Connection con = getConnection();
		boolean status = false;
		String sql = "select * from userdb.user where username =? and password = md5(?)";
		try {
			PreparedStatement ps = con.prepareCall(sql);
			ps.setString(1, user.getUname());
			ps.setString(2, user.getPassword());
			ResultSet rs = ps.executeQuery();
			status = rs.next();
			user.setUserid(rs.getString(1));
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return status;
	}

	public static void saveNotes(String noteID, String noteTitle, String noteContent, String userID) {
		Connection con = getConnection();
		String sql;
		PreparedStatement ps;
		try {
			sql = "select * from userdb.notes where noteID = ? ";
			ps = con.prepareCall(sql);
			ps.setString(1, noteID);
			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				sql = "update userdb.notes set noteTitle =?, noteContent =? where noteID=?";
				ps = con.prepareStatement(sql);
				ps.setString(1, noteTitle);
				ps.setString(2, noteContent);
				ps.setString(3, noteID);
				ps.executeUpdate();
			} else {
				String sql1 = "insert into userdb.notes values(?,?,?,?,now()) ";
				PreparedStatement ps1 = con.prepareStatement(sql1);
				ps1.setString(1, noteID);
				ps1.setString(2, noteTitle);
				ps1.setString(3, noteContent);
				ps1.setString(4, userID);
				ps1.executeUpdate();
				String sql2 = "insert into userdb.privilege values(?,?) ";
				PreparedStatement ps2 = con.prepareStatement(sql2);
				ps2.setString(1, noteID);
				ps2.setString(2, userID);
				ps2.executeUpdate();
			}

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public static String getNotes(String userID) {
		ArrayList<Note> notelist = new ArrayList<Note>();
		Connection con = getConnection();
		HttpSession session = ServletActionContext.getRequest().getSession(false);
		String sql = "Select userdb.notes.noteID, userdb.notes.noteTitle, userdb.notes.noteContent "
				+ "from userdb.notes inner join userdb.privilege on userdb.notes.noteID = userdb.privilege.noteID  "
				+ "where userdb.privilege.userID = ? order by userdb.notes.insertTime";
		JSONArray jsonArray = new JSONArray();
		try {
			PreparedStatement ps = con.prepareCall(sql);
			ps.setString(1, userID);
			ResultSet rs = ps.executeQuery();
			ResultSetMetaData rsmd = rs.getMetaData();
			while (rs.next()) {

				Note note = new Note();
				note.setId(rs.getString("noteID"));
				note.setTitle(rs.getString("noteTitle"));
				note.setContent(rs.getString("noteContent"));
				notelist.add(note);

			}

			for (int i = 0; i < notelist.size(); i++) {
				jsonArray.put(notelist.get(i).getJSONObject());
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return jsonArray.toString(0);
	}
	
	public static void deleteNote(String userID, String noteID) {
		Connection con = getConnection();
		try {
			String sql = "delete userdb.notes, userdb.privilege from userdb.notes inner join userdb.privilege"
					+ " on userdb.notes.noteID = userdb.privilege.noteID where userdb.privilege.noteID = ?";
			PreparedStatement ps = con.prepareCall(sql);
			ps.setString(1, noteID);
			ps.executeUpdate();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public static void clearNotes(String userID) {
		Connection con = getConnection();
		try {
			String sql = "delete userdb.notes, userdb.privilege " + " from userdb.notes inner join userdb.privilege"
					+ " on userdb.notes.noteID = userdb.privilege.noteID where userdb.privilege.userID = ?";
			PreparedStatement ps = con.prepareCall(sql);
			ps.setString(1, userID);
			ps.executeUpdate();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
