const Movie = (props) => {

    return (
        <div>
            <p>Tytul: {props.title}</p>
            <p>Czas trwania: {props.time} min</p>
        </div>
    )
}

export default Movie