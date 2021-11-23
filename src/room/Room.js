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
    )
}

export default Room