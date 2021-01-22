import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import DeveloperFormPage from './pages/cadastro-developer/DeveloperFormPage';
import DeveloperListPage from './pages/cadastro-developer/DeveloperListPage';
import { IntlProvider } from 'react-intl';

function App() {
  return (
    <IntlProvider locale='pt'>
      <BrowserRouter>
        <Route path='/' component={HomePage} />
        <Route path='/developers' component={DeveloperListPage} exact />
        <Route path='/developers/:id' component={DeveloperFormPage} exact />
      </BrowserRouter>
    </IntlProvider>
  );
}

export default App;
