import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import Loading from './Loading';
import Cards from './partials/Cards';
import Topnav from './partials/Topnav';


const People = () => {
    document.title = "Movie | Person";
    const navigate = useNavigate();
    const [category, setCategory] = useState("popular");
    const [person, setperson] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const GetPerson = async () => {
        try {
            const { data } = await axios.get(`/person/${category}?page=${page}`);
            console.log("Peopel Detail : ", data);

            if (data.results.length > 0) {
                setperson((prevState) => [...prevState, ...data.results]);
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
        if (person.length === 0) {
            GetPerson();
        } else {
            setPage(1);
            setperson([]);
            GetPerson();
        }
    }

    useEffect(() => {
        refreshHandler();
    }, [category]);

    return person.length > 0 ? (
        <div className='w-screen h-screen'>
            <div className='px-[5%]  w-full flex items-center justify-between '>
                <h1 className='text-2xl font-semibold text-zinc-400'>
                    <i onClick={() => navigate(-1)} className=" hover:text-[#6565CD] ri-arrow-left-line"></i>{" "}
                    People
                </h1>

                <div className='flex items-center w-[80%]'>
                    <Topnav />
                </div>
            </div>

            <InfiniteScroll
                dataLength={person.length}
                next={GetPerson}
                hasMore={hasMore}
                loader={<h1>Loading...</h1>}
            >
                <Cards data={person} title="person" />
            </InfiniteScroll>
        </div>
    ) : (
        <Loading />
    )
}

export default People;