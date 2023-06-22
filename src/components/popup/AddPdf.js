import React, {useCallback, useMemo} from 'react'
import {useDropzone} from 'react-dropzone'
import {getActiveElement} from "@testing-library/user-event/dist/utils";
import {useTranslation} from "react-i18next";
const baseStyle = {
    marginTop:'10px',
    marginBottom:'10px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#343535',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const focusedStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

function AddPdf({addPdfVis}) {

    const {t} = useTranslation("global");



    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles)
    }, [])

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone(
        {useFsAccessApi: false,maxFiles:1,accept: { "application/pdf": [] }
    });

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));
    const style = {
        ...baseStyle,
    }

    addPdfVis(acceptedFiles);
    return (

        <section className="container"><aside>

            <ul>{files}</ul>
        </aside>
            <div {...getRootProps({style})}>
                <input {...getInputProps()} />
                <p>{t("pdf_popup.upload_text")}</p>
            </div>

        </section>

    );
}

export  default AddPdf;