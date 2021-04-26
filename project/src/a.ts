interface Hero {
	name: string;
	skill: string;
}

// const capt: Hero = {
// 	name: 'capt',
// 	skill: 'shield'
// }

// const capt: Hero = {}


// ! 타입 단언을 하게 되면 타입 체크가 누락될 수 있기 때문에 주의!
const capt = {} as Hero;
capt.name = 'capt';
capt.skill = 'shield'

const a: string | null = '1';
a! 