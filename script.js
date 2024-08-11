const countryInput = document.getElementById('country');
const countryInfo = document.querySelector('.countryInfo');


async function startSearch() {
    document.querySelector('h1').style.display = 'none';
    const country = countryInput.value;
    if (country === "") {
        console.log("Enter value");
    }
    else {
        try {
            const response = await fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`);
            const data = await response.json()

            const countryData = data[0];

            // Clear the existing content
            countryInfo.innerHTML = '';


            // Create and append the elements with the fetched data
            const img = document.createElement('img');
            img.src = countryData.flags.png;
            img.alt = `Flag of ${countryData.name.common}`;
            countryInfo.appendChild(img);

            const h2 = document.createElement('h2');
            h2.textContent = countryData.name.common;
            h2.style.textTransform = 'uppercase';
            countryInfo.appendChild(h2);

            const capital = document.createElement('p');
            capital.innerHTML = `<b>Capital:</b> ${countryData.capital}`;
            countryInfo.appendChild(capital);

            const continent = document.createElement('p');
            continent.innerHTML = `<b>Continent: </b> ${countryData.region}`;
            countryInfo.appendChild(continent);

            const timeZone = document.createElement('p');
            timeZone.innerHTML = `<b>Time Zone:</b> ${countryData.timezones}`;
            countryInfo.appendChild(timeZone);

            const population = document.createElement('p');
            population.innerHTML = `<b>Population:</b> ${countryData.population.toLocaleString()}`;
            countryInfo.appendChild(population);

            const currency = document.createElement('p');
            currency.innerHTML = `<b>Currency:</b> ${Object.values(countryData.currencies)[0].name} (${Object.values(countryData.currencies)[0].symbol})`;
            countryInfo.appendChild(currency);

            const language = document.createElement('p');
            language.innerHTML = `<b>Common Language:</b> ${Object.values(countryData.languages).join(', ')}`;
            countryInfo.appendChild(language);

            countryInput.value = '';

        } catch (error) {
            console.log(error);
        }
    }

}


document.getElementById('btn').addEventListener('click', startSearch);

countryInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') startSearch();
});