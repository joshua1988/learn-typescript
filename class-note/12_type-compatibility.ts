// 인터페이스
interface Developer {
    name: string;
    skill: string;
}

class Person {
    name: string;
}

var developer: Developer;
var person: Person;
// developer = person; // X
// person = developer; // O 부분 집합

developer = new Person(); 

// 함수
var add = function(a: number) {
    // ...
}

var sum = function(a: number, b: number) { // add 보다 구조적으로 더
    // ... 
}

sum = add; // O
add = sum; // X

// 제네릭
interface Empty<T> {

}

var empty1: Empty<string>;
var empty2: Empty<number>;

empty1 = empty2;
empty2 = empty1;

interface NotEmpty<T> {
    date: T;
}

var noteempty1: NotEmpty<string>;
var noteempty2: NotEmpty<number>;

noteempty1 = noteempty2;
noteempty2 = noteempty1;