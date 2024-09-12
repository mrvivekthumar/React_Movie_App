import React, { useEffect, useState } from 'react'
import Sidenav from './partials/Sidenav'
import Topnav from './partials/Topnav'
import axios from '../utils/axios'
import { Header } from './partials/Header'

const Home = () => {
    document.title = "Home Page"

    const [wallpaper, setWallpaper] = useState(null);


    const GetHeaderWallpaper = async () => {
        try {
            const { data } = await axios.get(`/trending/all/day`);
            console.log(data);
            let randomdata = data.results[(Math.random() * data.results.length).toFixed()];
            setWallpaper(randomdata);
        } catch (error) {
            console.log("Error : ", error);
        }
    }

    useEffect(() => {
        !wallpaper && GetHeaderWallpaper();
    }, []);



    return wallpaper ? (
        <>
            <Sidenav />
            <div className='w-[80%] h-full'>
                <Topnav />
                <Header data={wallpaper} />
            </div>
        </>
    ) : <h1>Loading..</h1>
}

export default Home