import React from "react";

const NewsItem =(props)=> {
    
 
    let {title,description,imageUrl,newsUrl,author,time,source}=props;
    return (
      
      <div>
        <div className="my-3">
        <div className="card" >
      
  <span className="position-absolute  translate-middle badge rounded-pill bg-danger" style={{left:' 90%'}}>
    {source}
  </span>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              {description}...
            </p>
            <p className="card-text"><small className="text-body-secondary">By {author?author:"Unknown"} on {new Date(time).toTimeString()} </small></p>

            <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
      </div>
    );
  
}

export default NewsItem;
