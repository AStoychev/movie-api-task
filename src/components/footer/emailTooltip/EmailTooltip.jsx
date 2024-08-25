import { useState } from 'react';

import { FaCheck } from "react-icons/fa";
import styles from './EmailTooltip.module.css'

const SHOW_EMAIL = import.meta.env.VITE_SHOW_EMAIL

export const EmailTooltip = () => {
    const [copyText, setCopyText] = useState(false);

    const onClickCopyEmail = () => {
        navigator.clipboard.writeText(SHOW_EMAIL)
        setCopyText(true)
    }
    return (
        <div className={styles.emailWrapper}>
            <div onClick={onClickCopyEmail} style={{backgroundColor: copyText && 'rgba(163, 255, 241, 0.582)'}}>
                <p>{SHOW_EMAIL}</p>
                {copyText ?
                    <p className={styles.copiedEmail}>COPIED <FaCheck className={styles.checkmarkCopied}/></p>
                    :
                    <p className={styles.copyEmail}>Copy Email</p>
                }
            </div>
        </div>
    )
}