// 숫자형 Enum
enum Shoes {
    Nike,
    Adidas,
}

var myShoes = Shoes.Nike;
console.log(myShoes); // 0

enum Shoes {
    Nike = '나이키',
    Adidas = '아디다스',
}

var myShoes = Shoes.Nike;
console.log(myShoes); // '나이키'

function askQuestion(answer: string) {
    if (answer === 'yes')
        console.log('정답입니다.');
    if (answer === 'no')
        console.log('오답입니다.');
}
askQuestion('예스');
askQuestion('y');
askQuestion('Yes');

enum Answer {
    Yes = 'Y',
    No = 'N'
}

function askQuestion2(answer: Answer) {
    if (answer === Answer.Yes)
        console.log('정답입니다.');
    if (answer === Answer.No)
        console.log('오답입니다.');
}
askQuestion2(Answer.Yes);
askQuestion2(Answer.No);
