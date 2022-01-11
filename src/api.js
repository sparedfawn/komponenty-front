import axios from "axios"



// MOVIE

export const addMovie = (movie) => {
    return axios.post('http://localhost:7777/movie/add',
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
    return axios.get('http://localhost:7777/movie/all').then(response => {
        if (response.status === 200) {
            return response
        }
    }).catch((error) => {
        return error;
    })
}

export const editMovie = (element, id) => {
    return axios.put('http://localhost:7777/movie/edit/' + id,
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
    return axios.delete('http://localhost:7777/movie/delete/' + id
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
    return axios.get('http://localhost:7777/room/all').then(response => {
        if (response.status === 200) {
            return response
        }
    }).catch((error) => {
        return error;
    })
}

// SHOWING

export const getAllShowing = () => {
    return axios.get('http://localhost:7777/showing/all').then(response => {
        if (response.status === 200) {
            return response
        }
    }).catch((error) => {
        return error;
    })
}

export const addShowing = (element) => {
    return axios.post('http://localhost:7777/showing/add',
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
    return axios.put('http://localhost:7777/showing/edit/' + index,
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
    return axios.delete('http://localhost:7777/showing/delete/' + index
    ).then(response => {
        if (response.status === 200) {
            return response
        }
    }).catch((error) => {
        return error;
    })
} 
