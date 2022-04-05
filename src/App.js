import ShowingList from "./showing/ShowingList";
import MovieList from "./movie/MovieList";
import RoomList from "./room/RoomList";
import Navbar from "./home/Navbar";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/dist/dropdown";
import "./style.css";
import ShowingOnDate from "./home/ShowingOnDate";
import CurrentShowing from "./home/CurrentShowing";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Switch>
                <Route exact path="/">
                    <div className="paddingTop center">
                        <Link to="/showing_on_date">
                            <button className="btn btn-primary marginRight">
                                Seanse w dniach
                            </button>
                        </Link>
                        <Link to="/currently_playing">
                            <button className="btn btn-primary marginRight">
                                Aktualnie trwajace
                            </button>
                        </Link>
                    </div>
                </Route>
                <Route path="/showing_on_date">
                    <ShowingOnDate />
                </Route>
                <Route path="/currently_playing">
                    <CurrentShowing />
                </Route>
                <Route path="/showing">
                    <ShowingList />
                </Route>
                <Route path="/room">
                    <RoomList />
                </Route>
                <Route path="/movie">
                    <MovieList />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
