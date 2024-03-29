import React, {useEffect, useState} from "react";
import {Route, Routes, useNavigate, useParams} from "react-router-dom";
import {Visualizador} from "./Visualizador";
import axios from "axios";
import NoEncontrado from "./publicidad/paginaNoEncontrado";
import {infoObjectUrl, getExtrasUrl} from "../Api/apiRoutes";
import LottieServerError from "../Animations/lottieServerError";
import {VisualizadorObjetos} from "./VisualizadorObjetos";


function Controller({editMode,marketa}) {

    let {id} = useParams();
    const [myObjeto, setMyObjeto] = useState(null);
    const [extras, setExtras] = useState([]);
    const [noEscenas,setNoEscenas] = useState(false);
    const navigate=useNavigate();
    useEffect(() => {
        axios.get(infoObjectUrl(id)).then(response => {

            if(response.data !== "NOT_FOUND"){
                if(Object.keys(response.data.escenas).length===0){
                    setNoEscenas(true)

                }else{

                
                var submapaConClave0 = response.data.escenas["0"];
                delete response.data.escenas["0"];

                var submapaConClave1 = response.data.escenas["1"];
                delete response.data.escenas["1"];

                var submapaConClave2 = response.data.escenas["2"];
                delete response.data.escenas["2"];



                response.data.escenas["0"] = submapaConClave1;
                response.data.escenas["1"] = submapaConClave2;
                response.data.escenas["2"] = submapaConClave0;
                    setMyObjeto(response.data);
                    axios.get(getExtrasUrl(id))
                        .then((response)=>{
                            if(response.data !== []){
                                setExtras(response.data)
                            }
                        });
                }
            }
            else{
                setMyObjeto("NOT_FOUND");

            }
        }).catch(error => {
            console.log(error)
            if(error.response.status === 404){
                setMyObjeto("NOT_FOUND");
            }
        })
    }, [id,navigate]);

    return (
        <>
            <Routes>
                <Route path="/404" element={<NoEncontrado idObjeto={id}></NoEncontrado>} />
                <Route path="/serverError" element={<LottieServerError/>}/>
            </Routes>
            {
                (myObjeto ==="NOT_FOUND")
                    ? <NoEncontrado idObjeto={id}></NoEncontrado>
                    :null
            }
            {
                noEscenas ? <h3>No hay escenas</h3>: null
            }
            { (myObjeto !=="NOT_FOUND" && myObjeto !== null )?
                (myObjeto["tipo"]==="carro") ?
                    <Visualizador data={myObjeto}
                                  edit={editMode}
                                  marketa={marketa}
                                  tipo="vehiculo"
                                  id={id} extras={extras}></Visualizador>:<VisualizadorObjetos data={myObjeto}
                                                                                              edit={editMode}
                                                                                              marketa={marketa}
                                                                                              tipo="objeto"
                                                                                              id={id} extras={extras}></VisualizadorObjetos>
                : null}

        </>
    );
}
export default Controller;
