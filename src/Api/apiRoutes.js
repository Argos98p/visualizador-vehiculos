let BaseURL="https://3dmotores.com";


/*
function statusEsceneUrl(id,escenaNombre){
    return `${BaseURL}:8084/api/objects/getstatusescene?idobjeto=${id}&nombre_escena=${escenaNombre}`
}*/

function infoObjectUrl(id){
    return `${BaseURL}/objects/getobject?idobjeto=${id}`;
}

function logoEmpresaImage(idUser){
    return `${BaseURL}/ObjetosVirtuales/usuarios/${idUser}/${idUser}.jpg`
}

/*
function numberFramesInScene(id,escena){
    return `${BaseURL}:8084/api/objects/getnumberframes?idobjeto=${id}&nombre_escena=${escena}`
}*/

function completeImageUrl(path){
    return `${BaseURL}/ObjetosVirtuales${path}`;
}
function blurImages(){
    return `${BaseURL}/objects/censorimages`;
}

function getExtrasUrl(id){
    return `${BaseURL}/objects/getextras?idobjeto=${id}`
}

function ImagePath(pathImage){
    
    return `${BaseURL}/ObjetosVirtuales/${pathImage}`;
}


function  postAddHotspot(id,nombreEscena,idUsuario){
    return `${BaseURL}/objects/addhotspot?idobjeto=${id}&nombre_escena=${nombreEscena}&idusuario=${idUsuario}`;
}

function deleteExtra(idObjeto,idExtra,idUsuario){
    return `${BaseURL}/objects/deleteextra?idobjeto=${idObjeto}&idextra=${idExtra}&idusuario=${idUsuario}`;
}

function uploadExtraUrl(id,archivo,descripcion,idUsuario){
    return `${BaseURL}/objects/addextra/imagen?idobjeto=${id}&archivo=${archivo}&descripcion=${descripcion}&tipo=extra&idusuario=${idUsuario}`;
}

function img360CompleteUrl(path,id){
    return `${BaseURL}/ObjetosVirtuales${path}?${new Date().getTime().toString}`;
}
function getHotspots(id, nombreEscena){
    return `${BaseURL}/objects/gethotspots?idobjeto=${id}&nombre_escena=${nombreEscena}`
}

function deleteHotspot(id, nombreEscena,nombreHotspot,idUsuario){
    return `${BaseURL}/objects/deletehotspot?idobjeto=${id}&nombre_escena=${nombreEscena}&nombreHotspot=${nombreHotspot}&idusuario=${idUsuario}`
}
function addExtraPdf(id,nombre_doc,titulo, descripcion,idUsuario){
    return `${BaseURL}/objects/addextra/pdf?idobjeto=${id}&archivo=${nombre_doc}&titulo=${titulo}&descripcion=${descripcion}&tipo=hotspot&idusuario=${idUsuario}`;
}

function addLinkYoutube(id,nombreArchivo, link, titulo,descripcion,idUsuario){
    return `${BaseURL}/objects/addextra/link?idobjeto=${id}&nombre=${nombreArchivo}&tipo=hotspot&link=${link}&titulo=${titulo}&descripcion=${descripcion}&idusuario=${idUsuario}`;
}
function getPDF(id,path){
    return `${BaseURL}/images/getresource?path=${path}`
}

function viewResource(id,path){
    
    return `${BaseURL}/ObjetosVirtuales/${path}`;
    //return `${BaseURL}/images/viewresource/pdf?path=${path}`
}

function verificaToken(idUser){
    return `${BaseURL}/objects/verificacion?idusuario=${idUser}`;
}

function loginUser(){
    return `${BaseURL}:8086/api/auth/signin`
}
export {blurImages,logoEmpresaImage,verificaToken,viewResource,loginUser,addLinkYoutube,img360CompleteUrl,getPDF,addExtraPdf,deleteHotspot,uploadExtraUrl,infoObjectUrl,getHotspots,completeImageUrl,getExtrasUrl,ImagePath,postAddHotspot,deleteExtra}