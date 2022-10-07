import React, { useEffect, useState } from 'react'
import { axiosPrivate } from '../utils/axios';

const SinglePostWithoutSWR = () => {
    const [ posts, setPosts] = useState<[]>();
    const [ error, setError] = useState(false);

    useEffect(() => {
        const loadPost = async () => {
            const res = await axiosPrivate.get('article');
            setPosts(res.data)
        }
        loadPost()
    }, [])

    if(!posts && !error) return <p>Loading</p>
    return (
        <div>
            {posts?.map((item: any) => <p key={item.id}>{item.title}</p>)}
        </div>
    )
}

export default SinglePostWithoutSWR