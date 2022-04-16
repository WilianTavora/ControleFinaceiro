const transactionUL = document.querySelector('.transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransationName = document.querySelector('#text')
const inputTransationAmount = document.querySelector('#amount')
   

const localStorageTransations = JSON.parse(localStorage
    .getItem('transations'))
let transations = localStorage
    .getItem('transations') !== null ? localStorageTransations : []



const removeTransation = ID => {
    transations = transations.filter(transaction => 
        transaction.id !== ID)
    updateLocalStorage()
    init()
}

const addTransactionIntoDOM = transaction => {
    const operator = transaction.amount < 0 ? '-' : '+'
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'
    const amountWithoutOperator = Math.abs(transaction.amount)
    const li = document.createElement('li')
    li.classList.add(CSSClass)

    li.innerHTML = `
        ${transaction.name} 
        <span>${operator} R$ ${amountWithoutOperator}</span>
        <button class="delete-btn" onClick="removeTransation(${transaction.id})">
            x
        </button>
    `
    transactionUL.prepend(li)
}

const updateBalanceValues = () => {
    const transactionsAmounts = transations
        .map(transaction => transaction.amount)
    const total = transactionsAmounts
        .reduce((accumulator, transaction) => accumulator + transaction, 0)
        .toFixed(2)
    const income = transactionsAmounts
        .filter(value => value > 0)
        .reduce((accumulator, value) => accumulator + value, 0)
        .toFixed(2)
    const expense = Math.abs(transactionsAmounts
        .filter(value => value < 0)
        .reduce((accumulator, value) => accumulator + value, 0))
        .toFixed(2)
    
    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${expense}`
}

const init = () => {
    transactionUL.innerHTML = ''
    transations.forEach(addTransactionIntoDOM)
    updateBalanceValues()
}
init()

const updateLocalStorage = () => {
    localStorage.setItem('transations', JSON.stringify(transations))
}

const generateID = () => Math.round(Math.random() * 1000) 

form.addEventListener('submit', event => {
    event.preventDefault()

    const transactionName = inputTransationName.value.trim()
    const transactionAmount = inputTransationAmount.value.trim()

    if (transactionName === '' || transactionAmount === '') {
        alert('Preencha todos campos.')
        return
    }

    const transaction = {id: generateID(), 
        name: transactionName, 
        amount: Number(transactionAmount)
    }

    transations.push(transaction)
    init()
    updateLocalStorage()

    inputTransationName.value = ''
    inputTransationAmount.value = ''
    
})





