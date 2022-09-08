import React from 'react'
import FolderIcon from '@mui/icons-material/Folder';
import { Link } from 'react-router-dom'
import "./components.css"

function Folder(props) {
    return (
        <div className="folder">
            <Link to={props.goto}>
                <FolderIcon color="action" sx={{ fontSize: props.size }} />
                <div className="folder-name">
                    {
                        props.name
                    }
                </div>
            </Link>
        </div>
    )
}

Folder.defaultProps = {
    size: 120,
    name: 'Folder'
}

export default Folder