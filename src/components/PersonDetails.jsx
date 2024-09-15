import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { asyncloadperson, removeperson } from '../store/actions/personActions';
import Loading from './Loading';
import Dropdown from './partials/Dropdown';
import HorizontalCards from './partials/HorizontalCards';

const PersonDetails = () => {

    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const { info } = useSelector((state) => state.person);
    const dispatch = useDispatch();
    const [category, setCategory] = useState("movie");

    useEffect(() => {
        dispatch(asyncloadperson(id));
        return () => {
            dispatch(removeperson());
        }
    }, [id]);

    return info ? (
        <div className='px-[10%] w-screen bg-[#1F1E24] h-[170vh]' >
            {/* Part 1 Navigation */}
            < nav className='w-full h-[10vh] text-zinc-100 flex items-center gap-10 text-xl' >
                <Link
                    onClick={() => navigate(-1)}
                    className='hover:text-[#6565CD] ri-arrow-left-line'
                ></Link>
            </nav >

            <div className='w-full flex'>
                {/* part 2 poster and his/her details */}
                <div className='w-[20%] '>
                    <img
                        className='shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[35vh] object-cover'
                        src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
                        alt=""
                    />
                    <hr className='mt-10 mb-5 border-none h-[2px] bg-zinc-500 ' />
                    {/* Social media links */}
                    <div className='text-2xl text-zinc-200 gap-x-5 flex '>
                        <a
                            target='_blank'
                            href={`https:/www.wikidata.org/wiki/${info.externalid.wikidata_id}`}>
                            <i className='ri-earth-fill'></i>
                        </a>
                        <a
                            target='_blank'
                            href={`https:/www.facebook.com/${info.externalid.facebook_id}`}>
                            <i className='ri-facebook-fill'></i>
                        </a>
                        <a
                            target='_blank'
                            href={`https:/www.instgram.com/${info.externalid.instgram_id}`}>
                            <i className='ri-earth-fill'></i>
                        </a>
                        <a
                            target='_blank'
                            href={`https:/www.twitter.com/${info.externalid.twitter_id}`}>
                            <i className='ri-twitter-x-fill'></i>
                        </a>

                    </div>
                    {/* personal information */}
                    <h1 className='text-2xl text-zinc-400 font-semibold my-5'>Person Info</h1>

                    <h1 className='text-lg text-zinc-400 font-semibold'>Known For</h1>
                    <h1 className='text-zinc-400'>{info.detail.known_for_department}</h1>

                    <h1 className='text-lg text-zinc-400 font-semibold mt-5 '>Gender</h1>
                    <h1 className='text-zinc-400'>{info.detail.gender === 2 ? "Male" : "Female"}</h1>

                    <h1 className='text-lg text-zinc-400 font-semibold mt-5 '>Birthday</h1>
                    <h1 className='text-zinc-400'>{info.detail.birthday}</h1>

                    <h1 className='text-lg text-zinc-400 font-semibold mt-5 '>Deathday</h1>
                    <h1 className='text-zinc-400'>{info.detail.deathday ? info.detail.deathday : "Fucking Alive"}</h1>

                    <h1 className='text-lg text-zinc-400 font-semibold mt-5 '>Place of Birthday</h1>
                    <h1 className='text-zinc-400'>{info.detail.place_of_birth}</h1>

                    <h1 className='text-lg text-zinc-400 font-semibold mt-5 '>Also Known As</h1>
                    <h1 className='text-zinc-400'>{info.detail.also_known_as.join(",")}</h1>
                </div>

                {/* part 3 right details and information */}
                <div className='w-[80%] ml-[5%] '>
                    <h1 className='text-5xl text-zinc-400 font-black my-5'>{info.detail.name}</h1>

                    <h1 className='text-lg text-zinc-400 font-semibold'>Biography</h1>
                    <p className='text-zinc-400 '>{info.detail.biography}</p>

                    <h1 className='mt-5 text-zinc-400 text-lg font-semibold'>Work</h1>
                    <HorizontalCards data={info.combinedCredits.cast} />

                    <div className='w-full flex justify-between '>
                        <h1 className='mt-5 text-zinc-400 text-xl font-semibold'>Acting</h1>
                        <Dropdown title="Category" options={["tv", "movie"]} func={(e) => setCategory(e.target.value)} />
                    </div>
                    <div className='list-disc text-zinc-400 w-full h-[50vh] mt-5 overflow-x-hidden overflow-y-auto shadow-xl shadow-[rgba(255,255,255,.3)] border-2 border-zinc-700 p-5 '>
                        {
                            info[category + "Credits"].cast.map((c, i) => (
                                <li key={i} className='hover:text-white p-5 rounded hover:bg-[#19191d] duration-300 cursor-pointer  '>
                                    <Link to={`/${category}/details/${c.id}`} className=' '>
                                        <span>
                                            {
                                                c.name || c.title || c.original_name || c.original_title
                                            }
                                        </span>
                                        <span className='block ml-5 mt-2 '>
                                            {
                                                c.character && `Charater Name : ${c.character}`
                                            }
                                        </span>
                                    </Link>
                                </li>
                            ))
                        }
                    </div>

                </div>
            </div>

        </div >
    ) : (<Loading />)
}

export default PersonDetails