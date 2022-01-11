import React from "react";
import Showing from "./Showing";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import axios from "axios";
import AddShowing from "./AddShowing";
import "../style.css"
import EditShowing from "./EditShowing";
import ShowingDetails from "./ShowingDetails";
import * as Api from "../api"

class ShowingList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            movieList: [],
            roomList: [],
            inputValue: 0,
            headerValue: "sortuj wedlug"
        }

        this.addShowing = this.addShowing.bind(this)
        this.editShowing = this.editShowing.bind(this)
        this.deleteShowing = this.deleteShowing.bind(this)
        this.roomListCheck = this.roomListCheck.bind(this)
        this.movieListCheck = this.movieListCheck.bind(this)
        this.inputValueChange = this.inputValueChange.bind(this)
        this.setHeaderValue = this.setHeaderValue.bind(this)
    }

    componentDidMount() {
        Api.getAllShowing()
            .then(response => this.setState(state => {
                let list = response.data
                return {list: list}
            }))
            .catch(error => console.log(error))

        Api.getMovies().then(response => this.setState(state => {
                let list = response.data
                list.forEach(e => e.checked = true)
                return { movieList: list }
            }))
            .catch(error => console.log(error))

        Api.getAllRoom().then(response => this.setState(state => {
                let list = response.data
                list.forEach(e => e.checked = true)
                return { roomList: list }
            }))
            .catch(error => console.log(error))
    }

    addShowing = (element) =>{
        Api.addShowing(element).then(() => {
            this.setState((prevState) => {
                let list = prevState.list
                list.push(element)
                return {list: list}
            })
        })
    }

    editShowing = (element, index) => {
        Api.editShowing(element,index).then(()=> {
            this.setState((prevState) => {
                let list = prevState.list
                list[index] = element
                return {list: list}
            })
        })
    }

    deleteShowing = (index) => {
        Api.deleteShowing(index).then(() => {
            this.setState((prevState) => {
                let list = prevState.list
                list.splice(index, 1)
                return {list: list}
            })
        })
        
    }

    roomListCheck = (e) => {

        let roomList = this.state.roomList
        roomList[e.target.id - 1].checked = !roomList[e.target.id - 1].checked

        this.setState({roomList: roomList})
    }

    movieListCheck = (e) => {

        let movieList = this.state.movieList
        let index = movieList.indexOf(movieList.find(element => element.title === e.target.id))
        movieList[index].checked = !movieList[index].checked
        
        this.setState({movieList: movieList})
    }

    inputValueChange = (e) => {

        let value = e.target.value

        this.setState({inputValue: value})
    }

    setHeaderValue = (e) => {

        let value = e.target.innerText
        this.setState({headerValue: value})
    }

    render() {
        let list
        if (!this.state.list.length) {
            list =
                <div class="alertLayout center">
                    <div class="alert alert-secondary" role="alert">Brak dostępnych seansów</div>
                </div>
        } else {

            let sortedList

            switch (this.state.headerValue) {
                case "Ilosc miejsc rosnaco":
                    sortedList = this.state.list.sort((a, b) => {
                        return parseInt(a.room.capacity) - a.takenSeats.length - parseInt(b.room.capacity) - b.takenSeats.length 
                    })
                    break;
                case "Ilosc miejsc malejaco":
                    sortedList = this.state.list.sort((a, b) => {
                        return parseInt(b.room.capacity) - b.takenSeats.length - parseInt(a.room.capacity) - a.takenSeats.length 
                    })
                    break;
                case "Numer sali rosnaco":
                    sortedList = this.state.list.sort((a, b) => {
                        return parseInt(a.room.number) - parseInt(b.room.number)
                    })
                    break;
                case "Numer sali malejaco":
                    sortedList = this.state.list.sort((a, b) => {
                        return parseInt(b.room.number) - parseInt(a.room.number)
                    })
                    break;
                case "Cena rosnaco":
                    sortedList = this.state.list.sort((a, b) => {
                        return parseFloat(a.ticketPrice) - parseFloat(b.ticketPrice)
                    })
                    break;
                case "Cena malejaco":
                    sortedList = this.state.list.sort((a, b) => {
                        return parseFloat(b.ticketPrice) - parseFloat(a.ticketPrice)
                    })
                    break;
                default: 
                    sortedList = this.state.list
                    break;
            }
            if (this.state.roomList[0] !== undefined && this.state.movieList[0] !== undefined) {
                list = sortedList.filter(e => this.state.roomList[e.room.number - 1].checked === true &&
                    this.state.movieList[this.state.movieList.indexOf(this.state.movieList.find(element => element.title === e.movie.title))].checked === true)
                .map(e => <div>
                    <Link to={"/showing/details/" + Array.prototype.indexOf.call(this.state.list, e)}>
                        <Showing date={e.date} movie={e.movie} room={e.room} takenSeats={e.takenSeats} ticketPrice={e.ticketPrice}/> 
                    </Link>
                </div>)
            }
            
        }

        let roomList = this.state.roomList.map(e => <p><input type="checkbox" id={e.number} 
        defaultChecked="true" onChange={this.roomListCheck}/> {e.number} </p>)

        let movieList = this.state.movieList.map(e => <p><input type="checkbox" id={e.title} 
        defaultChecked="true" onChange={this.movieListCheck}/> {e.title} </p>)

        return (
            <Router>
                <Route
                    exact
                    path="/showing"
                    render={() =>
                        <div>
                            <div class="row">
                                <div>
                                    <aside class="sidebar">
                                        <h4 class="center sidebar-head">Filtuj</h4>

                                        <div class="sidebar-element">
                                            <h5 class="center sidebar-head">Sala</h5>
                                            {roomList}
                                        </div>
                                        <div class="sidebar-element">
                                            <h5 class="center sidebar-head">Film</h5>
                                            {movieList}
                                        </div>
                    
                                        <h4 class="center sidebar-head">Sortuj</h4>
                                        <div class="sidebar-element">
                                            <div class="dropdown padding">
                                                <button class="btn btn-outline-primary dropdown-toggle" role="button" data-bs-toggle="dropdown">
                                                    {this.state.headerValue}
                                                </button>

                                                <ul class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
                                                    <li class="listItem center" onClick={this.setHeaderValue}>Ilosc miejsc rosnaco</li>
                                                    <li class="listItem center" onClick={this.setHeaderValue}>Ilosc miejsc malejaco</li>
                                                    <li class="listItem center" onClick={this.setHeaderValue}>Numer sali rosnaco</li>
                                                    <li class="listItem center" onClick={this.setHeaderValue}>Numer sali malejaco</li>
                                                    <li class="listItem center" onClick={this.setHeaderValue}>Cena rosnaco</li>
                                                    <li class="listItem center" onClick={this.setHeaderValue}>Cena malejaco</li>
                                                </ul>
                                            </div> 
                                        </div>
                                    </aside>
                                    {list}
                                </div>
                            </div>
                            <div class="row">
                                <div class="center padding">
                                    <Link class="btn btn-primary" to="/showing/add">Dodaj</Link>
                                </div>
                            </div>
                        </div>}
                />
                <Route
                    exact
                    path="/showing/add"
                    render={() => <AddShowing addShowing={this.addShowing} showingList={this.state.list}/>}/>
                <Route
                    exact
                    path="/showing/details/:id"
                    render={({match}) =>
                        <ShowingDetails showing={this.state.list[match.params.id]} index={parseInt(match.params.id)}
                    deleteShowing={this.deleteShowing} editShowing={this.editShowing}/>}/>
                <Route
                    exact
                    path="/showing/edit/:id"
                    render={({match}) =>
                        <EditShowing showing={this.state.list[match.params.id]} index={parseInt(match.params.id)}
                                    editShowing={this.editShowing} showingList={this.state.list}/>}/>
            
            </Router>
        )
    }
}

export default ShowingList