import { useState } from "react";
import classes from './ListContainer.module.css';
import Button from '../Util/Button/Button';
import Backdrop from "../Util/Backdrop/Backdrop";
import Modal from '../Modal/Modal';
import TodoItem from "../TodoItem/TodoItem";

const ListContainer = () => {
    const [description, setDescription] = useState('')
    const [newToDo, setNewTodo] = useState(false);
    const [todoList, setTodoList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const addItem = (description) => {
        if(description.trim().length > 0){
            const tempState = [...todoList];
            tempState.push({id: Date.now() , description: description, state: 'pending'});
            setTodoList(tempState);
            setNewTodo(false);
            setDescription('');
        }
    }

    const startProgress = (id) => {
        const tempState = [...todoList];
        const index = tempState.findIndex(x => x.id === id);
        const tempObject = {...tempState[index]};
        tempObject.state = 'in progress';
        tempState[index] = tempObject;
        setTodoList(tempState);
    }

    const finishProgress = (id) => {
        const tempState = [...todoList];
        const index = tempState.findIndex(x => x.id === id);
        const tempObject = {...tempState[index]};
        tempObject.state = 'done';
        tempState[index] = tempObject;
        setTodoList(tempState);
    }

    const removeCard = (id) => {
        const tempState = [...todoList];
        const index = tempState.findIndex(x => x.id === id)
        tempState.splice(index, 1);
        setTodoList(tempState);
    }

    let pendingTasks = [];
    let progressTasks = [];
    let finishedTasks = [];

    if(searchTerm.length === 0) {
        pendingTasks = todoList.filter(x => x.state.toLowerCase() === 'pending').map((item) => {
            return <TodoItem key={item.id} start={() => startProgress(item.id)} data={{...item, buttonText: 'Start Progress'}} remove={() => removeCard(item.id)}></TodoItem>
        });
    
        progressTasks = todoList.filter(x => x.state.toLowerCase() === 'in progress').map((item) => {
            return <TodoItem key={item.id} start={() => finishProgress(item.id)} data={{...item, buttonText: 'Finish task'}} remove={() => removeCard(item.id)}></TodoItem>
        });
    
        finishedTasks = todoList.filter(x => x.state.toLowerCase() === 'done').map((item) => {
            return <TodoItem key={item.id} data={{...item}} remove={() => removeCard(item.id)}></TodoItem>
        });
    } else {
        pendingTasks = todoList.filter(x => x.state.toLowerCase() === 'pending' && x.description.toLowerCase().indexOf(searchTerm) > -1).map((item) => {
            return <TodoItem key={item.id} start={() => startProgress(item.id)} data={{...item, buttonText: 'Start Progress'}} remove={() => removeCard(item.id)}></TodoItem>
        });
    
        progressTasks = todoList.filter(x => x.state.toLowerCase() === 'in progress' && x.description.toLowerCase().indexOf(searchTerm) > -1).map((item) => {
            return <TodoItem key={item.id} start={() => finishProgress(item.id)} data={{...item, buttonText: 'Finish task'}} remove={() => removeCard(item.id)}></TodoItem>
        });
    
        finishedTasks = todoList.filter(x => x.state.toLowerCase() === 'done' && x.description.toLowerCase().indexOf(searchTerm) > -1).map((item) => {
            return <TodoItem key={item.id} data={{...item}} remove={() => removeCard(item.id)}></TodoItem>
        });
    }

    return (
        <div className={classes['list-container']}>
            {newToDo ? <div><Backdrop close={() => setNewTodo(false)}></Backdrop><Modal description={description} setDescription = {setDescription} addItem={(description) => addItem(description)}></Modal></div> : ''}
            <Button classes={classes['custom-button']} click={() => setNewTodo(true)}>+</Button>
            <div className={classes['headline']}>Your tasks</div>
            <input placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}></input>
            <div className={classes.columnscontainer}>
                <div className={classes.pendingcolumn}>
                    <h2>{pendingTasks.length} task{pendingTasks.length !== 1 ? 's' : ''} pending</h2>
                    {pendingTasks.length > 0 ? pendingTasks : "No pending tasks"}
                </div>
                <div className={classes.progresscolumn}>
                    <h2>{progressTasks.length} task{progressTasks.length !== 1 ? 's' : ''} in progress</h2>
                    {progressTasks.length > 0 ? progressTasks : "No tasks in progress"}
                </div>
                <div className={classes.donecolumn}>
                    <h2>{finishedTasks.length} task{finishedTasks.length !== 1 ? 's' : ''} in progress</h2>
                    {finishedTasks.length > 0 ? finishedTasks : "No tasks in progress"}
                </div>
            </div>
        </div>
    )

}

export default ListContainer;