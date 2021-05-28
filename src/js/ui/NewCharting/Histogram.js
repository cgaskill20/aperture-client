import React, {useEffect, useRef} from "react";
import * as d3 from 'd3';

export default function Histogram(props) {
    const d3Chart = useRef()

    useEffect(()=>{

    })

    return (
        <div id='d3demo'>
            {console.log("rerenderhistogram")}
            <svg ref={d3Chart}></svg>
        </div>
    )
}