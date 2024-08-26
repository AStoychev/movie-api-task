import { Link } from 'react-router-dom';

import styles from './Header.module.css';


function Header() {
    return (
        <header className={styles.header}>
                <div className={styles.headerWrapper}>
                    <Link className={styles.link} to="/">Movies Task</Link>
                    <div className={styles.colorModeWrapper}>
                        <button></button>
                    </div>
                </div>
        </header>
    )
}

export default Header;