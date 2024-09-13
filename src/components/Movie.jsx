import axios from '../utils/axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Topnav from './partials/Topnav';
import Dropdown from './partials/Dropdown';
import InfiniteScroll from 'react-infinite-scroll-component';

const Movie = () => {

    document.title = "Movie | Movies ";

    const navigate = useNavigate();

    const [category, setCategory] = useState("movie");
    const [movie, setMovie] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);


    const GetMovie = async () => {
        try {
            const { data } = await axios.get(`${category}/movie?page=${page}`);
            console.log(data);

            if (data.results.length > 0) {
                setMovie((prevState) => [...prevState, ...data.results]);
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
        if (movie.length === 0) {
            GetMovie();
        } else {
            setPage(1);
            setMovie([]);
            GetMovie();
        }
    }

    useEffect(() => {
        refreshHandler();
    }, [category]);



    return movie.length > 0 ? (
        <div className='w-screen h-screen'>
            <div className='px-[5%]  w-full flex items-center justify-between '>
                <h1 className='text-2xl font-semibold text-zinc-400'>
                    <i onClick={() => navigate(-1)} className=" hover:text-[#6565CD] ri-arrow-left-line"></i>{" "}
                    Movie
                </h1>

                <div className='flex items-center w-[80%]'>
                    <Topnav />
                    <Dropdown
                        title="category"
                        options={["movie", "tv"]}
                        func={(e) => setCategory(e.target.value)}
                    />
                </div>
            </div>

            <InfiniteScroll
                dataLength={movie.length}
                next={GetMovie}
                hasMore={hasMore}
                loader={<h1>Loading...</h1>}
            >
                <Cards data={movie} title={category} />
            </InfiniteScroll>
        </div>
    ) : (
        <Loading />
    )
}

export default Movie