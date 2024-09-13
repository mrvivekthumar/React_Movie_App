import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Topnav from './partials/Topnav';
import Dropdown from './partials/Dropdown';
import axios from '../utils/axios';
import Loading from './Loading';
import Cards from './partials/Cards';

const Trending = () => {

    const navigate = useNavigate();

    const [category, setCategory] = useState("all");
    const [duration, setDuration] = useState("day");
    const [trending, setTrending] = useState([]);

    const GetTrending = async () => {
        try {
            const { data } = await axios.get(`/trending/${category}/${duration}`);
            setTrending(data.results);
        } catch (error) {
            console.log("Error : ", error);
        }
    }




    useEffect(() => {
        GetTrending();
    }, [category, duration]);

    return trending.length > 0 ? (
        <div className='px-[3%] w-screen h-screen overflow-hidden overflow-y-auto'>
            <div className='w-full flex items-center justify-between '>
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
            <Cards data={trending} title={category} />
        </div>
    ) : (
        <Loading />
    )
}

export default Trending