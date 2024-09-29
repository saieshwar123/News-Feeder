// import React, { useState } from 'react'
// import NewsItem from './NewsItem'
// import Spinner from './Spinner'

// import { useEffect } from 'react';
// import InfiniteScroll from "react-infinite-scroll-component";

// const News =(props)=> {

//  const  capitalizeFirstLetter =(word)=>{
//          return word.charAt(0).toUpperCase()+word.slice(1);
//  }
 

//  const[articles,setArticles]=useState([]);
//  const[loading,setloading]=useState(false);
//  const[page,setPage]=useState(1);
//  const[totalresults,settotalresults]=useState(0);
  
// useEffect(()=>{
//   document.title=capitalizeFirstLetter(props.category);
// },[props.category])
    
  
  
//    useEffect ( async ()=>
//   {
//     props.setProgress(0);
//     let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&PageSize=${props.pageSize}`
//     let data=await fetch(url);
//     setloading(true);
//     props.setProgress(30);
//     let parsedData=await data.json();
//     setArticles(parsedData.articles);
//     settotalresults(parsedData.totalresults);
//     setloading(false);
//     props.setProgress(100);

//    },[])

//   const togglePrevious=async ()=>{
    
//     let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&PageSize=${props.pageSize}&page=${page-1}`
//     let data=await fetch(url);
//     setloading(true);
//     let parsedData=await data.json();
//     setPage(page-1);
//     setArticles(parsedData.articles);
//     settotalresults(parsedData.totalresults);
//     setloading(false);

//   }
  
//  const  toggleNext= async ()=>{

//     let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&PageSize=${props.pageSize}&page=${page+1}`
//     let data=await fetch(url);
//     setloading(true);
//     let parsedData=await data.json();
//     setPage(page-1);
//     setArticles(parsedData.articles);
//     settotalresults(parsedData.totalresults);
//     setloading(false);
    

//   }

//   const fetchMoreData =async () => {
//     setPage(page+1);
//      let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&PageSize=${props.pageSize}`
//      let data=await fetch(url);
     
//      let parsedData=await data.json();
//      setArticles(articles.concat(parsedData.articles));
//     settotalresults(parsedData.totalresults);
    
//   };
 

//     return (
//       <>
      
//         <h2> NewsMonkey - { capitalizeFirstLetter(props.category)} Top Headlines</h2>
//         {loading && <Spinner/>}
//         <InfiniteScroll
//           dataLength={articles.length}
//           next={fetchMoreData}
//           hasMore={articles.length!==totalresults}
//           loader={<Spinner/>}
//         >
//         {/* <div className="container"> */}
//       {/*  */}
//       {/* </div> */}
//       <div className="container">
//         <div className="row">
//           {articles.map((element)=>{
//           return <div className="col-md-4" key={element.url}>
//         <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage?element.urlToImage:"https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Nexon/9661/Tata-Nexon-XZA-Plus-LUX-Dark-Edition-Diesel-AMT/1676016307889/front-left-side-47.jpg?imwidth=420&impolicy=resize"}  newsUrl={element.url} author={element.author} time={element.publishedAt} source={element.source.name}/>
//         </div>
//           })}
//         </div>
//         </div>
//         </InfiniteScroll>

        
        
       
//       </>
//     )
  
//       }
        
//       News.defaultProps={
//         country:'in',
//         pageSize:9,
//         category:'general'
//       }

// export default News


import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const capitalizeFirstLetter = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    useEffect(() => {
        document.title = capitalizeFirstLetter(props.category);
    }, [props.category]);

    const fetchNews = async (pageNumber = 1) => {
        setLoading(true);
        props.setProgress(0);
        const url=`https://newsapi.org/v2/everything?q=${props.category}&from=2024-08-29&sortBy=publishedAt&apiKey=d981295765d748cebe316896cab9da85&pageSize=${props.pageSize}&page=${pageNumber}`
        // const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d981295765d748cebe316896cab9da85&pageSize=${props.pageSize}&page=${pageNumber}`;

        try {
            console.log(url);
            const response = await fetch(url);
            const data = await response.json();

            setTotalResults(data.totalResults);
            setArticles((prevArticles) => [...prevArticles, ...data.articles]);
            setLoading(false);
            props.setProgress(100);    
        } catch (error) {
            console.error('Error fetching news:', error);
            setLoading(false);
            props.setProgress(100);
        }
    };

    useEffect(() => {
      
        fetchNews();
        // eslint-disable-next-line
    }, [props.category]); // Only fetch news once when component mounts

    const fetchMoreData = () => {
        const nextPage = page + 1;
        fetchNews(nextPage);
        setPage(nextPage);
    };

    return (
        <>
            <h2  style={{textAlign:'center',marginTop:'60px'}} >NewsMonkey - {capitalizeFirstLetter(props.category)} Top Headlines</h2>
            {loading && <Spinner />}

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length < totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element, index) => (
                            <div className="col-md-4" key={index}>
                                <NewsItem
                                    title={element.title || ''}
                                    description={element.description || ''}
                                    imageUrl={element.urlToImage || 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Nexon/9661/Tata-Nexon-XZA-Plus-LUX-Dark-Edition-Diesel-AMT/1676016307889/front-left-side-47.jpg?imwidth=420&impolicy=resize'}
                                    newsUrl={element.url}
                                    author={element.author}
                                    time={element.publishedAt}
                                    source={element.source.name}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    );
};

News.defaultProps = {
    country: 'in',
    pageSize: 9,
    category: 'general'
};

export default News;
