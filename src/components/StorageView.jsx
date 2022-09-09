import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { useStore } from "../store"
import { db } from "../firebase";
import {
  getDoc,
  doc
} from "firebase/firestore";
import "./components.css"
import FileView from './FileView';

function StorageView() {
  let { folder } = useParams();
  const [datas, setDatas] = useState([]);
  const updateFolderUrl = useStore((state) => state.updateFolderUrl)
  updateFolderUrl(folder)

  useEffect(() => {
    const docRef = doc(db, "documents", folder);
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          // console.log(docSnap.data());
          setDatas(docSnap.data().files);
          // console.log(docSnap.data().files);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
    document.title = "MikTae_ Sharing" + " " + folder + " to you"
  }, [])

  return (
    <div className="storage-view">
      <div className="storage-view-container">
        {
          datas && datas.map(data => <FileView name={data.fileName}
            key={data.fileName + data.id}
            goto={"../storage/" + folder + "/" + data.fileName} />)
        }
      </div>
    </div>
  )
}

export default StorageView