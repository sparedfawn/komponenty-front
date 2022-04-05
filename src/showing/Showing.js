import React from "react";
import "../style.css";
import PropTypes, { number } from "prop-types";

const Showing = (props) => {
    return (
        <div class="layout padding">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{props.movie.title}</h5>
                    <h6 class="card-title">
                        {props.date.substr(0, props.date.indexOf("T"))}
                    </h6>
                    <p class="center">Sala: {props.room.number}</p>
                    <p class="center">
                        Godzina:{" "}
                        {props.date.substr(
                            props.date.indexOf("T") + 1,
                            props.date.length
                        )}
                    </p>
                    <p class="center">Cena biletu: {props.ticketPrice} zl</p>
                    <p class="center">
                        Pozostałych miejsc:{" "}
                        {parseInt(props.room.capacity) -
                            props.takenSeats.length}
                    </p>
                </div>
            </div>
        </div>
    );
};

Showing.propTypes = {
    date: PropTypes.string.isRequired,
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
    }).isRequired,
    room: PropTypes.shape({
        number: PropTypes.number.isRequired,
        capacity: PropTypes.number.isRequired,
    }).isRequired,
    takenSeats: PropTypes.arrayOf(number).isRequired,
};

export default Showing;
