function clear() {
    const container = $('#container');
    container.html('');
}

async function render(circuit) {

    const container = $('#container');
    const circuitName = $("<div>").addClass("viewTitle");
    circuitName.html(`<h1>${circuit.circuitName}</h1>`);
    container.append(circuitName);
    console.log(circuit)
}

export default {clear, render };
