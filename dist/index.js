"use strict";
var body = document.getElementById('main-body');
var inputOne = document.getElementById('input1');
var inputTwo = document.getElementById('input2');
var button = document.getElementById('botaodark');
var button2 = document.getElementById('botao');
function somaValores() {
    var valor1 = inputOne.valueAsNumber;
    var valor2 = inputTwo.valueAsNumber;
    var soma = valor1 + valor2;
    if (soma === 30) {
        console.log("Eu amo esse valor da soma: ".concat(soma));
    }
    else {
        console.log("Por mais que eu n\u00E3o goste o n\u00FAmero \u00E9 esse: ".concat(soma));
    }
}
function deixaPreto() {
    body.classList.toggle('dark');
}
button.addEventListener('click', deixaPreto);
button2.addEventListener('click', somaValores);
