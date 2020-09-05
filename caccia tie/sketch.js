const grigio = 'rgb(120,120,120)';
const grigioScuro = 'rgb(100,100,100)';
const nero = 'rgb(0,0,0)';
const rosso = 'rgb(153, 51, 51)';

const TAU = Zdog.TAU;

const illo = new Zdog.Illustration({
    element: '.zdog-canvas',
    zoom: 3,
    dragRotate: true
});

//il corpo centrale della navicella
const sfera = new Zdog.Shape({
    addTo: illo,
    stroke: 60,
    color: grigio
});

//ali, per non avere problemi di z-fighting creo un gruppo in modo da poter decidere l'ordine di render
//creare un gruppo e collegare tutti gli elementi dell'ala al gruppo mi permette di spostare tutti
//gli elementi dell'ala in un sol colpo

const gruppoAla = new Zdog.Group({
    addTo: illo,
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

//la linea che collega i vertici dell'esagono
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

//copio l'ala usando copyGraph (che è diverso da copy)
//copyGraph copia la forma e tutti i suoi discendenti
//copy copia solo la forma

gruppoAla.copyGraph({
    translate: { x: 55 }
});

//asse che collega le due ali
const asse = new Zdog.Shape({
    addTo: illo,
    path: [
        { x: -55 }, // start at 1st point
        { x: 55 }, // line to 2nd point
    ],
    stroke: 15,
    color: grigio,
});

//FINESTRINO

//come per le ali anche qui, per gli stessi motivi, creo un gruppo per gli
//elementi del finestrino

const gruppoFinestrino = new Zdog.Group({
    addTo: illo,
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

//linea che collega l'ottagono con la cornice
const lineaFinestrino = new Zdog.Shape({
    addTo: gruppoFinestrino,
    path: [
        { y: 7 }, // start at 1st point
        { y: 15 }, // line to 2nd point
    ],
    stroke: 2,
    color: grigioScuro,
});

//per scrivere meno righe di codice, scrivo un for che genera le linee della finestra
for (let i = TAU / 8; i < TAU; i += TAU / 8) {
    lineaFinestrino.copy({
        rotate: { z: i }
    });
}


function animate() {
    illo.updateRenderGraph();
    requestAnimationFrame(animate);
}
animate();