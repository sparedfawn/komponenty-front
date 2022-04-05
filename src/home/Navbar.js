import React from "react";

import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-light">
            <div className="d-md-flex d-block flex-row mx-md-auto mx-0">
                <Link className="nav-link active" to="/">
                    Strona główna
                </Link>
                <Link className="nav-link" to="/showing">
                    Seanse
                </Link>
                <Link className="nav-link" to="/room">
                    Sale
                </Link>
                <Link className="nav-link active" to="/movie">
                    Filmy
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
