import React from 'react'
import { Link } from 'react-router-dom'

const Cards = ({ data, title }) => {
    return (
        <div className='flex flex-wrap w-full '>
            {
                data.map((c, i) => (
                    <Link key={i}
                        className='w-[25vh] mr-[5%] mb-[5%] '
                    >
                        <img
                            className='shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[40vh] object-cover '
                            src={`https://image.tmdb.org/t/p/original/${c.poster_path || c.background_path}`} alt="" />
                        <h1 className='text-xl text-zinc-300 mt-3 font-medium'>
                            {c.name || c.title || c.original_name || c.original_title}
                        </h1>
                    </Link>
                ))
            }
        </div>
    )
}

export default Cards