document.addEventListener('DOMContentLoaded', () => {
    const charsContainer = document.querySelector('.chars-container');
    const searchInput = document.querySelector('#search');
    const speciesFilter = document.querySelector('#especie-filtro');
    const genderFilter = document.querySelector('#gender');
    const statusFilter = document.querySelector('#status');
    const loadMoreButton = document.querySelector('#carregar');

    console.log(charsContainer);
    const API = 'https://rickandmortyapi.com/api/';

    const defaultFilters = { 
        name: '',
        species: '',
        gender: '',
        status: '',
        page: 1
    }

    async function getCharacters({ name, species, gender, status, page = 1 }) {
        const response = await fetch(`${API}character?name=${name}&species=${species}&gender=${gender}&status=${status}&page=${page}`);
        const characters = await response.json();
        return characters.results; 
    }

    async function render({ characters }) {
        characters.forEach((character) => {
            const charElement = document.createElement('div');
            charElement.classList.add('char');

            charElement.innerHTML = `
                <img src="${character.image}" alt="${character.name}">
                <div class="char-info">
                    <h3>${character.name}</h3>
                    <span>${character.species}</span>
                    <span>${character.gender}</span>
                    <span>${character.status}</span>
                    <span>Location: ${character.location.name}</span>
                    <span>Episódio: ${character.episode[0].split("/").pop()}</span>
                </div>
            `;

            charsContainer.appendChild(charElement); 
        });
    }

    function handleFiltersChange(type, event) {
        return async () => {

            defaultFilters[type] = event.target.value;
            charsContainer.innerHTML = '';
            const characters = await getCharacters(defaultFilters)
            render({characters}) 

        }

    }


    async function handleLoadMore() {
        defaultFilters.page += 1
        const characters = await getCharacters(defaultFilters);
        render({characters})       


    }


    function addListeners() {

        speciesFilter.addEventListener('change', async (event) => {

            handleFiltersChange('species', event)()

    
        })
    
        genderFilter.addEventListener('change', async (event) => {
            handleFiltersChange('gender', event)()
        
        })
    
        statusFilter.addEventListener('change', async (event) => {
            handleFiltersChange('status', event)()
        
        })
    
        searchInput.addEventListener('keyup', async (event) => {
            handleFiltersChange('name', event)()
    
        })

        loadMoreButton.addEventListener('click', handleLoadMore)

    }

    

    async function main() {
        console.log("Obtendo personagens...");
        const characters = await getCharacters(defaultFilters);
        console.log("Personagens obtidos:", characters);
        addListeners()
        render({ characters });
        console.log("Renderização concluída.");
    }

    main();
});
