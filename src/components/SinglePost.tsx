import React, { useState } from 'react'
import { useAddPost, usePosts } from '../hooks/useArticle';

const SinglePost = () => {
    const [ inputValue, setInputValue ] = useState('');
    const { data , error, loading } = usePosts();
    const addPost = useAddPost(inputValue);

    // useAxiosPrivate useEffect 踩雷
    // const { data , error } = usePosts();

    const updateInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setInputValue(event.currentTarget.value)
    }

    let renderElement;

    if(!data) {
        renderElement = <p>Loading</p>
    } else {
        renderElement = data.map((item) => ( <p key={item.id}>{item.title}</p>))
    }
    return (
        <div>
            <form>
                <input type="text" value={inputValue} onChange={updateInput}/>
                <button type='button' onClick={addPost}>123</button>
            </form>
            {renderElement}
        </div>
    )
}

export default SinglePost