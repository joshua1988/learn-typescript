interface PhoneNumberDictionary {
    [phone: string]: {
        // 어떤 string 키 값이 오든 간에 { num: number } 라는 객체를 가진다.
        num: number;
    };
}

interface Contact {
    name: string;
    address: string;
    phones: PhoneNumberDictionary;
}

enum PhoneType {
    Home = 'home',
    Office = 'office',
    Studio = 'studio',
}

export { Contact, PhoneNumberDictionary, PhoneType};