import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNDJkYWYyYWI1MmFlNWRkYjFmZTM3N2MxYWMxYTkwNSIsIm5iZiI6MTcyNjE0MTM0My4wNzIyODQsInN1YiI6IjY2ZTFlYTZmMTYyNGJmYTQ4YzdiNjU1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ECGr82HHJ6UszpcCXT3geKficpLFJ5KcipvHRGgevWI'
    }
});

export default instance;