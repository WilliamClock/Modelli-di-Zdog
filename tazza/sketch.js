const tazza = new Zdog.Illustration({
  element: '.zdog-canvas',
  dragRotate: true,
  zoom: 2,
});

//Creo il manico, un arco

const manico = new Zdog.Shape({
    addTo: tazza,
    path: [
        { x: 0, y: 0 },   // start
        { arc: [
            { x:  25, y: -10 }, // corner
            { x:  35, y:  20 }, // end point
        ]},
        { arc: [
            { x:  44, y: 60 }, // corner
            { x:  0, y:  70 }, // end point
        ]}
      ],
      translate: {x: 35, y: -30},
      closed: false,
      stroke: 20,
      color: '#ffccff'
});

//Il corpo della tazza è un Cilindro
const cilindro = new Zdog.Cylinder({
    addTo: tazza,
    diameter: 80,
    length: 120,
    stroke: false,
    color: '#ffccff',
    backface: '#ffccff',
    frontFace: '#ff9933',
    rotate: {x: Zdog.TAU/4}
  });

//occhi
const occhio = new Zdog.Shape({
    addTo:tazza,
    stroke:5,
    translate: {z:35, x:15, y:-5}
})

const occhio2 = occhio.copy({
    translate: {z:35, x:-15, y:-5}
});

//bocca
const bocca = new Zdog.Ellipse({
    addTo: tazza,
    diameter: 10,
    quarters: 2,
    stroke: 3,
    color: '#C25',
    rotate: {z:Zdog.TAU/4},
    translate: {z:40}
});

//fumo che esce dalla tazza
const ancoraFumo = new Zdog.Anchor({
    addTo: tazza,
    translate: {y: -40},
})

const fumo1 = new Zdog.Shape({
    addTo: ancoraFumo,
    path: [
        {x: 0, y: 0},
        {arc: [
            { x:  -17, y: 0 }, // corner
            { x:  -17, y:  -20 }, // end point
        ]},
        {arc: [
            {x: -17, y: -40},
            {x: 0, y: -40}
        ]},
        {arc: [
            { x:  17, y: -40 }, // corner
            { x:  17, y:  -60 }, // end point
        ]},
        {arc: [
            {x: 17, y: -80},
            {x: 0, y: -80}
        ]}
    ],
    translate: {x: 35, y: -30},
    closed: false,
    stroke: 5,
    color: '#ff9966'
})

const fumo2 = fumo1.copy({
    translate: {x: -20, y: -30}
});

function animate() {
  tazza.updateRenderGraph();
  requestAnimationFrame( animate );
}

animate();
