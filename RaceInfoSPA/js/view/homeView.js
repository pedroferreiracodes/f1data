function render() {
  const container = document.querySelector('#container');
  container.innerHTML = '';
  const backgroundImage = document.createElement('div');
  backgroundImage.innerHTML = `<img src="rsr/img/homescreen_background.jpeg" alt="Racetrack at night" style="width: 100%"></img>`
  container.appendChild(backgroundImage);
}

export default { render };
