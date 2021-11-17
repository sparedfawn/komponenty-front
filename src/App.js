import ShowingList from "./ShowingList";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div>
        <Router>
            <Route
                exact
                path="/"
                render={ () => <div>
                    <Link to="/showing">Showing</Link>
                </div>}/>
            <Route
                exact
                path="/showing"
                render={() => <ShowingList/>}/>
        </Router>
    </div>
  );
}

export default App;
