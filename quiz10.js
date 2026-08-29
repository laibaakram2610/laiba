let adjective1 = "Crazy";
let adjective2 = "Fire";
let adjective3 = "Amazing";

let shop1 = "Garments";
let shop2 = "Foods";
let shop3 = "Engine";

let word1 = "Bros";
let word2 = "Hub";
let word3 = "Limited";

let random1 = Math.floor(Math.random() * 3) + 1;
let random2 = Math.floor(Math.random() * 3) + 1;
let random3 = Math.floor(Math.random() * 3) + 1;

let adjective;
let shop;
let word;

if (random1 == 1) {
    adjective = adjective1;
}
else if (random1 == 2) {
    adjective = adjective2;
}
else {
    adjective = adjective3;
}

if (random2 == 1) {
    shop = shop1;
}
else if (random2 == 2) {
    shop = shop2;
}
else {
    shop = shop3;
}

if (random3 == 1) {
    word = word1;
}
else if (random3 == 2) {
    word = word2;
}
else {
    word = word3;
}

console.log(adjective + " " + shop + " " + word);