<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Login For Telephone Directory</title>
<link rel="stylesheet" type="text/css" href="css/styles.css">
</head>
<body>
	<h1>Telephone Directory!</h1>
	<form method="post" action="">
		<h3>Login Here</h3>
		<label>Name:</label><br> <input type="text" name="name" required="required" id="name" /><br><br>
		<label>Password:</label><br> <input type="password" name="password" id="password" /><br><br> 
		<input type="submit" value="Login" name="submit" id="submit"/> 
		<input type="reset" value="Reset" />
	</form>
</body>
</html>
<?php
if(isset($_POST['submit'])){ 
    $name = $_POST["name"];
    $userPassword = $_POST["password"];
    include("db_connection.php");
    $sql = "SELECT name from login where name=? and password=? ";
    $statement=$con->prepare($sql);
    $statement->bind_param("ss", $name,$userPassword);
    $statement->execute();
    if (mysqli_stmt_fetch($statement)>0) {
        session_start();
        $_SESSION['user']= $name;
        echo "<script type='text/javascript'> location.href='index.php' </script>";
    }
    else
    {
        echo "<p>User Name Or Password Invalid!<p>";
    }
}   
?>
 