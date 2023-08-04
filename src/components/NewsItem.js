import React from 'react'

//converting to react hook as a fn based component first need to remove this export line

const NewsItem = (props) => {
  
    let {title, description, imageUrl,newsUrl } = props;
    return (
      <div className="my-3">
        <div  className="card" >
            <img src={!imageUrl?"https://i-invdn-com.investing.com/news/indicatornews_5_800x533_L_1412601619.jpg" :imageUrl}  className="card-img-top" alt="..."/>
           <div  className="card-body">
           <h5  className="card-title">{title}...</h5>
           <p  className="card-text">{description}...</p>
           <a href = {newsUrl} target="_blank" className="btn btn-sm btn-primary" rel="noreferrer">Read More</a>   {/*this target="_blank used to connect the url and open the news in a new page" */}
       </div>
</div>
      </div>
    )
  
}

export default NewsItem