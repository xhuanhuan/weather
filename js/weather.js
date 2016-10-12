window.mySwipe = new Swipe(document.getElementById('slider'), {
  startSlide: 0,
  speed: 400,
  auto: 0,
  draggable: false,
  continuous: false,
  disableScroll: false,
  stopPropagation: false,
  callback: function(index, elem) {},
  transitionEnd: function(index, elem) {}
});
var c=document.getElementsByClassName("line-weather")[0];
var ctx=c.getContext("2d");
c.width=$(".sevenday").width();
c.height=300;

var low=[];
var high=[];
var sk;
var today;
var future;
//---------------------------
if (window.innerWidth<767){
  c.width=$(".sevenday").width();
  $("#search_form").css({'margin-left':'20%'});
  $(".homepage").css({'height':window.innerHeight-80});
  $(".today").css({'position':'absolute','bottom':'0'});

}
$("#backimg").css({'width':window.innerWidth});
$("#backimg").css({'height':window.innerHeight});

//-----------
function get_jsonp() {
    $("#result_fut").html('');
    $('#result_weather').html('正在查询中……');

    // $.getJSON("http://v.juhe.cn/weather/index?callback=?", {
    //     "cityname" : $("#city").val(),
    //     "dtype" : "jsonp",
    //     "key" : "488978971707864858562d990d5cf42f"
    // }, function(data)
   var data={
	"resultcode":"200",
	"reason":"successed!",
	"result":{
		"sk":{
			"temp":"16",
			"wind_direction":"西风",
			"wind_strength":"2级",
			"humidity":"34%",
			"time":"15:52"
		},
		"today":{
			"temperature":"11℃~20℃",
			"weather":"晴",
			"weather_id":{
				"fa":"00",
				"fb":"00"
			},
			"wind":"西南风微风",
			"week":"星期日",
			"city":"天津",
			"date_y":"2016年10月09日",
			"dressing_index":"较舒适",
			"dressing_advice":"建议着薄外套、开衫牛仔衫裤等服装。年老体弱者应适当添加衣物，宜着夹克衫、薄毛衣等。",
			"uv_index":"中等",
			"comfort_index":"",
			"wash_index":"较适宜",
			"travel_index":"较适宜",
			"exercise_index":"较适宜",
			"drying_index":""
		},
		"future":{
			"day_20161009":{
				"temperature":"11℃~20℃",
				"weather":"晴",
				"weather_id":{
					"fa":"00",
					"fb":"00"
				},
				"wind":"西南风微风",
				"week":"星期日",
				"date":"20161009"
			},
			"day_20161010":{
				"temperature":"10℃~22℃",
				"weather":"多云",
				"weather_id":{
					"fa":"01",
					"fb":"01"
				},
				"wind":"西南风3-4 级",
				"week":"星期一",
				"date":"20161010"
			},
			"day_20161011":{
				"temperature":"9℃~19℃",
				"weather":"晴",
				"weather_id":{
					"fa":"00",
					"fb":"00"
				},
				"wind":"东北风3-4 级",
				"week":"星期二",
				"date":"20161011"
			},
			"day_20161012":{
				"temperature":"12℃~21℃",
				"weather":"晴",
				"weather_id":{
					"fa":"00",
					"fb":"00"
				},
				"wind":"南风微风",
				"week":"星期三",
				"date":"20161012"
			},
			"day_20161013":{
				"temperature":"13℃~24℃",
				"weather":"晴",
				"weather_id":{
					"fa":"00",
					"fb":"00"
				},
				"wind":"西南风微风",
				"week":"星期四",
				"date":"20161013"
			},
			"day_20161014":{
				"temperature":"10℃~22℃",
				"weather":"多云",
				"weather_id":{
					"fa":"01",
					"fb":"01"
				},
				"wind":"西南风3-4 级",
				"week":"星期五",
				"date":"20161014"
			},
			"day_20161015":{
				"temperature":"9℃~19℃",
				"weather":"晴",
				"weather_id":{
					"fa":"00",
					"fb":"00"
				},
				"wind":"东北风3-4 级",
				"week":"星期六",
				"date":"20161015"
			}
		}
	},
	"error_code":0
}
       sk = data.result.sk;
       today = data.result.today;
       future = data.result.future;
//-----今天---------
changetoTaday();
//----------homepage-------------
var strtoday="<h1>"+sk.temp+"°<span>"+today.weather+"</span></h1><h4>体感温度"+sk.temp+"°</h4><h4>湿度"+sk.humidity+" "+sk.wind_direction+sk.wind_strength+"</h4>";
$(".today").html(strtoday);
$(".today span").addClass('t');
//-----表头-----
      var head="<tr>";
      for(var i in future){
        head+="<th><ul><li>"+future[i].week+"</li><li>"+format(future[i].date)+"</li></ul></th>";
      }
      head+="</tr>";
      $(".sev-wea thead").html(head);
      // $("#sev-wea thead th li:first").html("今天");
//------表身------
      var bodyintro="<tr>";
      for(var i in future){
        bodyintro+="<td><ul><li>"+future[i].weather+"</li><li>"+future[i].temperature.replace(/℃/g,'°').replace('~','~ ')+"</li></ul></td>";
      }
      bodyintro+="</tr>";
      $(".sev-wea tbody").html(bodyintro);
//split temperature
var lows=[];
var highs=[];
var temps=[];
var str="";
for(var i in future){
str+=future[i].temperature+'~';
}
temps=str.split("℃~");
var m=0;
for(var i=0;i<temps.length;i+=2){
  lows[m]=temps[i];
  highs[m]=temps[i+1];
  m++;
}
for(var i=0;i<7;i++){
  low[i]=lows[i];
  high[i]=  highs[i];
}
//-------折线----------
drawline();
//----指数------------
$(".ambrela").html(today.weather);
$(".clothe").html(today.dressing_advice[3]+today.dressing_advice[4]+today.dressing_advice[5]);
$(".car").html(today.wash_index);
$(".sun").html(today.uv_index);
$(".exercise").html(today.exercise_index);
$(".sunset").html("20:23");


  return false;
}
//-------------canvas-------------
function drawline(){
  ctx.clearRect(0,0,c.width,c.height);
  //写 星期、日期
  var w=$(".line-weather").width()/7;
  var j=0;
  for(var i in future){
  ctx.fillStyle = 'white';
  ctx.font="15px DFKai-SB"
  ctx.fillText(future[i].week,(j+0.5)*w-22,20);
  ctx.fillText(format(future[i].date),(j+0.5)*w-16.5,50);
  j++;
  if(j>=7){
    j=0;
  }
  }
//画圆
  // console.log(low);
  // console.log(high);
  var max = Math.max.apply(null,high) >= Math.max.apply(null,low)? Math.max.apply(null,high)+2 : Math.max.apply(null,low)+2;
  var min = Math.min.apply(null,high) <= Math.min.apply(null,low)? Math.min.apply(null,low)-2 : Math.min.apply(null,low)-2;
  // console.log(max);
  // console.log(min);
  for(var i=0;i<7;i++){
    ctx.strokeStyle  = 'white';
    ctx.beginPath();
    temp1 = low[i];
    temp2 = low[i-1];
    ctx.arc((i+0.5)*w,(max - temp1)/(max - min)*150+70,2, 0, 2 * Math.PI);
    if(i!=0){
      ctx.moveTo((i-0.5)*w,(max - temp2)/(max - min)*150+70);
      ctx.lineTo((i+0.5)*w,(max - temp1)/(max - min)*150+70);
      ctx.stroke();
    }
  	ctx.closePath();
  	ctx.fillStyle = 'white';
    ctx.fill();
    ctx.font="15px DFKai-SB";
    ctx.fillText(low[i]+'°',(i+0.5)*w-10,(max - temp1)/(max - min)*150+70+20);
  }
//画线
  for(var i=0;i<7;i++){
    ctx.strokeStyle  = 'white';
    ctx.beginPath();
    temp1 = high[i];
    temp2 = high[i-1];
  	ctx.arc((i+0.5)*w,(max - temp1)/(max - min)*150+70,2, 0, 2 * Math.PI);
    if(i!=0){
      ctx.moveTo((i-0.5)*w,(max - temp2)/(max - min)*150+70);
      ctx.lineTo((i+0.5)*w,(max - temp1)/(max - min)*150+70);
      ctx.stroke();
    }
  	ctx.closePath();
  	ctx.fillStyle = 'white';
    ctx.fill();
    ctx.font="15px DFKai-SB";
    ctx.fillText(high[i]+'°',(i+0.5)*w-10,(max - temp1)/(max - min)*150+70-10);
  }
//写 风、等级
  var j=0;
  var lowest=150+100;
    for(var i in future){
    ctx.fillStyle = 'white';
    ctx.font="15px DFKai-SB"
    var index=future[i].wind.indexOf("风");

    ctx.fillText(future[i].weather,(j+0.5)*w-5,lowest);
    ctx.fillText(future[i].wind.slice(0,index+1),(j+0.5)*w-20,lowest+20);
    ctx.fillText(future[i].wind.slice(index+1),(j+0.5)*w-18,lowest+40);
    j++;
    if(j>=7){
      j=0;
    }
    }
}
//------windowresize--------
window.onresize=function(){
  $("#backimg").css({'width':window.innerWidth});
  $("#backimg").css({'height':window.innerHeight});

  if (window.innerWidth<767){
    c.width=800;
    $("#search_form").css({'margin-left':'20%'});
    $(".homepage").css({'height':window.innerHeight-80});
    $(".today").css({'position':'absolute'});
    $(".today").css({'bottom':'0'});
  }else{
  c.width=$(".sevenday").width();
  $("#search_form").css({'margin-left':'35%'});
  $(".homepage").css({'height':'auto'});
  $(".today").css({'position':''});
  }
  drawline();
}

//把当天的星期改为 “今天”
function changetoTaday(){
  var c=0;
  for(var i in future){
    if(c==0){
      future[i].week="今  天";
    }
    c++;
  }
}

//日期格式化
var str_date="";
function format(date){
  str_date="";
  for (var j=4;j<8;j++){
str_date+=date[j];
if(j==5){
  str_date+='/';
}
  }
  return str_date;
}
//-------city store------
var w=window.innerWidth+1;
$("#city-store").css({'width':w});
$("#city-store").css({'height':window.innerHeight-10});
$("#city-store").css({'left':0});
$(".add-city").css({'width':w/3-10});
$(".add-city").css({'height':window.innerHeight/4});
// $(".box").css({'height':window.innerHeight-60});
$("#add").click(function(){
$(".inputcity").show();
});
var count=0;
$(".add-city").show();
document.getElementsByClassName("close").onclick=function(){
  count=count-1;
  console.log(count);
}
document.getElementById("search").onclick=function(){
  if(count<9){
      get_jsonp();
      $(".box").append("<div class='mycity'>"+"<a href='#' class='close' data-dismiss='alert' onclick = 'del()'>&times;</a>"+"<h4>"+high[0]+"°C</h4><h4>"+low[0]+"°C</h4><h4>"+today.weather+"</h4><p>"+$("#city1").val()+"</p></div>");
      count++;
      $(".box p").addClass("title");
      $(".mycity").addClass("alert");
      $(".close").css({'position':'absolute'});
      $(".close").css({'top':'-5px'});
      $(".close").css({'right':'-5px'});
      // $(".close").hide();
      $(".mycity").css({'width':w/3-10});
      $(".mycity").css({'height':window.innerHeight/4});
      if(count==9){
        $(".add-city").hide();
      }
  }else{
    alert("最多添加 9 个城市");
  }
  $(".inputcity").hide();
}

function del() {
  count=count-1;
  if(count<9){
    $(".add-city").show();
  }
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
// function writecityblock(){
//    $(".box").append("<div class='mycity'><h5>"+today.temperature+"</h5><h5>"+today.weather+"</h5><h5>"+$("#city1").val()+"</h5></div>");
// }
