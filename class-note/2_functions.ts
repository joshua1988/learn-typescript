/// 함수의 파라미터의 타입을 정의하는 방식
function sum(a: number, b: number) {
    return a + b;
}
sum(10, 20);

// 함수의 반환 값에 타입을 정의하는 방식
function add(): number {
    return 100;
}

// 함수의 타입을 정의하는 방식
function sumTwoNum(a: number, b: number): number {
    return a + b;
}

// 에러가 뜨지 않음
sumTwoNum(10, 20);

// 에러가 뜸 => 인자를 2개를 받는데 인자의 숫자를 다르게 해서
// sumTwoNum(10, 20, 30, 40);
// sumTwoNum(10);  

// 함수의 옵셔널 파라미터
function log(a: string, b?: string) {

}
log('hello world');
log('hello ts', 'abc');
