import ShowingList from "./showing/ShowingList";
import MovieList from "./movie/MovieList"
import RoomList from "./room/RoomList"
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/dropdown';
import "./style.css"
import ShowingOnDate from "./home/ShowingOnDate";
import CurrentShowing from "./home/CurrentShowing";

function App() {
  return (
    <div>
        <Router>
            <nav class="navbar navbar-light">
                <div class="d-md-flex d-block flex-row mx-md-auto mx-0">
                    <Link class="nav-link active" to="/">Strona główna</Link>
                    <Link class="nav-link" to="/showing">Seanse</Link>
                    <Link class="nav-link" to="/room">Sale</Link>
                    <Link class="nav-link active" to="/movie">Filmy</Link>
                </div>
            </nav>

            <Route
                exact
                path="/"
                render={ () => <div>
                    <Link to="/showing_on_date">Seanse w dniach</Link>
                    <Link to="/currently_playing">Aktualnie trwajace</Link>
                </div>}/>
            <Route
                exact
                path="/showing_on_date"
                render={() => <ShowingOnDate/>}/>
            <Route
                exact
                path="/currently_playing"
                render={() => <CurrentShowing/>}/>
            <Route
                exact
                path="/showing"
                render={() => <ShowingList/>}/>
            <Route
                exact
                path="/room"
                render={() => <RoomList/>}/>
            <Route
                exact
                path="/movie"
                render={() => <MovieList/>}/>
        </Router>
    </div>
  );
}

export default App;
