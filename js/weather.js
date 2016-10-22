function responseToscreen(){
  if (window.innerWidth<767){
    $(".homepage:eq("+count+")").css({'height':screen.availHeight});
    $(".today:eq("+count+")").css({'position':'absolute','bottom':'0'});
  }
  $("#backimg").css({'width':window.innerWidth});
  $("#backimg").css({'height':window.innerHeight});
}

function stop(event){
  event.stopPropagation();
}
//增加城市
function addCity(){
  if(count<9){
      $('.swipe-wrap').append(city_moban);
      responseToscreen();
      c=document.getElementsByClassName("line-weather")[count];
      ctx=c.getContext("2d");
      //c.width=$(".sevenday:eq("+count+")").width();
      c.width = 700;
      c.height=300;
      get_jsonp();//利用回调函数将数据写入页面
      var lineweather = document.getElementsByClassName('line-weather')[count];
      lineweather.addEventListener('touchstart',stop,false);
      if(count==9){
        $(".add-city").hide();//删除掉增加城市的按钮
      }
  }else{
    alert("最多添加 9 个城市");
  }
}
//-------增加城市侧边栏------
function init_cityside(){
    $("#city-store").css({'width':w});
    $("#city-store").css({'height':window.innerHeight-10});
    $("#city-store").css({'left':-w});
    $(".add-city").css({'width':w/3-10});
    $(".add-city").css({'height':window.innerHeight/4});
    $(".add-city").show();
}

//-------------画折线以及时间，日期等信息-------------
function drawline(){
  ctx.clearRect(0,0,c.width,c.height);
  //写 星期、日期
  //var w=$(".line-weather").width()/7;
  var w = 100;
  var j=0;
  var font_size = '13px';
  var size = parseInt(font_size);
  for(var i in future){
  ctx.fillStyle = 'white';
  ctx.font= font_size + " DFKai-SB";
  ctx.fillText(future[i].week.replace('星期','周'),(j+0.5)*w-size,20);
  ctx.fillText(format(future[i].date),(j+0.5)*w-format(future[i].date).length/2*size/2,50);
  j++;
  if(j>=7){
    j=0;
  }
  }
  //画圆
  var max = Math.max.apply(null,high) >= Math.max.apply(null,low)? Math.max.apply(null,high)+2 : Math.max.apply(null,low)+2;
  var min = Math.min.apply(null,high) <= Math.min.apply(null,low)? Math.min.apply(null,low)-2 : Math.min.apply(null,low)-2;
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
    ctx.font= font_size + " DFKai-SB";
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
    ctx.font= font_size + " DFKai-SB";
    ctx.fillText(high[i]+'°',(i+0.5)*w-10,(max - temp1)/(max - min)*150+70-10);
  }
//写 风、等级
  var j=0;
  var lowest=150+100;
    for(var i in future){
    ctx.fillStyle = 'white';
    ctx.font= font_size + " DFKai-SB";
    var index=future[i].wind.indexOf("风");
    ctx.fillText(future[i].weather,(j+0.5)*w-future[i].weather.length*size/2,lowest);
    ctx.fillText(future[i].wind.slice(0,index+1),(j+0.5)*w-(index+1)*size/2,lowest+20);
    var temp1 = future[i].wind.slice(index+1);

    ctx.fillText(temp1,(j+0.5)*w-(future[i].wind.length-index-1)*size/2,lowest+40);
    j++;
    if(j>=7){
      j=0;
    }
    }
}

//把当天的星期改为 “今天”
function changetoTaday(){
  var c=0;
  for(var i in future){
    if(c==0){
      future[i].week="今天";
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

//-----------获取数据并写入DOM------
function get_jsonp() {
    $("#result_fut").html('');
    $('#result_weather').html('正在查询中……');
    $.getJSON("http://v.juhe.cn/weather/index?callback=?", {
        "cityname" : city[count],
        "dtype" : "jsonp",
        "key" : "488978971707864858562d990d5cf42f"
    }, show);
  //   $.getJSON("http://op.juhe.cn/onebox/weather/query?callback=?", {
  //    "cityname" : city[count],
  //    "dtype" : "jsonp",
  //    "key" : "9b51aca938e929ef8ce099a88c02ce00"
  //  }, function(data){console.log(data);console.log(count);console.log(city[count]);})//免费数据接口，但是数据内容不同
 }
 //核心函数，获取天气数据之后的回调函数
function show(data){
  console.log(data);
  console.log(city[count]);
  sk = data.result.sk;
  today = data.result.today;
  future = data.result.future;
  //-----今天---------
  changetoTaday();
  //----------homepage-------------
  var strtoday="<h1 style = 'float:left'>"+sk.temp+"°</h1>"+"<br><br><span> <span style = 'font-size: 30px;'class = 'icon'>o</span>"+city[count]+"</span><br />"+"<span>"+today.weather+"</span><div style= 'clear:left'></div><h4>体感温度"+sk.temp+"°</h4><h4>湿度"+sk.humidity+" "+sk.wind_direction+sk.wind_strength+"</h4>";
  $(".today:eq("+count+")").html(strtoday);
  $(".today:eq("+count+") span").addClass('t');
//-----表头-----
  var head="<tr>";
  for(var i in future){
    head+="<th><ul><li>"+future[i].week.replace('星期','周')+"</li><li>"+format(future[i].date)+"</li></ul></th>";
  }
  head+="</tr>";
  $(".sev-wea:eq("+count+") thead").html(head);
//------表身------
  var bodyintro="<tr>";
  for(var i in future){
    var temp = future[i].weather.split('转')[0];
    if(temp == '晴')
    {
      temp = "<span class = 'icon'>*</span>";
    }
    else if(temp == '多云'){
      temp = "<span class = 'icon'>)</span>";
    }
    else if(temp == '小雨'){
      temp = "<span class = 'icon'>'</span>";
    }
    else if(temp == '雷阵雨'){
      temp = "<span class = 'icon'>%</span>";
    }
    else if(temp == '大雨'){
      temp = "<span class = 'icon'>(</span>";
    }
    else if(temp == '小雪' || temp == '中雪' || temp == '大雪'){
      temp = "<span class = 'icon'>&</span>";
    }
    else if(temp == '阴'){
      temp = "<span class = 'icon'>l</span>";
    }
    else {
      temp = "<span class = 'icon'>8</span>";
    }
    bodyintro+="<td><ul><li>"+temp+"</li><li>"+future[i].weather.split('转')[0]+"</li><li>"+future[i].temperature.replace(/℃/g,'°').replace('~','~ ')+"</li></ul></td>";
  }
  bodyintro+="</tr>";
  $(".sev-wea:eq("+count+") tbody").html(bodyintro);
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
  $(".ambrela:eq("+count+")").html(today.weather);
  $(".clothe:eq("+count+")").html(today.dressing_advice[3]+today.dressing_advice[4]+today.dressing_advice[5]);
  $(".car:eq("+count+")").html(today.wash_index);
  $(".sun:eq("+count+")").html(today.uv_index);
  $(".exercise:eq("+count+")").html(today.exercise_index);
  $(".sunset:eq("+count+")").html("20:23");


  $(".box").append("<div class='mycity'>"+"<a href='#' class='close' data-dismiss='alert'>&times;</a>"+"<h4>"+high[0]+"°C</h4><h4>"+low[0]+"°C</h4><h4>"+today.weather+"</h4><p>"+city[count]+"</p></div>");
  count++;
  $(".mycity").css({'width':window.innerWidth/3-10});
  $(".mycity").css({'height':window.innerHeight/4});
  $(".box p").addClass("title");
  $(".mycity").addClass("alert");
  $(".close").css({'position':'absolute'});
  $(".close").css({'top':'-5px'});
  $(".close").css({'right':'-5px'});
  var close = document.getElementsByClassName("close");
  for(var i=0;i<close.length;i++){
    close[i].index = i;
    close[i].onclick=function(){
      if(count<9){
        $(".add-city").show();
      }
      count=count-1;
      console.log('count:'+count);
      console.log('this.index:'+this.index);
      var lineweather = document.getElementsByClassName('line-weather')[this.index];
      lineweather.removeEventListener('touchstart',stop,false);
      $('div[data-index='+this.index+']').remove();
      //删除城市按键之后，需要重新建立滑动，因为swipe.js没有提供单独删除一页的函数
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
      })
      close = document.getElementsByClassName("close");
      for(var i=0;i<close.length;i++){
        if(close[i].index>count-1)
          close[i].index -= 1;
        console.log('close[i].index:'+close[i].index);
      }
    }
   }
//调用swipe.js，设置滑动
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
  return false;
}
