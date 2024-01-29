import React, { createContext, useState, useContext } from 'react';

// Creating a context to manage language state
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');

    // Function to update the language state
    const changeLanguage = (newLanguage) => {
        setLanguage(newLanguage);
    };

    // Providing the language state and changeLanguage function to its children
    return (
        <LanguageContext.Provider value={{ language, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

// Custom hook to easily access the language context in functional components
export const useLanguage = () => {
    return useContext(LanguageContext);
};