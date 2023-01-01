// 함수의 파라미터에 타입을 정의하는 방식
// function sum(a: number, b: number) {
//     return a + b;
// }

sum(10, 20);

// 함수의 반환 값에 타입을 정의하는 방식
function add(): number {
    return 10;
}

// 함수의 타입을 정의하는 방식
function sum(a: number, b: number): number {
    return a + b;
}
sum(10, 20, 30, 40, 50);

// 함수의 옵셔널 파라미터(선택적 파라미터)
// 생략 가능한 인자에 ? 붙이기
function log(a: string, b?: string) {}

log('hello');
