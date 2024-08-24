import styles from './Checkbox.module.css';

function Checkbox({ index, movie, toggleSelect }) {
    return (
        <div className={styles.checkboxWrapper}>
            <label>
                <input
                    type="checkbox"
                    id={index}
                    checked={movie.selected}
                    onChange={() => toggleSelect(index)}
                />
                <span className={styles.checkbox}></span>
            </label>
            <div className={styles.titleWrapper} onClick={() => toggleSelect(index)}>
                <p className={!movie.selected ? styles.titleScratch : ''}>{movie.title}</p>
            </div>
        </div>
    )
}

export default Checkbox;