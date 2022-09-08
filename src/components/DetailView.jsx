import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "../store"
import { db } from "../firebase";
import {
    getDoc,
    doc
} from "firebase/firestore";
import "./components.css"
import DetailNavBar from './DetailNavBar';

function DetailView() {
    let { file } = useParams();

    const folderUrl = useStore((state) => state.folderUrl)

    const [detail, setDetail] = useState([]);

    useEffect(() => async () => {
        const docRef = doc(db, "documents", folderUrl)
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // console.log(docSnap.data());
            setDetail(docSnap.data().files);
            // console.log(docSnap.data().files);
            setDetail(docSnap.data().files.filter(function (item) {
                return item.fileName === file
            }))
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }, [])

    return (
        <div className="detail-view">
            <DetailNavBar title={ file } />
            {detail.map(element => <embed 
            key={element.fileName} src={element.fileSrc +'#toolbar=0&navpanes=0'}
            width={"100%"} height={"100%"}/>)}
        </div>
    )
}

export default DetailView