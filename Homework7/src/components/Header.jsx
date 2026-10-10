/**
 * Filename: Header.jsx
 * Description: The site header | IT-340 Homework #7
 * Copyright (c) 2026 Ryan Smith <smithrm23@juniata.edu>
 */

import Navigation from "./Navigation";

export default function Header() {
	return (
		<header className="header">
			<div className="title">
				<h1> Native Plants of Pennsylvania </h1>
				<h2> Learn more about some of the beautiful plants Pennsylvania has to offer </h2>
			</div>

			<Navigation/>
		</header>
	);
}