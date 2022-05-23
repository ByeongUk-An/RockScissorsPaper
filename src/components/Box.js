import React from 'react';


const Box = (props) => {

    return (
        <div className={props.result || props.results}>
            <h1 className="title">{props.title}</h1>
            <img className="item-img" src={props.item && props.item.img} alt=""/>
            <h2>{props.result || props.results}</h2>
        </div>
    );
};

export default Box;
