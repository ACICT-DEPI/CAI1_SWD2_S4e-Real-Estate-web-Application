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
function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <BrowserRouter>
        <Suspense fallback={<div>Loading.....</div>}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Website />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/properties/:id" element={<Details />} />
              <Route path="/bookings" element={<Bookings />} />
							<Route path="/Favourites" element={<Favorites />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
      </MantineProvider>
  );
}

export default App;
