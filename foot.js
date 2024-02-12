let parent = document.querySelector('.parent');
let userinput = document.querySelector('.userinput');
let userinput1 = document.querySelector('.userinput1');
let userinput2 = document.querySelector('.userinput2');
let frm = document.querySelector('#frm');
let form=document.querySelector('.form')
let search=document.querySelector('.search')
let job;
let city;
let country;
let isSearching = false; // Flag to track whether a search is in progress

const fetchData = async () => {
    if (isSearching) return; // If a search is already in progress, exit
    isSearching = true; // Set the flag to indicate that a search is starting

    const url = `https://jsearch.p.rapidapi.com/search?query=${job}%2C%20${city}%2C%20${country}&page=1&num_pages=1`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'a2cb41f5a7msh72ed1a7e806ae64p175ed6jsne06c55c1c492',
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result)
        const data = result.data;
        parent.innerHTML=''
        data.forEach((person) => {
            let employername = person.employer_name;
            let jobtitle = person.job_title;
            let linktoapply = person.job_apply_link;
            let logo = person.employer_logo;
            let jobweb = person.employer_website;

            const card = document.createElement('div');
            parent.appendChild(card);

            card.innerHTML = `
                <div class="cardcontent">
                    <a class="link" href="${jobweb}" target="_blank">
                        <img src="${logo}">
                    </a>
                    <h3>${employername}</h3>
                    <h4>${jobtitle}</h4>
                    <span><a class="link" href="${jobweb}" target="_blank">Visit our website!</a></span>
                    <span><a class="link" href="${linktoapply}" target="_blank">Apply here</a></span>
                </div>`;
            frm.classList.remove('hidden')
            search.remove()


        });
    } catch (error) {
        console.error(error);
    } finally {
        isSearching = false; // Reset the flag once the search is complete
    }
};

function getSearch(form) {
    job = form.job.value;
    city = form.city.value;
    country = form.country.value;
    fetchData();
    // Clear input values
    form.job.value = '';
    form.city.value = '';
    form.country.value = '';
}

userinput.onkeydown = (e) => {
    if (e.key === 'Enter') { // Check for 'Enter' key
        e.preventDefault();
        job = frm.job.value;
        city = frm.city.value;
        country = frm.country.value;
        fetchData();
        // Clear input values
        frm.job.value = '';
        frm.city.value = '';
        frm.country.value = '';
        parent.innerHTML = '';
    }
};