enum Shoes {
    // enum 별도로 지정 하지 않으면 숫자가 지정됨
    Nike,
    Adidas
}
let myShoes = Shoes.Adidas;
console.log(myShoes) //1


enum strShoes {
    Nike ='NIKE',
    Adidas = 'ADIDAS'
}
let myShoes2 = strShoes.Nike;
console.log(myShoes2) //NIKE


//enum을 어디에서 사용해야하나? 예제
enum Answer {
    Yes = 'Y',
    No = 'N'
}
function askQuestion(answer: Answer) {
    if(answer === Answer.Yes) {
        console.log("yes");
    }
    if(answer === Answer.No) {
        console.log("no")
    }
}
askQuestion("y");
askQuestion("예스");
askQuestion("yes");
askQuestion(Answer.Yes);