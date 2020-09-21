const grigio = 'rgb(120,120,120)';
const grigioScuro = 'rgb(100,100,100)';
const nero = 'rgb(0,0,0)';
const rosso = 'rgb(153, 51, 51)';
const rossoPianeta = 'rgb(153, 0, 0)';

const TAU = Zdog.TAU;

const illo = new Zdog.Illustration({
    element: '.zdog-canvas',
    zoom: 3,
    dragRotate: true
});

//pianeta

const pianeta = new Zdog.Shape({
    addTo: illo,
    stroke: 50,
    color: rossoPianeta,
  });

const anelloPianeta = new Zdog.Ellipse({
    addTo: illo,
    diameter: 70,
    stroke: 10,
    rotate: {x: TAU/6},
    color: rossoPianeta,
  });

//animazione caccia tie

const ancoraRuotata = new Zdog.Anchor({
    addTo: illo,
    rotate: {z: TAU/12}
});

const ancoraRotante = new Zdog.Anchor({
    addTo: ancoraRuotata
});

const ancoraCacciaTie = new Zdog.Anchor({
    addTo: ancoraRotante,
    translate: {x : 150}
});

//caccia tie

const sfera = new Zdog.Shape({
    addTo: ancoraCacciaTie,
    stroke: 60,
    color: grigio
});

//ali

const gruppoAla = new Zdog.Group({
    addTo: ancoraCacciaTie,
    rotate: { z: TAU / 4, y: TAU / 4 },
    translate: { x: -55 }
});

const alaInterna = new Zdog.Polygon({
    addTo: gruppoAla,
    radius: 55,
    sides: 6,
    stroke: 15,
    fill: true,
    color: nero,
});

const ala = new Zdog.Polygon({
    addTo: gruppoAla,
    radius: 60,
    sides: 6,
    stroke: 15,
    color: grigio,
});

const lineaAla = new Zdog.Shape({
    addTo: gruppoAla,
    path: [
        { y: -50 }, // start at 1st point
        { y: 50 }, // line to 2nd point
    ],
    stroke: 15,
    color: grigio,
});

lineaAla.copy({
    rotate: { z: Zdog.TAU / 3 }
})

lineaAla.copy({
    rotate: { z: -Zdog.TAU / 3 }
})

//copio l'ala
gruppoAla.copyGraph({
    translate: { x: 55 }
});

//asse che collega le due ali
const asse = new Zdog.Shape({
    addTo: ancoraCacciaTie,
    path: [
        { x: -55 }, // start at 1st point
        { x: 55 }, // line to 2nd point
    ],
    stroke: 15,
    color: grigio,
});

//FINESTRINO

const gruppoFinestrino = new Zdog.Group({
    addTo: ancoraCacciaTie,
    translate: { z: 25 }
});

const vetroFinestrino = new Zdog.Ellipse({
    addTo: gruppoFinestrino,
    diameter: 32,
    stroke: 6,
    fill: true,
    color: rosso,
});

const corniceFinestrino = new Zdog.Ellipse({
    addTo: gruppoFinestrino,
    diameter: 35,
    stroke: 6,
    color: grigioScuro,
});

const ottagonoFinestrino = new Zdog.Polygon({
    addTo: gruppoFinestrino,
    radius: 7,
    sides: 8,
    stroke: 2,
    color: grigioScuro,
});

const lineaFinestrino = new Zdog.Shape({
    addTo: gruppoFinestrino,
    path: [
        { y: 7 }, // start at 1st point
        { y: 15 }, // line to 2nd point
    ],
    stroke: 2,
    color: grigioScuro,
});

for (let i = TAU / 8; i < TAU; i += TAU / 8) {
    lineaFinestrino.copy({
        rotate: { z: i }
    });
}

//ANIMAZIONE

//le funzioni di easing le trovate nel file easingFunctions.js, ho apportato alcune modifiche rispetto
//a quelle presentate nel video

let ticker = 0; //quante volte è stata eseguita la funzione animate dall'inizio dell'animazione.
const cycleCount = 3000; //quante volte la funzione animate deve essere eseguita affiché l'animazione termini.

//ticker <= cycleCount

function animate() {

    const alpha = ticker/cycleCount;

    //ruoto il caccia tie usando un ease-in-out
    ancoraRotante.rotate.y = customEaseInOut(alpha, 3, 0, 10*TAU);
    //mentre ruoto l'intera scena usando un easing lineare
    illo.rotate.y = linearEase(alpha, 0, 2*TAU);

    ticker++;
    if (ticker > cycleCount) {
        ticker = 0;
    }

    illo.updateRenderGraph();
    requestAnimationFrame(animate);
}
animate();