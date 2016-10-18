var s = 1;
function f1(){
	console.log(s);
}
function f2(){
	var s=2;
	function f3(){
		var s=3
		function f4(){
			var s=4;
	    f1();
	    console.log(s);
	  }
		f4();
  }
	f3();
}
f2();
