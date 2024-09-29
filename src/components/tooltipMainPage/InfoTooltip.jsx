import { Tooltip } from "react-tooltip";
import styles from './TooltipMainPage.module.css';

export const InfoTooltip = () => {
    return (
        <Tooltip id="info-tooltip">
            <div className={styles.wrapper}>
                <h3>To try this application, each movie in the .txt file must be on a new line</h3>
                <h4>EXAMPLE:</h4>
                <ul>
                    <li>Friends with Benefits</li>
                    <li>Point Break</li>
                    <li>Inception</li>
                    <li>The Dark Knight</li>
                    <li>Pulp Fiction</li>
                    <li>Forrest Gump</li>
                </ul>
                <h4>The application is under development and has been tested on Windows</h4>
            </div>
        </Tooltip>
    )
}