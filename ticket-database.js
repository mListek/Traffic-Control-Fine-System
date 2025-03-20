// Initialize tickets array
let tickets = [];
let filteredTickets = [];

// Function to initialize dummy data into localStorage
function initializeDummyData() {
    const dummyData = [
        {
            receiptNo: "TKT-001",
            vehicleTagNo: "XYZ-4567",
            date: "2023-11-01",
            dueDate: "2023-11-15",
            firstName: "Sarah",
            middleName: "Jane",
            lastName: "Johnson",
            street: "123 Main St",
            city: "New York",
            state: "NY",
            county: "Manhattan",
            zipCode: "10001",
            violationCode: "SP-01",
            amount: "150.00"
        },
        {
            receiptNo: "TKT-002",
            vehicleTagNo: "ABC-1234",
            date: "2023-11-02",
            dueDate: "2023-11-16",
            firstName: "Michael",
            middleName: "Thomas",
            lastName: "Williams",
            street: "456 Oak Ave",
            city: "Los Angeles",
            state: "CA",
            county: "Los Angeles",
            zipCode: "90001",
            violationCode: "RL-02",
            amount: "75.00"
        }
    ];
    
    if (!localStorage.getItem('tickets')) {
        localStorage.setItem('tickets', JSON.stringify(dummyData));
    }
    return JSON.parse(localStorage.getItem('tickets'));
}

// Function to get tickets from localStorage
function getTickets() {
    const storedTickets = localStorage.getItem('tickets');
    return storedTickets ? JSON.parse(storedTickets) : [];
}

// Function to save tickets to localStorage
function saveTickets(tickets) {
    localStorage.setItem('tickets', JSON.stringify(tickets));
}

// Function to populate the table with ticket data
function populateTicketTable(ticketsToDisplay) {
    const tableBody = document.getElementById('ticketList');
    tableBody.innerHTML = '';
    
    const displayData = ticketsToDisplay || tickets;
    
    if (displayData.length === 0) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.textContent = 'No matching tickets found';
        cell.colSpan = 14;
        cell.style.textAlign = 'center';
        cell.style.padding = '20px';
        row.appendChild(cell);
        tableBody.appendChild(row);
        return;
    }
    
    displayData.forEach(ticket => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${ticket.receiptNo}</td>
            <td>${ticket.vehicleTagNo}</td>
            <td>${ticket.date}</td>
            <td>${ticket.dueDate}</td>
            <td>${ticket.firstName}</td>
            <td>${ticket.middleName || ''}</td>
            <td>${ticket.lastName}</td>
            <td>${ticket.street}</td>
            <td>${ticket.city}</td>
            <td>${ticket.state}</td>
            <td>${ticket.county}</td>
            <td>${ticket.zipCode}</td>
            <td>${ticket.violationCode}</td>
            <td>${ticket.amount}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to search tickets
function searchTickets(query) {
    query = query.toLowerCase().trim();
    
    if (query === '') {
        filteredTickets = [...tickets];
    } else {
        filteredTickets = tickets.filter(ticket => 
            ticket.receiptNo.toLowerCase().includes(query) ||
            ticket.vehicleTagNo.toLowerCase().includes(query) ||
            ticket.date.toLowerCase().includes(query) ||
            ticket.dueDate.toLowerCase().includes(query) ||
            ticket.firstName.toLowerCase().includes(query) ||
            ticket.middleName?.toLowerCase().includes(query) ||
            ticket.lastName.toLowerCase().includes(query) ||
            ticket.street.toLowerCase().includes(query) ||
            ticket.city.toLowerCase().includes(query) ||
            ticket.state.toLowerCase().includes(query) ||
            ticket.county.toLowerCase().includes(query) ||
            ticket.zipCode.toLowerCase().includes(query) ||
            ticket.violationCode.toLowerCase().includes(query) ||
            ticket.amount.toLowerCase().includes(query)
        );
    }
    
    populateTicketTable(filteredTickets);
}

// Function to add a new ticket entry
function addTicket(ticket) {
    tickets.push(ticket);
    saveTickets(tickets);
    
    // Add new row to table
    const tableBody = document.getElementById('ticketList');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${ticket.receiptNo}</td>
        <td>${ticket.vehicleTagNo}</td>
        <td>${ticket.date}</td>
        <td>${ticket.dueDate}</td>
        <td>${ticket.firstName}</td>
        <td>${ticket.middleName || ''}</td>
        <td>${ticket.lastName}</td>
        <td>${ticket.street}</td>
        <td>${ticket.city}</td>
        <td>${ticket.state}</td>
        <td>${ticket.county}</td>
        <td>${ticket.zipCode}</td>
        <td>${ticket.violationCode}</td>
        <td>${ticket.amount}</td>
    `;
    tableBody.appendChild(row);
    
    // If we have a search active, check if the new ticket matches
    const searchInput = document.getElementById('searchInput');
    if (searchInput.value.trim() !== '') {
        searchTickets(searchInput.value);
    }
}

// Handle form submission
document.getElementById('addTicketForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const ticket = {
        receiptNo: document.getElementById('receiptNo').value,
        vehicleTagNo: document.getElementById('vehicleTagNo').value,
        date: document.getElementById('ticketDate').value,
        dueDate: document.getElementById('dueDate').value,
        firstName: document.getElementById('firstName').value,
        middleName: document.getElementById('middleName').value,
        lastName: document.getElementById('lastName').value,
        street: document.getElementById('street').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        county: document.getElementById('county').value,
        zipCode: document.getElementById('zipCode').value,
        violationCode: document.getElementById('violationCode').value,
        amount: document.getElementById('amount').value
    };
    
    addTicket(ticket);
    
    // Reset form
    this.reset();
});

// Initialize data and populate table when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dummy data if localStorage is empty
    initializeDummyData();
    
    // Load tickets from localStorage
    tickets = getTickets();
    filteredTickets = [...tickets];
    
    // Populate table with data from localStorage
    populateTicketTable();
    
    // Add event listener for search input
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function() {
        searchTickets(this.value);
    });
});