
var characters = {
  pouppy: {
    adress: 60,
    strength: 50
  },
  simon: {
    adress: 70,
    strength: 70
  },
  whistleston: {
    adress: 50,
    strength: 30
  }
};

var weapons = {
  pistol: {
    damage: 20,
    penetration: 10
  },
  shotgun: {
    damage: 200,
    penetration: 10
  },
  fist : {
    damage: 5,
    penetration: 1
  },
  electrode : {
    damage: 10,
    penetration: 2
  },
  knife : {
    damage: 5,
    penetration: 5
  },
  butt : {
    damage: 7,
    penetration: 1
  }
};




function update() {
  /* On update tout changement eventuel des input pour l'affichage des inputs accordées*/

  var characterName = document.getElementById("character").value;
  var action = document.getElementById("action").value;
  var diceInput = document.getElementById("inputforcalc");
  var distanceInput = document.getElementById("distance");
  var output = document.getElementById("output");
  var distance = distanceInput.value;

  var selWeapDist = document.getElementById("weapondist");
  var selWeapCac  = document.getElementById("weaponcac");

  // On reinitialise l'etat d'affichage de tout ce qui peut changer
  selWeapDist.style.display = "none";
  selWeapCac.style.display = "none";
  distanceInput.style.display = "none";
  diceInput.style.display = "none";
  diceInput.placeholder = "Jet de dés";
  output.innerHTML = "Réponse";

  var character;

  if (characterName) {
    character = characters[characterName];
  }

  switch (action) {
    case "aim": // Cas pour savoir si l'on touche l'ennemie
      selWeapDist.style.display = "";
      distanceInput.style.display = "";
      diceInput.placeholder = "D100";
      diceInput.style.display = "";

      // Si on a déjà choisi une arme
      if (selWeapDist.value) {
        let bonus = 0;
        if ( selWeapDist.value == "shotgun" ){ bonus = 10; }
        if ( ! character ) { return; }

        if (aim(diceInput.value, character.adress, distance, bonus)) {
          // Si on a touché
          output.innerHTML = "Touché";
        } else {
          output.innerHTML = "Louppé";
        }
      }
      break;

    case "damageDist":
      selWeapDist.style.display = "";
      var str = 1;
      if ( selWeapDist.value == "shotgun" ){
        distanceInput.style.display = "";
        str = 1/distance;
      }
      output.innerHTML = doDamage(weapons[selWeapDist.value], str);
      break;

    case "damageCac":
      selWeapCac.style.display = "";
      diceInput.style.display = "";
      diceInput.placeholder = "D20";
      output.innerHTML = doDamage(weapons[selWeapCac.value], diceInput.value);
      break;
    default:

  }
}

function aim(d100, adress, dist, bonus=0) {
  /* Return true if the ennemie is hitted*/
  return (d100 * dist/10 - bonus <= adress);
}

function doDamage(weapon, strength=1) {
  // Taux de pénétration par rapport a l'armure
  var tPen = weapon.penetration/10; // L'armure est toujours égal a 10 ici, on divisera par deux pour le monstre.
  return (weapon.damage * strength)* tPen;
}
