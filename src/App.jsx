// App.js

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './components/auth';
import Dashboard from './components/dashboard';
import Home from './components/Home';
import MyHomePage from './components/MyHomePage';
import { useUserContext } from './context/userContext';
import Criterion3 from './components/criterion3';

function App() {
  const { user, loading, error } = useUserContext();

  return (
    <h1>hii</h1>
  );
}

export default App;
