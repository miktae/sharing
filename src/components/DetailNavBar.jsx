import React from 'react'
import { useNavigate } from "react-router-dom"
import ArticleIcon from '@mui/icons-material/Article';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import "./components.css"

function DetailNavBar(props) {
    let navigate = useNavigate()

    return (
        <div className="detail-navbar">
            <div className="detail-navbar-left">
                <ArrowCircleLeftIcon style={{ cursor: 'pointer'}} 
                onClick={() => {
                    console.log("e")
                    navigate(-1)}}/>
                {props.title} <ArticleIcon />
            </div>
        </div>
    )
}

export default DetailNavBar