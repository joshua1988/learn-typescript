// JS 문자열 선언
// const str = 'hello';

// TS 문자열 선언
const str: string = 'hello';

// TS 숫자 선언
const num: number = 10;

// 배열 - 첫 글자가 대문자
const arr: Array<number> = [1, 2, 3];

const heroes: Array<string> = ['Capt', 'Thor', 'Hulk'];

// 배열을 아래처럼 선언해도 됨
const items: number[] = [1, 2, 3];

// TS 튜플
const address: [string, number] = ['gangnam', 100];

// TS 객체
const obj: object = {};

// const person: object = {
//     name: 'capt',
//     age: 100
// }

const person: { name: string, age: number } = {
    name: 'thor',
    age: 1000
}


// TS 진위값
const show: boolean = true;