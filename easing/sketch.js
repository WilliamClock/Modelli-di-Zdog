
//COLORI
const rosso = 'rgb(256,0,0)';
const verde = 'rgb(0,256,0)';
const blu = 'rgb(0,0,256)';

//ILLUSTRATION TRASLATO DI 100 SULL'ASSE Y E SULL'ASSE X

const illo = new Zdog.Illustration({
    element: '.zdog-canvas',
    zoom: 3,
    translate: { y: 100, x: -100 }
});

//ANIMAZIONE

let ticker = 0; //quante volte è stata eseguita la funzione animate dall'inizio dell'animazione.
const cycleCount = 300; //quante volte la funzione animate deve essere eseguita affiché l'animazione termini.

//ticker <= cycleCount

function customEaseInOut(alpha, power, start, end){
    return Zdog.easeInOut(alpha, power)*(end-start) + start;
}

function customEaseIn(alpha, power, start, end){
    return Math.pow(alpha, power)*(end-start) + start;
}

function animate() {

    const alpha = ticker/cycleCount;

    //calcolo ease
    
    const ease = customEaseIn(alpha, 2, 50, 200);
    const ease3 = customEaseIn(alpha, 3, -30, 200);
    const ease5 = customEaseIn(alpha, 5, 200, 50);

    //disegno nuovi cerchietti

    new Zdog.Ellipse({
        addTo: illo,
        diameter: 2,
        fill: true,
        color: rosso,
        translate: { x: ticker, y: -ease }
    });

    new Zdog.Ellipse({
        addTo: illo,
        diameter: 2,
        fill: true,
        color: verde,
        translate: { x: ticker, y: -ease3 }
    });

    new Zdog.Ellipse({
        addTo: illo,
        diameter: 2,
        fill: true,
        color: blu,
        translate: { x: ticker, y: -ease5 }
    });

    ticker++;
    if (ticker > cycleCount) {
        ticker = 0;
    }

    illo.updateRenderGraph();
    requestAnimationFrame(animate);
}
animate();