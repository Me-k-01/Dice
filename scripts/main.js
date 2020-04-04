
var historic = [];  // Variable global de l'historique des lancé


function RollSet() {
  /* Lancement d'une certaines quantité de dés*/
  var self = this;
  const cv  = document.getElementById('canvas');
  cv.width  = window.innerWidth  * 70 / 100;
  cv.height = window.innerHeight * 60 / 100;
  /* Stylisation du context 2D du canvas */
  const ctx = cv.getContext('2d');
  ctx.fillStyle = '#1d1d20';
  ctx.textAlign = "center";
  ctx.font = '1.5em serif';

  // Quantité de dé a lancer
  self.quantity = document.getElementById('quantity').value;
  // Nombre de Faces
  self.nSides = document.getElementById('faces').value;
  // Influence des echecs et reussite critiques sur le nombre total de lancé de dés.
  var critInfluence = document.getElementById('influence').checked;
  self.total = 0;
  self.list = [];  // Liste des dés obtenus

  self.draw = () => {
    let xInit, yInit, x, y;
    xInit = x = 30;
    yInit = y = 40;

    ctx.clearRect(0, 0, cv.width, cv.height); // On efface ce qu'il y avait avant

    for ( let i=0; i < self.list.length; i++) {
      let d = self.list[i];
      if ( x > cv.width-d.w ) {
        x = xInit;
        y += d.w;
      }
      d.draw(ctx, x, y);  // On dessine chacun des dés sur le canvas
      x += d.w;
    }

  };
  for ( let i=0; i<self.quantity; i++ ) {
    var d = new Dice(self.nSides);
    self.total += d.number;
    self.list.push(d);

    if (critInfluence) {
      if (d.number == 1) {
        self.quantity --;
      }
      if (d.number == self.nSides) {
        self.quantity ++;
      }
    }
  }

  /* Calcul */
  // Changement du dernier dé pour le Calcul
  var calc = document.getElementById("inputforcalc");
  if (calc != null) {
    calc.value = self.total;
  }

  update();





  self.avg = self.total / self.quantity;  // Moyenne des lancés
  self.draw();

}


function mkRoll(){
  historic.push(new RollSet());
}

function chgVal(type) {
  if ( type.endsWith('Slider') ) {
    document.getElementById(type).value = document.getElementById(type.substring(0, type.length - 6)).value;
  } else {
    document.getElementById(type).value = document.getElementById(type + 'Slider').value;
    mkRoll();
  }
}
