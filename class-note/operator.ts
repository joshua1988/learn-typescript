
// TODO : Union Type -> 여러 개의 타입을 지정
function logMessage(val: string | number) {
    console.log(val);

    // TODO : 타입 가드 -> 특정 타입으로 타입의 범위를 좁혀나가는 과정
    if(typeof val === "number") {
        val.toLocaleString();
    }
    if(typeof val === "string") {
        val.toString();
    }
    throw new TypeError('value must be string or number');
}
logMessage('hello');
logMessage(100);


interface Developer {
    name: string,
    skill: string
}

interface Person {
    name: string,
    age: number
}

function askSomeone(someone: Developer | Person) {
    someone.name;               // 공통 속성만 제공 한다. skill, age 제공 안함
}

// TODO : Intersection Type -> 모든 타입을 만족하는 타입
let capt: string & number & boolean;

function askSomeone2(someone: Developer & Person) {
    someone.name;
    someone.age;
    someone.skill
}

// TODO: union vs intersection
askSomeone({ name: 'kang', skill: 'ts' });
askSomeone({ name: 'lee', age: 20 });
askSomeone2({ name: 'jeong', skill: 'js', age: 26 });