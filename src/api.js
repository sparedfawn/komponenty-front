import axios from "axios"



// MOVIE

export const addMovie = (movie) => {
    return axios.post('http://localhost:7777/movies',
        movie, {
        headers: {
            'Content-type': 'application/json'
        }
    }).then(response => {
        if (response.status === 200) {
            return response
        }
    }).catch((error) => {
        return error;
    })
}

export const getMovies = () => {
    return axios.get('http://localhost:7777/movies').then(response => {
        if (response.status === 200) {
            return response
        }
    }).catch((error) => {
        return error;
    })
}

export const editMovie = (element, id) => {
    return axios.put('http://localhost:7777/movies/' + id,
        element, {
        headers: {
            'Content-type': 'application/json'
        }
    }).then(response => {
        if (response.status === 200) {
            return response
        }
    }).catch((error) => {
        return error;
    })
}

export const deleteMovie = (id) => {
    return axios.delete('http://localhost:7777/movies/' + id
    ).then(response => {
        if (response.status === 200) {
            return response
        }
    }).catch((error) => {
        return error;
    })
}

// ROOM

export const getAllRoom = () => {
    return axios.get('http://localhost:7777/rooms').then(response => {
        if (response.status === 200) {
            return response
        }
    }).catch((error) => {
        return error;
    })
}

// SHOWING

export const getAllShowing = () => {
    return axios.get('http://localhost:7777/showings').then(response => {
        if (response.status === 200) {
            return response
        }
    }).catch((error) => {
        return error;
    })
}

export const addShowing = (element) => {
    return axios.post('http://localhost:7777/showings',
        element, {
        headers: {
            'Content-type': 'application/json'
        }
    }).then(response => {
        if (response.status === 200) {
            return response
        }
    }).catch((error) => {
        return error;
    })
}

export const editShowing = (element, index) =>{
    return axios.put('http://localhost:7777/showings/' + index,
    element, {
    headers: {
            'Content-type': 'application/json'
        }
    }).then(response => {
        if (response.status === 200) {
            return response
        }
    }).catch((error) => {
        return error;
    })
}


export const deleteShowing = (index) =>{
    return axios.delete('http://localhost:7777/showings/' + index
    ).then(response => {
        if (response.status === 200) {
            return response
        }
    }).catch((error) => {
        return error;
    })
} 
