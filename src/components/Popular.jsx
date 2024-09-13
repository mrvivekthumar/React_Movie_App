import axios from '../utils/axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Popular = () => {

    const navigate = useNavigate();

    const [category, setCategory] = useState("all");
    const [popular, setPopular] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);


    const GetPopular = async () => {
        try {
            const { data } = await axios.get(`/popular/${category}/${duration}?page=${page}`);

            if (data.results.length > 0) {
                setPopular((prevState) => [...prevState, ...data.results]);
                setPage(page + 1);
            } else {
                setHasMore(false);
            }
            console.log(data.results);
        } catch (error) {
            console.log("Error : ", error);
        }
    }

    const refreshHandler = () => {
        if (popular.length === 0) {
            GetPopular();
        } else {
            setPage(1);
            setPopular([]);
            GetPopular();
        }
    }

    useEffect(() => {
        refreshHandler();
    }, [category, duration]);

    return (
        <div>

        </div>
    )
}

export default Popular