import axiosInstance from '../../utils/axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Topnav = () => {
    const [query, setQuery] = useState("");
    const [searches, setSearches] = useState([]);

    const GetSearches = async () => {
        try {
            const response = await axiosInstance.get(`/search/multi`, {
                params: {
                    query: query,
                },
            });

            if (response.data && response.data.results) {
                setSearches(response.data.results);
            } else {
                setSearches([]);
            }
        } catch (error) {
            console.log("Error : ", error);
            setSearches([]);
        }
    };

    useEffect(() => {
        if (query.length > 0) {
            GetSearches();
        } else {
            setSearches([]);
        }
    }, [query]);

    return (
        <div className='w-[80%] h-[10vh] relative flex mx-auto items-center'>
            <i className='text-zinc-400 text-3xl ri-search-line'></i>
            <input
                type="text"
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                placeholder='Search Anything'
                className='w-[50%] text-zinc-200 mx-10 p-5 text-xl outline-none border-none bg-transparent'
            />
            {query.length > 0 && (
                <i onClick={() => setQuery("")} className='text-zinc-400 text-3xl ri-close-fill'></i>
            )}

            <div className='z-[100] absolute w-[50%] max-h-[50vh] bg-zinc-200 top-[90%] left-[6%] overflow-auto'>
                {
                    searches.map((s, i) => (
                        <Link
                            to={`/${s.media_type}/details/${s.id}`}
                            key={i}
                            className='hover:text-black hover:bg bg-zinc-300 duration-300 font-semibold text-zinc-600 w-[100%] p-10 flex justify-start items-center border-b-2 border-zinc-100'>
                            <img
                                className='w-[10vh] h-[10vh] object-cover rounded mr-5 shadow-lg'
                                src={s.backdrop_path || s.profile_path
                                    ? `https://image.tmdb.org/t/p/original/${s.backdrop_path || s.profile_path}`
                                    : 'no_image.jpeg'} alt=""
                            />
                            <span>
                                {s.name || s.title || s.original_name || s.original_title}
                            </span>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
};

export default Topnav;
