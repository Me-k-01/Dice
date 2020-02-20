
function Dice (nMax = 6) {
  var self = this;
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
        ctx.fillStyle = "AAA111";
        break;
      case "Success":
        ctx.fillStyle = "#111AAA";
        break;
      default:
        ctx.fillStyle = "#AAAAAA";

    }

    ctx.fillRect(x, y, 10, 10);
    ctx.fillText(self.number, x+5, y+5);
  };
}
