"use strict";
var Profissao;
(function (Profissao) {
    Profissao[Profissao["Developer"] = 0] = "Developer";
    Profissao[Profissao["Architect"] = 1] = "Architect";
    Profissao[Profissao["Painter"] = 2] = "Painter";
    Profissao[Profissao["Carpenter"] = 3] = "Carpenter";
    Profissao[Profissao["Bricklayer"] = 4] = "Bricklayer";
    Profissao[Profissao["Lawyer"] = 5] = "Lawyer";
    Profissao[Profissao["Engineer"] = 6] = "Engineer";
    Profissao[Profissao["SoftwareEngineer"] = 7] = "SoftwareEngineer";
    Profissao[Profissao["M\u00E9dico"] = 8] = "M\u00E9dico";
})(Profissao || (Profissao = {}));
var pessoa1 = {
    nome: 'Kennedy Rodrigues',
    idade: 19,
    cidade: 'Belo Horizonte',
    genero: 'Masculino',
    profissao: Profissao.SoftwareEngineer
};
var pessoa2 = {
    nome: 'Pedro Cardoso',
    idade: 33,
    cidade: 'São Paulo',
    genero: 'Masculino',
    profissao: Profissao.Médico
};
var pessoa3 = {
    nome: 'Andressa Carla Souza',
    idade: 31,
    cidade: 'Itambé',
    genero: 'Feminino',
    profissao: Profissao.Developer
};
var pessoa4 = {
    nome: 'Giovanna',
    idade: 19,
    cidade: 'Belo Horizonte',
    genero: 'Feminino',
    profissao: Profissao.Architect
};
var pessoa5 = {
    nome: 'Joeliton Souza',
    idade: 41,
    cidade: 'Manaús',
    genero: 'Masculino',
    profissao: Profissao.Bricklayer
};
console.log(pessoa5);
