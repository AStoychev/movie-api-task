import styles from './Input.module.css';

const Input = ({ label, type, name, movie, onChange, textarea, min, max, step }) => {

    return (
        <div className={styles.wrapper}>
            <label>{label}: </label>
            {textarea ? (
                <textarea
                    className={styles.textarea}
                    name={name}
                    value={movie}
                    onChange={onChange}
                />
            ) : (
                <input
                    className={styles.inputField}
                    type={type}
                    name={name}
                    value={movie}
                    onChange={onChange}
                    min={min}
                    max={max}
                    step={step}
                />
            )}
        </div>
    )
}

export default Input