import { useState } from 'react';

import { Link } from 'react-router-dom';

import { EmailTooltip } from './emailTooltip/EmailTooltip';

import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import { CiMail } from "react-icons/ci";

import styles from './Footer.module.css'

function Footer() {
    const [showEmail, setShowEmail] = useState('');
    
    const showTooltipEmail = () => {
        setShowEmail(<EmailTooltip />);
    };

    const hideTooltipEmail = () => {
        setShowEmail('');
    };

    return (
                <div className={styles.footerWrapper} onMouseLeave={hideTooltipEmail}>
                    <div className={styles.column}>
                        <h4>GET IN TOUCH:</h4>
                        <div className={styles.getInTouch}>
                            <Link className={styles.footerLinks} to="https://github.com/AStoychev" target='_blank'><FaGithub className={styles.footerIcons} /></Link>
                            <Link className={styles.footerLinks} to="https://www.linkedin.com/in/atanas-stoychev-9475391ba/" target='_blank'><FaLinkedin className={styles.footerIcons} /></Link>
                            <Link className={styles.footerLinks} to="https://www.facebook.com/nasko.stoychev.1/" target='_blank'><FaFacebook className={styles.footerIcons} /></Link>
                            <Link id={styles.noLink} className={styles.footerLinks}><FaInstagram className={styles.footerIcons} /></Link>
                            <div className={styles.wrappTooltip}>
                                {showEmail}
                                <Link className={styles.footerLinks} onMouseEnter={showTooltipEmail}><CiMail className={styles.footerIcons} /></Link>
                            </div>
                        </div>
                    </div>
                </div>
    )
}

export default Footer;