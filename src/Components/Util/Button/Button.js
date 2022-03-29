import classes from './Button.module.css';

const Button = (props) => {
    return (
        <button className={classes['custom-button']} onClick={props.click}>
            {props.children}
        </button>
    )
}

export default Button;