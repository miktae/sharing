import React from 'react'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Link } from 'react-router-dom'
import "./components.css"

const FileView = (props) => {
    return (
        <div className="folder">
            <Link to={props.goto}>
                <InsertDriveFileIcon color="action"
                    sx={{ fontSize: props.size }} />
                <div className="folder-name">
                    {
                        props.name
                    }
                </div>
            </Link>
        </div>
    )
}

FileView.defaultProps = {
    goto: './file',
    size: 120,
    name: 'Folder'
}

export default FileView