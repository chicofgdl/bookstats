import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SearchProvider } from './context/SearchContext'; // Importa o contexto de busca
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <SearchProvider> {/* Envolve as rotas com SearchProvider */}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/about" element={<About />} /> */}
        </Routes>
      </SearchProvider>
    </Router>
  );
}

export default App;
