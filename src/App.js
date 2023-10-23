import React from "react";
import "react-tridi/dist/index.css";
import  "./styles/styles.scss";

import Controller from "./components/Controller";

import {Navigate, Route, Routes, useNavigate, useParams, useSearchParams} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import {uploadExtraUrl, verificaToken} from "./Api/apiRoutes";
import Home from "./components/Home";
import CuentaVerificada from "./components/cuentaVerificada/CuentaVerificada";
import {useTranslation} from "react-i18next";


function App() {

    const {i18n} = useTranslation("global")


    const VisualizadorRedirect = () => {
        const { id } = useParams();
        return <Navigate to={`/visualizador/view/${id}`} />
    }

    const SaveToken = () =>{
        const { id,webview } = useParams();


        const navigation = useNavigate()
        const [searchParams, setSearchParams] = useSearchParams();
        let tk = searchParams.get("token");
        let idUser = searchParams.get("idUser");
        let lang=searchParams.get("lang");
        i18n.changeLanguage(lang);

        if(webview){
            localStorage.setItem('webview',true);
        }else{
            localStorage.setItem('webview',false);
        }
        if(!tk){
            navigation(`/visualizador/view/${id}`);
            return <Navigate to={`/visualizador/view/${id}`} />
        }
        fetch(verificaToken(idUser), {
            method: "POST",
            headers: {
                'Authorization': tk,
            }
        }).then(r => {
            if(r.status === 200){
                localStorage.setItem('token', tk);
                localStorage.setItem("idUser",idUser)
                navigation(`/visualizador/edit/${id}`);
                return <Navigate to={`/visualizador/edit/${id}`} />
            }else if(r.status === 401){
                navigation(`/visualizador/view/${id}`);
                return <Navigate to={`/visualizador/view/${id}`} />
            }else{
                return <Navigate to={`/visualizador/edit/${id}`} />
            }
                return <Navigate to={`/visualizador/edit/${id}`} />
        }
        );

    }

    return (
            <Routes>

                <Route path={"/cuentaverificada"} element={<CuentaVerificada/>} />
                <Route index element={<Home/>} />
                {/*en la siguiente linea va false*/}
                <Route path="/visualizador/view/:id/*" element={<Controller editMode={false} marketa={false}/> } />
                <Route path="/visualizador/view/:id/marketa/*" element={<Controller editMode={false}  marketa={true} />}/>

                <Route path="/visualizador/edit/:id/*" element={
                    <ProtectedRoute>
                        <Controller editMode={true}/>
                    </ProtectedRoute>
                    } />
                <Route path="/visualizador/:id" element={<SaveToken/>}/>
                <Route path="/visualizador/:id/:webview" element={<SaveToken/>}/>
            </Routes>
    );
}

export default App;
