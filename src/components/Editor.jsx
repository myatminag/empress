import React, { useRef } from 'react';
import JoditEditor from "jodit-react"

const Editor = ({ content, setContent }) => {

    const editor = useRef(null);

    return (
        <JoditEditor
            ref={editor}
            value={content}
            onChange={(newContent) => setContent(newContent)}
        />
    )
};

export default Editor;