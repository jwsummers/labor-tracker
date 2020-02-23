function createCard() {
    let year = document.getElementById('year').value;
    let make = document.getElementById('make').value;
    let model = document.getElementById('model').value;
    let ro = document.getElementById('roNumber').value;
    let labor = document.getElementById('labor').value;
    let div = document.createElement('div');
    let heading = document.createElement('h3');
    let vehicle = document.createElement('p');
    let hours = document.createElement('h3');

    div.setAttribute('class', 'card');
    heading.setAttribute('class', 'card-heading');
    vehicle.setAttribute('class', 'card-info');
    hours.setAttribute('class', 'card-heading');
    
    document.getElementById('gridContainer').appendChild(div);
    div.appendChild(heading);
    div.appendChild(vehicle);
    div.appendChild(hours);

    heading.innerHTML = "RO #: " + ro;
    vehicle.innerHTML = year + " " + make + " " + model;
    hours.innerHTML = labor + "hours";

    document.getElementById('year').value = "";
    document.getElementById('make').value = "";
    document.getElementById('model').value = "";
    document.getElementById('roNumber').value = "";
    document.getElementById('labor').value = "";

}

