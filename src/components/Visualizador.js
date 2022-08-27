import React, {useState, useRef, useEffect} from "react";
import Tridi from "react-tridi";
import OptionButtons from "./botones/buttonsOptions";
import axios from "axios";
import ReelImages from "./ReelImages";
import {completeImageUrl} from "../Api/apiRoutes";
import ButtonEscena from "./botones/buttonEscena";
import LottieEmptyEscenas from "../Animations/lottieEmptyEscena";

import PopupNewHotspot from "./popupAddHotspot";
import ReactTooltip from "react-tooltip";
import { Pannellum} from "pannellum-react";
import {postAddHotspot} from "../Api/apiRoutes"
import 'reactjs-popup/dist/index.css';
import "react-tridi/dist/index.css";
import "./visualizador_style.css";
//import NavigationObjectButttons from "./NavigationObjectButtons";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import DotLoader from "react-spinners/DotLoader";
import {infoObjectUrl,getExtrasUrl,getHotspots} from "../Api/apiRoutes";

import {MiObjeto} from "../model/MiObjeto";

export function Visualizador({tipo, id, data, extras}) {
    //var idUsuario = data["idusuario"];
    //var nombre = data["nombre"];
    const [objetoData,setObjetoData] = useState(null);
    const [escenasAux, setEscenasAux] = useState({});//muestra todas las escenas
    const [currentEscena, setCurrentEscena] = useState({}); //ver si se cambia por null
    const [frames, setFrames] = useState([]);
    const [hotspotsMap, setHotspotsMap] = useState([]);


    const [aux, setAux] = useState("0");
    const [escenas, setEscenas] = useState(data["escenas"]);
    const [escenaInView, setEscenaInView] = useState(getSceneWithFrames(escenas));
    const [images, setImages] = useState([]);
    const [isAutoPlayRunning, setIsAutoPlayRunning] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [pins, setPins] = useState([]);
    const [visibleExtras, setVisibleExtras] = useState(true);
    const [addHotspotMode, setAddHotspotMode] = useState(false);
    const [nameHotspot, setNameHotspot] = useState("holis");
    const [extraSelected, setExtraSelected] = useState(null);
    const [newHotspot, setNewHotspot] = useState(false);
    const [loadStatus, setLoadStatus] = useState(false);
    const [loadPercentage, setLoadPercentage] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [hotspotInit, setHotspotInit] = useState(false);
    const [hotspotEnd, setHotspotEnd] = useState(false);
    const [sphereImageInView, setSphereImageInView] = useState(false);
    const [numberImages, setNumberImages] = useState(126)




    const tridiRef = useRef(null);
    var zoomValue = 0;
    const childRef = useRef();
    var idEscenaActiva = 0;

    // Recibe toda la info del objeto
    useEffect(() => {
        axios.get(infoObjectUrl(id)).then(
            response=>{
                console.log(response.data);
                let objeto= new MiObjeto(response.data.escenas,response.data.idusuario,response.data.nombre)
                setObjetoData(objeto);
            }
        )

        /*
        const fecthInfoObject= async ()=>{
            const data = await fetch(infoObjectUrl(id));
            const responseData = await data.json();

            let objeto= new MiObjeto(responseData.escenas,responseData.idusuario,responseData.nombre)
            setObjetoData(objeto);
        }
        fecthInfoObject()
            .catch(console.error);*/

    }, []);

    useEffect(() => {
        if(objetoData!== null){
            let promesas=[];
            let mapHotspots={};

            for(let escena of objetoData.escenas){
                promesas.push(
                    axios.get(getHotspots(id,escena.nombre))
                        .then(response=>{
                            mapHotspots[escena.nombre]=response.data;
                        })
                )
            }
            Promise.all(promesas).then(()=> {
                setHotspotsMap(mapHotspots);
                prepararPins(mapHotspots)
                setEscenasAux(objetoData.escenas);
                setCurrentEscena(getFirstSceneWithFrames(objetoData.escenas));
            });
            //setPins(mapHotspots[currentEscena.nombre]);
        }
    }, [objetoData]);

    function prepararPins(fetchedPins){

        for(let escena in fetchedPins){
            for (let hotspot of fetchedPins[escena]){
                //let newPin = {...hotspot}
                hotspot.frameId=hotspot.idHotspot;
                hotspot.recordingSessionId=null;

                //console.log(hotspot)
            }
        }

    }

    useEffect(() => {
        if(currentEscena.frames!== undefined){
            setFrames(currentEscena.getSrcPath());
            setPins(hotspotsMap[currentEscena.nombre])
        }

    }, [currentEscena]);

    const notifyEdicion = () => toast.info("modo edición", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    });

    const notifyVisualizacion = () => toast.info("visualización", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    });

    useEffect(() => {
        let temp = [];
        let i = 1;
        escenaInView[1].imagenes.forEach((element) => {
            let splitNombre = element.path.split("/");

            temp.push(completeImageUrl(`/${
                splitNombre[1]
            }/${
                splitNombre[2]
            }/${
                splitNombre[3]
            }_compresos/${i}.jpg`));
            i++;
        });
        setImages(temp);
        setAux(escenaInView[0].toString())
    }, [escenaInView]);

    function getFirstSceneWithFrames(escenas) {
        for(let escena of escenas){
            if(escena.frames.length>1){
                return escena
            }
        }
        return escenas[0];
    }

    function getSceneWithFrames(escenas) {
        let aux = true;
        let escenaInicial = undefined;
        Object.entries(escenas).map((escena) => {
            if (escena[1].imagenes.length > 0 && aux) {
                escenaInicial = escena;
                idEscenaActiva = escena[0];
                aux = false;
            }
        });
        return escenaInicial;
    }


    function handleClickExtras() {
        setVisibleExtras(!visibleExtras)
        console.log(escenaInView);
    }
    const frameChangeHandler = (currentFrameIndex) => {
        setCurrentIndex(currentFrameIndex);
    };

    const recordStartHandler = (recordingSessionId) => /*console.log("on record start", {recordingSessionId, pins})*/
    console.log();

    const recordStopHandler = (recordingSessionId) => /* console.log("on record stop", {recordingSessionId, pins})*/
    console.log();

    const pinClickHandler = (pin) => {
        console.log("on pin click", pin);
        // tridiRef.current.toggleRecording(!isEditMode, pin.recordingSessionId);
    };

    const zoomValueHandler = (valorZoom) => {
        zoomValue = valorZoom;
    }

    function handlePrev() {
        tridiRef.current.prev();
    }
    function handleNext() {
        tridiRef.current.next();
    }
    function handleZoomIn() {
        tridiRef.current.setZoom(zoomValue + 0.3);
        if (zoomValue > 1) {
            tridiRef.current.toggleMoving(true)
        }
        if (zoomValue === 1) {
            tridiRef.current.toggleMoving(false)
        }

    }
    function handleZoomOut() {
        tridiRef.current.setZoom(zoomValue - 0.1);
        if (zoomValue > 1) {
            tridiRef.current.toggleMoving(true)
        }
        if (zoomValue === 1) {
            tridiRef.current.toggleMoving(false)
        }

    }
    function handleAutoPlay() {
        tridiRef.current.toggleAutoplay(!isAutoPlayRunning);
    }
    function handleWheel(e) {
        if(!sphereImageInView){
            e.deltaY > 0 ? handleZoomOut() : handleZoomIn();
        }
        
    }
    function handleAddHostpot() { // tridiRef.current.toggleRecording(!isEditMode);
        console.log(pins);
    }

    function frameReplicateV2() {
        let init=pins.slice(-2)[0];
        let end=pins.slice(-2)[1];
        let aux=[...pins]
        let incre=0;
        let promises = [];
        if(init.frameId>end.frameId){
            let n=numberImages-init.frameId+end.frameId;
            let k=(init.x-end.x)/n
            let temp = init.frameId+n;
            let desY= (parseFloat(init.y)-parseFloat(end.y))/n;
            for(let i= init.frameId;i < temp; i++){
                console.log(nameHotspot);
                if(i === numberImages){
                    i=0
                    temp=end.frameId
                }
                var newPin = {
                    id: i,
                    frameId: i,
                    nombre: nameHotspot,
                    extra: null,
                    x: parseFloat(init.x) - k*incre,
                    y: parseFloat(init.y) -desY*incre,
                    recordingSessionId: null
                }
                incre++;
                aux.push(newPin);
                if(i!==0){
                    promises.push(
                        axios.post(
                            postAddHotspot(id,escenaInView[1].nombre,i+".jpg",newPin.x,newPin.y,extraSelected.idextra,nameHotspot,i)
                        ).then(
                            response=>{
                                console.log(response)
                            }
                        )
                    )
                }
                
            }
            Promise.all(promises).then(()=>console.log("ok"));
            setPins(aux)
            setAddHotspotMode(false)
            setHotspotInit(false);
            setHotspotEnd(false)
        }else{
            let numFrames=end.frameId - init.frameId;
            let k= (parseFloat(init.x)-parseFloat(end.x))/numFrames;
            let desY= (parseFloat(init.y)-parseFloat(end.y))/numFrames;
            for(let i= init.frameId;i < end.frameId; i++){
                var newPin = {
                    id: i,
                    frameId: i,
                    nombre: nameHotspot,
                    extra: null,
                    x: parseFloat(init.x) - k*incre,
                    y: parseFloat(init.y) -desY*incre,
                    recordingSessionId: null
                }
                incre++;
                aux.push(newPin);
                if(i!==0){
                    promises.push(
                        axios.post(
                            postAddHotspot(id,escenaInView[1].nombre,i+".jpg",newPin.x,newPin.y,extraSelected.idextra,nameHotspot,i)
                        ).then(
                            response=>{
                                console.log(response)
                            }
                        )
                    )
                }
                
            }
            Promise.all(promises).then(()=>console.log("ok"));
            setPins(aux)
            setAddHotspotMode(false)
            setHotspotInit(false);
            setHotspotEnd(false)
        }
    }



    function handleButtonEscena(escena) {
        idEscenaActiva = escena[0];
        setEscenaInView(escena);
    }

    function handleCreateHotspot(imgExtra, info) { // FUNCION PARA CONTROLAR SELECCION DE EXTRAS

        if (info === "" /*|| imgExtra == null*/
        ) {} else { // borrar la siguientevariblw
            let aux = {
                idextra: 1
            }
            setExtraSelected(aux);
            setNameHotspot(info);
            setAddHotspotMode(true);
            setNewHotspot(true)
        }
    }

    function handleHotspotInit(){
        setHotspotInit(true);
        tridiRef.current.toggleRecording(true)
    }

    function handleHotspotEnd(){
        setHotspotEnd(true);
        tridiRef.current.toggleRecording(true)
    }

    function clickOnTridiContainer() {
        if (addHotspotMode) {
            tridiRef.current.toggleRecording(false);
        }
    }

    useEffect(() => {
        if (pins.length !== 0 && newHotspot === true) {
            
            if(hotspotInit && hotspotEnd){
                frameReplicateV2();
            }
        }
    }, [pins.length]);


    function myRenderPin(pin) {
        
        return (
            <>
                <label>
                    <div id="b3"
                        onClick={
                            () => childRef.current.getAlert()
                        }
                        className="button-hotspot"
                        data-for='soclose'
                        data-tip=''>
                        +
                    </div>
                </label>

                <ReactTooltip id="soclose" place="top" effect="solid"
                    getContent={
                        ()=>{return pin.nombre}
                }></ReactTooltip>
            </>
        );
    }
    function handleOnLoad(load_success, percentage) {
        setLoadPercentage(percentage);

        if (percentage > 70) {
            setLoadStatus(true)
        }

    }

    const photoSphereRef = React.useRef();

  const handleClick = () => {
    photoSphereRef.current.animate({
      latitude: 0,
      longitude: 0,
      zoom: 55,
      speed: '10rpm',
    });
  }

    function getVisualizador() {

        if (images.length === 0) {
            return <div className="emptyEscena ">
                <h2 className="texto-blanco">Escena vacia</h2>
                <br></br>
                <LottieEmptyEscenas></LottieEmptyEscenas>
            </div>
        } else {

            return (

                <div className={`tridi-container `}
                    onWheel={handleWheel}
                    onClick={clickOnTridiContainer}>
                    {/*
                    loadStatus === false ? <div className="sweet-loading">
                        <DotLoader color="#3F3F3F"
                            loading={
                                !loadStatus
                            }
                            size={70}/>
                        <h1>{loadPercentage}
                            %
                        </h1>
                    </div> : null*/}

                    {
                        sphereImageInView
                        ?<Pannellum
                        width="100%"
                        height="500px"
                        image="../360.jpg"
                        pitch={10}
                        yaw={180}
                        hfov={110}
                        autoLoad
                        onLoad={() => {
                            console.log("panorama loaded");
                        }}
                    >
                        </Pannellum>
                        :<Tridi ref={tridiRef}
                        className={
                            "" /*
                            `${
                                loadStatus ? "" : 'oculto'
                            }`*/
                        }


                        //imagenes en local

                        /*
                        location="../ejemplos/normal"
                        format = "jpg"
                        count={126}
                    */

                        

                        //imagenes desde el sevidor

                        
                        images={frames}
                        count={frames.length}
                        


                        autoplaySpeed={70}
                        //autoplay={true}
                        zoom={1}
                        maxZoom={3}
                        minZoom={1}
                        onZoom={zoomValueHandler}
                        
                        //format="png"
                        
                        onFrameChange={frameChangeHandler}
                        onAutoplayStart={
                            () => setIsAutoPlayRunning(true)
                        }
                        onAutoplayStop={
                            () => setIsAutoPlayRunning(false)
                        }
                        onRecordStart={
                            recordStartHandler
                            // setIsEditMode(true);
                            /*
                                toast.dismiss();
                                notifyEdicion();*/
                        }
                        onRecordStop={

                            /*setIsEditMode(false);
                                toast.dismiss();
                                notifyVisualizacion();
                                // frameReplicate()
                                console.log(pins);*/
                            recordStopHandler
                        }
                        onPinClick={pinClickHandler}
                        setPins={setPins}

                        renderPin={myRenderPin}
                        //inverse
                        //showControlBar
                        showStatusBar

                        pins={pins}
                        //hintOnStartup
                        //hintText="Arrastre para mover"
                        onLoadChange={handleOnLoad}/>
                    }

                    
                </div>
            )
        }
    }

    function handleActivateEditMode() {
        setIsEditMode(!isEditMode)
    }


    return (
        <div className="visualizador dragging">


            <div className="lista-hotspost">
                <button className="button-option">Lista de Hotspots</button>
            </div>

            <div className="top-buttons ">
                <button className="button-option"
                    onClick={handleActivateEditMode}>Añadir recursos</button>
            </div>

            <div className="sphere-button">
                <button className="button-option" onClick={()=>setSphereImageInView(!sphereImageInView)}>360</button>
            </div>

            {
            addHotspotMode ? <div className="start-end-hotspot-buttons">
                <button className="button-option" onClick={handleHotspotInit}>Inicio</button>
                <button className="button-option" onClick={handleHotspotEnd}>Fin</button>
            </div> : null
        }


            <div className="reel-container">
                <div className={
                    `reel ${
                        !visibleExtras && "no-visible"
                    } `
                }>

                    <ReelImages id={id}
                        ref={childRef}
                        extrasImages={extras}
                        isEditMode={isEditMode}></ReelImages>
                </div>
            </div>
            {
            isEditMode ? <div className="add-buttons">


                <PopupNewHotspot extras={extras}
                    handleCreateHotspot={handleCreateHotspot}></PopupNewHotspot>

                <button className="button-option" disabled>Agregar extra</button>
            </div> : null
        }


            <button className={
                    `reel-btn button-option ${
                        visibleExtras ? "activo" : ""
                    }`
                }
                onClick={handleClickExtras}>
                Extras
            </button>

            {
            getVisualizador()
        }

            <div className="navigation-container">
                {
                Object.entries(escenas).map((escena) => (

                    <ButtonEscena key={
                            escena[0]
                        }
                        escenaInfo={escena}
                        onClick={handleButtonEscena}
                        activo={
                            escena[0].toString() === aux.toString() ? true : false
                    }></ButtonEscena>
                ))
                 } </div>

            <div className="options-container">
                <OptionButtons onAddHotspot={handleAddHostpot}
                    onPrev={handlePrev}
                    onNext={handleNext}
                    onZoomIn={handleZoomIn}
                    onZoomOut={handleZoomOut}
                    onAutoPlay={handleAutoPlay}
                    isAutoPlayRunning={isAutoPlayRunning}
                    isEditMode={isEditMode}></OptionButtons>
            </div>


            {
            tipo === "vehiculo" ? null /*<NavigationCarButtons onOpenDoors={handleOpenDoors} onCloseDoors={handleCloseDoors}  onInterior={handleInterior}></NavigationCarButtons>*/ : null /*<NavigationObjectButttons ></NavigationObjectButttons>*/
        } </div>
    );

    /*
  return scenesKeys !== undefined ? (
    <div className="visualizador dragging" onWheel={handleWheel}>

      <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
       />
  
        {interiorEnabled
        ?<ReactPlayer url='https://www.youtube.com/watch?v=BlrofcGsouI' width="100%" height="100%" loop={true}/>

        :getVisualizador()
        }
      

      {tipo==="vehiculo"
      ?<NavigationCarButtons onOpenDoors={handleOpenDoors} onCloseDoors={handleCloseDoors} imagesFramesScenes={imagesFramesScenes} onInterior={handleInterior}></NavigationCarButtons>
      :<NavigationObjectButttons imagesFramesScenes={imagesFramesScenes}></NavigationObjectButttons>
      }
      


      <div className="options-container">
        <OptionButtons
        onAddHotspot={handleAddHostpot}
          onPrev={handlePrev}
          onNext={handleNext}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onAutoPlay={handleAutoPlay}
          isAutoPlayRunning={isAutoPlayRunning}
          isEditMode={isEditMode}
        ></OptionButtons>
      </div>

      <div className="reel-container">
        <button className="reel-btn" onClick={handleClickExtras}>
          Extras
        </button>
        <div className={`reel ${!visibleExtras && "no-visible"} `}>
          
          
          <ReelImages id={id}></ReelImages>
        </div>
      </div>
    </div>
  ) : (
    <h1>Cargando</h1>
  );*/
}
