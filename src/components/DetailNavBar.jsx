import React from 'react'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ArticleIcon from '@mui/icons-material/Article';
import "./components.css"

function DetailNavBar(props) {
    return (
        <div className="detail-navbar">
            <div className="detail-navbar-left">
                {props.title} <ArticleIcon />
            </div>
            <div className="detail-navbar-right">
                <QuestionAnswerIcon />
            </div>
        </div>
    )
}

export default DetailNavBar