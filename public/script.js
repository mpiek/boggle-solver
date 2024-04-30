
document.addEventListener('DOMContentLoaded', function() {
    const gridContainer = document.getElementById('boggleGrid');
    const resultsList = document.getElementById('resultsList');
    const validateButton = document.getElementById('validateButton');
    const resetButton = document.getElementById('resetButton');

    // Generate 4x4 grid cells
    generateGrid(gridContainer);

    // Event listener for validate button
    validateButton.addEventListener('click', function() {
        const letters = findLetters(gridContainer); // Pass the grid container to findLetters
        let words = findAllWords(letters, resultsList);
    });

    // Event listener for reset button
    resetButton.addEventListener('click', function() {
        clearResults(resultsList);
        resetGrid(gridContainer);
    });

    // Event listeners for input cells
    const inputs = document.getElementsByClassName('cell');

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('input', moveToNextCell);
        inputs[i].addEventListener('keydown', moveToPreviousCell);
        inputs[i].addEventListener('click', function(event) {
            event.target.select(); // Select the content of the cell
        });
    }
});

function generateGrid(container) {
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            const cell = document.createElement('input');
            cell.type = 'text';
            cell.maxLength = 1; // Restrict input to one character
            cell.classList.add('cell');
            container.appendChild(cell);
        }
    }
}

function findLetters(container) {
    const grid = []; // Initialize an empty grid array
    container.querySelectorAll('.cell').forEach(function(cell, index) {
        const letter = cell.value.toUpperCase(); // Convert to uppercase
        grid.push(letter);
    });
    return grid;
}


function displayResults(letters, container) {
    // Clear the container first
    container.innerHTML = '';
    console.log(letters);
    // Loop through the words array
    letters.forEach(letter => {
        // Create a new list item for each word
        let listItem = document.createElement('li');
        listItem.textContent = letter;
        container.appendChild(listItem);
    });
}


function resetGrid(container) {
    location.reload();
}


function clearResults(container) {
    container.innerHTML = ''; // Clear the results
}

function moveToNextCell(event) {
    const currentInput = event.target;
    const maxLength = parseInt(currentInput.getAttribute('maxlength'));
    const currentLength = currentInput.value.length;
    
    if (currentLength >= maxLength) {
        const inputs = Array.from(document.getElementsByClassName('cell'));
        const currentIndex = inputs.indexOf(currentInput);

        if (currentIndex < inputs.length - 1) {
            const nextInput = inputs[currentIndex + 1];
            if (validateInput(currentInput)) {
                nextInput.focus();
                nextInput.select();
            }
        }
    }
}

function moveToPreviousCell(event) {
    if (event.key === 'Backspace') {
        const currentInput = event.target;
        const inputs = Array.from(document.getElementsByClassName('cell'));
        const currentIndex = inputs.indexOf(currentInput);
        if (currentIndex > 0) {
            const previousInput = inputs[currentIndex - 1];
            previousInput.focus();
            if (currentInput.value.length > 0) {
                currentInput.value = '';
                } else{
                previousInput.value = '';
            }
            event.preventDefault(); // Prevent default behavior of Backspace key
        }
    }
}

function validateInput(input) {
    const value = input.value.trim();
    
    if (!/^[a-zA-Z]$/.test(value)) {
        input.value = ''; // Clear input if not a letter
        return false; // Return false if input is invalid
    }
    
    return true; // Return true if input is valid
}

    async function findAllWords(letters, resultsList) {
        try {
            const response = await axios.post('http://localhost:3000/findAllWords', { letters });
            displayResults(response.data.words, resultsList);
        } catch (error) {
            console.error(error);
        }
    }