import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Tridi from "react-tridi";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, {useState, useEffect, useRef} from "react";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";
import { MdCheck} from "react-icons/md";
import {BiCrop, BiSave, BiTrash, BiX} from "react-icons/bi";
import {useTranslation} from "react-i18next";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {blurImages} from "../../Api/apiRoutes";
export default function Editor({exitBlurMode,objectId,idEditor}) {
    const { t } = useTranslation("global");
    const [crop, setCrop] = useState();
    const [frames, setFrames] = useState([]);
    const [frameSelected, setFrameSelected] = useState(0);
    const [selectMode, setSelectMode] = useState(false);
    const [savedCoordinates, setSavedCoordniates] = useState({});
    const tridiRef = useRef(null);
    const [openSavePopup, setOpenSavePopup] = useState(false);
    const [originalImageSize, setOriginalImageSize] = useState([0,0])
    const [cropDivHeight, setCropDivHeight] = useState(0);
    const [cropDivWidth, setCropDivWidth] = useState(0);
    const ref = useRef(null)

    useEffect(() => {
        if(ref.current!=null){
            setCropDivHeight(ref.current.clientHeight)
            setCropDivWidth(ref.current.clientWidth)
        }

    })
    const closeModal = () => setOpenSavePopup(false);

    useEffect(() => {
        axios
            .get("https://3dmotores.com/objects/getobject?idobjeto="+objectId)
            .then(function (response) {
                //response.data.escenas[0].imagenes.map(path=>)
                let result = Object.values(response.data.escenas[0].imagenes);
                let imagenes = result.map(
                    (e) => `https://3dmotores.com/ObjetosVirtuales/${objectId}${e.path}`.replace("frames","frames_compresos")
                );
                setFrames(imagenes);
                const img = new Image();
                img.src =  imagenes[0];
                img.onload = () => {

                    setOriginalImageSize([img.width,img.height])
                };
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    const saveCoordinates = () => {
        let frame=frameSelected+1;
        let mycrop= crop;
        let realCoordinates = transormCoordinates(mycrop["x"],mycrop["y"],mycrop["width"],mycrop["height"]);
        realCoordinates["frame"]= `/ObjetosVirtuales/${idEditor}/frames_compresos/${frameSelected+1}`
        setSavedCoordniates(lastValue => ({...lastValue,[frame]:realCoordinates}))
        setSelectMode(false);
        toast.success(t('toast.save_blur_coordinate'),{autoClose: 1000,
            hideProgressBar: true,theme:"dark"});
    };



    useEffect(() => {
        console.log(savedCoordinates);
    }, [selectMode])

    const verifyFrame = (n) => {
        //console.log(n)
        //console.log(frameSelected+1)
        //console.log(Object.keys(savedCoordinates))
        //console.log(Object.keys(savedCoordinates).includes((frameSelected+1).toString()))
    }

    const transormCoordinates= (x,y,w,h)=>{
        let newCoordinates={}
        newCoordinates["x"]= Math.round(originalImageSize[0]*x/cropDivWidth);
        newCoordinates["y"]=Math.round(originalImageSize[1]*y/cropDivHeight);
        newCoordinates["width"]=Math.round(originalImageSize[0]*w/cropDivWidth);
        newCoordinates["height"]=Math.round(originalImageSize[1]*h/cropDivHeight);
        return newCoordinates
    }



    const deleteSavedCoordinate = () => {
        setSavedCoordniates(currentCordinates=>{
            const {[(frameSelected+1).toString()]:crop, ...rest} = currentCordinates;
            return rest
        })
        toast.error(t('toast.remove'),{autoClose: 1000,
            hideProgressBar: true,theme:"dark"});
        setSelectMode(false)
    }



    const savePopup=()=>{
        return (
            <Popup open={openSavePopup} closeOnDocumentClick onClose={closeModal}>
                <div className="modal">
                    <a className="close" onClick={closeModal}>
                        &times;
                    </a>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae magni
                    omnis delectus nemo, maxime molestiae dolorem numquam mollitia, voluptate
                    ea, accusamus excepturi deleniti ratione sapiente! Laudantium, aperiam
                    doloribus. Odit, aut.
                </div>
            </Popup>
        );
    }

    const sendToServer=()=>{
        const toastBlurSend = toast.loading(t("toast.sending"))

        console.log( Object.values(savedCoordinates))
        axios.post(blurImages(), Object.values(savedCoordinates)).then(response =>{
            toast.update(toastBlurSend, { render: t("toast.save_blur_coordinate"), type: "success", isLoading: false, autoClose: 1000,draggable: true});
            console.log(response)})
            .catch(
                ()=>{
                    toast.update(toastBlurSend, { render: "error", type: "success", isLoading: false, autoClose: 1000,draggable: true});
                }
    )
       setOpenSavePopup(false)
        //axios.post("",)

    }
    return (
        <>
            <Popup open={openSavePopup} className={"editor-save-popup"} closeOnDocumentClick onClose={closeModal}>
                <div>
                    Guardar difuminado, este proceso no podra revertirse.
                    ¿Esta seguro de realizar la difuminación?
                    <div className={"yes-no-buttons"}>
                        <button className={"yes"} onClick={()=>sendToServer()}>SI</button>
                        <button className={"no"} onClick={closeModal}>NO</button>
                    </div>
                </div>

            </Popup>
        <div className="editor-container">



            <p className={"frame-selected"}>{frameSelected}</p>

            <ToastContainer />
            {!selectMode ?(
                <>
                    <div className={"prev-btn btn-navigation"} onClick={() => tridiRef.current.next()}><FaArrowRight/></div>
                    <div className={"next-btn btn-navigation"} onClick={() => tridiRef.current.prev()}><FaArrowLeft/></div>
                    <div className={"close-button"}><button onClick={()=>{
                        exitBlurMode()}}>Cerrar</button></div>
                </>

            ):null}

            {selectMode ? (
                <div className="editor-buttons">
                    {
                        Object.keys(savedCoordinates).includes((frameSelected+1).toString())
                        ? <button className={"remove"} onClick={()=>{
                                deleteSavedCoordinate()}}><BiTrash size={22}/></button>
                            : null
                    }

                    <button className={"cancel"} onClick={() => setSelectMode(false)}><BiX size={27}/></button>
                    <button className={"save"} onClick={()=>saveCoordinates()}><MdCheck size={25}/></button>
                </div>
            ) : (
                <div className={"bottom-butons-editor"}>

                    {
                        Object.keys(savedCoordinates).length>0
                        ?<div className={"save-button "} onClick={()=>setOpenSavePopup(true)}>
                                <BiSave size={25}></BiSave>
                            </div>
                            : null
                    }

                    {
                        /*
                        * <div className={"cancel-button"}>
                        <BiX size={27}></BiX>
                    </div>
                        * */
                    }




                <div
                    className="pin-button"
                    onClick={() => setSelectMode(!selectMode)}
                >
                    <BiCrop size={25}></BiCrop>

                </div>
                </div>
            )}

            <div className="editor">
                {selectMode ? (
                    <ReactCrop
                        crop={crop}
                        onChange={(c) => {
                            setCrop(c);
                        }}
                    >
                        <img ref={ref}
                            src={`https://3dmotores.com/ObjetosVirtuales/${idEditor}/frames_compresos/${frameSelected+1}.jpg`}
                            alt={"f"}
                        />
                    </ReactCrop>
                ) : null}

                <Tridi
                    ref={tridiRef}
                    className={`${selectMode ? "oculto" : "no-oculto"} editor-tridi`}
                    images={frames}
                    count={frames.length}
                    autoplaySpeed={70}
                    onFrameChange={(n) => {setFrameSelected(n); verifyFrame(n)}}
                    showStatusBar={true}

                />
            </div>
        </div>
        </>
    );
}
