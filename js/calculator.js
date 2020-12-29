function add (num1, num2) {
	return num1 + num2;
}
function subtract (num1, num2) {
	return num1 - num2;
}
function multiply (num1, num2) {
	return num1 *num2;
}
function division (num1, num2) {
	return num1/num2;
}
function power(num1, num2) {
	return Math.pow(num1, num2);
}
function mod(num1, num2) {
	return num1%num2;
}
function operate(operator, num1, num2){
    switch(operator){
        case 'add':
            return add(num1, num2);
        case 'sub':
            return subtract(num1, num2);
        case 'mult':
            return multiply(num1, num2);
        case 'div':
            if(num2 ==0){
                window.alert("You can't divide by zero!");
                return 'divide';
            }
            return division(num1, num2);
        case 'exp':
            return power(num1, num2);
        case 'mod':
            return mod(num1, num2);
        default:
            return null;
    }
}
let num1 = 0;
let num2 = null;
let prev = null;
let calc = null;
let toggle = false;
const buttons = document.querySelectorAll('button');
const display = document.getElementById('raw-display');
function number(x){
    if(num1 == null)num1 = x;
    else if(prev !== 'operator') num1 = Number(num1) !== 0 ? num1 + x: x;
    else if(num2 == null && toggle)num2 = x;
    else num2 = Number(num2) !== 0 ? num2 + x: x;
}
function decimal(){
    if(prev !== 'operator'){
        if(num1 === null) num1 = '0.';
        else if(num1.toString().indexOf('.')===-1)num1 += '.';
    }
    else{
        if(num2 === null) num2 = '0.';
        else if(num2.toString().indexOf('.')===-1) num2 += '.';
    }
}
function equal(){
    let temp = null;
    if(num1 !== null && num2 != null){
        temp = operate(calc, Number(num1), Number(num2));
    }
    num2 = calc = prev =null;
    if(temp !== null && temp !== 'divide'){
        num1 = temp;
    }
    else if(temp !== 'divide')window.alert("Invalid Input");
}
function back(){
    if(prev !== 'operator') num1 = num1.toString().length > 1 ? num1.toString().substring(0,num1.toString().length-1) : '0';
    else  num2 = num2.toString().length > 1 ? num2.toString().substring(0,num2.toString().length-1) : '0';
}
buttons.forEach((button)=>{
    button.addEventListener('click', () =>{
        if(button.dataset.type == 'number'){
            number(button.id.charAt(6));
        }
        if(button.dataset.type == 'operator'){
            if(num1 !== null)toggle = true;
            prev = 'operator';
            calc = button.id;
        }
        if(button.dataset.type == 'equal')equal();
        if(button.dataset.type == 'reset'){   
            toggle = false;
            num1 = 0; 
            num2 = prev = calc = null;
        }
        if(button.dataset.type == 'pos-neg'){
            if(prev !== 'operator') num1 = -1 * num1;
            else    num2 = -1 * num2;
        }
        if(button.dataset.type == 'decimal')decimal();
        if(button.dataset.type == 'back')back();
        if(num2 == null){
            if(num1.toString().length > 8)display.innerText = Number(num1).toPrecision(8);
            else display.innerText = num1;
        }
        else{
            if(num2.toString().length > 8)display.innerText = Number(num2).toPrecision(8);
            else display.innerText = num2; 
        }
        console.log(`${num1}  ${num2}  ${prev}  ${calc}  ${toggle}`);
    })
})
window.addEventListener('keydown', (e) =>{
    if(!isNaN(parseFloat(e.key)) && isFinite(e.key))number(e.key);
    if(e.key ==='.')decimal();
    if(/^[/*-+^%]+$/.test(e.key)){
        if(num1 !== null)toggle = true;
        prev = 'operator';
        if(e.key === '/')calc = 'div';
        if(e.key === '*')calc = 'mult';
        if(e.key === '-')calc = 'sub';
        if(e.key === '+')calc = 'add';
        if(e.key === '^')calc = 'exp';
        if(e.key === '%')calc = 'mod';
    }
    if(e.key ==='Enter')equal();
    if(e.key ==='Backspace')back();
    if(num2 == null){
        if(num1.toString().length > 8)display.innerText = Number(num1).toPrecision(8);
        else display.innerText = num1;
    }
    else{
        if(num2.toString().length > 8)display.innerText = Number(num2).toPrecision(8);
        else display.innerText = num2; 
    }
    console.log(`${num1}  ${num2}  ${prev}  ${calc}  ${toggle}`);
});