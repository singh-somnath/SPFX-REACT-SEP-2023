import * as React from "react";
import {Controller} from 'react-hook-form'
import {Editor} from '@tinymce/tinymce-react';
import styles from './RTE.module.scss';

function RTE(props:any) {
    const {
        label,
        name,
        control,
        defaultValue,
        ariaInvalid,
        isRequired
    } = props

    //const labelId = "rtce-control" + Date.now();

    return(
        <div className={styles.RTEContainer}>
            {label && <label>{label}</label>}
            {console.log("Control", control)}            
            <Controller 
                control={control}
                name={name || "content"}
                rules={{required:isRequired}}
                render={({field:{onChange}}) => (
                    <Editor 
                        initialValue={defaultValue}
                        init={{
                            initialValue: defaultValue,
                            height: 500,
                            menubar: true,
                            plugins: [
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "code",
                                "help",
                                "wordcount",
                                "anchor",
                            ],
                            toolbar:
                            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                        }}
                        onEditorChange={onChange}
                    />)

                }
            />
            {ariaInvalid && <div className={styles["RTEContainer-error"]}>* {String(name).toUpperCase()} is required.</div>}

        </div>
    )
}

export default RTE;