
function openSidebar() {
    document.getElementById("infoSidebar").classList.add("open");

    const info = document.getElementsByClassName("info")[0];
    // Aquí cambiamos el color a rojo cuando se abre la barra
    if (info) {
        info.addEventListener('click', () => {
            info.style.color = 'red'; 
        });
    }
}

function closeSidebar() {
    document.getElementById("infoSidebar").classList.remove("open");

    const info = document.getElementsByClassName("info")[0];

    if (info) {
        // Aquí solo cambiamos el color a negro cuando se cierra la barra
        info.style.color = 'black';
    }
};