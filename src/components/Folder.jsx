import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import InfoIcon from '@mui/icons-material/Info';
import { SketchPicker } from 'react-color'
import { db } from '../firebase'
import { doc, deleteDoc, updateDoc, getDoc } from "firebase/firestore";
import { Link } from 'react-router-dom'
import "./components.css"

function Folder(props) {
    let navigate = useNavigate()
    let folder = useRef(null)
    let details = useRef(null)
    let colorPicker = useRef(null)
    const [xPos, SetXpos] = useState(0)
    const [yPos, SetYpos] = useState(0)
    const [openDetail, setDetail] = useState(false)
    const [openColor, setOpenColor] = useState(false)
    const [color, setColor] = useState("#000")

    const menu = [
        {
            name: "Open", icon: <FolderOpenIcon />, click: () => {
                navigate(props.goto)
            }
        },
        { name: "Copy", icon: <FolderCopyIcon /> },
        {
            name: "Folder color", icon: <BorderColorIcon />, click: () => {
                setOpenColor(!openColor);
            }
        },
        { name: "Properties", icon: <InfoIcon /> },
        {
            name: "Delete", icon: <DeleteIcon />, click: () => {
                let cf = confirm("Are you sure you want to delete"
                    + props.name + "?")
                if (cf) {
                    deleteDoc(doc(db, "documents", props.name)).
                        then(() => alert(props.name + " deleted"))
                }
            }
        },
    ]

    // useEffect(() => console.log(color), [color])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (details.current && !details.current.contains(event.target)) {
                setDetail(false);
            }
        };
        const handleClickOutsideColor = (event) => {
            if (colorPicker.current && !colorPicker.current.contains(event.target)) {
                setOpenColor(false);
            }
        };
        document.oncontextmenu = (e) => { handleClickOutside(e) };
        document.addEventListener('click', (e) => {
            handleClickOutside(e);
            handleClickOutsideColor(e)
        });

    }, []);

    useEffect(() => {
        const docRef = doc(db, "documents", props.name)
        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    // console.log(docSnap.data());
                    // setDetail(docSnap.data().files);
                    // console.log(docSnap.data().files);
                    setColor(docSnap.data().folderColor)
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            })
       // document.addEventListener('contextmenu', event => event.preventDefault());
    }, [])

    const OpenFolderDetail = (e) => {
        e.preventDefault()
        SetXpos(e.pageX)
        SetYpos(e.pageY)
        setDetail(true)
    }


    return (
        <div className="folder" ref={folder}
            onContextMenu={(e) => {
                OpenFolderDetail(e)
            }}>
            <Link to={props.goto}>
                <FolderIcon style={{ color: color, opacity: "54%" }}
                    sx={{ fontSize: props.size }} />
                <div className="folder-name">
                    {
                        props.name
                    }
                </div>
            </Link>
            {
                openDetail && <> <ul ref={details}
                    className="folder-list"
                    style={{
                        top: yPos / folder.current.offsetHeight - 100,
                        left: xPos / folder.current.offsetWidth + 70
                    }}>
                    {
                        menu.map((item, index) => <li className="folder-details-list"
                            key={index}
                            onClick={item.click}>
                            {item.icon} {item.name}
                        </li>)
                    }
                </ul>
                    {openColor && <SketchPicker ref={colorPicker}
                            className='color-picker'
                            color={color} onChangeComplete={color => {
                                setColor(color.hex);
                                updateDoc(doc(db, "documents",
                                 props.name), {
                                    folderColor: color.hex
                                })
                            }} />
                    }
                </>
            }

        </div >
    )
}

Folder.defaultProps = {
    size: 120,
    name: 'Folder'
}

export default Folder