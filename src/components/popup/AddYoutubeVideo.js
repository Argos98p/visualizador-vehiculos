import React from "react";
import {useTranslation} from "react-i18next";

const AddYoutubeVideo= ({onHandleInputYoutube})=>{

    const {t} = useTranslation("global");

    return (
        <>
                <input type="text" onChange={(e)=>onHandleInputYoutube(e.target.value)} placeholder={t("youtube_popup.link_youtube_text")} name="video-youtube"/>

            <div className={"container-goto-youtube-button"}>
                <div className={"goto-youtube-button"} onClick={()=>window.open("https://www.youtube.com/", '_blank')}> <p>{t("youtube_popup.to_youtube")}</p> </div>

            </div>

        </>
    );
}

export default AddYoutubeVideo;