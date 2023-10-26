import "./estilo.css"
const CuentaVerificada = () => {
    return (
        <>
            <div className={'container-fluid cuenta-verificada  '}>
                <div className={'container rounded-4'}>
                    <div className={" rounded-4 header2 d-flex align-items-center justify-content-center flex-column"}>
                        <a href={'http://info.3dmotores.com'} >
                            <img className={"img2"} src={"/logo.png"} alt="logo "/>
                        </a>

                    </div>
                    <div>

                        <p className={"text-center2"}>¡Tu cuenta está verificada! Ahora, te guiaremos a través de cómo aprovechar al máximo la aplicación 3D MOTOR's. Podrás grabar, añadir hotspots y publicar tus creaciones en nuestro e-commerce de manera sencilla y efectiva.</p>
                        <p className={"text-center2"}><a href={"https://www.youtube.com/watch?v=ouxXyP89rcc"}>Ver video tutorial</a> </p>
                        <p className={"cerrar-ventana"}>Puedes cerrar esta ventana</p>

                    </div>
                </div>
            </div>


        </>
    );
}
export default CuentaVerificada;