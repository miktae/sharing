import React, { useState, useEffect, useRef } from 'react'
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HistoryIcon from '@mui/icons-material/History';
import ShareIcon from '@mui/icons-material/Share';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import FolderIcon from '@mui/icons-material/Folder';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import { useParams } from "react-router-dom";
import { FileUploader } from "react-drag-drop-files";
import { db, storage } from "../firebase";
import {
    collection,
    onSnapshot,
    updateDoc,
    getDoc,
    setDoc,
    doc
} from "firebase/firestore";
import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import { style, DrawerHeader } from "./MUI"
import "./components.css"

function SideBar() {
    let { folder } = useParams();
    let folderName = useRef(null)
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openModalUpload, setOpenModalUpload] = useState(false);
    const [openModalNewFolder, setOpenModalNewFolder] = useState(false);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState("");
    const [fileDownloadUrl, setFileDownloadUrl] = useState("");
    const [file, setFile] = useState(null);
    const [files, setFiles] = useState([]);
    const [documents, setDocuments] = useState([]);
    const docsCollectionRef = collection(db,
        "documents");
    const listItems = [
        { name: "New", icon: <AddIcon />, func: () => setOpenModal(true) },
        { name: "History", icon: <HistoryIcon />, func: null },
        { name: "Connect", icon: <ShareIcon />, func: null }
    ]
    const addListItems = [
        {
            name: "New folder", icon: <CreateNewFolderIcon />, func: () => {
                console.log("New folder")
                setOpenModal(false)
                setOpenModalNewFolder(true)
            }
        },
        {
            name: "Upload files", icon: <UploadFileIcon />, func: () => {
                setOpenModal(false)
                setOpen(false)
                setOpenModalUpload(true)
            }
        },
        {
            name: "Upload folder", icon: <DriveFolderUploadIcon />, func: () => {
                setOpenModal(false)
                setOpen(false)
                setOpenModalUpload(true)
            }
        },
        { name: "Text file", icon: <TextFieldsIcon /> }
    ]

    useEffect(() => onSnapshot(docsCollectionRef, (snapshot) => {
        setDocuments(snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        })))
    }), []);

    useEffect(() => {
        if (folder) {
            const docRef = doc(db, "documents", folder);
            getDoc(docRef).then((docSnap) => {
                if (docSnap.exists()) {
                    //  console.log(docSnap.data().files);
                    setFiles(docSnap.data().files)
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            })
        }
    }, [folder]);

    //  useEffect(() => {  console.log(files); }, [files])

    const openDrawer = () => setOpen(true);

    const handleDrawerClose = () => setOpen(false);

    const handleClose = () => setOpenModal(false);

    const drawerWidth = '28%';

    const handleFileChange = (file) => {
        setFile(file);
        console.log(file);
        console.log(window.URL.createObjectURL(file));
        setFileDownloadUrl(window.URL.createObjectURL(file));
        console.log(fileDownloadUrl)
    }

    const handleUploadForm = (event) => {
        event.preventDefault();
        console.log(file);
        caption ?
            uploadFiles(file)
            : alert("Please enter your caption!")
    };

    const uploadFiles = (file) => {
        if (!file) return null;
        const storageRef = ref(storage, `files/${caption}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const prog = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(prog);
            },
            (error) => console.log(error),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setFileDownloadUrl(downloadURL);
                    setFiles([...files,
                    {
                        fileName: caption,
                        fileType: file.type,
                        id: file.lastModified,
                        fileCreatedAt: new Date(),
                        fileCreatedBy: null,
                        fileSrc: downloadURL,
                    }
                    ])

                    try {
                        if (folder) {
                            updateDoc(doc(db, "documents", folder), {
                                files: [...files, {
                                    fileName: file.name,
                                    fileType: file.type,
                                    fileCreatedAt: new Date(),
                                    fileCreatedBy: null,
                                    fileSrc: downloadURL,
                                }]
                            }).then(() => {
                                setFileDownloadUrl("");
                                setOpenModalUpload(false);
                                setFile(null)
                                location.reload();
                                console.log("Done")
                            })
                        }
                    } catch (err) {
                        alert(err)
                    }
                });

            }
        );
    };

    const makeNewFolder = (e) => {
        e.preventDefault()
        // Add folder to database
        setDoc(doc(db, "documents", folderName.current.value), {
            "createdAt": new Date()
        });
        setOpenModalNewFolder(false);
    }

    return (
        <div className="side-bar">
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 1 }}
                onClick={openDrawer}
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {
                        listItems.map((item) =>
                            <ListItem key={item.name} disablePadding>
                                <ListItemButton onClick={item.func}>
                                    <div className="list-item-content" >
                                        {item.name} {item.icon}
                                    </div>
                                </ListItemButton>
                            </ListItem>)
                    }
                </List>
            </Drawer>
            {/* Modal Add New */}
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <List>
                        {
                            addListItems.map(item =>
                                <ListItem key={item.name} disablePadding>
                                    <ListItemButton onClick={item.func}>
                                        <div className="list-item-content">
                                            {item.name} {item.icon}
                                        </div>
                                    </ListItemButton>
                                </ListItem>)
                        }
                    </List>
                </Box>
            </Modal>
            {/* Modal upload new folder*/}
            <Modal open={openModalNewFolder}
                onClose={() => setOpenModalNewFolder(false)}
                className="modal-newfolder">
                <div className="new-folder-container">
                    <form onSubmit={(e) => makeNewFolder(e)} className="form__signup">
                        <p style={{
                            textAlign: 'center',
                            fontWeight: '600', fontSize: '1.5rem'
                        }}>MikTae_ Sharing</p>
                        <div className="new-folder-view">
                            <FolderIcon className="folder-icon" />
                            <input type="text" ref={folderName}
                                placeholder="Type your folder name" />
                        </div>
                        <div className="form__upload">
                            <button type="submit" className="btn btn-upload" >
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
            {/* Modal upload */}
            <Modal open={openModalUpload}
                onClose={() => {
                    setFile(null)
                    setOpenModalUpload(false)
                }}
                className="modal-upload">
                <div className="upload-file-container">
                    <form onSubmit={handleUploadForm} className="form__signup">
                        <p style={{
                            textAlign: 'center',
                            fontWeight: '600', fontSize: '1.5rem'
                        }}>MikTae_ Sharing</p>
                        <div className="form__group">
                            <progress value={progress} max="100" />
                        </div>
                        <div className="form__group">
                            {
                                file ?
                                    <>
                                        <embed src={fileDownloadUrl}
                                            width="100%" height="100%" />
                                    </>
                                    : <div className="form__group">
                                        <div className="form__upload-zone">
                                            <FileUploader
                                                handleChange={handleFileChange}
                                                name="file" /> </div>
                                    </div>
                            }
                            <div className="form__input">
                                <input
                                    className="form__field"
                                    placeholder="Enter file name"
                                    type="text"
                                    value={caption}
                                    onChange={(e) => setCaption(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="form__upload">
                            <button type="submit" className="btn btn-upload" >
                                Upload
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default SideBar