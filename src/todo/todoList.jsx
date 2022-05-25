import React from "react";
import { connect }  from 'react-redux';
import { bindActionCreators } from "redux";

import IconButton from "../template/iconButton";

import { markDone, markPending, remove } from "./todoActions";

const todoList = props => {

    const renderRows = () => {

        const list = props.list || []

        return list.map(todo => (
            <tr key={todo._id}>
                <td className={todo.done ? 'markedAsDone' : ''}>{todo.description}</td>
                <td>
                    <IconButton style='success' icon='check' onClick={

                        ()=>props.markDone(todo)

                    } hide = {todo.done}></IconButton>
                    <IconButton style='warning' icon='undo' onClick={

                        ()=>props.markPending(todo)

                    } hide={!todo.done}></IconButton>
                    <IconButton style='danger' icon='trash-o' onClick={

                        ()=>props.remove(todo)

                    } hide={!todo.done}></IconButton>
                </td>
            </tr>
        ));

    }

   return( 
       
        <table className="table">
            <thead>
                <tr>
                    <th>Descrição</th>
                    <th className="tableActions">Ações</th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    
   )

}

const mapStateToProps = state => ({list: state.todo.list})
const mapDispatchToProps = dispatch => bindActionCreators({

    markDone, markPending, remove

}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(todoList);



