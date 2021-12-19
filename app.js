const trackWork = document.querySelector(".form-btn");
const clearBtn = document.querySelector(".clear-jobs");

loadEventListeners();

function loadEventListeners() {
  document.addEventListener("DOMContentLoaded", getJobs);

  trackWork.addEventListener("click", addCar);

  clearBtn.addEventListener("click", clearJobs);
}

function addCar(e) {
  const car = {
    year: document.getElementById("year").value,
    make: document.getElementById("make").value,
    model: document.getElementById("model").value,
    ro: document.getElementById("roNumber").value,
    labor: document.getElementById("labor").value,
  };

  saveJob(car);
  showCar(car);

  e.preventDefault();

}

function saveJob(car) {
  let jobs = JSON.parse(localStorage["jobList"] || "[]");
  jobs.push(car);

  localStorage.setItem("jobList", JSON.stringify(jobs));
}

function showCar(car) {
  const div = document.createElement("div");
  const heading = document.createElement("h3");
  const vehicle = document.createElement("p");
  const hours = document.createElement("h3");

  div.setAttribute("class", "card");
  heading.setAttribute("class", "card-heading");
  vehicle.setAttribute("class", "card-info");
  hours.setAttribute("class", "card-heading");

  document.getElementById("gridContainer").appendChild(div);
  div.appendChild(heading);
  div.appendChild(vehicle);
  div.appendChild(hours);

  heading.innerHTML = "RO #: " + car.ro;
  vehicle.innerHTML = car.year + " " + car.make + " " + car.model;
  hours.innerHTML = car.labor + "hours";

  document.getElementById("year").value = "";
  document.getElementById("make").value = "";
  document.getElementById("model").value = "";
  document.getElementById("roNumber").value = "";
  document.getElementById("labor").value = "";
}

function getJobs() {
  let jobs = JSON.parse(localStorage.getItem("jobList") || "[]");
  jobs.forEach(showCar);
}



function clearJobs() {
  if (confirm("Are You Sure You Wish To Clear All Repair Orders?")) {
  }
  
  const cards = document.getElementById('gridContainer');
  while (cards.firstChild) {
    cards.removeChild(cards.firstChild)
  }

  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}
