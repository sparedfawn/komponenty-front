import "../style.css";

const Movie = (props) => {

    return (
        <div class="layout padding">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{props.title}</h5>
                    <p>Czas trwania: {props.duration} min</p>
                </div>
            </div> 
        </div>
    )
}

export default Movie