import Popup from "reactjs-popup";
import React from "react";
import {useNavigate} from "react-router-dom";
import { useTranslation} from "react-i18next";

const AyudaPopup=()=>{
    const { t } = useTranslation("global");
    const navigate = useNavigate();
     return <Popup
        className="popup-ayuda_container"
        onClose={()=>{navigate(-1)}}
        open={true}
        modal
        nested >
        <div className="popup-ayuda-relative">
            <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                <div className={"my-ayuda-container"}>
                    <div className={"ayuda-row"}>
                        <p>{t('help.help_step_one')}</p>
                        <img src={"/hand.png"}/>

                    </div>
                    <div className={"ayuda-row"}>
                        <p>{t('help.help_step_two')}</p>
                        <img src={"/hand1.png"}/>

                    </div>
                    <div className={"ayuda-row"}>

                        <p>{t('help.help_step_three')}</p>
                        <img src={"/zoom-in.png"}/>

                    </div>
                </div>
                <button className={"mi-boton"} onClick={()=>{navigate(-1)}} style={{width:"100px"}}>{t("close.close")}</button>

            </div>


        </div>

    </Popup>
}
export default AyudaPopup;