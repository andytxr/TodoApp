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

    return dispatch => {

        axios.post(url, {description}).then(resp=>{

            dispatch({

                type: 'TODO_ADDED',
                payload: resp.data

            });

        }).then(resp=>{

            dispatch(search());

        })

    }


}