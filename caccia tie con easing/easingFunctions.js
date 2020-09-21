//prima di usare queste funzioni dovete inserire nel file html 
//la libreria Zdog. Altrimenti customEaseInOut non funzionerà.

function customEaseInOut(alpha, power, start, end){
    return Zdog.easeInOut(alpha, power)*(end-start) + start;
}

//rispetto al video ho aggiunto i controlli sul valore di alpha
//Con questa implementazione se alpha >= 1, la funzione restituirà in ogni caso end
//mentre se alpha <= 0, la funzionerà restituirà sempre start

function customEaseIn(alpha, power, start, end){
    if (alpha > 1) {
        return end;
    }
    if (alpha < 0){
        return start;
    }
    return Math.pow(alpha, power)*(end-start)+start;
}

function linearEase(alpha, start, end){
    if (alpha > 1) {
        return end;
    }
    if (alpha < 0){
        return start;
    }
    return alpha*(end-start)+start;
}
