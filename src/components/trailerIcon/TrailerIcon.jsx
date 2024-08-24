import { IoIosPlay } from "react-icons/io";
import styles from './TrailerIcon.module.css';

function TrailerIcon({trailer}) {
    return (
        <div className={trailer ? styles.videoPlay : styles.noVideo}>
            <div className={!trailer ? styles.crossed : ''}>
                <a
                    href={trailer}
                    target="_blank"
                >
                    <IoIosPlay className={styles.videoIcon} />
                </a>
            </div>
        </div>
    )
}

export default TrailerIcon;