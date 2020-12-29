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
let num1 = null;
let num2 = null;
let prev = null;
let calc = null;
let toggle = false;
const buttons = document.querySelectorAll('button');
const display = document.getElementById('raw-display');
buttons.forEach((button)=>{
    button.addEventListener('click', () =>{
        if(button.dataset.type == 'number'){
            if(num1 == null)num1 = button.id.charAt(6);
            else if(prev !== 'operator') num1 = Number(num1) !== 0 ? num1 + button.id.charAt(6): button.id.charAt(6);
            else if(num2 == null && toggle)num2 = button.id.charAt(6);
            else num2 = Number(num2) !== 0 ? num2 + button.id.charAt(6): button.id.charAt(6);;
        }
        if(button.dataset.type == 'operator'){
            if(num1 !== null)toggle = true;
            prev = 'operator';
            calc = button.id;
        }
        if(button.dataset.type == 'equal'){
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
        if(button.dataset.type == 'reset'){   
            toggle = false;
            num1 = 0; 
            num2 = prev = calc = null;
        }
        if(button.dataset.type == 'pos-neg'){
            if(prev !== 'operator') num1 = -1 * num1;
            else    num2 = -1 * num2;
        }
        if(button.dataset.type == 'decimal'){
            if(prev !== 'operator'){
                if(num1 === null) num1 = '0.';
                else if(num1.toString().indexOf('.')===-1)num1 += '.';
            }
            else{
                if(num2 === null) num2 = '0.';
                else if(num2.toString().indexOf('.')===-1) num2 += '.';
            }
        }
        if(button.dataset.type == 'back'){
            if(prev !== 'operator') num1 = num1.toString().length > 1 ? num1.toString().substring(0,num1.toString().length-1) : '0';
            else  num2 = num2.toString().length > 1 ? num2.toString().substring(0,num2.toString().length-1) : '0';
        }
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
