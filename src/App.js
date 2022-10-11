import React from "react";
import "react-tridi/dist/index.css";
import  "./styles/styles.scss";

import Controller from "./components/Controller";

import { Route,  Routes } from "react-router-dom";


function App() {
    return (


            <Routes>
                <Route index element={<h1>index</h1>} />

                <Route path="/visualizador/view/:id/*" element={<Controller editMode={false}/>} />
                <Route path="/visualizador/edit/:id/*" element={<Controller editMode={true}/>} />
                <Route path="*" element={<h1>404</h1>} />
            </Routes>



    );
}

export default App;
