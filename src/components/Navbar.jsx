import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import SearchBar from "./SearchBar";

const Navbar = () => {
	const { state } = useContext(StoreContext);
	const favCount = state.favorites.length;

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container">

				<Link className="navbar-brand" to="/">StarWars DB</Link>
				<div className="collapse navbar-collapse justify-content-end"> 					
					<div className="d-flex me-2 ">
						<SearchBar />
					</div>
					<Link className="btn btn-outline-warning position-relative" to="/favorites">
						Favoritos
						{favCount > 0 && (
							<span
								className="badge bg-danger position-absolute top-0 start-100 translate-middle"
							>
								{favCount}
							</span>
						)}
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;