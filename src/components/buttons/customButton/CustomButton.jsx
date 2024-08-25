import styles from './CustomButton.module.css';

function CustomButton({title, onHandleClick}) {
    return (
        <div className={styles.wrapper}>
            <button onClick={onHandleClick}>{title}</button>
        </div>
    )
}

export default CustomButton;