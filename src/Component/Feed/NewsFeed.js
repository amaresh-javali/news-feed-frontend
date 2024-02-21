import axios from 'axios'
import React, { useEffect, useState } from 'react'
import News from './News';

const NewsFeed = () => {
    const [feed, setFeed] = useState([])
    const [categoryId, setCategoryId] = useState()

    const setCategory=(id)=>{
        setCategoryId(id)
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            (async () => {
                try {
                    const getFeed = await axios.get(`http://localhost:3030/api/feeds/${categoryId}`, {
                        headers: {
                            Authorization: localStorage.getItem('token')
                        }
                    });
                    setFeed(getFeed.data)
                } catch (error) {
                    console.error('Error fetching feed:', error);
                }
            })();
        }
    }, [categoryId]);
    return (
        <div>
            
            <News feed={feed} setCategory={setCategory} categoryId={categoryId}/>
        </div>
    )
}

export default NewsFeed