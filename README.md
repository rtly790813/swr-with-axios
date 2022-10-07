# Introducation
React with swr & axios 測試 + 部分筆記
畫面很隨意，主要是測試項目
1. 登入後取資料都要在 request headers 加上 token 才 call api，兩種方式
    - 一種是透過將 useSWR 額外裝成 function，呼叫 api 把 token 加進 axios 的 fetcher
    - 另外一種是透過將將 axios 裝成 hooks 在裡面加入 interceptor + useLayoutEffect，在 useSWR 呼叫 axiosPrivete 時， intercpetor 會執行加入 token
2. 測試元件有無 SWR 的差異

# File Structure
root/  
├─── README.md  
├─── .gitignore  
├─── package.json  
├─── index.html               程式進入點  
└─── src/  
    ├─── components/         
    │   │    Post.tsx  
    │   │    PostWithoutSWR.tsx  
    │─── context/   
    │   │    AuthProvider.tsx  
    │─── hooks/    
    │   │    useArticle.ts    個功能呼叫 Api 的 hook，主要提供給 Post.tsx 使用，依賴 useSWRPrivate.ts  
    │   │    useAuth.ts  
    │   │    useSWRPrivate.ts 測試兩種加入 token 的方式  
    │─── pages/     
    │   │    index.tsx        裝入 Post.tsx & PostWithoutSWR.tsx  
    │   │    Login.tsx  
    │─── utils/    
    │   │    axios.tsx  
    │─── App.css  
    │─── App.tsx  
    │─── main.tsx  
    │─── routes.tsx  
    │─── ...  
