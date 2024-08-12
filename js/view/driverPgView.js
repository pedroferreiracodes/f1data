function clear() {
    const container = $('#container');
    container.html('');
}

async function render(driver) {

    const container = $('#container');
    const driverName = driver.givenName + " " + driver.familyName;


    const driverTitle = $("<div>").addClass("driverTitle");
    driverTitle.html(`<h2>${driverName}</h2>`);
    container.append(driverTitle);
    
    const driverPhoto = $("<div>").html(`<div class="driverPageImgDiv">
                                            <img class="driverPageImg" src="${driver.photo}" alt="${driver.givenName} ${driver.familyName} photo">
                                        </div>`);
    container.append(driverPhoto);


    console.log(driver)
}

export default {clear, render };
