import React from 'react'
import { useNavigate } from "react-router-dom"
import './components.css'

function ModalReminder() {
  let navigate = useNavigate()
  return (
    <div className="modal-reminder">
      <div className="modal-reminder-left">
        <div className="modal-reminder-leftText">
        <p>Log In to MikTae- Sharing</p>
        </div>
      </div>
      <div className="modal-reminder-right">
        <button className="loginBtn">
        <a style={{ cursor: 'pointer', color: '#fff' }} href="/">Log In </a> 
        </button>
        <button className="signupBtn">
        <a style={{ cursor: 'pointer', color: '#fff' }} href="/">Sign Up</a> 
        </button>
      </div>
    </div>
  )
}

export default ModalReminder