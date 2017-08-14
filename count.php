<?php
session_start();
$filepath = 'count.txt';
if ($_SESSION['temp'] == '')
{
    if (!file_exists($filepath))
    {
        $fp = fopen($filepath,'w');
        fwrite($fp,0);
        fclose($fp);
        counter($filepath);
    }else
    {
        counter($filepath);
    }
    $_SESSION['temp'] = 1;
}
echo file_get_contents($filepath);
function counter($f_value)
{
    $fp = fopen($f_value,'r') or die('打开文件时出错。');
    $countNum = fgets($fp,1024);
    fclose($fp);
    $countNum++;
    $fpw = fopen($f_value,'w');
    fwrite($fpw,$countNum);
    fclose($fpw);
}


$con=mysqli_connect("localhost","log","ZqcAnnyTerfect123!","log"); 
if (mysqli_connect_errno($con)) 
{ 
    echo "连接 MySQL 失败: " . mysqli_connect_error(); 
} 
mysqli_query($con,"INSERT INTO visitorinf (ip) VALUES ('{$_SERVER['REMOTE_ADDR']}')");
mysqli_close($con);
?>