import React from "react";
import { Link } from "react-router-dom";
import {Redirect} from "react-router";
import "../style.css";
import * as Api from "../api"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );


class MovieDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            movie: props.movie,
            index: props.index,
            redirect: false,
            showings: [],
            labels: [],
            data: {}
        }
        this.deleteMovie = this.deleteMovie.bind(this)
    }

    componentDidMount() {
        Api.getAllShowing().then(response => this.setState(state => {
                let list = response.data
                return {showings: list}
            }))
            .catch(error => console.log(error))
    }


    deleteMovie = () => {
        
        if (this.state.showings.filter(e => e.movie.title === this.state.movie.title).length > 0) {

            document.getElementById("alertBox").style.visibility = "visible"
            document.getElementById("alertBox").innerHTML = "Nie mozna usunac filmu, bo znajduja sie seanse z tym filmem"
        }
        else {

            document.getElementById("alertBox").style.visibility = "hidden"
            let func = this.props.deleteMovie
            func(this.state.index)
        
            this.setState({redirect:true})
        }
        
        
    }

    render() {

        if (this.state.redirect) {
            return <Redirect to="/movie"/>
        }

        let data = {labels: [], datasets: [{
            label: 'ilość sprzedanych blietów',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: []
        }]}
        let sameDay = new Map();
        let films = this.state.showings.filter(e => e.movie.title === this.state.movie.title);
        films.forEach(e => {
            let day = e.date.substring(8, 10);
            let month = e.date.substring(5, 7);
            let year = e.date.substring(0, 4);
            if(!sameDay.get(year+"-"+month+"-"+day)) {
                sameDay.set(year+"-"+month+"-"+day, parseInt(e.takenSeats.length))
            } else {
                sameDay.set(year+"-"+month+"-"+day, parseInt(sameDay.get(year+"-"+month+"-"+day)) + parseInt(e.takenSeats.length))
            }
        })

        for(let [key, value] of sameDay) {
            data.labels.push(key);
            data.datasets[0].data.push(value)
        }

        sameDay.forEach(e=> {
            
        }) 

        let options = {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Popularność',
              },
            },
          };

        return (
            <div>
                <div class="singleLayout paddingTop">
                    <div class="card center">
                        <div class="card-body">
                            <h5 class="card-title">{this.state.movie.title}</h5>
                            <p>Czas trwania: {this.state.movie.duration} min</p>
                            <Link to={"/movie/edit/" + parseInt(this.state.index)}>
                            <button class="btn btn-outline-warning marginRight">Edytuj</button>
                            </Link>
                            <button class="btn btn-outline-danger" onClick={this.deleteMovie}>Usun</button>
                        </div>
                    </div>
                </div>
                <div id="alertBox" class="alert alert-danger" role="alert">
                    Wprowadź poprawne dane!
                </div>
                <div class="chartsStyle paddingTop">
                    <Bar
                        data={data}
                        width={100}
                        height={50}
                        options={options}
                    />
                </div>
            </div>
        )
    }
}

export default MovieDetails