<?php
session_start();
if (isset($_SESSION['user'])) {
    $name = $_SESSION['user'];
    echo "<h3> Hello " . $name . ", Welcome to Telephone Directory!";
} else {
    header('location: login.php');
}
?>

<html>
<head>
<title>Telephone Directory</title>
<link rel="stylesheet" type="text/css" href="css/styles.css">
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script type="text/javascript" src="js/main.js"></script>
</head>

<body id="body">
	<ul class="nav">
		<li><a href="#Home" id="home" onclick="home()">Home</a></li>
		<li><a href="#View" id="view" onclick="view()">View</a></li>
		<li><a href="#Insert" id="insertNew">Insert</a></li>
		<li><a href="#Search" id="searchCorrect"> Search</a>
		<li><a href="logout.php"> Log Out</a>
	</ul>
	<h1 id="homemsg">TelePhone Directory!</h1>
	<p id="insertSuccess" hidden>Inserted Successfully</p>
	<p id="insertUnsuccess" hidden>Unsuccessfull</p>
	<form id="insertForm" method="post" hidden="hidden">
		Name:<input type="text" id="name" onblur="validate()" /><br /> <br />
		Number:<input type="text" id="number" disabled onblur="validateNumber()" /> <br> 
		<input type="button" id="insert" disabled value="Insert Contact" />
	</form>
	<form id="searchForm" method="post" hidden="hidden">
		<input type="text" id="searchName" placeholder=" Search" onkeyup="find()" size="45" /><br /> <br>
	</form>
	<table id="display" hidden="hidden" border="1" cellpadding="5">
		<thead>
			<tr>
				<th>ID</th>
				<th>Name</th>
				<th>Number</th>
				<th>Edit</th>
				<th>Delete</th>
			</tr>
		</thead>
		<tbody id="results">
		</tbody>
	</table>
	<div id="dialog-form" title="Edit" hidden>
		<form class='modal-content'>
				<label>
					<h3>Edit Information</h3>
				</label> 
				<label>Name :</label><input type="text" name="name" id="editName"><br> <br> 
				<label>Number :</label><br> <input type="text" name="number" id="editNumber"><br> <br> 
				<input type="button" id='btn' value="edit">
				<p id="errorNumber" hidden>Please enter valid 10 digit number</p>
				<p id="errorName" hidden>Name cannot be empty</p>
				<p id="editUnsuccess" hidden>Unsuccessfull, Number already exists</p>
		</form>
	</div>
</body>
</html>
