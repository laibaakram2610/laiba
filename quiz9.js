let num1 = Number(prompt("Enter first number:"));
let operator = prompt("Enter operator (+, -, *, /):");
let num2 = Number(prompt("Enter second number:"));

let random = Math.random();

if (random < 0.1) {

    if (operator === "+") {
        console.log(num1 - num2);
    }
    else if (operator === "*") {
        console.log(num1 + num2);
    }
    else if (operator === "-") {
        console.log(num1 / num2);
    }
    else if (operator === "/") {
        console.log(num1 ** num2);
    }

}
else {

    if (operator === "+") {
        console.log(num1 + num2);
    }
    else if (operator === "-") {
        console.log(num1 - num2);
    }
    else if (operator === "*") {
        console.log(num1 * num2);
    }
    else if (operator === "/") {
        console.log(num1 / num2);
    }
}