// Función para añadir un criterio a la lista
function addCriteria(event) {
    const input = document.getElementById("criterioInput");
    const list = document.getElementById("criteriaList");

    if (event.key === "Enter") {
        event.preventDefault();
        let text = input.value.trim();

        if (text !== "") {
            // Transformar la primera letra a mayúscula y el resto a minúsculas
            text = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

            const newItem = document.createElement("li");
            newItem.textContent = text;
            list.appendChild(newItem);
            input.value = ""; // Limpiar el campo de entrada
        }
    } else if (event.key === "Delete") { 
        // Eliminar el último criterio agregado cuando se presiona la tecla Supr (Delete)
        event.preventDefault();
        if (list.lastElementChild) {
            list.removeChild(list.lastElementChild);
        }
    }
}

// Función para autocompletar el ID de la historia
function autoCompleteID(event) {
    if (event.key === "Enter") {
        const input = document.getElementById("historiaID");
        const number = input.value.trim();

        if (!isNaN(number) && number !== "") {
            let formattedNumber = number;
            if (number < 10) {
                formattedNumber = number.padStart(2, '0');
            }
            input.value = "HU-" + formattedNumber;
        }
    }
}

// Función para generar una imagen de la tabla
function generateImage() {
    const table = document.querySelector('table');
    html2canvas(table, {
        scale: 3,
        useCORS: true
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'HU.png';
        link.href = canvas.toDataURL('image/png', 1.0);
        link.click();
    });

    document.querySelectorAll('input[type="text"]').forEach(input => input.value = ""); // Limpiar los campos de texto
    document.getElementById("criteriaList").innerHTML = ""; // Limpiar la lista de criterios
}

// Función para ajustar el tamaño del input según el contenido
function autoResizeInput(input) {
    // Crea un span temporal para medir el ancho del texto
    const tempSpan = document.createElement('span');
    document.body.appendChild(tempSpan);

    // Establece los estilos del span igual que el input
    tempSpan.style.font = window.getComputedStyle(input).font;
    tempSpan.style.visibility = 'hidden'; // Oculta el span
    tempSpan.style.whiteSpace = 'pre'; // Mantiene los espacios

    // Asigna el texto del input al span
    tempSpan.textContent = input.value || input.placeholder;

    // Ajusta el ancho del input según el ancho del span
    input.style.width = `${tempSpan.offsetWidth + 10}px`; // Agregar un pequeño margen

    // Elimina el span temporal
    document.body.removeChild(tempSpan);
}

function checkEnter(event) {
    const container = event.target.parentNode; // Obtener la celda del input actual

    if (event.key === 'Enter') {
        event.preventDefault();
        
        // Generar nuevo input sin placeholder y con ancho completo
        const newInput = document.createElement('input');
        newInput.type = 'text';
        newInput.onkeydown = checkEnter;
        newInput.className = "dynamic-input"; // Añadir clase para el nuevo estilo
        newInput.style.width = "99%"; // Aumentar el ancho del input generado

        // Añadir el nuevo input al contenedor de la celda donde está el input original
        container.appendChild(newInput);

        // Colocar el foco automáticamente en el nuevo input
        newInput.focus();
    }

    // Eliminar el último input si se presiona la tecla "Supr"
    if (event.key === 'Delete') {
        event.preventDefault();

        // Obtener todos los inputs en el contenedor
        const inputs = container.getElementsByTagName('input');

        // Verificar que haya más de un input para poder borrar
        if (inputs.length > 1) {
            container.removeChild(inputs[inputs.length - 1]); // Eliminar el último input
        }
    }
}
