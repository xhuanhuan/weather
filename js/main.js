var low=[];
var high=[];
var sk;
var today;
var future;
var count = 0;
var w=window.innerWidth+1;
var city = [];
var addbutton=$(".add-city")[0];
addbutton
var city_moban =
    '<div>'+
    '<div class="container">'+
      '<div class="row">' +
'<div class="homepage col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xs-offset-0 col-sm-offset-0 col-md-offset-2 col-lg-offset-2">'+
'<div class="today">'+'</div></div>'+
'<div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xs-offset-0 col-sm-offset-0 col-md-offset-2 col-lg-offset-2">'+
'<div class="table-responsive">'+
'<table class="sev-wea" class="table">'+
'<thead></thead><tbody></tbody></table></div></div>'+
'<div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xs-offset-0 col-sm-offset-0 col-md-offset-2 col-lg-offset-2">'+
'<div class="sevenday">'+
'<canvas draw-index = "0" class="line-weather">'+'Your browser does not support the canvas element.</canvas></div></div>'+
'<div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xs-offset-0 col-sm-offset-0 col-md-offset-2 col-lg-offset-2">'+
'<h4>指数</h4>'+
'<table class="table index"><tr>'+
  '<td><ul><li style="font-size:20px;">☂</li><li class="ambrela"></li></ul></td>'+
  '<td><ul><li><img src="clothes.jpg" style="width:20px;"></li><li class="clothe"></li></ul></td>'+
  '<td><ul><li><img src="car.jpg" style="width:20px;"></li><li class="car"></li></ul></td></tr><tr>'+
  '<td><ul><li><img src="sun.jpg" style="width:20px;"></li><li class="sun"></li></ul></td>'+
  '<td><ul><li><img src="run.jpg" style="width:20px;"></li><li class="exercise"></li></ul></td>'+
  '<td><ul><li><img src="sunset.jpg" style="width:20px;"></li><li class="sunset"></li></ul></td>'+'</tr></table></div></div></div></div>'
$(document).ready(function(){
//---------------------------
$.getScript("http://pv.sohu.com/cityjson?ie=utf-8",main);
function main(){
  console.log(returnCitySN);
city.push(returnCitySN["cname"].split('省')[1]);
console.log(city);


addCity();
init_cityside();

//------windowresize--------
window.onresize=function(){
  $("#backimg").css({'width':window.innerWidth});
  $("#backimg").css({'height':window.innerHeight});

  if (window.innerWidth<767){
    c.width=$(".sevenday").width();
    $(".homepage").css({'height':window.innerHeight-80});
    $(".today").css({'position':'absolute'});
    $(".today").css({'bottom':'0'});
  }else{
    c.width=$(".sevenday").width();
    $(".homepage").css({'height':'auto'});
    $(".today").css({'position':''});
  }
  drawline();
}

$("#add").click(function(){
$(".inputcity").show();
});

document.getElementById("search").onclick=function(){
  city.push(document.getElementById("city1").value);
  addCity();
  $('.inputcity').hide();
}

$("#getback").click(function(){
   $('#city-store').animate({'left':-w},500);
});

$("#getcity").click(function(){
  if($('#city-store').css('left')=='0px'){
       $('#city-store').animate({'left':-w},500);
     }else{
        $('#city-store').animate({'left':0},500);
     }
});
}
})
