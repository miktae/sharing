import React, { useState, useEffect, useRef } from 'react'
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import {
    getDoc,
    doc
} from "firebase/firestore";
import "./components.css"
import DetailNavBar from './DetailNavBar';

function DetailView() {
    let { folder } = useParams();
    let { file } = useParams();
    let ifr = useRef(null)

    const [detail, setDetail] = useState([]);

    useEffect(() => {
        const docRef = doc(db, "documents", folder)
        document.title = "MikTae_ Sharing" + " " + file + " to you"
        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    // console.log(docSnap.data());
                    // setDetail(docSnap.data().files);
                    // console.log(docSnap.data().files);
                    setDetail(docSnap.data().files.filter(function (item) {
                        return item.fileName === file
                    }))
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            })
        document.addEventListener('contextmenu', event => event.preventDefault());
    }, [])

    return (
        <div className="detail-view">
            <DetailNavBar title={file} />
            <div className='iframe-cover' ref={ifr}>
                {detail.map(element => <iframe key={element.fileName}
                    src={element.fileSrc + '#toolbar=0&navpanes=0'}
                    width={"100%"} height={"100%"} />
                )}
            </div>
        </div>
    )
}

export default DetailView