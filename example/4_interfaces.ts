// 인터페이스
interface User {
  name: string;
  age: number;
}

// 변수에 사용하는 경우
const seho: User = { name: 'hi', age: 100 };

// 함수의 매개변수에 사용하는 경우
function getUser(user: User) {
  console.log(user);
}
getUser(seho);

// 함수의 전체 타입에 사용하는 경우
// interface SumFunction {
//   (a: number, b: number): number;
// }
// let sum: SumFunction;
// sum = function (num1: number, num2: string): number {
//   return num1 + num2;
// };

// 배열의 인덱싱에 사용하는 경우
// interface StringArray {
//   [index: number]: string;
// }
// let arr: StringArray;
// arr[0] = 'hi';
// arr[1] = 10;

// 인터페이스 확장
interface Person {
  name: string;
  age: number; // 옵셔널 선택자 ? 동일하게 적용 가능
}
interface Developer extends Person {
  language: string;
}
const joo: Developer = { name: 'joo', age: 20, language: 'ts' };
