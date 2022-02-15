'use strict';

// let banco = [
//     {'task': 'JS' ,'status': ''},
//     {'task': 'Netflix', 'status': 'checked'},
// ];



const getBanco = () => JSON.parse(localStorage.getItem ('todoList')) ?? [];
const setBanco = (banco) => localStorage.setItem ('todoList', JSON.stringify(banco));


const criarItem = (task, status, indice) => {
    const item = document.createElement('label');
    item.classList.add('todo__item')
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice}>
        <div>${task}</div>
        <input type="button" value="X" data-indice=${indice}>
    `
    document.getElementById('todoList').appendChild(item);
}

const limparTask = () => {
    const todoList = document.getElementById('todoList')
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild)
    }
}


const atualizarTela = () => {
    limparTask();
    const banco = getBanco();
    banco.forEach ( (item,indice) => criarItem (item.task, item.status, indice));
}

const inserirItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
   if (tecla === 'Enter') {
       const banco = getBanco();
       banco.push ({'task': texto, 'status': ''})
       setBanco(banco);
       atualizarTela();
       evento.target.value = '';
   }
}

const atualizarItem = (indice) => {
    const banco = getBanco();
    banco[indice].status = banco[indice].status === '' ? 'checked' : '';
    setBanco(banco);
    atualizarTela();
}

const clickItem = (evento) => {
    const elemento = evento.target;
    if (elemento.type === 'button') {
        const indice = elemento.dataset.indice;
        removerItem(indice);
    }else if (elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizarItem (indice);
    }
} 

const removerItem = (indice) => {
    const banco = getBanco();
    banco.splice (indice,1);
    setBanco(banco);
    atualizarTela();
}

document.getElementById('newItem').addEventListener('keypress', inserirItem)
document.getElementById('todoList' ).addEventListener('click', clickItem);


atualizarTela();