import React from 'react';
import ReactPlayer from 'react-player';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import NotFound from '../NotFound';
import { useSelector } from 'react-redux';

const Trailer = () => {

    const navigate = useNavigate();
    const { pathname } = useLocation();
    const category = pathname.includes("movie") ? "movie" : "tv";
    const ytVideo = useSelector((state) => state[category].info.videos);
    console.log("ytvideos : ", ytVideo)


    return (
        <div className='bg-[rgba(0,0,0,.9)] absolute z-[100] top-0 left-0 w-screen h-screen flex items-center justify-center '>
            <Link
                onClick={() => navigate(-1)}
                className='absolute hover:text-[#6565CD] ri-close-fill text-3xl text-white right-[5%] top-[5%] '
            ></Link>
            {ytVideo && ytVideo.key ? (
                <ReactPlayer
                    height={800}
                    width={1500}
                    url={`https://www.youtube.com/embed/${ytVideo.key}`}
                />
            ) : <NotFound />}
        </div>
    )
}

export default Trailer