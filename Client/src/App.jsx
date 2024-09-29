import { Suspense } from 'react';
import './App.css';
import { MantineProvider } from "@mantine/core";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Website from './components/Pages/Website';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Properties from './components/Pages/Properties/Properties';
import Details from './components/Details';
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import Bookings from "./components/Pages/Bookings/Bookings";
import Favorites from "./components/Pages/Favourites/Favourites";
import Register from './components/Pages/Register/Register';
import Login from './components/Pages/Register/Login';
// import Missing from './components/Pages/Register/Missing';
// import Home from './components/Pages/Register/Home';
import LayoutForRegister from './components/Pages/Register/LayoutForRegister';
import RequireAuth from './components/Pages/Register/RequireAuth';
import { AuthProvider } from './context/AuthProvider';

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
          <div className="app-container">
      <BrowserRouter>
        <Suspense fallback={<div>Loading.....</div>}>
        <AuthProvider>
          <Routes>
            <Route>
            <Route element={<LayoutForRegister />}>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Route>
            <Route element={<Layout />}>
              <Route path="/" element={<Website />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/properties/:id" element={<Details />} />
              <Route element={<RequireAuth />}>
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/Favourites" element={<Favorites />} />
              </Route>
            </Route>
            </Route>
          </Routes>
        </AuthProvider>
        </Suspense>
      </BrowserRouter>
      </div>
      </MantineProvider>
  );
}

export default App;
