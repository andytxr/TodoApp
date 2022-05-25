import axios from 'axios';

let url = 'http://localhost:3000/api/todos';

export const changeDescription = (event) => ({

    type: 'DESCRIPTION_CHANGED',
    payload: event.target.value

})

export const search = () => {

    let req = axios.get(`${url}?sort=-createdAt`);

    return{

        type: 'TODO_SEARCHED',
        payload: req

    }

}

export const add = (description) => {

    let req = axios.post(url, { description });

    return{

        type: 'TODO_ADDED',
        payload: req

    }

}