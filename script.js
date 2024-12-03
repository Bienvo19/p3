document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("butterflyForm");
    const butterflyList = document.getElementById("butterflyList");

    const loadButterflies = () => {
        const butterflies = JSON.parse(localStorage.getItem("butterflies")) || [];
        butterflyList.innerHTML = "";
        butterflies.forEach(({ name, description, image }, index) => {
            const card = document.createElement("div");
            card.classList.add("butterfly-card");
            card.innerHTML = `
                <img src="${image}" alt="${name}">
                <div>
                    <h3>${name}</h3>
                    <p>${description}</p>
                    <button data-index="${index}" class="delete-button">Eliminar</button>
                </div>
            `;
            butterflyList.appendChild(card);
        });
    };

    const saveButterfly = (name, description, image) => {
        const butterflies = JSON.parse(localStorage.getItem("butterflies")) || [];
        butterflies.push({ name, description, image });
        localStorage.setItem("butterflies", JSON.stringify(butterflies));
    };

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const description = document.getElementById("description").value;
        const image = document.getElementById("image").value;

        saveButterfly(name, description, image);
        form.reset();
        loadButterflies();
    });

    butterflyList.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-button")) {
            const index = e.target.dataset.index;
            const butterflies = JSON.parse(localStorage.getItem("butterflies")) || [];
            butterflies.splice(index, 1);
            localStorage.setItem("butterflies", JSON.stringify(butterflies));
            loadButterflies();
        }
    });

    loadButterflies();
});
