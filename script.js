document.addEventListener('DOMContentLoaded', () => {
    fetch('https://restcountries.com/v3.1/all')
        .then((response) => response.json())
        .then((countries) => displayCountries(countries))
        .catch((error) => console.error(error));

    function displayCountries(countries) {
        const wrapper = document.getElementById('countries-wrapper');

        countries.forEach((country, index) => {
            const col = document.createElement('div');
            col.className = 'col-sm-6 col-md-4 col-lg-4 col-xl-4 mb-3';

            const card = document.createElement('div');
            card.className = 'card h-100';

            const img = document.createElement('img');
            img.src = country.flags.png;
            img.className = 'card-img-top';
            img.alt = `Flag of ${country.name.common}`;
            img.style.height = '140px';
            img.style.objectFit = 'cover';

            const cardHeader = document.createElement('div');
            cardHeader.className = 'card-header';
            cardHeader.innerHTML = `<h5 class="card-title text-success">${index + 1}. ${country.name.common}</h5>`;

            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            const cardText = document.createElement('div');
            cardText.className = 'card-text';
            cardText.innerHTML = `<small><strong>Region:</strong> ${country.region}<br>
                                  <strong>Native Name:</strong> ${Object.values(country.name.nativeName || {}).map(n => n.common).join(', ')}<br>
                                  <strong>Population:</strong> ${country.population}</small><br>
                                  <small><strong>Area:</strong> ${country.area} km²</small><br>
                                  <small><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</small>`;

            const mapLink = document.createElement('a');
            mapLink.href = country.maps.googleMaps;
            mapLink.target = '_blank';
            mapLink.className = 'btn btn-warning';
            mapLink.innerHTML = '<b>View Google Map</b>';

            cardBody.appendChild(cardText);
            cardBody.appendChild(mapLink);

            card.appendChild(img);
            card.appendChild(cardHeader);
            card.appendChild(cardBody);

            col.appendChild(card);
            wrapper.appendChild(col);
        });
    }
});
