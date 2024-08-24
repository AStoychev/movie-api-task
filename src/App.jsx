import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import UploadText from './pages/uploadText/UploadText';
import PreviewPage from './pages/previewPage/PreviewPage';

import './App.css';

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<UploadText />} />
                <Route path='/preview' element={<PreviewPage />} />
            </Routes>
        </>
    )
};


export default App
