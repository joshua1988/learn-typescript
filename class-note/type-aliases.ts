interface Person {
    name: string;
    age: number;
}

// type Person = {
//     name: string;
//     age: number;
// }


const seho: Person = {
    name: 'seho',
    age: 30,
}

type MyString = string;
const str: MyString = 'hello';


type Todo = {
    id: string;
    title: string;
    done: boolean;
}

/** TODO: 타입 별칭 이란? 새로운 타입 값을 생성하는 것이 아니라, 정의한 타입에 대해 나중에 쉽게 참고할 수 있게 이름을 부여하는 것 **/
/** TODO: type vs interface? 타입은 확장 불가능 => 가능한 type << interface 로 선언함을 공식 문서에 추천!
 *  TODO: 좋은 소프트웨어는 언제나 확장이 용이해야 한다는 원칙에 따라 가급적 확장 가능한 인터페이스로 선언한다.
 * @param todo
 */

function getTodo(todo: Todo) {

}

