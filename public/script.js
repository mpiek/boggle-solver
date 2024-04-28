// script.js
document.addEventListener('DOMContentLoaded', function() {
    const gridContainer = document.getElementById('boggleGrid');
    const resultsList = document.getElementById('resultsList');
    const validateButton = document.getElementById('validateButton');
    const resetButton = document.getElementById('resetButton');

    // Generate 4x4 grid cells
    generateGrid(gridContainer);

    // Event listener for validate button
    validateButton.addEventListener('click', function() {
        const words = findWords(gridContainer); // Pass the grid container to findWords
        displayResults(words, resultsList);
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

function findWords(container) {
    const grid = []; // Initialize an empty grid array

    // Extract letters from the grid cells
    container.querySelectorAll('.cell').forEach(function(cell, index) {
        const row = Math.floor(index / 4);
        const col = index % 4;
        const letter = cell.value.toUpperCase(); // Convert to uppercase
        grid.push(letter);
    });

    // Implement word finding logic using the grid array
    // Return an array of found words
}

function displayResults(words, container) {
    // Implement logic to display results in the container
}

function resetGrid(container) {
    container.innerHTML = ''; // Clear the grid
    generateGrid(container); // Generate a new 4x4 grid

    // Reattach event listeners for input cells
    const inputs = document.getElementsByClassName('cell');
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('input', moveToNextCell);
        inputs[i].addEventListener('keydown', moveToPreviousCell);
    }
    inputs[0].focus();
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
            previousInput.value = '';
            currentInput.value = ''; // Clear current cell
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
