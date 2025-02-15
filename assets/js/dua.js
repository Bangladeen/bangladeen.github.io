// filepath: /workspaces/BanglaDeen/assets/js/dua.js
let duaData = [];
let currentIndex = 0;
const itemsPerPage = 5;

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const duaId = urlParams.get('id');

    fetch('data/dua.json')
        .then(response => response.json())
        .then(data => {
            duaData = data;

            if (duaId){
                console.log('Dua ID:', duaId);
                duaData = data.filter(dua => Number(dua.id) === Number(duaId));

                // If not found any dua with this id
                if (duaData.length === 0) {
                    const duaList = document.getElementById('duaList');
                    duaList.innerHTML = '<h2 class="text-center-danger">দুআ পাওয়া যায়নি</h2>';
                    return;
                }
            }
            loadMoreDuas();
            setupIntersectionObserver();
        })
        .catch(error => console.error('Error loading Duas:', error));
});

function loadMoreDuas() {
    const duaList = document.getElementById('duaList');
    const endIndex = currentIndex + itemsPerPage;
    const itemsToLoad = duaData.slice(currentIndex, endIndex);

    itemsToLoad.forEach(dua => {
        const duaItem = document.createElement('div');
        duaItem.classList.add('dua-item');
        duaItem.setAttribute('data-title', dua.title);
        duaItem.innerHTML = `
            <h2>${dua.title}</h2>
            <h3 class='arabic'>${dua.arabic}</h3>
            <p class='bangla'>${dua.bangla}</p>
            <p class='bangla-meaning'>${dua.bangla_meaning}</p>
            <small class='reference'>${dua.reference}</small>
        `;
        duaList.appendChild(duaItem);
    });

    currentIndex = endIndex;
}

function setupIntersectionObserver() {
    const sentinel = document.getElementById('sentinel');
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            loadMoreDuas();
        }
    });

    observer.observe(sentinel);
}

function searchDua() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const duaItems = document.querySelectorAll('.dua-item');

    duaItems.forEach(item => {
        const title = item.getAttribute('data-title').toLowerCase();
        if (title.includes(input)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}