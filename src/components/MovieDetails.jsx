import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { asyncloadmovie } from '../store/actions/movieActions';
import { removemovie } from '../store/reducers/movieSlice';
import { data } from 'autoprefixer';
import Loading from './Loading';

const MovieDetails = () => {

    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const { info } = useSelector((state) => state.movie);
    const dispatch = useDispatch();
    console.log(data)
    useEffect(() => {
        dispatch(asyncloadmovie(id))
        return () => {
            dispatch(removemovie());
        }
    }, [id]);

    return info ? (
        <div
            style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.5), rgba(0,0,0,.8)),
                url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
            }}
            className='w-screen h-[140vh] px-[10%]'
        >
            {/* Part 1 Navigation */}
            <nav className='w-full h-[10vh] text-zinc-100 flex items-center gap-10 text-xl'>
                <Link
                    onClick={() => navigate(-1)}
                    className='hover:text-[#6565CD] ri-arrow-left-line'
                ></Link>
                <a
                    target='_blank'
                    href={info.detail.homepage}>
                    <i className='ri-external-link-fill'></i>
                </a>
                <a
                    target='_blank'
                    href={`https:/www.wikidata.org/wiki/${info.externalid.wikidata_id}`}>
                    <i className='ri-earth-fill'></i>
                </a>
                <a
                    target='_blank'
                    href={`https:/www.imdb.com/title/${info.externalid.imdb_id}`}>
                    IMDB
                </a>
            </nav>

            {/* Part 2 Poster and details */}
            <div className='w-full flex '>
                <img className='shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[60vh] object-cover'
                    src={`https://image.tmdb.org/t/p/original/${info.detail.poster_path || info.detail.background_path}`} alt="" />

                <div className='content ml-[5%] text-white'>

                    <h1 className='text-5xl font-black  '>
                        {info.detail.name || info.detail.title || info.detail.original_name || info.detail.original_title}
                        <small className='text-xl font-bold text-zinc-200 '>
                            ({info.detail.release_date.split("-")[0]})
                        </small>
                    </h1>

                    <div className='mt-3 mb-5 flex items-center gap-x-3'>
                        <span className='rounded-full text-xl font-medium bg-yellow-600 text-white w-[5vh] h-[5vh] flex justify-center items-center '>
                            {(info.detail.vote_average * 10).toFixed()} <sup>%</sup>
                        </span>
                        <h1 className='w-[60px] font-semibold text-2xl leading-6 '>User Score</h1>
                        <h1>{info.detail.release_date}</h1>
                        <h1>{info.detail.genres.map((g) => g.name).join(",")}</h1>
                        <h1>{info.detail.runtime} min</h1>
                    </div>

                    <h1 className='text-xl font-semibold italic text-zinc-200 '>
                        {info.detail.tagline}
                    </h1>

                    <h1 className='text-2xl mb-3 mt-5'>Overview</h1>
                    <p>{info.detail.overview}</p>

                    <h1 className='text-2xl mb-3 mt-5'>Movie Translation Language</h1>
                    <p className='mb-10'>{info.translations.join(", ")}</p>

                    <Link
                        className='p-2 bg-[#6565CD] rounded-lg '
                        to={`${pathname}/trailer`}>
                        <i className='text-xl ri-play-fill mr-3 '></i>
                        Play Trailer
                    </Link>
                </div>
            </div>

            {/* Part 3 Available on platform */}
            <div className='w-[80%] flex flex-col gap-y-5 mt-10 '>
                {info.watchproviders && info.watchproviders.flatrate &&
                    <div className=' flex gap-x-10 items-center text-white'>
                        <h1>Available on Platform</h1>
                        {info.watchproviders.flatrate.map((w) => (
                            <img
                                title={w.provider_name}
                                className='w-[5vh] h-[5vh] object-cover rounded-md'
                                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`} alt=""
                            />
                        ))}
                    </div>
                }

                {info.watchproviders && info.watchproviders.rent &&
                    <div className=' flex gap-x-10 items-center text-white'>
                        <h1>Available on Rent</h1>
                        {info.watchproviders.rent.map((w) => (
                            <img
                                title={w.provider_name}
                                className='w-[5vh] h-[5vh] object-cover rounded-md'
                                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`} alt=""
                            />
                        ))}
                    </div>
                }

                {info.watchproviders && info.watchproviders.buy &&
                    <div className=' flex gap-x-10 items-center text-white'>
                        <h1>Available to Buy</h1>
                        {info.watchproviders.buy.map((w) => (
                            <img
                                title={w.provider_name}
                                className='w-[5vh] h-[5vh] object-cover rounded-md'
                                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`} alt=""
                            />
                        ))}
                    </div>
                }
            </div>

            {/* Part 4 Recommendations and similarity */}
            <div>

            </div>
        </div>
    ) : <Loading />
}

export default MovieDetails