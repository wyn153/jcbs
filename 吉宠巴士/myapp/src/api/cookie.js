export function getCookie(key){
    var cookie = document.cookie.split("; ");
    for(var i=0;i<cookie.length;i++){
        if(cookie[i].split("=")[0] === key){
            return cookie[i].split("=")[1];
        }
    }
    return "";
}

 export function removeCookie(key){
    setCookie(key, null, {
        expires:-1
    })
}

export function setCookie(key, val, ops){
    ops = ops || {};
    var p = ops.path ? ";path="+ops.path : "";
    var strD = "";
    if(ops.expires){
        var d = new Date();
        d.setDate(d.getDate()+ops.expires)
        strD = ";expires="+d
    }
    document.cookie = `${key}=${val}${p}${strD}`;
}