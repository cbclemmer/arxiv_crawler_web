import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React from 'react'

import Home from './Home/page'

const App: React.FC = () => {
  return (
    <div className="container">
      <div style={ { marginBottom: '20px' } }></div>
      <nav>
        <a href='/'>Home</a>
      </nav>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App