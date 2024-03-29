import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from "./store"
import { db } from "./firebase";
import {
  collection,
  onSnapshot,
} from "firebase/firestore";
import Folder from "./components/Folder"
import styles from "./Home.module.css"

function Home() {
  let navigate = useNavigate();
  const container = useRef(null);
  const [docs, setDocs] = useState([])
  const uname = useStore((state) => state.username)
  const mailTo = useStore((state) => state.mailTo)
  const notiTo = useStore((state) => state.notiTo)
  const docsCollectionRef = collection(db, "documents");

  useEffect(() => {
    // console.log(container.current)
    onSnapshot(docsCollectionRef, (snapshot) => {
      setDocs(snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      })))
    })
    // console.log(containerRef)
    let authToken = sessionStorage.getItem('Auth Token')
    if (authToken) {
      console.log('Auth successful!');
    }
    else {
      alert("Login or Signup!")
      navigate('/')
    }
  }, [])

  useEffect(() => {
   // console.log(docs.map(doc => doc.id));
  }, [docs])

  return (
    <div className={styles.home}>
      {/* Home, Welcome { uname } */}
      <div className={styles.container} ref={container}>
        {
          docs.map(doc => <Folder name={doc.id}
            key={doc.id}
            goto={"../storage/" + doc.id} />)
        }
      </div>
    </div>
  )
}

export default Home