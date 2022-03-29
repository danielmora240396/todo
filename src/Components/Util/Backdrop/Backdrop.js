import classes from './Backdrop.module.css';

const Backdrop = (props) => {
    return(
        <div onClick={props.close} className={classes['backdrop']}>
            {props.children}
        </div>
    )
}

export default Backdrop;