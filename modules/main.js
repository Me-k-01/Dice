

function RollSet () {
  /* Objet de lancé de dés*/
  var self = this;
  const cv  = document.getElementById('canvas');
  const ctx = cv.getContext('2d');

  self.quantity = document.getElementById('quantity').value;
  self.nFaces = document.getElementById('faces').value;  // Nombre de Faces
  self.total = 0;

  self.list = [];  // Liste des dés obtenus

  self.draw = () => {
    ctx.clearRect(0, 0, cv.width, cv.height); // On efface ce qu'il y avait avant

    for ( let i=0; i < self.list.length; i++) {
      let d = self.list[i];
      d.draw(ctx, i*50, 100);  // On dessine chacun des dés sur le canvas
    }
  };

  for ( let i=0; i<self.quantity; i++ ) {
    let d = new Dice(self.nFaces);
    self.total += d.number;

    self.list.push(d);

  }

  self.avg = self.total / self.quantity;  // Moyenne des lancés
  self.draw();

}

var historic = [];

function mkRoll(){
  historic.push(new RollSet());

}
