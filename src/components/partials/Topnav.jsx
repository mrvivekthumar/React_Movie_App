import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Topnav = () => {
    const [query, setQuery] = useState();


    return (
        <div className='w-full h-[10vh] relative flex justify-center items-center'>
            <i class='text-zinc-400 text-3xl ri-search-line'></i>
            <input type="text"
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Search Anything'
                className='w-[50%] text-zinc-200 mx-10 p-5 text-xl outline-none border-none bg-transparent'
            />
            <i class='text-zinc-400 text-3xl ri-close-fill'></i>

            <div className='absolute w-[50%] h-[50vh] top-[95%] overflow-auto'>
                <Link className='hover:text-black hover:bg bg-zinc-300 duration-300 font-semibold text-zinc-600 w-[100%] p-10 flex justify-center items-center border-b-2 border-zinc-100'>
                    <img src="" alt="" />
                    <span>hello</span>
                </Link>
                <Link className='hover:text-black hover:bg bg-zinc-300 duration-300 font-semibold text-zinc-600 w-[100%] p-10 flex justify-center items-center border-b-2 border-zinc-100'>
                    <img src="" alt="" />
                    <span>hello</span>
                </Link>
                <Link className='hover:text-black hover:bg bg-zinc-300 duration-300 font-semibold text-zinc-600 w-[100%] p-10 flex justify-center items-center border-b-2 border-zinc-100'>
                    <img src="" alt="" />
                    <span>hello</span>
                </Link>
                <Link className='hover:text-black hover:bg bg-zinc-300 duration-300 font-semibold text-zinc-600 w-[100%] p-10 flex justify-center items-center border-b-2 border-zinc-100'>
                    <img src="" alt="" />
                    <span>hello</span>
                </Link>
                <Link className='hover:text-black hover:bg bg-zinc-300 duration-300 font-semibold text-zinc-600 w-[100%] p-10 flex justify-center items-center border-b-2 border-zinc-100'>
                    <img src="" alt="" />
                    <span>hello</span>
                </Link>
                <Link className='hover:text-black hover:bg bg-zinc-300 duration-300 font-semibold text-zinc-600 w-[100%] p-10 flex justify-center items-center border-b-2 border-zinc-100'>
                    <img src="" alt="" />
                    <span>hello</span>
                </Link>

            </div>
        </div>
    )
}

export default Topnav