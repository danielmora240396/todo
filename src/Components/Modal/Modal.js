import classes from './Modal.module.css';
import Button from '../Util/Button/Button';

const Modal = (props) => {

    const onChangeInput = (e) =>{
        props.setDescription(e.target.value);
    }

    return (
        <div className={classes['modal']}>
           <form onSubmit={() => props.addItem(props.description)}>
            <h2>Enter a new task!</h2>
                <input value={props.description} onChange={onChangeInput} placeholder="Add new task"></input>
                <Button click={() => props.addItem(props.description)}>Add</Button>
           </form>
        </div>
    )
}

export default Modal;