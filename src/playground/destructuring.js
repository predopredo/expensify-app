const address = ['1299 Saint Juniper Street', 'Philadelphia', 'Pensylvania', '19147'];
const [street, city, state, zip] = address
console.log(`You are in ${street}, ${city}, ${state}. ZIP ${zip}`);

const address2 = ['1299 Saint Juniper Street', 'Philadelphia', 'Pensylvania', '19147'];
const [street2, city2, state2] = address2
console.log(`You are in${street2}, ${city2}, ${state2}.`);

const address3 = ['1299 Saint Juniper Street', 'Philadelphia', 'Pensylvania', '19147'];
const [, city3, state3] = address3
console.log(`You are in ${city3}, ${state3}.`);

const address4 = ['1299 Saint Juniper Street', 'Philadelphia', 'Pensylvania', '19147'];
const [, , state4] = address4;
console.log(`You are in ${state4}.`);

const emptyAddress = [];
const [, , defaultState = 'New York'] = emptyAddress;
console.log(`You are in ${defaultState}`);