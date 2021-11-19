import ShowingList from "./showing/ShowingList";
import MovieList from "./movie/MovieList"
import RoomList from "./room/RoomList"
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div>
        <Router>
            <p><Link to="/">Home</Link> <Link to="/showing">Showing</Link> <Link to="/room">Room</Link> <Link to="/movie">Movie</Link></p>
            <Route
                exact
                path="/"
                render={ () => <div></div>}/>
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
