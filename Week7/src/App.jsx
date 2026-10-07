import Footer from "./components/Footer"
import MovieList from "./components/MovieList";
import Navigation from "./components/Navigation"

export default function App() {
	return (
		<>
			<Navigation/>

			<main>
				<MovieList/>
			</main>

			<Footer/>
		</>		
	);
}
