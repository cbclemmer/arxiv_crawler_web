import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React from 'react'

import ProjectList from './Projects/list'
import ProjectShow from './Projects/show'

const App: React.FC = () => {
  return (
    <div className="container">
      <div style={ { marginBottom: '20px' } }></div>
      <nav>
        <a href='/'>Home</a>
      </nav>
      <Router>
        <Routes>
          <Route path="/" element={<ProjectList />} />
          <Route path="/projects/show/:id" element={<ProjectShow />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App