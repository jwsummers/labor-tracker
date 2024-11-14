const { loadStoredData, saveToLocalStorage, updateTotalElement, createCard } = require('./app');

beforeEach(() => {
  // Set up the basic HTML structure needed for testing
  document.body.innerHTML = `
    <div class="container">
      <h1 class="main-heading">Repair Order Tracker</h1>
      <p class="description">A <span>simple</span> tool to track your work and hours.</p>
      <div class="form-container">
        <form action="#" class="ro-form" id="roForm">
          <div class="vehicle">
            <label for="year">Vehicle Year:</label>
            <input type="number" min="1900" max="2100" id="year" placeholder="YYYY" required>
            <label for="make">Vehicle Make:</label>
            <input type="text" id="make" required>
            <label for="model">Vehicle Model:</label>
            <input type="text" id="model" required>
          </div>
          <div class="labor">
            <label for="roNumber">Repair Order #:</label>
            <input type="number" id="roNumber" required>
            <label for="labor">Total Labor Hours:</label>
            <input type="number" id="labor" placeholder="1.0" step="0.01" required>
            <a href="#" class="add-labor">Need help adding labor?</a>
          </div>
          <div class="form-submit">
            <input class="form-btn" value="Track Work" type="submit">
          </div>
        </form>
      </div>
    </div>
    <div class="line"></div>
    <div class="total-hours" id="result">
      <p class="total-label">Total Tracked Hours: <span class="total" id="total"></span></p>
    </div>
    <div class="grid-container" id="gridContainer"></div>
    <button class="clear-jobs" id="clearJobs">Clear Repair Orders</button>

    <!-- Modal structure -->
    <div id="laborModal" class="modal hidden">
      <div class="modal-content">
        <span id="closeModal" class="close">&times;</span>
        <h2>Labor Calculator</h2>
        <input type="number" id="laborInput" step="0.1" placeholder="Enter hours">
        <button id="addLabor" class="modal-btn">Add This Labor</button>
        <button id="cancelModal" class="modal-btn">Cancel</button>
        <p id="currentLaborTotal">Total: 0</p>
      </div>
    </div>
  `;

  // Manually trigger DOMContentLoaded event to initialize app.js functionality
  document.dispatchEvent(new Event('DOMContentLoaded'));
});

afterEach(() => {
  localStorage.clear();
});

// Test saveToLocalStorage
test('saves job data to local storage', () => {
  const job = { roNumber: '123', year: '2022', make: 'Toyota', model: 'Camry', labor: 2.5 };
  saveToLocalStorage(job);

  const storedJobs = JSON.parse(localStorage.getItem('jobs'));
  expect(storedJobs).toHaveLength(1);
  expect(storedJobs[0]).toEqual(job);
});

// Test loadStoredData
test('loads data from local storage and updates total hours', () => {
  const job = { roNumber: '123', year: '2022', make: 'Toyota', model: 'Camry', labor: 2.5 };
  localStorage.setItem('jobs', JSON.stringify([job]));

  const mockUpdateTotal = jest.fn();
  const mockCreateCard = jest.fn((job) => createCard(job, document.getElementById('gridContainer')));

  loadStoredData(mockCreateCard, mockUpdateTotal);

  expect(mockUpdateTotal).toHaveBeenCalledWith(2.5);
  expect(document.getElementById('gridContainer').children).toHaveLength(1);
});

// Test updateTotalElement
test('updates the total element with formatted hours', () => {
  const totalElement = document.getElementById('total');
  updateTotalElement(totalElement, 5);
  expect(totalElement.textContent).toBe('5.00');
});

// Test createCard
test('creates a card element and appends it to the container', () => {
  const job = { roNumber: '123', year: '2022', make: 'Toyota', model: 'Camry', labor: 2.5 };
  const gridContainer = document.getElementById('gridContainer');
  
  createCard(job, gridContainer);

  expect(gridContainer.children).toHaveLength(1);
  expect(gridContainer.children[0].className).toBe('card');
  expect(gridContainer.children[0].textContent).toContain('Repair Order #123');
  expect(gridContainer.children[0].textContent).toContain('Labor Hours: 2.5');
});

// Test for modal open/close functionality
test('opens and closes the modal', () => {
    const addLaborLink = document.querySelector('.add-labor');
    const laborModal = document.getElementById('laborModal');
    const closeModalButton = document.getElementById('closeModal');
    const cancelModalButton = document.getElementById('cancelModal');
  
    expect(laborModal.classList.contains('hidden')).toBe(true);
  
    addLaborLink.click();
    expect(laborModal.classList.contains('hidden')).toBe(false);
  
    closeModalButton.click();
    expect(laborModal.classList.contains('hidden')).toBe(true);
  
    addLaborLink.click();
    expect(laborModal.classList.contains('hidden')).toBe(false);
  
    cancelModalButton.click();
    expect(laborModal.classList.contains('hidden')).toBe(true);
});

// Test for adding labor using the modal
test('adds labor from the modal to the labor input field', () => {
  const addLaborLink = document.querySelector('.add-labor');
  const laborInput = document.getElementById('laborInput');
  const addLaborButton = document.getElementById('addLabor');
  const laborField = document.getElementById('labor');
  const laborModal = document.getElementById('laborModal');

  laborField.value = '2.0';

  addLaborLink.click();
  laborInput.value = '3.0';
  addLaborButton.click();

  expect(parseFloat(laborField.value)).toBe(5.0);
  expect(laborModal.classList.contains('hidden')).toBe(true);
});
