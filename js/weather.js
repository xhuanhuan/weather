function responseToscreen(){
  if (window.innerWidth<767){
    $(".homepage:eq("+count+")").css({'height':screen.availHeight});
    $(".today:eq("+count+")").css({'position':'absolute','bottom':'0'});
  }
  $("#backimg").css({'width':window.innerWidth});
  $("#backimg").css({'height':window.innerHeight});
}


//增加城市
function addCity(){
  if(count<9){
      $('.swipe-wrap').append(city_moban);
      responseToscreen();
      c=document.getElementsByClassName("line-weather")[count];
      ctx=c.getContext("2d");
      c.width=$(".sevenday:eq("+count+")").width();
      c.height=300;
      get_jsonp();//利用回调函数将数据写入页面

  }else{
    alert("最多添加 9 个城市");
  }
}
//-------增加城市侧边栏------
function init_cityside(){
    $("#city-store").css({'width':w});
    $("#city-store").css({'height':window.innerHeight-10});
    $("#city-store").css({'left':-w});

    $(".add-city").show();
}

//-------------画折线以及时间，日期等信息-------------
function drawline(){
  ctx.clearRect(0,0,c.width,c.height);
  //写 星期、日期
  var w=$(".line-weather").width()/7;
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
  var Weather = JSON.parse('{"resultcode":"200","reason":"successed!","result":{"sk":{"temp":"6","wind_direction":"东北风","wind_strength":"5级","humidity":"27%","time":"22:29"},"today":{"temperature":"0℃~11℃","weather":"阴转小雨","weather_id":{"fa":"02","fb":"07"},"wind":"东北风3-4 级","week":"星期一","city":"西安","date_y":"2017年02月20日","dressing_index":"冷","dressing_advice":"天气冷，建议着棉服、羽绒服、皮夹克加羊毛衫等冬季服装。年老体弱者宜着厚棉衣、冬大衣或厚羽绒服。","uv_index":"最弱","comfort_index":"","wash_index":"不宜","travel_index":"较不宜","exercise_index":"较不宜","drying_index":""},"future":{"day_20170220":{"temperature":"0℃~11℃","weather":"阴转小雨","weather_id":{"fa":"02","fb":"07"},"wind":"东北风3-4 级","week":"星期一","date":"20170220"},"day_20170221":{"temperature":"-3℃~4℃","weather":"雨夹雪转阴","weather_id":{"fa":"06","fb":"02"},"wind":"东北风微风","week":"星期二","date":"20170221"},"day_20170222":{"temperature":"-3℃~6℃","weather":"阴","weather_id":{"fa":"02","fb":"02"},"wind":"东北风微风","week":"星期三","date":"20170222"},"day_20170223":{"temperature":"0℃~6℃","weather":"多云","weather_id":{"fa":"01","fb":"01"},"wind":"东北风微风","week":"星期四","date":"20170223"},"day_20170224":{"temperature":"0℃~7℃","weather":"多云","weather_id":{"fa":"01","fb":"01"},"wind":"东北风微风","week":"星期五","date":"20170224"},"day_20170225":{"temperature":"-3℃~6℃","weather":"阴","weather_id":{"fa":"02","fb":"02"},"wind":"东北风微风","week":"星期六","date":"20170225"},"day_20170226":{"temperature":"-3℃~6℃","weather":"阴","weather_id":{"fa":"02","fb":"02"},"wind":"东北风微风","week":"星期日","date":"20170226"}}},"error_code":0}');
    $("#result_fut").html('');
    $('#result_weather').html('正在查询中……');
    console.log(Weather);
    show(Weather);
    // $.getJSON("http://v.juhe.cn/weather/index?callback=?", {
    //     "cityname" : city[count],
    //     "dtype" : "jsonp",
    //     "key" : "488978971707864858562d990d5cf42f"
    // }, show);
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

var weatherArr=[];
  addbutton.parentNode.style.order=0;
  addbutton.parentNode.innerHTML="<div class='mycity'>"+"<a href='#' class='close' data-dismiss='alert'>&times;</a>"+"<h4>"+high[0]+"°C</h4><h4>"+low[0]+"°C</h4><h4>"+today.weather+"</h4><p>"+city[count]+"</p></div>";
  count++;
  if(count<=8){
    var arr=$('.box');
    for(var ii=0;ii<arr.length;ii++){
    if(arr[ii].style.order==2){
        arr[ii].innerHTML='';
        arr[ii].append(addbutton);
        break;
      }
    }
    addbutton.parentNode.style.order=1;
  }
console.log("add count:"+count)

  $(".box p").addClass("title");
  $(".mycity").addClass("alert");
  $(".close").css({'position':'relative'});
  $(".close").css({'top':'-15px'});
  $(".close").css({'right':'-5px'});
  var close = document.getElementsByClassName("close");
  for(var i=0;i<close.length;i++){
    close[i].index = i;
//删除城市
    close[i].onclick=function(){

        if(this.parentNode.childNodes[4]){
        var ct=this.parentNode.childNodes[4].innerHTML;
        if(city.indexOf(ct)!=-1){
          city.splice(city.indexOf(ct),1);
        }else if(city.indexOf(ct.slice(0,ct.length-1))!=-1){
          city.splice(city.indexOf(ct.slice(0,ct.length-1)),1);
        }
      }
      console.log(city);

     if(count>=9){
        $('.box')[this.index].append(addbutton);
      }

      this.parentNode.parentNode.style.order=2;
      count=count-1;
      console.log('count:'+count);
      // console.log('this.index:'+this.index);
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
