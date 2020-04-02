
function Dice (nMax = 6) {
  var self = this;
  nMax = parseInt(nMax); // Nombre de Face
  self.number = Math.trunc( Math.random() * nMax ) + 1;  // Face visible du dé
  self.w = 100; // taille de l'image du dé.

  switch (self.number) {
    case 1:
      self.state = "Fail";
      break;
    case nMax:
      self.state = "Success";
      break;
    default:
      self.state = "";
  }

  switch (nMax) {
    case 6:
      self.shape = "rect";
      break;
    case 4:
      self.shape = "oct"; //TODO: triangle
      break;
    default:
      self.shape = "oct";
  }

  self.draw = (ctx, x, y) => {
    ctx.drawImage(document.getElementById(self.shape + self.state), x, y, self.w, self.w);
    ctx.fillText(self.number, x+self.w/2, y+self.w/2+3);
  };
}
