// 인터페이스
interface Developer {
  name: string;
  skill: string;
}
// interface Person {
//   name: string;
//   // skill: string;
// }
class Person {
  name: string;
  skill: string;
}

var developer: Developer;
var person: Person;
developer = new Person();
// person = developer;

// 함수
var add = function(a: number) {
  // ...
}
var sum = function(a: number, b: number) {
  // ...
}
sum = add;
// add = sum;

// 제네릭
interface Empty<T> {
  // ..
}
var empty1: Empty<string>;
var empty2: Empty<number>;
empty1 = empty2;
empty2 = empty1;

interface NotEmpty<T> {
  data: T;
}
var notempty1: NotEmpty<string>;
var notempty2: NotEmpty<number>;
notempty1 = notempty2;
notempty2 = notempty1;