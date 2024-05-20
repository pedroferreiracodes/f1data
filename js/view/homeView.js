function clear() {
  const container = $('#container');
  container.html('')
}

function render() {
  const container = $('#container');
  container.html = ('');
  const backgroundImage = document.createElement('div');
  backgroundImage.innerHTML = `<img src="rsr/img/homescreen_background.jpeg" alt="Racetrack at night" style="width: 100%"></img>`
  container.append(backgroundImage);

  const currentSeasonTitle = $("<div>");
  currentSeasonTitle.css({
    "display": "inline",
    "flex-wrap": "wrap",
    "max-width": "100%",
    "gap": "10px",
    "padding": "10px"
  }).addClass("homeDiv");

}

export default { clear, render };
