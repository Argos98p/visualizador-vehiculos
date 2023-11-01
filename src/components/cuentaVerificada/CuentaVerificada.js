import "./estilo.css"
import {useTranslation} from "react-i18next";

const CuentaVerificada = () => {
    const {t,i18n} = useTranslation("global");
    const lenguaje = navigator.language || navigator.userLanguage;
    let idioma = lenguaje.split("-")[0];

    if(idioma==='es'){
        i18n.changeLanguage('es');
    }else{
        i18n.changeLanguage('en');
    }
    console.log(idioma);
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

                        <p className={"text-center2"}>{t("correo-cuenta-verificada.cuenta-verificada")}</p>
                        <p className={"text-center2"}><a href={"https://www.youtube.com/watch?v=ouxXyP89rcc"}>{t("correo-cuenta-verificada.video-tutorial")}</a> </p>
                        <p className={"cerrar-ventana"}>{t("correo-cuenta-verificada.cerrar-ventana")}</p>

                    </div>
                </div>
            </div>


        </>
    );
}
export default CuentaVerificada;