import { Suspense } from 'react';
import './App.css';
import Website from './components/Pages/Website';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Properties from './components/Pages/Properties/Properties';
import Details from './components/Details';

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Suspense fallback={<div>Loading.....</div>}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Website />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/properties/:id" element={<Details />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
