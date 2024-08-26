import { useState } from "react";

const SelectLanguage = ({ onLanguageChange }) => {
    const [selectedLanguage, setSelectedLanguage] = useState('en');

    const handleChange = (event) => {
        const newLanguage = event.target.value;
        setSelectedLanguage(newLanguage);
        onLanguageChange(newLanguage);
    };

    return (
        <div>
            <label htmlFor="language-select">Select Language: </label>
            <select id="language-select" value={selectedLanguage} onChange={handleChange}>
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
            </select>
        </div>
    );
};

export default SelectLanguage;
