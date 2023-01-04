// function logText(text) {
//     console.log(text);
//     return text;
// }
// logText('하이');
// logText(true);
// logText(10);

// function logText<T>(text: T):T {
//     console.log(text);
//     return text;
// }
// logText<string>('하이');

// function logNumber(num: number) {
//     console.log(num);
//     return num;
// }

// logNumber(10);

function logText<T>(text: T): T {
    console.log(text);
    return text;    
}

const abc = logText<string>('a');


logText('a')
logText(10)

// 제네릭의 타입 제한. 제네릭에 타입을 좀 더 구체적으로 줄 수 있다. 
// function logTextLength<T>(text: T[]): T[] {
//     console.log(text.length);
//     return text;
// }
// logTextLength<string>(['hi']);

// 제네릭 타입 제한 2 - 정의된 타입 이용하기
interface LengthType {
    length: number;
} 

function logTextLength<T extends LengthType>(text: T): T {
    text.length;
    return text;
}

logTextLength({length : 10});

// 제네릭 타입 제한 3 - keyof
interface ShoppingItem {
    name: string;
    price: number;
    stock: number;
}

// key 만 들어갈 수 있다. (??)
function getShoppingItemOption<T extends keyof ShoppingItem>(itemOption: T): T {
    return itemOption;
}

// getShoppingItemOption(10);
// getShoppingItemOption<string>('10');

getShoppingItemOption('name')
getShoppingItemOption('price');
getShoppingItemOption('price');