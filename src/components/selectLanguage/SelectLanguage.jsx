import { useState, useEffect, useRef } from "react";
import { useChangeLanguage } from "../../hooks/useChangeLanguage";

import { RiArrowDropDownLine } from "react-icons/ri";
import { MdLanguage } from "react-icons/md";
import styles from './SelectLanguage.module.css';

const SelectLanguage = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('en-US');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const dropdownRef = useRef(null);

    const { handleLanguageClick } = useChangeLanguage();

    const languages = [
        { value: 'en-US', label: 'English' },
        { value: 'es-ES', label: 'Spanish' },
        { value: 'fr-FR', label: 'French' },
        { value: 'de-DE', label: 'German' },
        { value: 'pt-BR', label: 'Portuguese' },
    ];

    const handleSelection = (value) => {
        setSelectedLanguage(value);
        handleLanguageClick(value);
        setIsDropdownOpen(false);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (

        <div className={styles.dropdownContainer} ref={dropdownRef}>
            <div className={styles.dropdownWrapper}>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className={styles.selectButton}>
                    {/* <MdLanguage className={styles.icon} /> */}
                    {languages.find(lang => lang.value === selectedLanguage)?.label}
                    <RiArrowDropDownLine />
                </button>
            </div>
            {isDropdownOpen && (
                <div className={styles.optionsContainer}>
                    <div className={styles.optionsWrapper}>
                        {languages.map(lang => (
                            <div
                                key={lang.value}
                                className={styles.option}
                                onClick={() => handleSelection(lang.value)}
                            >
                                {lang.label}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SelectLanguage;
