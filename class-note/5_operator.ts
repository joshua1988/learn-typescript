// 유니온 타입 
// var seho: string | number | boolean;
function logMessage(value: string | number) {
    if (typeof value === 'number') {
        value.toLocaleString();
    }
    if (typeof value === 'string') {
        value.toString();
    }
    throw new TypeError('value must be string or number');
}
logMessage('hello');
logMessage(100);

interface Developer {
    name: string;
    skill: string;
}
 
interface Person {
    name: string;
    age: number
}

// function askSomeone(someone: Developer | Person) {
//     // someone.name; // 유니온은 중복되는 name 만 인정
// }

// askSomeone({ name: '디벨로퍼', skill: '웹 개발'});
// askSomeone({ name: '캡틴', skill: 100});

function askSomeone(someone: Developer & Person) {
        someone.name; // 인터섹션은 Developer 와 Person 을 모두 포함하는 타입을 인정
        someone.age;
        someone.skill;
}

// 인터섹션은 모두 합친 하나의 또다른 타입을 생성하는 것이라고 생각하면 된다.
// 그래서 해당하는 프로퍼티를 모두 넘겨줘야한다.
// askSomeone({ name: '캡틴', skill: '100', age: 34});

// var seho: string | number | boolean;
// var capt: string & number & boolean;