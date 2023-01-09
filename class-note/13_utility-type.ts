interface Product {
    id: number;
    name: string;
    prive: number;
    brand: string;
    stock: number;
}

// 상품 목록을 받아오기 위한 API 함수
function fetchProducts(): Promise<Product[]> {
    
}

interface ProductDetail {
    id: number;
    name: string;
    prive: number;
}

// 특정 상품의 상세 정보를 나타내기 위한 함수
type ShoppingItem = Pick<ProductDetail, 'id'|'name'|'prive'>;
function displayProductDetail(shoppingItem: ShoppingItem) {

}

interface UpdateProduct {
    id?: number; // 물음표를 붙이면 optional 하다는 뜻
    name?: string;
    prive?: number;
    brand?: string;
    stock?: number;
}

// 3. 특정 상품 정보를 업데이트(갱신)하는 함수
// function updateProductItem(productItem: UpdateProduct) {

// }

function updateProductItem(productItem: Partial<Product>) {

}

// 4. 유틸리티 타입 구현하기 - Partial
interface UserProfile {
    username: string;
    email: string;
    profilePhotoUrl: string;
}

interface UerProfileUpdate {
    username?: string;
    email?: string;
    profilePhotoUrl?: string;
}

type UserProfileUpdate = {
    username?: UserProfile['username'];
    email?: UserProfile['email'];
    profilePhotoUrl?: UserProfile['profilePhotoUrl'];
}

// 맵드 타입 (위와 같은 의미)
// type UserProfileUpdate = {
//     [p in 'username' | 'email' | 'profilePhotoUrl']?: UserProfile[p]
// }

// 맵드 타입 (위와 같은 의미)
type UserProfileUpdate = {
    [p in keyof UserProfile]?: UserProfile[p]
}

// 위와 같은 원리로 Partial 내부가 아래와 같이 구현되어 있다.
type Partial<T> = {
    [p in keyof T]?: T[p];
}

