// Load stored data from local storage
const loadStoredData = (createCard, updateTotal) => {
  const storedJobs = JSON.parse(localStorage.getItem('jobs')) || [];
  const totalHours = storedJobs.reduce((sum, job) => sum + parseFloat(job.labor), 0);
  updateTotal(totalHours);
  storedJobs.forEach(job => createCard(job));
};

// Save data to local storage
const saveToLocalStorage = (job) => {
  const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
  jobs.push(job);
  localStorage.setItem('jobs', JSON.stringify(jobs));
};

// Function to update total
const updateTotalElement = (element, totalHours) => {
  element.textContent = totalHours.toFixed(2);
};

// Function to create a card element
const createCard = (job, container) => {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <div class="card-heading">Repair Order #${job.roNumber}</div>
    <div class="card-info">Year: ${job.year}</div>
    <div class="card-info">Make: ${job.make}</div>
    <div class="card-info">Model: ${job.model}</div>
    <div class="card-info">Labor Hours: ${job.labor}</div>
  `;
  container.appendChild(card);
};

// Main initialization to set up event listeners and load data
document.addEventListener('DOMContentLoaded', () => {
  // Select modal elements
  const laborModal = document.getElementById('laborModal');
  const addLaborLink = document.querySelector('.add-labor');
  const closeModalButton = document.getElementById('closeModal');
  const cancelModalButton = document.getElementById('cancelModal');
  const addLaborButton = document.getElementById('addLabor');
  const laborInput = document.getElementById('laborInput');
  const laborField = document.getElementById('labor');
  const currentLaborTotal = document.getElementById('currentLaborTotal');
  
  let laborTotal = 0; // Temporary storage for labor calculation

 // Open modal when add-labor link is clicked
addLaborLink.addEventListener('click', (event) => {
  event.preventDefault();
  console.log("Add Labor link clicked");
  laborModal.classList.remove('hidden');
  laborModal.style.display = 'block';
  laborModal.style.zIndex = '1000';
  console.log('Modal styles applied:', laborModal.style);

  // Synchronize laborTotal with the current value in laborField
  laborTotal = parseFloat(laborField.value) || 0;
  console.log('Initialized laborTotal:', laborTotal); // Debugging log
});

  // Close modal function
  const closeModal = () => {
    laborModal.classList.add('hidden');
  };

  // Close modal when close button or cancel button is clicked
  closeModalButton.addEventListener('click', closeModal);
  cancelModalButton.addEventListener('click', closeModal);

  // Add entered labor to current labor field
  addLaborButton.addEventListener('click', () => {
    const addedLabor = parseFloat(laborInput.value) || 0;
    laborTotal += addedLabor;
    laborField.value = laborTotal.toFixed(1);
    laborInput.value = '';
  });

   // Listen for Enter keypress in the modal
   laborModal.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const addedLabor = parseFloat(laborInput.value) || 0;
      laborTotal += addedLabor;
      laborField.value = laborTotal.toFixed(1);
      laborInput.value = '';
    }
  });

  const form = document.getElementById('roForm');
  const gridContainer = document.getElementById('gridContainer');
  const totalElement = document.getElementById('total');
  const clearJobsButton = document.getElementById('clearJobs');
  let totalHours = 0;

  // Update the total hours on the page
  const updateTotal = (newTotal) => {
    totalHours = newTotal;
    updateTotalElement(totalElement, totalHours);
  };

  // Load stored data and update the UI
  loadStoredData(job => createCard(job, gridContainer), updateTotal);

  // Handle form submission to add a new job
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const job = {
      year: document.getElementById('year').value,
      make: document.getElementById('make').value,
      model: document.getElementById('model').value,
      roNumber: document.getElementById('roNumber').value,
      labor: parseFloat(document.getElementById('labor').value),
    };
    totalHours += job.labor;
    updateTotalElement(totalElement, totalHours);
    createCard(job, gridContainer);
    saveToLocalStorage(job);
    form.reset();
  });

  // Handle clearing all jobs
  clearJobsButton.addEventListener('click', () => {
    localStorage.removeItem('jobs');
    gridContainer.innerHTML = '';
    totalHours = 0;
    updateTotalElement(totalElement, totalHours);
  });
});

// Export functions for testing
module.exports = {
  loadStoredData,
  saveToLocalStorage,
  updateTotalElement,
  createCard,
};
