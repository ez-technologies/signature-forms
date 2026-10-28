import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchContentSheet } from '../services/googleSheets';
import logger from '../utils/logger'; // Import the logger

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
    const [contentData, setContentData] = useState({});
    const [loadingContent, setLoadingContent] = useState(true);
    const [contentError, setContentError] = useState(null);

    const [contentSheetId, setContentSheetId] = useState('');
    const [gasWebAppUrl, setGasWebAppUrl] = useState('');

    const setMasterSettings = ({ contentSheetId: nextContentSheetId, gasWebAppUrl: nextGasWebAppUrl }) => {
        setContentSheetId(nextContentSheetId || '');
        setGasWebAppUrl(nextGasWebAppUrl || '');
    };

    useEffect(() => {
        if (!contentSheetId) {
            return;
        }
        const loadContent = async () => {
            logger.log('Loading content data with ID:', contentSheetId);
            try {
                setLoadingContent(true);
                const data = await fetchContentSheet(contentSheetId);
                setContentData(data);
                logger.log('Content data loaded:', data);
            } catch (err) {
                logger.error('Failed to load content data:', err);
                setContentError('Failed to load content data.');
            } finally {
                setLoadingContent(false);
            }
        };
        loadContent();
    }, [contentSheetId]);

    const value = {
        contentData,
        loadingContent,
        contentError,
        gasWebAppUrl,
        setMasterSettings,
    };

    return (
        <QuizContext.Provider value={value}>
            {children}
        </QuizContext.Provider>
    );
};

export const useQuiz = () => {
    const context = useContext(QuizContext);
    if (!context) {
        throw new Error('useQuiz must be used within a QuizProvider');
    }
    return context;
};
