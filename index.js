const wrapper = document.getElementById("tiles");
let a = 0;

let columns = 0,
    rows = 0,
    toggled = false;

const toggle = () => {
  toggled = !toggled;
  $("#clicker").css("visibility", "hidden");
  document.body.classList.toggle("toggled");
}

const handleOnClick = index => {
  a++;
   if (a==1){
      $("#clicker").html("Now, click this one →");
      $("#clicker").addClass("clicker2");
      $("#clicker").removeClass("clicker1");
    } else if (a==2) {
      $("#clicker").html("Ab yahan par →");
      $("#clicker").addClass("clicker3");
      $("#clicker").removeClass("clicker2");
    } else if (a==3) {
      $("#clicker").html("Aur yeh last →");
      $("#clicker").addClass("clicker4");
      $("#clicker").removeClass("clicker3");
    } else {
      toggle();
      anime({
        targets: ".tile",
        opacity: toggled ? 0 : 1,
        delay: anime.stagger(50, {
         grid: [columns, rows],
        from: index
      })
    });
  }
}

const createTile = index => {
  const tile = document.createElement("div");
  
  tile.classList.add("tile");
  
  tile.style.opacity = toggled ? 0 : 1;
  
  tile.onclick = e => handleOnClick(index);
  
  return tile;
}

const createTiles = quantity => {
  Array.from(Array(quantity)).map((tile, index) => {
    wrapper.appendChild(createTile(index));
  });
}

const createGrid = () => {
  wrapper.innerHTML = "";
  
  const size = document.body.clientWidth > 800 ? 100:50 ;
  
  columns = Math.floor(document.body.clientWidth / size);
  rows = Math.floor(document.body.clientHeight / size);
  
  wrapper.style.setProperty("--columns", columns);
  wrapper.style.setProperty("--rows", rows);
  
  createTiles(columns * rows);
}

createGrid();

window.onresize = () => createGrid();