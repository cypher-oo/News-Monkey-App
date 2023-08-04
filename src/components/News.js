import React, {useEffect, useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

//converting to react hook as a fn based component first need to remove this export line

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, settotalResults] = useState(0);

  //capitalize the url for
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  // constructor(props){
  //   super(props);
  //   console.log("Hello I am a contructor from News Component");
  //   state = {
  //     articles :[] ,//this a variable of that upper articles... this show that hum kaise ek state jaise constructor mai ek state jaise article ko show kr skte hai add krke
  //     loading:true,
  //     page:1,
  //     totalResults:0
  //   }
  //     //agr humay jo category kholi hai page ki uski wo url ke heading pe  dikhe to ye uske liye hh

  // ye async component aisa fn hai ye jb render hoga after rendering the constructor fn  to resolve some promises

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8a961fe35b374404a3ee5adb75e14e4b&page=1&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    if (parsedData.status === "error") {
      setArticles([]);
      setLoading(false);
      props.setProgress(100);
      return;
    }
    props.setProgress(70);
    setArticles(parsedData.articles);
    settotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    updateNews();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //this is a button of page next & prev
  // const handlePrevClick = async () => {
  //   setPage(page - 1);
  //   updateNews();
  // };

  // const handleNextClick = async () => {
  //   setPage(page + 1);
  //   updateNews();
  // };

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=8a961fe35b374404a3ee5adb75e14e4b&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    setPage({page: page + 1});
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    settotalResults(parsedData.totalResults);
  };

  return (
    <>
      <h1
        className="text-center"
        style={{margin: "35px 0px", marginTop: "100px"}}
      >
        NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>
      {loading && <Spinner />}

      {!loading && articles.length && (
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {/* ye 91 line mai add tha but isko commment krna pd rha !loading && */}
              {articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 45) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 85)
                          : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                    />
                  </div>
                );
              })}

              {/* line 79-83 kya kr rha sbhii news ko ek sath render kr rha */}
            </div>
          </div>
        </InfiniteScroll>
      )}
      {!loading && articles.length === 0 && (
        <h2 style={{display: "flex", justifyContent: "center"}}>No data</h2>
      )}
      {/* <div className='container d-flex justify-content-between'>
        <button disabled={page<=1} type="button" className="btn btn-primary" onClick={handlePrevClick}> &larr;Previous</button>
        <button disabled= {page +1 > Math.ceil(totalResults/props.pageSize)}type="button" className="btn btn-primary" onClick={handleNextClick}> Next &rarr;</button>  
            </div> */}
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;