import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useStore } from "./store"
import styles from "./App.module.css";
import { setDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [details, setDetails] = useState()
  const updateUser = useStore((state) => state.updateUser)
  let faceio = new faceIO("fioaca81")
  let navigate = useNavigate();
  const updateId = useStore((state) => state.updateId)
  const updateName = useStore((state) => state.setUserName)
  const updateEmail = useStore((state) => state.setEmail)

  const hashCode = (s) => {
    return s.split("").reduce(function (a, b) { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
  }

  const handleSignUp = () => {
    // Start the facial enrollment process
    updateName(username)
    updateEmail(email)
    faceio.enroll({
      "locale": "auto", // Default user locale
      "payload": {
        "username": username,
        "email": email,
      }
    }).then((userInfo) => {
      setIsSignUp(false)
      console.log(userInfo)
      alert("Now please login, " + username)
      updateUser(userInfo)
      //  setDetails(userInfo.details)
    }
    )
      .catch(errCode => {
        // Something went wrong during enrollment, log the failure
        handleError(errCode);
      })

  };

  const handleLogIn = () => {
    // Start the facial authentication process (Identify a previously enrolled user)
    faceio.authenticate({
      "locale": "auto" // Default user locale
    }).then(userData => {
      console.log("Success, user recognized")
      sessionStorage.setItem('Auth Token', hashCode(userData.facialId))
      // console.log(userData.facialId);
      // console.log("Associated Payload: " + JSON.stringify(userData.payload))
      // {"whoami": 123456, "email": "john.doe@example.com"} set via enroll()
      updateId(userData.facialId)
      navigate("/home")
      console.log("Associated Payload: " + JSON.stringify(userData.payload.username))
    }).
      catch(errCode => {
        handleError(errCode);
      });
  };

  function handleError(errCode) {
    // Log all possible error codes during user interaction..
    // Refer to: https://faceio.net/integration-guide#error-codes
    // for a detailed overview when these errors are triggered.
    switch (errCode) {
      case fioErrCode.PERMISSION_REFUSED:
        console.log("Access to the Camera stream was denied by the end user");
        break;
      case fioErrCode.NO_FACES_DETECTED:
        console.log("No faces were detected during the enroll or authentication process");
        break;
      case fioErrCode.UNRECOGNIZED_FACE:
        console.log("Unrecognized face on this application's Facial Index");
        break;
      case fioErrCode.MANY_FACES:
        console.log("Two or more faces were detected during the scan process");
        break;
      case fioErrCode.PAD_ATTACK:
        console.log("Presentation (Spoof) Attack (PAD) detected during the scan process");
        break;
      case fioErrCode.FACE_MISMATCH:
        console.log("Calculated Facial Vectors of the user being enrolled do not matches");
        break;
      case fioErrCode.WRONG_PIN_CODE:
        console.log("Wrong PIN code supplied by the user being authenticated");
        break;
      case fioErrCode.PROCESSING_ERR:
        console.log("Server side error");
        break;
      case fioErrCode.UNAUTHORIZED:
        console.log("Your application is not allowed to perform the requested operation (eg. Invalid ID, Blocked, Paused, etc.). Refer to the FACEIO Console for additional information");
        break;
      case fioErrCode.TERMS_NOT_ACCEPTED:
        console.log("Terms & Conditions set out by FACEIO/host application rejected by the end user");
        break;
      case fioErrCode.UI_NOT_READY:
        console.log("The FACEIO Widget code could not be (or is being) injected onto the client DOM");
        break;
      case fioErrCode.SESSION_EXPIRED:
        console.log("Client session expired. The first promise was already fulfilled but the host application failed to act accordingly");
        break;
      case fioErrCode.TIMEOUT:
        console.log("Ongoing operation timed out (eg, Camera access permission, ToS accept delay, Face not yet detected, Server Reply, etc.)");
        break;
      case fioErrCode.TOO_MANY_REQUESTS:
        console.log("Widget instantiation requests exceeded for freemium applications. Does not apply for upgraded applications");
        break;
      case fioErrCode.EMPTY_ORIGIN:
        console.log("Origin or Referer HTTP request header is empty or missing");
        break;
      case fioErrCode.FORBIDDDEN_ORIGIN:
        console.log("Domain origin is forbidden from instantiating fio.js");
        break;
      case fioErrCode.FORBIDDDEN_COUNTRY:
        console.log("Country ISO-3166-1 Code is forbidden from instantiating fio.js");
        break;
      case fioErrCode.SESSION_IN_PROGRESS:
        console.log("Another authentication or enrollment session is in progress");
        break;
      case fioErrCode.NETWORK_IO:
      default:
        console.log("Error while establishing network connection with the target FACEIO processing node");
        break;
    }
  }

  const SignUp = () => {
    setIsSignUp(true)
  }

  const Submit = (e) => {
    e.preventDefault()
    if (email.length > 0 && username.length > 0) {
      handleSignUp()
    }
    else {
      email.length ?
        alert("Please enter your username")
        : alert("Please enter your email");
    }
  }

  return (
    <div className={styles.app}>
      <video autoPlay={true} muted loop id="myVideo">
        <source src="./assets/bg.mp4" type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
      <div id="faceio-modal"></div>
      <div className={styles.container}>
        {
          isSignUp ?
            <form className={styles.form} onSubmit={(e) => Submit(e)}>
              <label htmlFor="username" className={styles.label}>User name:</label>
              <input className={styles.input} type="text"
                onChange={(e) => {
                  setUsername(e.target.value)
                  // console.log(username)
                }}
                placeholder="Type your username" />
              <label htmlFor="email" className={styles.label}>Email:</label>
              <input className={styles.input} type="email"
                onChange={(e) => {
                  setEmail(e.target.value)
                  // console.log(email)
                }}
                placeholder='Type your email address' />
              <input className={styles.submit}
                type="submit" value="Submit" />
            </form> :
            <div className={styles.authentication}>
              <h1 className={styles.title}>Facial Authentication</h1>
              <h2 style={{ cursor: 'pointer' }}
                onClick={() => open("https://www.facebook.com/miktae07", "_self")}>
                @MikTae
              </h2>
              <div className={styles.buttonContainer}>
                <button onClick={SignUp}>Sign Up</button>
                <button onClick={handleLogIn}>Log In</button>
              </div>
            </div>
        }

      </div>
    </div>
  );
}

export default App;
