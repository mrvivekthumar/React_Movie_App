import React from 'react'
import { Link } from 'react-router-dom'
import no_image from "./no_image.jpeg"


const Cards = ({ data, title }) => {
    return (
        <div className='flex flex-wrap w-full h-full px-[5%] bg-[#1F1E24] '>
            {
                data.map((c, i) => (
                    <Link key={i}
                        to={`/${c.media_type || title}/details/${c.id}`}
                        className='relative w-[25vh] mr-[5%] mb-[5%] '
                    >
                        <img
                            className='shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[40vh] object-cover'
                            src={c.poster_path || c.background_path || c.profile_path ? `https://image.tmdb.org/t/p/original/${c.poster_path || c.background_path || c.profile_path}` : no_image} alt="" />
                        <h1 className='text-xl text-zinc-300 mt-3 font-medium'>
                            {c.name || c.title || c.original_name || c.original_title}
                        </h1>

                        {
                            c.vote_average && (
                                <div className='absolute right-[-9%] bottom-[30%] rounded-full text-xl font-medium bg-yellow-600 text-white w-[5vh] h-[5vh] flex justify-center items-center '>
                                    {(c.vote_average * 10).toFixed()} <sup>%</sup>
                                </div>
                            )
                        }

                    </Link>
                ))
            }
        </div>
    )
}

export default Cards