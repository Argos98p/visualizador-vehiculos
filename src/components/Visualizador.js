import React, { useState, useRef , useEffect} from "react";



import Tridi from "react-tridi";
import LottieControl from "../lottieFiles/lottieAnimation";
import OptionButtons from "./buttonsOptions";
import NavigationCarButtons from "./NavigationCarButtons";
import "react-tridi/dist/index.css";
import "./visualizador_style.css";
import NavigationObjectButttons from "./NavigationObjectButtons";
import ReactPlayer from 'react-player'
import ReelImages from "./ReelImages";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Visualizador({ scenesKeys, imagesFramesScenes,tipo, id }) {
  
  const notifyEdicion = () => toast.info('modo edición', {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });

    const notifyVisualizacion = () => toast.info('visualización', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });


  var sceneSelectedKey = scenesKeys[0];
  const [isAutoPlayRunning, setIsAutoPlayRunning] = useState(false);
  const [isEditMode,setIsEditMode] = useState(false);
  const [pins, setPins] = useState([]);
  const [visibleExtras, setVisibleExtras] = useState("false");
  const [imagesInVisualizador,setImagesInVisualizador]=useState([...imagesFramesScenes.get(sceneSelectedKey)])
  const [interiorEnabled,setInteriorEnabled]=useState(false);
  const tridiRef = useRef(null);
  var zoomValue = 0;
  
  function handleClickExtras() {
    setVisibleExtras(!visibleExtras);
    //console.log(visibleExtras);
  }
  const frameChangeHandler = (currentFrameIndex) => {    
  };

  const recordStartHandler = (recordingSessionId) =>
    console.log("on record start", { recordingSessionId, pins });


  const recordStopHandler = (recordingSessionId) =>
    console.log("on record stop", { recordingSessionId, pins });


  const pinClickHandler = (pin) => {
    console.log("on pin click", pin);
    tridiRef.current.toggleRecording(!isEditMode, pin.recordingSessionId);
  };
  const zoomValueHandler = (valueZoom) => (zoomValue = valueZoom);

  function handlePrev() {
    tridiRef.current.prev();
  }
  function handleNext() {
    tridiRef.current.next();
  }
  function handleZoomIn() {
    tridiRef.current.setZoom(zoomValue + 0.3);
  }
  function handleZoomOut() {
    tridiRef.current.setZoom(zoomValue - 0.1);
  }
  function handleAutoPlay() {
    tridiRef.current.toggleAutoplay(!isAutoPlayRunning);
  }
  function handleWheel(e) {
    e.deltaY > 0 ? handleZoomOut() : handleZoomIn();
  }
  function handleOpenDoors(){
    setInteriorEnabled(false);
    var temp=[...imagesFramesScenes.get(scenesKeys[0])]
    setImagesInVisualizador([...temp])
    
  }
  function handleCloseDoors(){
    setInteriorEnabled(false);
    var temp2=[...imagesFramesScenes.get(scenesKeys[1])]
    setImagesInVisualizador([...temp2]);
  }
  function handleInterior(){
    setInteriorEnabled(true);
  }

  function handleAddHostpot(){
    tridiRef.current.toggleRecording(!isEditMode);
    console.log(pins);
    //console.log("on record start", { recordingSessionId, pins });
  }

  function frameReplicate(){
    var lastPin= pins[pins.length-1];
    var move = 0.015;
    var j=20;
    var temp=[...pins]
    for(var i=lastPin.frameId-20;i<=lastPin.frameId+20;i++){
      var originalX = parseFloat(lastPin.x);
      var originalY = parseFloat(lastPin.y);  

      
        var newPin={
          id:lastPin.id,
          frameId: i,
          x:originalX+move*j,
          y:originalY,
          recordingSessionId:lastPin.recordingSessionId,
        }
        temp.push(newPin)
      j--;      
    }
    setPins(temp)
  }

  
  

  
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

        :<Tridi
        ref={tridiRef}
        autoplaySpeed={70}
        //autoplay={true}

        zoom={1}
        maxZoom={3}
        minZoom={1}
        onZoom={zoomValueHandler}
        images={imagesInVisualizador}
        
        //format="png"
        count={imagesInVisualizador.length}
        onFrameChange={frameChangeHandler}
        onAutoplayStart={() => setIsAutoPlayRunning(true)}
        onAutoplayStop={() => setIsAutoPlayRunning(false)}
        onRecordStart={()=>{
          setIsEditMode(true); 
          toast.dismiss();
          notifyEdicion();
          }}
        onRecordStop={()=>{
          setIsEditMode(false);
          toast.dismiss(); 
          notifyVisualizacion();
          frameReplicate()
        }}
        onPinClick={pinClickHandler}
        setPins={setPins}
        //renderPin={(pin) => <LottieControl></LottieControl>}
        renderPin={(pin) => <label for="input3">
        <div id="b3" className="button">+</div>
        
      </label>}

        //inverse
        //showControlBar
        //showStatusBar
        
        pins={pins}
       
        
        hintOnStartup
        hintText="Arrastre para mover"
        />
        }
      

      {tipo==="vehiculo"
      ?<NavigationCarButtons onOpenDoors={handleOpenDoors} onCloseDoors={handleCloseDoors} onInterior={handleInterior}></NavigationCarButtons>
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
          {/* <h3 className="no-extras">No hay extras</h3> */}
          
          <ReelImages id={id}></ReelImages>
        </div>
      </div>
    </div>
  ) : (
    <h1>Cargadno</h1>
  );
}
