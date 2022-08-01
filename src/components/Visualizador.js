import React, { useState, useRef , useEffect} from "react";



import Tridi from "react-tridi";
import LottieControl from "../lottieFiles/lottieAnimation";
import OptionButtons from "./buttonsOptions";
import NavigationCarButtons from "./NavigationCarButtons";
import "react-tridi/dist/index.css";
import "./visualizador_style.css";
import NavigationObjectButttons from "./NavigationObjectButtons";
import ReactPlayer from 'react-player'


export function Visualizador({ scenesKeys, imagesFramesScenes,tipo }) {
  var sceneSelectedKey = scenesKeys[0];
  const [isAutoPlayRunning, setIsAutoPlayRunning] = useState(false);
  const [pins, setPins] = useState([]);
  const [visibleExtras, setVisibleExtras] = useState("false");
  const [imagesInVisualizador,setImagesInVisualizador]=useState([...imagesFramesScenes.get(sceneSelectedKey)])
  const [interiorEnabled,setInteriorEnabled]=useState(true);
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
    tridiRef.current.toggleRecording(true, pin.recordingSessionId);
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

  

  return scenesKeys !== undefined ? (
    <div className="visualizador " onWheel={handleWheel}>
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
        onRecordStart={(recordStartHandler)}
        onRecordStop={recordStopHandler}
        onPinClick={pinClickHandler}
        renderPin={(pin) => <LottieControl></LottieControl>}
        //inverse
        //showControlBar
        //showStatusBar
        
        pins={pins}
        setPins={setPins}
        
        //hintOnStartup
        //hintText="Drag to view"
        />
        }
      

      {tipo==="vehiculo"
      ?<NavigationCarButtons onOpenDoors={handleOpenDoors} onCloseDoors={handleCloseDoors} onInterior={handleInterior}></NavigationCarButtons>
      :<NavigationObjectButttons imagesFramesScenes={imagesFramesScenes}></NavigationObjectButttons>
      }
      


      <div className="options-container">
        <OptionButtons
          onPrev={handlePrev}
          onNext={handleNext}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onAutoPlay={handleAutoPlay}
          isAutoPlayRunning={isAutoPlayRunning}
        ></OptionButtons>
      </div>

      <div className="reel-container">
        <button className="reel-btn" onClick={handleClickExtras}>
          Extras
        </button>
        <div className={`reel ${!visibleExtras && "no-visible"} `}>
          <h3 className="no-extras">No hay extras</h3>
          {/*<ReelImages></ReelImages>*/}
        </div>
      </div>
    </div>
  ) : (
    <h1>Cargadno</h1>
  );
}
