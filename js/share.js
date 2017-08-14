var flag=false;
var tempstr=location.href.split("/");
var n=parseInt(tempstr[tempstr.length-1].replace(/[^0-9]/ig,""));
var meta="<meta itemprop='name' content='"+"我适合的电脑是"+comp[n][1]+" "+comp[n][0]+"你也来试试吧"+"'/>";
$("head").prepend(meta);
$("#result1").text("我适合的电脑是"+comp[n][1]+" "+comp[n][0]+"你也来试试吧");
setTimeout(function()
{
	$(".result").css("transition","1s");
	$(".result").css("opacity","1");
	$(".result").css("transform","translateY(0%)");
},500);
setInterval(function()
{
	flag=!flag;
	if(flag)
	{
		$("#sharetip").css("transform","translate(0px,0px)");
		return;
	}
	else
		$("#sharetip").css("transform","translate(-10px,10px)");
},500)