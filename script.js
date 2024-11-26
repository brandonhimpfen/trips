// Sample data array
const trips = [
    {
        name: "Mediterranean Explorer",
        link: "https://example.com/mediterranean-explorer",
        operator: "Riviera Travel",
        image: "https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        country: "Mediterranean",
        duration: 7,
        description: "Explore the Mediterranean with no single supplements on select sailings."
    },
    {
        name: "Scandinavian Adventure",
        link: "https://example.com/scandinavian-adventure",
        operator: "Fred. Olsen Cruise Lines",
        image: "https://images.unsplash.com/photo-1611916813771-972015148368?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        country: "Scandinavia",
        duration: 14,
        description: "Discover Scandinavia with reduced single supplements."
    },
    {
        name: "Nile River Journey",
        link: "https://example.com/nile-river-journey",
        operator: "CroisiEurope",
        image: "https://images.unsplash.com/photo-1578805264874-050a89b27796?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        country: "Egypt",
        duration: 7,
        description: "Sail the Nile with no single supplement on select dates."
    },
      {
        name: "Mediterranean Explorer",
        link: "https://example.com/mediterranean-explorer",
        operator: "Riviera Travel",
        image: "https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        country: "Mediterranean",
        duration: 7,
        description: "Explore the Mediterranean with no single supplements on select sailings."
    },
    {
        name: "Scandinavian Adventure",
        link: "https://example.com/scandinavian-adventure",
        operator: "Fred. Olsen Cruise Lines",
        image: "https://images.unsplash.com/photo-1611916813771-972015148368?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        country: "Scandinavia",
        duration: 14,
        description: "Discover Scandinavia with reduced single supplements."
    },
    {
        name: "Nile River Journey",
        link: "https://example.com/nile-river-journey",
        operator: "CroisiEurope",
        image: "https://images.unsplash.com/photo-1578805264874-050a89b27796?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        country: "Egypt",
        duration: 7,
        description: "Sail the Nile with no single supplement on select dates."
    }
];

// Function to render trips
function renderTrips(filter = {}) {
    const { country, keywords, duration } = filter;
    const tripGrid = document.getElementById('tripGrid');
    tripGrid.innerHTML = ''; // Clear existing trips

    // Filter trips
    const filteredTrips = trips.filter(trip => {
        return (!country || trip.country === country) &&
               (!keywords || trip.name.toLowerCase().includes(keywords.toLowerCase()) || trip.description.toLowerCase().includes(keywords.toLowerCase())) &&
               (!duration || trip.duration === parseInt(duration));
    });

    // Create cards for filtered trips
    filteredTrips.forEach(trip => {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-4';
        card.innerHTML = `
            <div class="card">
                <img src="${trip.image}" class="card-img-top" alt="${trip.name}">
                <div class="card-body">
                    <h5 class="card-title">${trip.name}</h5>
                    <p class="card-text"><strong>Duration:</strong> ${trip.duration} days</p>
                    <p class="card-text">${trip.description}</p>
                    <a href="${trip.link}" class="btn btn-primary" target="_blank">Learn More</a>
                </div>
            </div>
        `;
        tripGrid.appendChild(card);
    });
}

// Filter functionality
function applyFilters() {
    const country = document.getElementById('filterCountry').value;
    const keywords = document.getElementById('searchKeywords').value;
    const duration = document.getElementById('filterDuration').value;

    renderTrips({ country, keywords, duration });
}

// Event listeners for filters
document.getElementById('filterCountry').addEventListener('change', applyFilters);
document.getElementById('searchKeywords').addEventListener('input', applyFilters);
document.getElementById('filterDuration').addEventListener('change', applyFilters);

// Initial render
renderTrips();