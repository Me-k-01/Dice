
function Dice (nMax = 6) {
  var self = this;
  nMax = parseInt(nMax, 10);
  self.number = Math.trunc( Math.random() * nMax ) + 1;  // Face visible du dé

  switch (self.number) {
    case 1:
      self.state = "Fail";
      break;
    case nMax:
      self.state = "Success";
      break;
    default:
      self.state = "Default";
  }

  self.draw = (ctx, x, y) => {
    switch (self.state) {
      case "Fail":
        ctx.fillStyle = "#EEE111";
        break;
      case "Success":
        ctx.fillStyle = "#111EEE";
        break;
      default:
        ctx.fillStyle = "#AAAAAA";

    }

    ctx.fillText(self.number, x, y);
  };
}
