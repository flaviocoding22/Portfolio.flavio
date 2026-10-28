// Trecho do núcleo do jogo (index.html do repositório GeoLinkage): as fases,
// a cinemática do mecanismo de 4 barras e a pontuação do encaixe.
// Origem do mecanismo: pino da manivela em (250, 400) e pino do seguidor em (550, 400).

const FASES = [
    { nome:"Formato de feijão",
      alvo:{ manivela:80, acoplador:200, seguidor:260, aoLongo:160, paraOLado:120 },
      inicio:{ manivela:80, acoplador:250, seguidor:200, aoLongo:125, paraOLado:80 }, limite:15 },
    { nome:"Asa fina",
      alvo:{ manivela:60, acoplador:300, seguidor:300, aoLongo:100, paraOLado:-140 },
      inicio:{ manivela:100, acoplador:200, seguidor:200, aoLongo:150, paraOLado:80 }, limite:15 },
    { nome:"Desvie da zona proibida",
      alvo:{ manivela:100, acoplador:180, seguidor:240, aoLongo:250, paraOLado:90 },
      inicio:{ manivela:80, acoplador:250, seguidor:200, aoLongo:125, paraOLado:80 }, limite:15,
      zona:{ x:480, y:400, r:35 } },
];
let faseAtual = 0, fase = null, alvo = [];

// ---- cinemática pura ----
function acharB(ax, ay, ox, oy, b, c) {
    const dx = ox-ax, dy = oy-ay, D = Math.sqrt(dx*dx+dy*dy);
    if (D > b+c || D < Math.abs(b-c)) return null;
    const aDist = (b*b-c*c+D*D)/(2*D), h = Math.sqrt(b*b-aDist*aDist);
    const mx = ax+aDist*dx/D, my = ay+aDist*dy/D;
    return { x: mx+h*dy/D, y: my-h*dx/D };
}
function gerarCurva(manivela, acoplador, seguidor, aoLongo, paraOLado) {
    const pts = [];
    for (let g = 0; g <= 360; g += 2) {
        const ang = g*Math.PI/180;
        const ax = 250 + manivela*Math.cos(ang), ay = 400 - manivela*Math.sin(ang);
        const B = acharB(ax, ay, 550, 400, acoplador, seguidor);
        if (!B) continue;
        const ex = (B.x-ax)/acoplador, ey = (B.y-ay)/acoplador;
        pts.push({ x: ax+aoLongo*ex+paraOLado*(-ey), y: ay+aoLongo*ey+paraOLado*ex });
    }
    return pts;
}
function distanciaMedia(A, B) {
    let soma = 0;
    for (const p of A) {
        let melhor = Infinity;
        for (const q of B) { const d=(p.x-q.x)**2+(p.y-q.y)**2; if (d<melhor) melhor=d; }
        soma += Math.sqrt(melhor);
    }
    return soma / A.length;
}
function pontuar(A, B) {
    if (A.length === 0 || B.length === 0) return Infinity;
    return (distanciaMedia(A,B) + distanciaMedia(B,A)) / 2;
}
