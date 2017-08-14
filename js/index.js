var flag=0;
var i,j;
var ans=new Array();
var weight=new Array();
var totalsco=new Array();

//startpage blur
$.post("count.php","","");
$(window).on("load",function()
{
    $("#startpage1").css("display","block");
    
    /*
    $(".startpage").css("transition","2s");
    $(".startpage").css("filter","blur(50px)");
    setTimeout(function()
    {
        $(".startpage").css("transition","1s");
        $(".startpage").css("filter","blur(0px)");
    },2000);
    $("#startpage").css("display","block");
    */
    var timer=setInterval(function()
    {
        if(currentPage>=6)
        {
            clearInterval(timer);
            return;
        }
        nextPage();
    },1500);
});
$(window).on("resize",function()
{
    wh=$(window).height(),ww=$(window).width();
});
/*
setInterval(function(){
    $(".startpage").css("transition","2s");
    $(".startpage").css("filter","blur(50px)");
    setTimeout(function()
    {
        $(".startpage").css("transition","1s");
        $(".startpage").css("filter","blur(0px)");
    },2000);
},10000);
*/
//startpage shake

$(".arrow").css("transition","400ms");
setInterval(function()
{
    $(".arrow").css("transform","translateY(-20%)");
    setTimeout(function()
    {
        $(".arrow").css("transform","translateY(-10%)");
    },300);
},600);

//page init
var page=document.getElementsByClassName("page");


//changepage
var wh=$(window).height(),ww=$(window).width();
var currentPage=0,pageTotal=page.length;
var locked=false;
/*
function backPage()
{
    locked=true;
    var e1=page[currentPage],e2=page[(currentPage+pageTotal-1)%pageTotal];
    $(e1).css("transition","0");
    $(e1).css("z-Index","1");
    $(e1).css("top","0");
    $(e1).css("transform","");
    $(e2).css("transition","0");
    $(e2).css("z-Index","0");
    $(e2).css("display","block");
    $(e2).css("transform","scale(0.5) translateY(-"+wh/2+"px)");
    $(e2).css("top","0");
    setTimeout(function()
    {
        $(e1).css("transition","800ms");
        $(e2).css("transition","1000ms");
        setTimeout(function()
        {
            $(e1).css("transform","translateY("+wh+"px)");
            $(e2).css("transform","");
        },100);
        setTimeout(function()
        {
            $(e1).css("display","none");
        },1000);        
        setTimeout(function()
        {
            locked=false;
        },1000);
    },0);
    currentPage=(currentPage+pageTotal-1)%pageTotal;      
}
*/
function nextPage()
{
    if(locked==false)
    {
        locked=true;
        if(currentPage<pageTotal-1)
        {
            var e1=page[currentPage],e2=page[(currentPage+1)];
            currentPage=currentPage+1;
            $(e1).css("z-Index","0");
            $(e2).css("z-Index","1");
            $(e2).css("transition","0");
            $(e2).css("display","block");
            $(e2).css("transform","");
            $(e2).css("top",wh+"px");
            setTimeout(function()
            {
                $(e2).css("transition","800ms");
                setTimeout(function()
                {
                    if($(window).width()<768)
                    {
                        $(e1).css("transition","1000ms");
                        $(e1).css("transform","scale(0.4) translateY(-"+wh/2+"px)");
                    }
                    else
                    {
                        $(e1).css("transition","800ms");
                        $(e1).css("transform","translateY(-"+wh+"px)");
                    }
                    $(e2).css("transform","translateY(-"+wh+"px)");
                },100);
                setTimeout(function()
                {
                    $(e1).css("display","none");
                },800);        
                setTimeout(function()
                {
                    $(e2).css("transition","0s");
                    $(e2).css("transform","");
                    $(e2).css("top","0");
                    locked=false;
                    if(currentPage==pageTotal-1)
                    {
                        showResult();
                    }
                },800);
            },0);
        }
    }
}

//showResult
//q1
function showResult()
{
    switch(ans[0])
    {
        case 0:weight[9]=0.1;break;
        case 1:weight[9]=0.7;break;
        case 2:weight[9]=1;break;
        default:weight[9]=0;break;
    }
    //q2
    var lowerbound1=0,lowerbound2=0,lowerbound3=0,upperbound1=0,upperbound2=0,upperbound3=0;
    weight[7]=2;
    switch(ans[1])
    {
        case 0:lowerbound1=3000;upperbound1=5000;lowerbound2=5000;upperbound2=6000;break;
        case 1:lowerbound1=5000;upperbound1=7000;lowerbound2=4000;upperbound2=5000;lowerbound3=7000;upperbound3=8000;break;
        case 2:lowerbound1=7000;upperbound1=9000;lowerbound2=6000;upperbound2=7000;lowerbound3=9000;upperbound3=10000;break;
        case 3:lowerbound1=9000;upperbound1=14000;lowerbound2=7000;upperbound2=9000;lowerbound3=14000;upperbound3=16000;break;
        case 4:lowerbound1=14000;upperbound1=30000;lowerbound2=12000;upperbound2=14000;break;
    }
    for(i=0;i<comp.length;i++)
    {
        if(comp[i][8]>=lowerbound1&&comp[i][8]<=upperbound1)
            sco[i][7]=100;
        if(comp[i][8]>=lowerbound2&&comp[i][8]<=upperbound2)
            sco[i][7]=60;
        if(comp[i][8]>=lowerbound3&&comp[i][8]<=upperbound3)
            sco[i][7]=20;
    }
    //q3
    var keyword="";
    weight[0]=1;
    switch(ans[2])
    {
        case 0:keyword="lenovo";break;
        case 1:keyword="hp";break;
        case 2:keyword="apple";break;
        case 3:keyword="mi";break;
        case 4:keyword="dell";break;
        default:weight[0]=0;
    }
    for(i=0;i<comp.length;i++)
    {
        if(comp[i][1]==keyword)
        {
            sco[i][0]=0;
        }
        else
        {
            sco[i][0]=100;
        }
    }
    //q4 q5
    if(ans[3]==0)
    {
        weight[5]=1;
        for(i=0;i<comp.length;i++)
        {
            if(comp[i][6]==0)
            {
                sco[i][5]=30;
            }
            else
            {
                sco[i][5]=100;
            }
        }
    }
    else
    {
        weight[5]=0;
    }
    weight[6]=1;
    switch(ans[4])
    {
        case 0:
        {
            for(i=0;i<comp.length;i++)
            {
                if(comp[i][7]==1024)
                {
                    sco[i][6]=100;
                }
                else
                {
                    sco[i][6]=60;
                }
            }
            break;
        }
        case 1:
        {
            for(i=0;i<comp.length;i++)
            {
                if(comp[i][6]==128&&comp[i][7]==0)
                {
                    sco[i][6]=60;
                }
                else
                {
                    sco[i][6]=100;
                }
            }
            break;
        }
        case 2:weight[6]=0;break;
    }
    //q6 q7
    if(ans[5]==0||ans[6]==0)
    {
        weight[2]=1;
    }
    else if(ans[5]==2&&ans[6]==2)
    {
        weight[2]=0.1;
    }
    else
    {
        weight[2]=0.7;
    }
    //q8
    var size1=0,size2=0,size3=0;
    weight[1]=1;
    switch(ans[7])
    {
        case 0:size1=12.5;size2=13.3;break;
        case 1:size1=13.3;size2=12.5;size3=14;break;
        case 2:size1=14;size2=13.3;size3=15.6;break;
        case 3:size1=15.6;size2=14;break;
        default:weight[1]=0;
    }
    for(i=0;i<comp.length;i++)
    {
        if(comp[i][2]==size1)
            sco[i][1]=100;
        if(comp[i][2]==size2)
            sco[i][1]=20;
        if(comp[i][2]==size3)
            sco[i][1]=20;
    }
    //q9 q10
    if(ans[8]==0||ans[9]==0)
    {
        weight[4]=1;
    }
    else if(ans[8]==2&&ans[9]==2)
    {
        weight[4]=0;
    }
    else
    {
        weight[4]=0.7;
    }
    //q11
    switch(ans[10])
    {
        case 0:weight[3]=1;break;
        case 1:weight[3]=0.7;break;
        case 2:weight[3]=0.1;break;
        default:weight[3]=0;break;
    }
    //q12
    switch(ans[11])
    {
        case 0:weight[8]=0.7;break;
        case 1:weight[8]=0.49;break;
        case 2:weight[8]=0.07;break;
        default:weight[8]=0;break;
    }
    //total
    var max_total=0,max_label=0;
    for(i=0;i<comp.length;i++)
    {
        totalsco[i]=0;
        for(j=0;j<10;j++)
        {
            totalsco[i]+=weight[j]*sco[i][j];
        }
    }
    for(i=0;i<totalsco.length;i++)
    {
        if(totalsco[i]>max_total)
        {
            max_total=totalsco[i];
            max_label=i;
        }
    }
    $("#result1").html(comp[max_label][1]+" "+comp[max_label][0]+"<br>"+comp[max_label][2]+"寸"
    +" "+comp[max_label][3]+" "+comp[max_label][4]+" "+comp[max_label][5]+"内存 "+comp[max_label][6]
    +"gSSD+"+comp[max_label][7]+"gHDD "+comp[max_label][8]+"元");
    totalsco[max_label]=0;
    max_total=0;
    max_label=0;
    for(i=0;i<totalsco.length;i++)
    {
        if(totalsco[i]>max_total)
        {
            max_total=totalsco[i];
            max_label=i;
        }
    }
    $("#result2").html(comp[max_label][1]+" "+comp[max_label][0]+"<br>"+comp[max_label][2]+"寸"
    +" "+comp[max_label][3]+" "+comp[max_label][4]+" "+comp[max_label][5]+"内存 "+comp[max_label][6]
    +"gSSD+"+comp[max_label][7]+"gHDD "+comp[max_label][8]+"元");
    totalsco[max_label]=0;
    max_total=0;
    max_label=0;
    for(i=0;i<totalsco.length;i++)
    {
        if(totalsco[i]>max_total)
        {
            max_total=totalsco[i];
            max_label=i;
        }
    }
    $("#result3").html(comp[max_label][1]+" "+comp[max_label][0]+"<br>"+comp[max_label][2]+"寸"
    +" "+comp[max_label][3]+" "+comp[max_label][4]+" "+comp[max_label][5]+"内存 "+comp[max_label][6]
    +"gSSD+"+comp[max_label][7]+"gHDD "+comp[max_label][8]+"元");
    $("#resultpage .question").css("opacity","1");
    $("#resultpage .question").css("transform","translateY(0)");
    setTimeout(function()
    {
        $("#result1").css("opacity","1");
        $("#result1").css("transform","translateY(0)");
    },700);
    setTimeout(function()
    {
        $("#result2").css("opacity","1");
        $("#result2").css("transform","translateY(0)");
    },1400);
    setTimeout(function()
    {
        $("#result3").css("opacity","1");
        $("#result3").css("transform","translateY(0)");
    },2100);
}
$(".tip").on("click",function()
{
    nextPage();
});

$(".answer").on("click",function()
{
    nextPage();
});
var sy;
window.addEventListener("touchstart",function(event)
{
    if(event.targetTouches.length==1)
    {
        sy=event.targetTouches[0].clientY;
    }
});
window.addEventListener("touchend",function(event)
{
    if(event.changedTouches.length==1)
    {
        var dy=event.changedTouches[0].clientY-sy;
        if(dy<0)
        {
            nextPage();
        }
    }
});
$(window).on("keydown",function(e)
{
    if(e.keyCode==32)
    {
        nextPage();
        //backPage();
    }
    if(e.keyCode==13)
    {
        
    }
});
var quescont=document.getElementsByClassName("ques-cont");
for(i=0;i<quescont.length;i++)
{
    let _i=i;
    var answer=quescont[i].getElementsByClassName("answer");
    for(j=0;j<answer.length;j++)
    {
        let _j=j;
        answer[j].addEventListener("click",function()
        {
            ans[_i]=_j;
                //answer[_j].style.color="#000";
        });
    }
}
