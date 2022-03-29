import classes from './TodoItem.module.css';

const TodoItem = (props) => {
    return (
        <div className={classes['todoitem'] + " " + classes[props.data.state.split(' ').join('')]}>
            <div onClick={props.remove} className={classes.removeCard}>X</div>
            <p className={classes.header}>{props.data.description}</p>
            <p>Current status: {props.data.state}</p>
            {props.data.buttonText ? <button onClick={props.start}>{props.data.buttonText}</button> : null}
        </div>
    )
}


export default TodoItem;