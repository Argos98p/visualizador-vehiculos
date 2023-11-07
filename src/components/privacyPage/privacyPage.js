import "./estilo.css"
import {useTranslation} from "react-i18next";

const PrivacyPage = () => {
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
                        <p className={"text-center2-privacy m-30"}>{t("privacy.title")}</p>
                        <p className={"text-center2-privacy m-30"}>{t("privacy.LastUpdated")}</p>
                        <p className={"text-center2-privacy m-30"}>{t("privacy.Introduction")}</p>
                        <p className={"text-center2-privacy bold m-30"}>{"1. "+t("privacy.InformationWeCollect.title")}</p>
                        <p className={"text-center2-privacy m-left"}>{"a. "+t("privacy.InformationWeCollect.InformationYouProvide")}</p>
                        <p className={"text-center2-privacy m-left"}>{"b. "+t("privacy.InformationWeCollect.LocationInformation")}</p>

                        <p className={"text-center2-privacy bold m-30"}>{"2. "+t("privacy.HowWeUseYourInformation.title")}</p>
                        <p className={"text-center2-privacy m-30"}>{t("privacy.HowWeUseYourInformation.description")}</p>
                        <p className={"text-center2-privacy m-left"}>{"a. "+t("privacy.HowWeUseYourInformation.ProvidingMaintainingImproving")}</p>
                        <p className={"text-center2-privacy m-left"}>{"b. "+t("privacy.HowWeUseYourInformation.ProcessingStoringContent")}</p>
                        <p className={"text-center2-privacy m-left"}>{"c. "+t("privacy.HowWeUseYourInformation.CensoringContent")}</p>

                        <p className={"text-center2-privacy bold m-30"}>{"3. "+t("privacy.SharingYourInformation.title")}</p>
                        <p className={"text-center2-privacy m-30"}>{t("privacy.SharingYourInformation.description")}</p>
                        <p className={"text-center2-privacy m-left"}>{"a. "+t("privacy.SharingYourInformation.WithServiceProviders")}</p>
                        <p className={"text-center2-privacy m-left"}>{"b. "+t("privacy.SharingYourInformation.WithThirdParties")}</p>
                        <p className={"text-center2-privacy m-left"}>{"c. "+t("privacy.SharingYourInformation.LegalRequirements")}</p>

                        <p className={"text-center2-privacy bold m-30"}>{"4. "+t("privacy.LocationInformation.title")}</p>
                        <p className={"text-center2-privacy m-30"}>{t("privacy.LocationInformation.description")}</p>

                        <p className={"text-center2-privacy bold m-30"}>{"5. "+t("privacy.PaymentInformation.title")}</p>
                        <p className={"text-center2-privacy m-30"}>{t("privacy.LocationInformation.description")}</p>

                        <p className={"text-center2-privacy bold m-30"}>{"6. "+t("privacy.Security.title")}</p>
                        <p className={"text-center2-privacy m-30"}>{t("privacy.LocationInformation.description")}</p>

                        <p className={"text-center2-privacy bold m-30"}>{"7. "+t("privacy.ChangesToPrivacyPolicy.title")}</p>
                        <p className={"text-center2-privacy m-30"}>{t("privacy.LocationInformation.description")}</p>
                        {/* <p className={"cerrar-ventana"}>{t("correo-cuenta-verificada.cerrar-ventana")}</p> */}

                    </div>
                </div>
            </div>


        </>
    );
}
export default PrivacyPage;