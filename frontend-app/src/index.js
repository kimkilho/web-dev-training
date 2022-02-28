import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import LabelingScreen from './LabelingScreen';
import ClassifierScreen from "./ClassifierScreen";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="labeler" element={<LabelingScreen />} />
      <Route path="classifier" element={<ClassifierScreen />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

