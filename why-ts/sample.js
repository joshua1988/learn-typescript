// function sum(a, b) {
//     return a + b;
// }

// sum(10, '20');
// var result = sum(10, 20);

// @ts-check
// 타입스크립트를 쓴 것같은 에러를 띄울 수 있다.

/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function sum(a, b) {
    return a + b;
}

sum(10, '20');
