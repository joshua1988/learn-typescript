// 타입 단언(type assertion)
var a;
a = 20;
a = 'a'
var b = a as string;

// DOM API 조작
// <div id="app">hi</div>

var div = document.querySelector('div');
if (div) {
  div.innerText 
}