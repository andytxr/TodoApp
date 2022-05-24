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
        this.handleSearch = this.handleSearch.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleDone = this.handleDone.bind(this);
        this.handlePending = this.handlePending.bind(this);

        this.refresh();

    }

    handleAdd(){
        
        let description = this.state.description;
        axios.post(url, {description}).then(resp=>{

            this.refresh()

        })

    }

    handleSearch(){

        this.refresh(this.state.description)

    }

    handleClear(){

        this.refresh()

    }

    handleChange(e){

        this.setState({...this.state, description: e.target.value});

    }

    handleRemove(todo){

        axios.delete(`${url}/${todo._id}`).then(resp=>{

            this.refresh(this.state.description)

        })

    }

    handleDone(todo){

        axios.put(`${url}/${todo._id}`, {...todo, done: true}).then(resp=>{
            
            this.refresh(this.state.description);

        })

    }
    handlePending(todo){

        axios.put(`${url}/${todo._id}`, {...todo, done: false}).then(resp=>{

            this.refresh(this.state.description);

        })

    }

    refresh(description = ''){

        const search = description ? `&description__regex=/${description}/` : ''
        axios.get(`${url}?sort=-createdAt=-${search}`).then(resp=>{

            this.setState({...this.state, description, list: resp.data});

        });

    }

    render(){
        return(

            <div>
                <PageHeader name='Tarefas' small='Cadastro'></PageHeader>
                <TodoForm description={this.state.description} 
                handleAdd={this.handleAdd} handleChange={this.handleChange}
                handleSearch={this.handleSearch} handleClear={this.handleClear}></TodoForm>
                <TodoList handleRemove={this.handleRemove} 
                handleDone={this.handleDone} handlePending={this.handlePending}></TodoList>
            </div>

        )
    }
}