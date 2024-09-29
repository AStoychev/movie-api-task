import { Tooltip } from "react-tooltip";
import styles from './TooltipMainPage.module.css';

export const CopyTooltip = ({ text }) => {
    return (
        <Tooltip id="copy-tooltip">
            <div className={styles.wrapper} style={{ width: "150px" }}>
                <h4>{text}</h4>
            </div>
        </Tooltip>
    )
}