function clear() {
  const container = $('#container');
  container.html("");
}

async function render() {

  const container = $("#container");

  const introduction = $("<div>").addClass("aboutIntro");
  introduction.html(`<h4>WHAT IS THIS</h4>`);
  container.append(introduction);

  const aboutTitle = $("<div>").addClass("aboutTitle");
  aboutTitle.html(`<h1>ABOUT</h1>`);
  container.append(aboutTitle);


  const text = $("<div>").addClass("aboutText");
  text.html(` <p>Exercise on Single Page Application development, dinamically generating views using Javascript DOM manipulation and jQuery.</p>
              <p>F1 data is provided by the <a href="http://ergast.com/mrd" target="_blank">Eargast API</a>.</p>
              <p>Driver and Circuit photos fetched via the <a href="https://www.mediawiki.org/wiki/API:Main_page" target="_blank">MediaWiki Action API</a>.</p>
              <p>Find the code in my <a href="https://github.com/pedroferreiracodes/f1data" target="_blank">GitHub</a>.</p>`);
  container.append(text);  

}


export default { clear, render };
