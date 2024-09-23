import { Suspense, useState } from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Website from "./pages/Website";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Properties from "./pages/Properties/Properties";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from "react-query/devtools";
import "react-toastify/dist/ReactToastify.css";
import Property from "./pages/Property/Property";
import UserDetailContext from "./context/UserDetailContext ";
import { MantineProvider } from "@mantine/core";
import Favourites from "./pages/Favourites/Favourites";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import Bookings from "./pages/Bookings/Bookings";

function App() {
	const queryClient = new QueryClient();
	const [userDetails, setUserDetails] = useState({
		favourites: [],
		bookings: [],
		token: null,
	});

	return (
		<MantineProvider withGlobalStyles withNormalizeCSS>
			<UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
				<QueryClientProvider client={queryClient}>
					<BrowserRouter>
						<Suspense fallback={<div>Loading...</div>}>
							<Routes>
								<Route element={<Layout />}>
									<Route path="/" element={<Website />} />
									<Route path="/properties">
										<Route index element={<Properties />} />
										<Route path=":propertyId" element={<Property />} />
									</Route>
									<Route path="/bookings" element={<Bookings />} />
									<Route path="/favourites" element={<Favourites />} />
								</Route>
							</Routes>
						</Suspense>
					</BrowserRouter>
					<ToastContainer />
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</UserDetailContext.Provider>
		</MantineProvider>
	);
}

export default App;
