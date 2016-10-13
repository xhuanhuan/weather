//var s = 100;
function f1(s){
	console.log(s);
}
function f2(){
	var s=10;
	f1(s);
}
f1();
f2();