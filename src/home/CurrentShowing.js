import React from "react";
import Showing from "../showing/Showing";
import * as Api from "../api";

class CurrentShowing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
        };
    }

    componentDidMount() {
        Api.getAllShowing()
            .then((response) =>
                this.setState((state) => {
                    const list = response.data;
                    return { list: list };
                })
            )
            .catch((error) => console.log(error));
    }

    render() {
        const currentDate = new Date();
        const list = this.state.list
            .filter((e) => {
                const date = new Date(e.date);
                return (
                    date.getTime() <= currentDate.getTime() &&
                    date.getTime() + e.movie.duration * 60000 >=
                        currentDate.getTime()
                );
            })
            .map((e) => (
                <div>
                    <Showing
                        date={e.date}
                        movie={e.movie}
                        room={e.room}
                        takenSeats={e.takenSeats}
                    />
                </div>
            ));

        return (
            <div>
                <div className="padding">
                    {this.state.list.length === 0 && (
                        <div class="alertLayout center">
                            <div class="alert alert-secondary" role="alert">
                                Brak seansów trwajacych aktualnie
                            </div>
                        </div>
                    )}
                    {list}
                </div>
            </div>
        );
    }
}

export default CurrentShowing;
