function clear() {
    const container = $('#container');
    container.html('');
}

async function render(driver) {

    const container = $('#container');
    
    const driverPhoto = $("<div>").html(`<div class="driverPageImgDiv">
                                            <img class="driverPageImg" src="${driver.photo}" alt="${driver.givenName} ${driver.familyName} photo">
                                        </div>`);
    container.append(driverPhoto);
    const driverName = $("<div>").addClass("viewTitle");
    driverName.html(`<h1>${driver.givenName} ${driver.familyName}</h1>`);
    container.append(driverName);
    console.log(driver)
}

export default {clear, render };
