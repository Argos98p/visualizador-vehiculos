import Popup from 'reactjs-popup';
import React, {useEffect, useState, useRef, memo} from 'react';
import 'reactjs-popup/dist/index.css';
import '../modal.css';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import {ImagePath, getExtrasUrl} from '../../Api/apiRoutes'
import Form from 'react-bootstrap/Form';
import AddYoutubeVideo from "./AddYoutubeVideo";
import AddVinculateExtra from "./AddVinculateExtra";
import AddPdf from "./AddPdf";
import Dropzone from "react-dropzone";

const  PopupNewHotspot =({id, extras,handleCreateHotspot, handleCreateHotpotsExtra,addPdfVis}) =>{

    const [imageSelected, setImageSelected] = useState(null);
    const [noImageSelected, setNoImageSelected] = useState(false);
    const [open, setOpen] = useState(false);
    const [isEmpty, setIsEmpty] = useState(true);
    const [nameValue, setNameValue] = useState("");
    const [extraType, setExtraType] = useState("video_youtube");
    const [acceptedFiles,setAcceptedFiles] = useState([])

    //const [extras, setExtras] = useState([])
    /*
        useEffect(() => {
            console.log('render tirir')
            axios.get(getExtrasUrl(id))
                .then((response)=>{
                        if(response.status===200){
                            console.log(response.data)
                            setExtras(response.data)
                        }else{
                            console.log('error al recibir las imagenes');
                        }
                    }
                ).catch(error => {
                if(error.response){
                    console.log(error.response);
                }else if(error.request){
                    console.log(error.request)
                }else{
                    console.log('Error ',error.message);
                }
                console.error("Error obteniendo las imagenes:"+error);
                setExtras([]);
            });
        }, []);
*/

    function handleClickOnImageModal(event, item){
      if(imageSelected===item)
      {
        setImageSelected(null)
      }else{
        setImageSelected(item)
      }
    }


    function onCrear(){

        if(extraType==="video_youtube"){
            console.log('vidio')
            handleCreateHotpotsExtra('youtube',acceptedFiles[0]);
        }else if(extraType ==="vincular_extra"){
            console.log('extra')
            handleCreateHotpotsExtra();

        }else if(extraType ==="pdf"){
            console.log('pdf')
            handleCreateHotpotsExtra("pdf",acceptedFiles[0]);
        }
    }

/*
    function onCrear(image,input){
      console.log(imageSelected);
      console.log(input);

      //FUNCION PARA CONTROLAR SELECCION DE EXTRAS
      if(image === null || nameValue === ""){
        if (image === null){
          console.log('la imagen es nula');
        }
        if(nameValue ===""){
          console.log('El nombre esta en blanco');
        }
      }else{
        console.log('todo ok');

        handleCreateHotspot(imageSelected,nameValue)
        setOpen(false);
        setImageSelected(null)
        setNameValue("")
      }
    }
*/

    function onClickHotspotPopup(){
      setOpen(true)
    }

    function onCancelHotspotModal(){
      setOpen(false)
      setNameValue("");
      setImageSelected(null)
    }

    function onChangeInput(nombreHotspot){
        setNameValue(nombreHotspot.target.value)
    }



    const loadPopupContent=()=>{
        if(extraType==="video_youtube"){
            return <AddYoutubeVideo addPdfVis={addPdfVis}></AddYoutubeVideo>
        }
        if(extraType==="vincular_extra"){
            return <AddVinculateExtra extras={extras}></AddVinculateExtra>;
        }
        if(extraType==="pdf"){
            let baseStyle = {
                marginTop:'10px',
                marginBottom:'10px',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px',
                borderWidth: 2,
                borderRadius: 2,
                borderColor: '#eeeeee',
                borderStyle: 'dashed',
                backgroundColor: '#343535',
                color: '#bdbdbd',
                outline: 'none',
                transition: 'border .24s ease-in-out'
            };
            const style = {
                ...baseStyle,
            }

            return <Dropzone onDrop={acceptedFiles => setAcceptedFiles(acceptedFiles)} >

                {({getRootProps, getInputProps}) => (
                    <section>
                        <aside>
                            {acceptedFiles.map(file => (
                            <li key={file.path}>
                                {file.path} - {file.size} bytes
                            </li>))}
                        </aside>

                        <div {...getRootProps({style})}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                    </section>
                )}
            </Dropzone>
           /* return  <AddPdf></AddPdf>*/
        }
    }


    return (
      <>
    <button className="button-option"  onClick={onClickHotspotPopup}>Hotspot</button>
    <Popup
    onClose={onCancelHotspotModal}
    open={open}
        modal
        nested >
        {
      }


<div className="modalp">
                    <div className="header"> Añadir hotspot </div>
                    Seleccione el tipo de extra
                    <div className="content-popup">
                        <div className="buttons-type-hotspots">
                            <button className="button-option" onClick={()=>setExtraType("vincular_extra")}>Vincular con extra</button>
                            <button className="button-option" onClick={()=>setExtraType("video_youtube")}>Video de Youtube</button>
                            <button className="button-option" onClick={()=>setExtraType("pdf")}>PDF</button>
                        </div>

                        {loadPopupContent()}

                        {<div className='container-lista-extras'>
                            {/*<div>Seleccione un extra</div>*/}
                            {/* <div className='lista-extras'>
                          {

                             extras.map((item, index) => (
                                 <div className='imagen-modal-container ' key={index}>
                                   <figure onClick={(event) => handleClickOnImageModal(event,item)}>
                                   <img className={`imagen-modal  ${
                                     item===imageSelected
                                     ? "image-modal-selected" : ""
                                   }`} src={ImagePath(item.imagen.path)}  />
                                        <figcaption>
                                         {item.nombre}
                                        </figcaption>
                                  </figure>
                                 </div>
                            ))
                          }

                      </div>*/}


                      { /*imageSelected === null
                            ? <p>Esta opcion es obligatoria</p>
                            : null
                          */}

    </div>}


                        {/*<div className='container-input-hotspot'>
                          <Form.Label htmlFor="inputPassword5">Ingrese una etiqueta</Form.Label>
                          <Form.Control  type="text" required onChange={onChangeInput} autoComplete="off" id="inputPassword5" aria-describedby="passwordHelpBlock"/>
                          {
                              isEmpty
                                  ? <Form.Text id="passwordHelpBlock" muted >
                                      Este campo es obligatorio
                                  </Form.Text>
                                  : null
                          }
                          <br></br>
                          <Form.Text id="passwordHelpBlock" muted>
                              Se permite un maximo de 20 caracteres
                          </Form.Text>
                      </div>*/}
                    </div>


                    <div className="actions">
                    <button className="button-option"
                    disabled={false/*
                      //FUNCION PARA CONTROLAR SELECCION DE EXTRAS
                      !!(imageSelected === null ||  nameValue === "")*/
                    }

                    onClick={()=>{ onCrear() }}
                    >Crear</button>
                    <button onClick={onCancelHotspotModal}>Cancelar</button>
                    </div>
                  </div>
              </Popup>
              </>
    );
    }

export default PopupNewHotspot