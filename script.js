const trips = [
        { id: 1, name: "Mediterranean Explorer", link: "https://www.google.com/", operator: "Riviera Travel", image: "https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?q=80&w=2070", country: "Mediterranean", duration: 7, description: "Explore the Mediterranean with no single supplements on select sailings." },
        { id: 2, name: "Scandinavian Adventure", link: "https://www.microsoft.com/", operator: "Fred. Olsen Cruise Lines", image: "https://images.unsplash.com/photo-1611916813771-972015148368?q=80&w=2070", country: "Scandinavia", duration: 14, description: "Discover Scandinavia with reduced single supplements." },
        { id: 3, name: "Nile River Journey", link: "#", operator: "CroisiEurope", image: "https://images.unsplash.com/photo-1578805264874-050a89b27796?q=80&w=1974", country: "Egypt", duration: 7, description: "Sail the Nile with no single supplement on select dates." },
        { id: 4, name: "Canadian Rockies Explorer", link: "#", operator: "Rocky Mountaineer", image: "https://images.unsplash.com/photo-1596458124814-8b14d63d10ea?q=80&w=2070", country: "Canada", duration: 7, description: "See the majestic Canadian Rockies with solo-friendly options." },
        { id: 5, name: "Japan Culture Tour", link: "#", operator: "Japan Explorer", image: "https://images.unsplash.com/photo-1526481280690-838da3aa36c5?q=80&w=2070", country: "Japan", duration: 14, description: "Immerse yourself in Japan's culture with no single supplement." }
    ];

const heartSVG = '<svg viewBox="0 0 28 28"><path d="M12 21s-8.5-6.5-8.5-11.5a5.5 5.5 0 0 1 11 0 5.5 5.5 0 0 1 11 0c0 5-8.5 11.5-8.5 11.5z"/></svg>';
const favoriteTrips = JSON.parse(localStorage.getItem('favoriteTrips') || '[]');

function renderTrips(filter = {}) {
    const { country, keywords, duration, favoriteOnly } = filter;
    const tripList = document.getElementById('tripList');
    tripList.innerHTML = '';
    const filteredTrips = trips.filter(trip =>
        (!country || trip.country === country) &&
        (!keywords || trip.name.toLowerCase().includes(keywords.toLowerCase()) || trip.description.toLowerCase().includes(keywords.toLowerCase())) &&
        (!duration || trip.duration === parseInt(duration)) &&
        (!favoriteOnly || favoriteTrips.includes(trip.id))
    );
    filteredTrips.forEach(trip => {
        const isFav = favoriteTrips.includes(trip.id);
        const col = document.createElement('div');
        col.className = 'col-md-3';
        col.innerHTML = `
            <div class="trip-card position-relative" onclick="window.open('${trip.link}', '_blank')">
                <img src="${trip.image}" class="trip-image" alt="${trip.name}">
                <div class="trip-content">
                    <h5>${trip.name}</h5>
                    <p><strong>Operator:</strong> ${trip.operator}</p>
                    <p><strong>Duration:</strong> ${trip.duration} days</p>
                    <p>${trip.description}</p>
                </div>
                <button class="favorite-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite(event, ${trip.id})">${heartSVG}</button>
            </div>`;
        tripList.appendChild(col);
    });
}

function toggleFavorite(event, id) {
    event.preventDefault();
    event.stopPropagation();
    const index = favoriteTrips.indexOf(id);
    if (index > -1) {
        favoriteTrips.splice(index, 1);
    } else {
        favoriteTrips.push(id);
    }
    localStorage.setItem('favoriteTrips', JSON.stringify(favoriteTrips));
    applyFilters();
}
function applyFilters() {
    const country = document.getElementById('filterCountry').value;
    const keywords = document.getElementById('searchKeywords').value;
    const duration = document.getElementById('filterDuration').value;
    const favoriteOnly = document.getElementById('filterFavorite').checked;
    renderTrips({ country, keywords, duration, favoriteOnly });
}

document.getElementById('filterCountry').addEventListener('change', applyFilters);
document.getElementById('searchKeywords').addEventListener('input', applyFilters);
document.getElementById('filterDuration').addEventListener('change', applyFilters);
document.getElementById('filterFavorite').addEventListener('change', applyFilters);
renderTrips();
