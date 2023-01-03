// ES6 이전
function  Person(name, age) {
    this.name = name;
    this.age = age;
}
var capt = new Person('캡팁', 100);

// ES6 이후
class Person {
    //클래스 로직
    constructor(name, age) {
        console.log('생성 되었습니다.');
    }
}

var seho = new Person('세호', 30); // 생성 되었습니다.
console.log(seho);
