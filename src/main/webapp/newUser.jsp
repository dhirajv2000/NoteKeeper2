<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
<h1>User Registration</h1>
<form action="createuser.action" method="post">
    <table>
    <tr><td>username</td><td><input type="text" name="uname" required/></td></tr>
    <tr><td>password</td><td><input type="password" name="password" required/></td></tr>
    <tr><td>email</td><td><input type="text" name="email" required/></td></tr>
    <tr><td>phone</td><td><input type="text" name="phone" required/></td></tr>
    <tr><td></td><td><input type="submit" value="submit" /></td></tr>
    </table> 
  </form>
</body>
</html>