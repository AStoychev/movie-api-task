import styles from './CloseButton.module.css';

const CloseButton = ({ openCloseModal }) => {
    return (
        <div className={styles.buttonWrapper}>
            <button className={styles.modalClose} onClick={openCloseModal}>x</button>
        </div>
    )
}

export default CloseButton