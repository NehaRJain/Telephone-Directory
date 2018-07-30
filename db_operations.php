<?php
include "db_connection.php";
$action = $_POST['action'];
if ($action=="list"){
    $i = 0;
    $query = "SELECT id,name,number FROM phone";
    if (! $result = mysqli_query($con, $query)) {
        exit(mysqli_error($con));
    }
    $response = array();
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $response[$i] = $row;
            $i ++;
        }
    } 
    else {
        $response['status'] = 200;
        $response['message'] = "Data not found!";
    }
    echo json_encode($response);
}
else if($action=="create"){
    $name = $_POST['name'];
    $number = $_POST['number'];
    $sql = "insert into phone  (name, number) values (?,?)";
    $statement=$con->prepare($sql);
    $statement->bind_param("ss", $name,$number);
    if($statement->execute())
    {
        $last_id = $con->insert_id;
    } 
    else 
    {
        $last_id=0;
    }
    echo "[{\"id\":".$last_id."}]";;
}
else if($action=="update")
{
    $id = $_POST['id'];
    $name = $_POST['name'];
    $number = $_POST['number'];
    $sql =  "update phone set name=?, number=? where id=?";
    $statement=$con->prepare($sql);
    $statement->bind_param("ssi",$name,$number,$id);
    if($statement->execute()){
        $data=1;
    }
    else 
    {
        $data=0;
    }
    echo "[{\"data\":".$data."}]";;
}
else if($action=="delete"){
    $id = $_POST['id'];
    $query ="delete from phone where id=?";
    $statement=$con->prepare($query);
    $statement->bind_param("i", $id);
    if($statement->execute())
    {
        $data = 1;
    } 
    else 
    {
        $data=0;
    }
    $data=1;
    echo "[{\"data\":".$data."}]";;
}
?>