class Person {
    // 클랙스 로직
    // 클래스는 인스턴스 생성
    constructor(name, age) {
        console.log("생성 되었다.");
        this.name = name;
        this.age = age;
    }
}

let seho = new Person('lee', 26); // 생성 되었다.
console.log(seho); //Person {name: 'lee', age: 26}