import React from "react";
import {useTranslation} from "react-i18next";

const AddYoutubeVideo= ({onHandleInputYoutube})=>{

    const {t} = useTranslation("global");

    return (
        <>
                <input type="text" onChange={(e)=>onHandleInputYoutube(e.target.value)} placeholder={t("youtube_popup.link_youtube_text")} name="video-youtube"/>

        </>
    );
}

export default AddYoutubeVideo;