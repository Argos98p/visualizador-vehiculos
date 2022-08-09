function statusEsceneUrl(id,escenaNombre){
    return `http://redpanda.sytes.net:8084/api/objects/getstatusescene?idobjeto=${id}&nombre_escena=${escenaNombre}`
}

function infoObjectUrl(id){
    return `http://redpanda.sytes.net:8084/api/objects/getobject?idobjeto=${id}`;
}

function numberFramesInScene(id,escena){
    return `http://redpanda.sytes.net:8084/api/objects/getnumberframes?idobjeto=${id}&nombre_escena=${escena}`
}

function completeImageUrl(path){
    return `http://redpanda.sytes.net:8085/api/images/getimage?path=${path}`;
}

function getExtrasUrl(id){
    return `http://redpanda.sytes.net:8084/api/objects/getextras?idobjeto=${id}`
}

export {statusEsceneUrl,infoObjectUrl,numberFramesInScene,completeImageUrl,getExtrasUrl}