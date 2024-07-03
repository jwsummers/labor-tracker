document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('roForm');
    const gridContainer = document.getElementById('gridContainer');
    const totalElement = document.getElementById('total');
    const clearJobsButton = document.getElementById('clearJobs');
    let totalHours = 0;
  
    // Load stored data from local storage
    const loadStoredData = () => {
      const storedJobs = JSON.parse(localStorage.getItem('jobs')) || [];
      totalHours = storedJobs.reduce((sum, job) => sum + parseFloat(job.labor), 0);
      totalElement.textContent = totalHours.toFixed(2);
      storedJobs.forEach(job => createCard(job));
    };
  
    // Save data to local storage
    const saveToLocalStorage = (job) => {
      const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
      jobs.push(job);
      localStorage.setItem('jobs', JSON.stringify(jobs));
    };
  
    // Create card element
    const createCard = (job) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div class="card-heading">Repair Order #${job.roNumber}</div>
        <div class="card-info">Year: ${job.year}</div>
        <div class="card-info">Make: ${job.make}</div>
        <div class="card-info">Model: ${job.model}</div>
        <div class="card-info">Labor Hours: ${job.labor}</div>
      `;
      gridContainer.appendChild(card);
    };
  
    // Form submission handler
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
      totalElement.textContent = totalHours.toFixed(2);
      createCard(job);
      saveToLocalStorage(job);
      form.reset();
    });
  
    // Clear jobs handler
    clearJobsButton.addEventListener('click', () => {
      localStorage.removeItem('jobs');
      gridContainer.innerHTML = '';
      totalHours = 0;
      totalElement.textContent = '0.00';
    });
  
    // Load stored data on page load
    loadStoredData();
  });
  
