// JS 문자열 선언
// var str = 'hello';

// TS 문자열 선언
const str: string = 'hello';

// TS 숫자 선언
let num: number = 10;

// TS 배열 선언
let arr: Array<number> = [1, 2, 3];
let heroes: Array<string> = ['Capt', 'Thor', ' Hulk'];
let items: number[] = [1, 2, 3];

// TS 튜플
// 배열의 길이가 고정되고  각 요소의 타입이 지정되어 있는 배열 형식
// 모든 인덱스에 타입이 정의되어 있는 배열
let address: [string, number] = ['gangnam', 10];

// TS 객체
let obj: object = {};
// let person: object = {
//     name: 'capt',
//     age: 100,
// };
let person: { name: string; age: number } = {
    name: 'capt',
    age: 100,
};

// TS 진위값
let show: boolean = true;
