document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('#filters button');
    const projets = document.querySelectorAll('#projets article');
    const loupeButtons = document.querySelectorAll('.loupe');

    for (const button of filterButtons) {
        button.addEventListener('click', (event) => {

            document.querySelector('#filters button.active').classList.remove('active');

            event.target.classList.add('active');


            const category = event.target.dataset.category;

            for (const projet of projets) {

                const categories = projet.dataset.categories.split(' ');

                if (categories.includes(category) || category == 'all') {
                    projet.classList.add('active');
                } else {
                    projet.classList.remove('active');
                }
            }
        });
    }

    // Ajout de la boîte de dialogue avec la loupe
    loupeButtons.forEach(loupeButton => {
        loupeButton.addEventListener('click', (event) => {
            console.log('Loupe cliquée');
            const project = event.target.closest('article');
            if (!project) {
                console.log('Aucun projet trouvé'); 
                return;
            }

            const projectDescription = project.dataset.description || 'Description non trouvée';

            // Ouverture de la boîte de dialogue
            let dialog = document.createElement('dialog');
            dialog.innerHTML = `
                <h3>Détails du projet</h3>
                <p><strong>Description:</strong> ${projectDescription}</p>
                <button id="closeDialog">Fermer</button>
            `;
            document.body.appendChild(dialog);
            dialog.showModal();

            // Fermeture de la boîte de dialogue
            document.getElementById('closeDialog').addEventListener('click', () => {
                dialog.close();
                dialog.remove();
            });
        });
    });
});

// Thème du site
const themeButton = document.createElement('button');
themeButton.textContent = 'Changer le thème';
document.querySelector('.navbar').appendChild(themeButton);

themeButton.addEventListener('click', () => {
    if (document.documentElement.style.getPropertyValue('--color-text') == 'black') {
        document.documentElement.style.setProperty('--color-text', 'white');
        document.documentElement.style.setProperty('--color-background', 'black');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.style.setProperty('--color-text', 'black');
        document.documentElement.style.setProperty('--color-background', 'white');
        localStorage.setItem('theme', 'light');
    }
});

if (localStorage.getItem('theme') == 'dark') {
    document.documentElement.style.setProperty('--color-text', 'white');
    document.documentElement.style.setProperty('--color-background', 'black');
}

// Compteur incrémental
function animateCounter(elementId, maxCount, duration, delay) {
    const element = document.getElementById(elementId);
    let currentCount = 0;
    const interval = 16;
    const totalSteps = duration / interval;
    const increment = Math.ceil(maxCount / totalSteps);

    function updateCount() {
        if (currentCount < maxCount) {
            currentCount += increment;
            if (currentCount > maxCount) currentCount = maxCount;
            element.textContent = currentCount;
            requestAnimationFrame(updateCount);
        }
    }

    setTimeout(() => {
        element.style.opacity = 1;
        updateCount();
    }, delay);
}

animateCounter('code-count', 1245, 2000, 0);
animateCounter('project-count', 12, 1500, 500);
animateCounter('years-count', 2, 1000, 1000); 

fetch('https://programming-quotesapi.vercel.app/api/random')
    .then(response => response.json())
    .then(quote => console.log(quote))