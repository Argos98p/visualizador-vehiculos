import React from "react";
import {useTranslation} from "react-i18next";


    const PopupListaHotspot =({listaHotspots,onClickDeleteHotspot})=>{
        const {t} = useTranslation("global");

    function handleDeleteHotspot(itemObject){
        onClickDeleteHotspot(itemObject.item);
    }

    function handleListaHotspots(){

        if(listaHotspots.length===0){
            return (<h6>{t("hotspots_lists.not_found")}</h6>);
        }
        if(listaHotspots){
            let nombresHotspots=[]
            const unique = [...new Set(listaHotspots.map(item => item.nombreHotspot))];
            nombresHotspots=nombresHotspots.concat(unique);
            return nombresHotspots.map((item) => {
                return (
                    <div key={item} className="item-hotspots ">
                        <img className="button-delete-hotspot cursor-pointer" onClick={()=>handleDeleteHotspot({item})} src="/iconos/eliminar-hotspot.png" alt=""/>

                        <img  src="/iconos/lista_hotspot.png" alt=""/>

                        <h6 className="nombre-hotspot">{item}</h6>
                    </div>
                );
            });

            //return null

        }
        return (<h1>{t("hotspots_lists.not_found")}</h1>);
    }

    return(
    <>
        <div className="container-lista-hotspots">
            {handleListaHotspots()}
        </div>


    </>);

}
export default PopupListaHotspot;