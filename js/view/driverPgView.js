function clear() {
    const container = $('#container');
    container.html('');
}

async function render(driver) {

    const container = $('#container');
    const driverName = $("<div>").addClass("viewTitle");
    driverName.html(`<h1>${driver.givenName} ${driver.familyName}</h1>`);
    container.append(driverName);
    console.log(driver)
}

export default {clear, render };
