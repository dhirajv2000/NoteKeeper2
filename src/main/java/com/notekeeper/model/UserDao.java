package com.notekeeper.model;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.json.*;

import com.notekeeper.model.*;

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

	public Boolean validate(UserBean user) {
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

	public void update(List<Note> data, String userid) {
			/*JSONArray jo = new JSONArray(data);
			Connection con = getConnection();
			HttpSession session = ServletActionContext.getRequest().getSession(false);
			String sql = "update userdb.user set notes= CAST(? AS JSON) where iduser =? ";
			try {
				PreparedStatement ps = con.prepareCall(sql);
				ps.setString(1, jo.toString());
				ps.setString(2, session.getAttribute("userid").toString());
				ps.executeUpdate();

			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}*/
		JSONArray jo = new JSONArray(data);
		Connection con = getConnection();
		String sql;
		PreparedStatement ps;
		try {
			HttpSession session = ServletActionContext.getRequest().getSession(false);
			sql = "select * from userdb.notes where userid = ? ";
			ps = con.prepareCall(sql);
			ps.setString(1, userid);
			ResultSet rs = ps.executeQuery();
			if(rs.next()) {
				System.out.println("hi");
				sql = "update userdb.notes set notes= CAST(? AS JSON) where userid =?";
				ps = con.prepareStatement(sql);
				ps.setString(1, jo.toString());
				ps.setString(2, session.getAttribute("userid").toString());
				ps.executeUpdate();
			} else {
				sql = "insert into userdb.notes values(?,?) ";
				ps = con.prepareStatement(sql);
				System.out.println("bye");
				ps.setString(1, session.getAttribute("userid").toString());
				ps.setString(2, null);
				ps.executeUpdate();
			}

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public String readNote() {
		Connection con = getConnection();
		HttpSession session = ServletActionContext.getRequest().getSession(false);
		String sql = "Select notes from userdb.notes where userid =?";
		String notes = null;
		try {
			PreparedStatement ps = con.prepareCall(sql);
			ps.setString(1, session.getAttribute("userid").toString());
			ResultSet rs = ps.executeQuery();
			rs.next();
			notes = rs.getString(1);

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return notes;
	}
	
	public void clearNote() {
		Connection con = getConnection();
		HttpSession session = ServletActionContext.getRequest().getSession(false);
		String sql = "update userdb.notes set notes= null where userid =?";
		String status = "fail";
		try {
			PreparedStatement ps = con.prepareCall(sql);
			ps.setString(1, session.getAttribute("userid").toString());
			ps.executeUpdate();
			status ="sucess";
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
