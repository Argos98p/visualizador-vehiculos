 import './Home.css'
 import React from "react";
 import {

     Link
 } from "react-router-dom"
 import Timeline from "./timeline/Timeline";
const Home =  () =>{
    return (



        <>
          <div className='home-page-container '>
              <div className={'contenedor-flex row '}>
                  <div className={'titulo col-sm-12 col-md-5 col-lg-6 d-flex align-items-center flex-column justify-content-center '}>
                      <h1 className={'m-4'}>¿Como vender tu vehículo con 3d Motor's?</h1>
                      <p className={'m-4'}>Con 3D Motores, tienes la oportunidad de vender o exhibir tu vehículo de una manera completamente nueva y revolucionaria. Nuestra aplicación móvil y plataforma de comercio electrónico te ofrecen una experiencia única en la venta de automóviles. </p>
                      <p className={'m-4'}>Nuestra tecnología innovadora proporciona una experiencia de visualización inmersiva que supera las imágenes estáticas y los simples videos. Los compradores pueden examinar tu vehículo desde todos los ángulos, explorar su interior y apreciar cada característica con un nivel de detalle impresionante.</p>
                  </div>
                  <div className={'ilustracion-titulo col-sm-12 col-md-5 col-lg-6 d-flex align-items-center flex-column justify-content-center'}>
                      <img src='/vehiculo_principal.png' alt={'vehiculo'}/>
                  </div>
              </div>

              <div className={'contenedor-flex margintop-4 row '}>
                  <div className={'number m-4 left-0'}>1</div>
                  <div className={'ilustracion-titulo col-sm-12 col-md-5 col-lg-6  d-flex align-items-center flex-column justify-content-center'}>

                      <img className={'imagen-play m-4'} src='/3dmotorsPlay.png' alt={'vehiculo'}/>
                  </div>
                  <div className={'titulo col-sm-12 col-md-5 col-lg-6 d-flex align-items-center flex-column justify-content-center'}>
                      <h1 className={'m-4'}>Descarga la aplicación</h1>
                      <p className={'m-4'}> Para comenzar a aprovechar al máximo la experiencia de 3D Motores, te invitamos a descargar nuestra aplicación desde la Play Store de Google. Simplemente haz clic en el enlace a continuación y serás redirigido directamente a la página de descarga: </p>
                      <div className={'center m-4'}>
                          <img className={'imagen-play-button'} src='/getonplay.png' alt={'vehiculo'}/>
                      </div>
                  </div>
              </div>


              <div className={'contenedor-flex margintop-4 row'}>
                  <div className={'number m-4 right-0'}>2</div>
                  <div className={'titulo col-sm-12 col-md-5 col-lg-6 d-flex align-items-center flex-column justify-content-center'}>
                      <h1 className={'m-4'}>Registrate en la aplicación</h1>
                      <p className={'m-4'}>Al registrarte en la aplicación, accederás a un universo de herramientas y funciones exclusivas que te permitirán dar vida a tus vehículos.  Se enviará un mensaje de verificación al correo electrónico registrado. Haga clic en el enlace para validar su cuenta.</p>

                  </div>
                  <div className={'ilustracion-titulo col-sm-12 col-md-5 col-lg-6 d-flex align-items-center flex-column justify-content-center'}>

                      <img className={'imagen-play m-4'} src='/form.webp' alt={'vehiculo'}/>
                  </div>
              </div>

              <div className={'contenedor-flex margintop-4 row'}>
                  <div className={' ilustracion-titulo  col-sm-12 col-md-5 col-lg-6 d-flex align-items-center flex-column justify-content-center'}>
                      <img className={'imagen-play'} src='/vehiculos.png' alt={'marketa3D'}/>
                  </div>
                  <div  className={' col-sm-12 col-md-5 col-lg-6 d-flex align-items-center flex-column justify-content-center'}>
                      <p>Una cuenta de Marketa 3D se creará automáticamente.</p>
                  </div>

              </div>

              <div className={'contenedor-flex margintop-4 row'}>
                  <div className={'number left-0'}>3</div>
                  <div className={' ilustracion-titulo col-sm-12 col-md-5 col-lg-6 d-flex align-items-center flex-column justify-content-center'}>

                      <img className={'imagen-play m-4'} src='/autoos.webp' alt={'marketa3D'}/>
                  </div>
                  <div className={' titulo col-sm-12 col-md-5 col-lg-6 d-flex align-items-center flex-column justify-content-center'}>
                      <h1 className={'mt-4'}>Inicia sesión y comienza a crear tus autos</h1>
                      <div className={'my-4'}>Al iniciar sesión, tendrás acceso exclusivo para dar vida a tus ideas y crear los autos de tus sueños. Desde la selección de modelos hasta la personalización de detalles, aquí es donde comienza tu viaje hacia la creación de vehículos únicos y sorprendentes. ¡Prepárate para experimentar la libertad de diseño y la innovación automotriz en tus propias manos!</div>
                  </div>

              </div>
              <div className={'contenedor-flex margintop-4 row'}>
                  <div className={'number right-0'}>4</div>
                  <div className={' titulo col-sm-12 col-md-5 col-lg-6 d-flex align-items-center flex-column justify-content-center'}>
                      <h1 className={'m-4'}>Captura y añade cualquier tipo de detalles </h1>
                      <div className={'m-4'}> Agrega extras y crea hotspots interactivos con puntos de datos (PDs), videos y imágenes para resaltar los detalles más exclusivos de tu vehículo. </div>
                  </div>

                  <div className={'ilustracion-titulo  col-sm-12 col-md-5 col-lg-6 d-flex align-items-center flex-column justify-content-center'}>

                      <img className={'imagen-play m-4'} src='/detalles.webp' alt={'marketa3D'}/>
                  </div>


              </div>

              <div className={'contenedor-flex margintop-4 row'}>
                  <div className={'number left-0'}>5</div>

                  <div className={'ilustracion-titulo col-sm-12 col-md-5 col-lg-6 d-flex align-items-center flex-column justify-content-center'}>

                      <img className={'imagen-play m-4'} src='/marketapublicacion.png' alt={'marketa3D'}/>
                  </div>

                  <div className={'titulo col-sm-12 col-md-5 col-lg-6 d-flex align-items-center flex-column justify-content-center'}>
                      <h1 className={'m-4'}>Tu vehículo se publicará en Marketa 3D</h1>
                      <div className={'m-4'}>Simplificamos el proceso para que tu creación brille. Una vez finalizado, tu vehículo se publicará automáticamente en Marketa 3D, asegurando que esté disponible para que los entusiastas lo descubran y aprecien. Esto significa que tu diseño estará al alcance de una audiencia amplia y apasionada, lista para admirar y explorar tu vehículo. </div>
                  </div>




              </div>

          </div>
        </>
    );
}


export default  Home;