import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import Loading from './Loading';
import Cards from './partials/Cards';
import Dropdown from './partials/Dropdown';
import Topnav from './partials/Topnav';

const Trending = () => {

    const navigate = useNavigate();

    const [category, setCategory] = useState("all");
    const [duration, setDuration] = useState("day");
    const [trending, setTrending] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);


    const GetTrending = async () => {
        try {
            const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);

            if (data.results.length > 0) {
                setTrending((prevState) => [...prevState, ...data.results]);
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
        if (trending.length === 0) {
            GetTrending();
        } else {
            setPage(1);
            setTrending([]);
            GetTrending();
        }
    }

    useEffect(() => {
        refreshHandler();
    }, [category, duration]);

    return trending.length > 0 ? (
        <div className='w-screen h-screen'>
            <div className='px-[5%]  w-full flex items-center justify-between '>
                <h1 className='text-2xl font-semibold text-zinc-400'>
                    <i onClick={() => navigate(-1)} className=" hover:text-[#6565CD] ri-arrow-left-line"></i>{" "}
                    Trending
                </h1>

                <div className='flex items-center w-[80%]'>
                    <Topnav />
                    <Dropdown
                        title="category"
                        options={["movie", "tv", "all"]}
                        func={(e) => setCategory(e.target.value)}
                    />
                    <div className='w-[2%] '></div>
                    <Dropdown
                        title="Duration"
                        options={["week", "day"]}
                        func={(e) => setDuration(e.target.value)}
                    />
                </div>
            </div>

            <InfiniteScroll
                dataLength={trending.length}
                next={GetTrending}
                hasMore={hasMore}
                loader={<h1>Loading...</h1>}
            >
                <Cards data={trending} title={category} />
            </InfiniteScroll>




        </div>
    ) : (
        <Loading />
    )
}

export default Trending