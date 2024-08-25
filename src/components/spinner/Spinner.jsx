import RingLoader from 'react-spinners/RingLoader';

import styles from "./Spinner.module.css"

function Spinner() {
    return (
        <div className={styles.spinnerWrapper}>
            <RingLoader color="#36d7b7" size={110} />
        </div>
    )
}

export default Spinner;