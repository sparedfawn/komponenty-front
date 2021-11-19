const Movie = (props) => {

    return (
        <div>
            <p>Tytul: {props.title}; Czas trwania: {props.duration} min</p>
        </div>
    )
}

export default Movie