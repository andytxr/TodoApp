import axios from 'axios';

let url = 'http://localhost:3000/api/todos';

export const changeDescription = (event) => ({

    type: 'DESCRIPTION_CHANGED',
    payload: event.target.value

})

export const search = (description) => {

    return (dispatch, getState) => {

        const description = getState().todo.description;
        const search = description ? `&description__regex=/${description}/` : ''
        let req = axios.get(`${url}?sort=-createdAt${search}`).then(resp=>{

            dispatch({

                type: 'TODO_SEARCHED',
                payload: resp.data

            })

        })

    }

}

export const clearForm = () => {

    return[{

        type: 'TODO_CLEAR'

    }, search()]

}

export const add = (description) => {

    return dispatch => {

        axios.post(url, {description}).then(resp=>{

            dispatch({

                type: 'TODO_CLEAR',
                payload: resp.data

            });

        }).then(resp=>{

            dispatch(search());

        })

    }

}

export const remove = (todo) => {

    return dispatch => {

        axios.delete(`${url}/${todo._id}`).then(resp=>{

            dispatch(search());

        })

    }

}

export const markDone = (todo) => {

    return dispatch => {

        axios.put(`${url}/${todo._id}`, {...todo, done: true}).then(resp=>{

            dispatch({

                type: 'TODO_MARKED_DONE',
                payload: resp.data

            })

        }).then(resp=>{

            dispatch(search());

        })

    }

}

export const markPending = (todo) => {

    return dispatch => {

        axios.put(`${url}/${todo._id}`, {...todo, done: false}).then(resp=>{

            dispatch({

                type: 'TODO_MARKED_PENDING',
                payload: resp.data

            })

        }).then(resp=>{

            dispatch(search());

        })

    }

}



