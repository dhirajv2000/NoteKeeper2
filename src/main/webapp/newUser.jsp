<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
<h1>User Registration</h1>
<form action="createuser.action" id = "createUserForm" method="post">
    <table>
    <tr><td>username</td><td><input type="text" name="uname" id="uname-box" required/></td><td id = "uname-validity"></td></tr>
    <tr><td>password</td><td><input type="password" name="password" id="password-box" required/></td><td id = "password-validity"></td></tr>
    <tr><td>email</td><td><input type="text" name="email" id="email-box" required/></td><td id = "email-validity"></td></tr>
    <tr><td>phone</td><td><input type="text" name="phone" id="phone-box" required/></td><td id = "phone-validity"></td></tr>
    <tr><td></td><td><input type="submit" value="submit" id="submit-btn" /></td></tr>
    </table> 
  </form>
</body>
  <script src="src/scripts/validation.js"></script>
</html>