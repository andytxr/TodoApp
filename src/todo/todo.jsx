import React, {Component} from 'react';
import axios from 'axios';

import PageHeader from '../template/pageHeader';
import TodoForm from './todoForm';
import TodoList from './todoList';

let url = "http://localhost:3000/api/todos"

export default class Todo extends Component{

    constructor(props){

        super(props);

        this.state = {description: '', list: []};

        this.handleAdd = this.handleAdd.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleRemove = this.handleRemove.bind(this);

        this.refresh();

    }

    handleAdd(){
        
        let description = this.state.description;
        axios.post(url, {description}).then(resp=>{

            this.refresh()

        })

    }
    handleChange(e){

        this.setState({...this.state, description: e.target.value});

    }

    handleRemove(todo){

        axios.delete(`${url}/${todo._id}`).then(resp=>{

            this.refresh()

        })

    }

    refresh(){

        axios.get(`${url}?sort=-createdAt`).then(resp=>{

            this.setState({...this.state, description: '', list: resp.data});

        });

    }

    render(){
        return(

            <div>
                <PageHeader name='Tarefas' small='Cadastro'></PageHeader>
                <TodoForm description={this.state.description} handleAdd={this.handleAdd} handleChange={this.handleChange}></TodoForm>
                <TodoList list={this.state.list} handleRemove={this.handleRemove}></TodoList>
            </div>

        )
    }
}