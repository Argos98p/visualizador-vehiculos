import Popup from 'reactjs-popup';
import React, {useEffect, useState} from "react";
import "./popupInfoObject.css";
import {FaUserCircle} from "react-icons/fa";
import {MdCancel} from "react-icons/md";
import {Outlet} from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import useWindowDimensions from "../../hooks/useWindowSize";
import {useTranslation} from "react-i18next";

const PopupInfoObjetct = ({imgForInfoModal, infoObjectData}) => {

    const navigate = useNavigate();
    const {height, width} = useWindowDimensions();
    const {t} = useTranslation("global");


    const handleInfo = () => {
        if (infoObjectData !== undefined) {
            let info = infoObjectData;
            return <Popup className="popup-info-container"
                          onClose={() => navigate(-1)}
                          open={true}
                          modal
                          nested>
                <div className={"popup-info-div-container"} >

                    <div className="popup-info-der">
                        <div className="info-content">
                            <div className="info-content-title">
                                <div className="titulo-precio-container">
                                    <p className="titulo">{t("information_popup.vehicle")} - {info["modelo"]} {t("information_popup.year")} {info["anio"]}</p>
                                    <p>{info["modelo"]}</p>
                                </div>
                                <div>
                                    <p className="precio">USD {info[7]}{info["precio"]}</p>
                                    <p className="user">{info["representante"] !== "" ? info["representante"] : "3DMotor's "} <FaUserCircle
                                        className={"icon"}></FaUserCircle></p>
                                </div>

                            </div>
                            <div>
                                <p><b>{t("information_popup.additional_note")} </b></p>
                                <p>{info["descripcion"]}</p>

                            </div>
                        </div>
                    </div>
                    {
                        width < 400 ? null: <div className="popup-info-izq">
                            <img src={imgForInfoModal} alt="MDN"/>
                        </div>
                    }

                </div>
                <div className={"button-container"}>
                    <MdCancel className={"button"} fontSize={54} onClick={() => navigate(-1)}/>

                </div>

            </Popup>
        }
        return "";
    }
    return (
        <>

            {handleInfo()}
            <Outlet/>
        </>
    );
}
export default PopupInfoObjetct;