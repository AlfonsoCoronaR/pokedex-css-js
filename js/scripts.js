const d = document;
let info = document.getElementById("pokemon");
let sname = d.getElementById("s-name");
let stype = d.getElementById("s-type");
let sstats = d.getElementById("s-stats");
let smove = d.getElementById("s-mov");

function obtener() {
  let pokemon = info.value.toLowerCase();
  console.log(pokemon);

  const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
  fetch(url)
    .then((res) => {
      if (res.status != "200") {
        throw new Error("Error");
      } else {
        return res.json();
      }
    })
    .then((data) => {
        sname.innerHTML = "";
        stype.innerHTML = "";
        sstats.innerHTML = "";
        smove.innerHTML = "";
        let titulo = d.getElementById("titulo");
        titulo.style.display = "none";
        /* console.log(data); */
        let pokeImg = data.sprites.front_default;
        let nombre = data.name;
        let tipo = data.types[0].type.name;
        let est = data.stats;
        let mov = data.moves;
        pokeImage(pokeImg, nombre, tipo);
        estadisticas(est);
        movimientos(mov);
    })
    .catch(error => {
      sname.innerHTML = "";
      stype.innerHTML = "";
      sstats.innerHTML = "";
      smove.innerHTML = "";
      const pokePhoto = document.getElementById("sprite");
      pokePhoto.src = "./img/pokeball.png";
      sname.innerHTML = "<h1>Este pokemón no existe</h1>";
      /* let name = d.createTextNode(`Este pokemón no existe`);
      sname.appendChild(name); */
      sname.style.textAlign = "center";
      console.error('Pokemón no existente')
    })
}

const pokeImage = (url, nombre, tipo) => {
  const pokePhoto = document.getElementById("sprite");
  let name = d.createTextNode(`Nombre: ${nombre}`);
  let type = d.createTextNode(`Tipo: ${tipo}`);
  sname.appendChild(name);
  stype.appendChild(type)
  pokePhoto.src = url;
};

const estadisticas = (est) => {
  let dato = d.createTextNode("Estadisticas: ")
  sstats.appendChild(dato);
  for (let index = 0; index < est.length; index++) {
    let stats = document.createTextNode(`${est[index].stat.name} = ${est[index].base_stat}, `);
    sstats.appendChild(stats);
  }
}

const movimientos = (mov) => {
  let dato = d.createTextNode("Algunos de sus movimientos: ")
  smove.appendChild(dato);
  for (let index = 0; index < 10; index++) {
    let movements = document.createTextNode(`${mov[index].move.name}, `);
    smove.appendChild(movements);
  }
}
