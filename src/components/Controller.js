import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Visualizador} from "./Visualizador";
import axios from "axios";
import NoEncontrado from "./publicidad/paginaNoEncontrado";
import {infoObjectUrl,getExtrasUrl} from "../Api/apiRoutes";


//cambiar por una funciona que devuelva solo true o false
function Controller() {
    let {id} = useParams();
    const [myObjeto, setMyObjeto] = useState(null);
    const [extras, setExtras] = useState([]);

    useEffect(() => {
        axios.get(infoObjectUrl(id)).then(response => {
            return response.data
        }).then(data => {
            if (data !== "NOT_FOUND") {
                setMyObjeto(data);
                console.log(data);
                axios.get(getExtrasUrl(id))
                .then((response)=>{
                  if(response.data !== []){                      
                      setExtras(response.data)
                  }
                });
            } else {
                console.log("hola")
            }
        }).catch(error => {
            console.log(error)
        })
    }, []);

    return myObjeto !== null ? (
        <Visualizador data={myObjeto}
            tipo="vehiculo"
            id={id} extras={extras}></Visualizador>
    ) : (
        <NoEncontrado idObjeto={id}></NoEncontrado>
    )

}

  export default Controller;