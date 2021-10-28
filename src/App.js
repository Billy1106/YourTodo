import './App.css';
import React from 'react'
import './service/firebase'
import Header from './components/Header';
import {AuthProvider} from './providers/AuthProvider';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';

function App() {
  return (
    <AuthProvider>
      <Header />
      <Dashboard/>
      <Footer/>
    </AuthProvider>
  );
}

export default App;
