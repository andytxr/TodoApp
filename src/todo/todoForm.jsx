import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import Grid from "../template/grid";
import IconButton from '../template/iconButton';
import { changeDescription, search, add, clearForm } from "./todoActions";

class TodoForm extends Component{

    constructor(props){

        super(props);

        this.keyHandler = this.keyHandler.bind(this);
    }

    keyHandler(e){

        let {add, search, description, clearForm} = this.props;

        if(e.key === 'Enter'){

            e.shiftKey ? search : add(description);

        }else if(e.key === 'Escape'){

            clearForm()

        }

    }

    componentWillMount(){

        this.props.search()

    }

    render(){

        let {add, search, description, clearForm} = this.props;

        return(

            <div role='form' className="todoForm">
    
                <Grid cols="12 9 10">
                    <input id= 'description' className="form-control" 
                    placeholder="Adicione uma tarefa" value={this.props.description} 
                    onChange={this.props.changeDescription} onKeyUp={this.keyHandler}></input>
                </Grid>
    
                <Grid cols="12 3 2">
                    
                    <IconButton style="primary" icon="plus" onClick={()=>add(description)}> 
                    </IconButton>
                    <IconButton style="info" icon="search" onClick={search}>
                    </IconButton>
                    <IconButton style="default" icon="close" onClick={()=>clearForm()}></IconButton>
                    
                </Grid>
                
            </div>
    
        )

    }
}

const mapStateToProps = state => ({description: state.todo.description})

const mapDispatchToProps = dispatch => bindActionCreators({

    changeDescription, search, add, clearForm

}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm)