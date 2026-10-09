import Footer from "./components/Footer"
import PlantList from "./components/PlantList";
import Navigation from "./components/Navigation"

export default function App() {
	return (
		<>
			<Navigation/>

			<main>
				<PlantList/>
			</main>

			<Footer/>
		</>		
	);
}
