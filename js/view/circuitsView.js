function clear() {
  const container = $('#container');
  container.html('')
  const seasonsTitle = $("<div>").addClass("viewTitle");
  seasonsTitle.html(`<h1>CIRCUITS</h1>`);
  container.append(seasonsTitle);
}


async function render(circuits) {

  const container = $("#container");

  const formDiv = $("<div>");
  formDiv.css({
    "display": "flex",
    "justify-content": "center",
    "position": "sticky",
    "top": "0px",
    "padding": "10px",
    "z-index": "1",
    "background-color": "grey"
  });

  const filterForm = $("<form>");
  filterForm.css({
    "background-color": "white",
    "padding-top": "0.2%",
    "padding-bottom": "0.2%",
    "padding-left": "8%",
    "padding-right": "8%",
    "border-radius": "5px"
  });

  const countryInput = $("<input>");
  countryInput.attr({
    "type": "text",
    "placeholder": "Filter circuits by country"
  });

  countryInput.on("input", () => {
    const searchTerm = countryInput.val().trim().toLowerCase();
    const filteredCircuits = circuits.filter(({ Location }) =>
      `${Location.country}`.toLowerCase().includes(searchTerm)
    );
    renderCircuits(filteredCircuits);
  });

  filterForm.append(countryInput);
  formDiv.append(filterForm);
  container.append(formDiv);

  const list = $("<div>");
  list.html(`<div class="list"></div>`);
  list.css({
    "display": "grid",
    "justify-content": "center",
    "max-width": "95%",
    "grid-template-columns": "repeat(auto-fill, minmax(300px, 500px))",
    "gap": "20px",
    "padding": "10px"
  });


  function renderCircuits(circuits) {
    console.log(circuits);
    list.html("");
    circuits.forEach(({ circuitName, url, Location, photo, circuitId }) => {
      const { locality, country } = Location;
      const item = $("<div>").html(`
        <a href="#/circuits/${circuitId}">
          <div class="cardDiv">
          <img class="cardImg" src="${photo}" alt="Cars at racetrack">
            <div class="cardTextDiv">
              <h3 class="card-title">${circuitName}</h3>
              <p class="card-text">${locality}, ${country}</p>
            </div>
          </div>
        </a>
      `);

      list.append(item);
    });
  }

  renderCircuits(circuits);

  container.append(list);
}

export default { clear, render };
