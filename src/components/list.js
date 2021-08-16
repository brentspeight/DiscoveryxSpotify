import React from "react";

const List = (props)=>{
    return  props.add.map((song, i) =>{
        <div>
            <p>{console.log(song[i].artists[0].name)}</p>
            <button key={i}
            onClick={clicked}>
            Add to playlist
            </button>
        </div>
        
    } 
    )
}

export default List;