import React from 'react';
import SinglePost from '../components/SinglePost';
import SinglePostWithoutSWR from '../components/SinglePostWithoutSWR';



const Index: React.FC = () => {
    return (
        <div style={{display: 'flex'}}>
            <SinglePost />
            {/* <SinglePostWithoutSWR /> */}
        </div>
    )
}

export default Index
