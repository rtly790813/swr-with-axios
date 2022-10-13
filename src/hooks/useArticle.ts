import { User } from './../context/AuthProvider';
import useSWR, { useSWRConfig } from 'swr';
import useSWRPrivate from './useSWRPrivate';
// import useAxiosPrivate from './useSWRPrivate';
import { axiosPrivate } from '../utils/axios';

export interface Article {
    id: string;
    title: string;
}

// 第一種方式
const usePosts = () => {
    return useSWRPrivate<Article[]>({
        key: 'article', 
        postData: { title: '123'},
        options: {
            onError: () => {
                console.log('custom error')
            },
            axiosConfig: {
                headers: {'Content-Type': 'XMLHttpRequest'}
            }
        }
    });
}

const useAddPost = (value: string) => {
    // const { mutate } = useSWRConfig()
    const { mutate } = useSWRPrivate<Article[]>({key:'article'});
    // mutate 
    // 他的更新是樂觀更新，預期更新一定是可以 200 的
    // 第一個參數為 key，他的 key 要與原本要 show 在 list 上的 key 是相同的，才會去更新對應 cache，但如果 mutate 是透過 useSWR 已指定 key，就不需要再設定
    // 第二個則是要 return 更新的內容，且更新必須為 immutable，如果是要新刪修也必須在這個 function 中執行
    // 第三個參數則是 default 為 ture，表示每一次 function 執行完之後，會再去 get api 並跟 cache 做比對，如果不一樣或失敗就會把 cache 換成 api 回來的內容，也可以設定為 false，function 執行完之後就不會再去 call api 做比對
    return () => mutate(async (data: Article[]) => {
        try {
            // 這邊執行 call api 做新刪修改
            const res = await axiosPrivate.post('article', { title: value})
            return [...data, { title: value}]
            // return [...data, { title: value, id: 999}]
        } catch (error) {
            console.log(error)
        }
    })
}

// ================================================================
// 第二種方式
// useAxiosPrivate 第一次 render 會抓不到 token，因為 useEffect 執行順序問題
// 點擊 login => 進入 post 頁面 => 觸發 usePosts() => 觸發 useAxiosPrivate() => useAxiosPrivate return axiosPrivate => useSWR do it => useAxiosPrivate useEffect do it => interceptor 建立
// 因此改用 useLayoutEffect
// const usePosts = () => {
//     const axiosPrivate = useAxiosPrivate();
//     return useSWR('article', (path) => {
//         console.log('非同步觸發')
//         return axiosPrivate.get(path).then(res => res.data)
//     });
// }

// const useAddPost = (value: string) => {
//     const axiosPrivate = useAxiosPrivate();
//     const { mutate } = useSWRConfig();

//     return () => mutate('article',async (data: any) => {
//         try {
//             const res = await axiosPrivate.post('article', { title: value})
//             return [...data, { title: value}]
//         } catch (error) {
//             console.log(error)
//         }
//     })
// }
    

export { usePosts, useAddPost }
