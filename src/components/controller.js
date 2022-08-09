import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Visualizador} from "./Visualizador";
import axios from "axios";
import NoEncontrado from "./paginaNoEncontrado";
import {statusEsceneUrl, infoObjectUrl, numberFramesInScene} from "../Api/apiRoutes";
import {Objeto} from "../model/Objeto";


function Controller() {
    let {id} = useParams();
    const [imagesLoaded, setImagesLoaded] = useState(true);
    let [color, setColor] = useState("#EBAF26");

    


    const [objExiste, setObjExiste] = useState(true);

    const [myObjeto, setMyObjeto] = useState(null);

    

    useEffect(() => {
        axios.get(infoObjectUrl(id)).then(response => {

            return response.data
        }).then(data => {
            if (data !== "NOT_FOUND") {
                setMyObjeto(data);
            } else {
                setObjExiste(false);

            }
        }).catch(error => {
            console.log(error.response.data.error)
        })
    }, []);

    return myObjeto !== null ? (
        <Visualizador data={myObjeto}
            tipo="vehiculo"
            id={id}></Visualizador>
    ) : (
        <NoEncontrado idObjeto={id}></NoEncontrado>
    )

}



  export default Controller;
