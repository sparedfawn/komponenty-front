import PropTypes from "prop-types";

const Room = (props) => {
    return (
        <div class="layout padding">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Sala {props.num}</h5>
                    <p>Pojemnosc: {props.capacity}</p>
                </div>
            </div>
        </div>
    );
};

Room.propTypes = {
    num: PropTypes.number.isRequired,
    capacity: PropTypes.number.isRequired,
};

export default Room;
