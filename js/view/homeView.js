function clear() {
  const container = $('#container');
  container.html('');
}

function render() {
  const container = $('#container');

  const homeTitle = $("<div>").addClass("homeTitle");
  homeTitle.html(`<h1>F1DATA</h1>`);
  container.append(homeTitle);


  const currentSeasonTitle = $("<div>");


  currentSeasonTitle.css({
    "display": "inline",
    "flex-wrap": "wrap",
    "max-width": "100%",
    "gap": "10px",
    "padding": "10px"
  }).addClass("homeDiv");

  container.appendChild(currentSeasonTitle)

}

export default { clear, render };
