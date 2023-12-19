interface StringArray {
    [index: number]: string;
}

var arr: StringArray = ['a', 'b', 'c'];


interface StringRegexDictionary {
    [key: string]: RegExp
}

let obj: StringRegexDictionary = {
    cssFile: /\.css$/,
    jsFile: /\.js$/
}

Object.keys(obj).forEach(function (value) {})

// interface extends
interface Person {
    name: string;
    age: number;
}

interface Developer extends Person {
    language: string
}

let capt: Developer = {
    name: "캡틴",
    age: 100,
    language: "hi"
}

// type 별칭
//const name: string = 'capt';
type MyName = string;
const newName: MyName = 'capt'

