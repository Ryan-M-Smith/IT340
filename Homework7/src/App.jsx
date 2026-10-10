/**
 * Filename: App.jsx
 * Description: The main App component | IT-340 Homework #7
 * Copyright (c) 2026 Ryan Smith <smithrm23@juniata.edu>
 */

import Footer from "./components/Footer";
import Header from "./components/Header";
import PlantList from "./components/PlantList";

export default function App() {
	return (
		<div className="app">
			<Header/>

			<main>
				<PlantList/>
			</main>

			<Footer/>
		</div>
	);
}
