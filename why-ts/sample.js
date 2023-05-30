// @ts-check

// /**
//  *
//  * @param {number} a 첫 번째 숫자
//  * @param {number} b 두 번째 숫자
//  * @returns
//  */
function sum(a, b) {
  return a + b;
}

console.log(sum(10, 20));
console.log(sum("10", "20"));

// sum(10, "20"); @ts-check를 해주면 Typescript처럼 타입 체크를 해준다.
