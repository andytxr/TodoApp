import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    todo: ()=>({
        description: 'Ler livro',
        list: [{
            _id: 1,
            description: 'Pagar fatura do cartão',
            done: true
        }, {
            _id: 2,
            description: 'Reunião às 10h',
            done: false
        }, {
            _id: 3,
            description: 'Consulta',
            done: false
        }]
    })
})

export default rootReducer