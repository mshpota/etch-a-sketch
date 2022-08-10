// Reload page when clicking on the title of the game
const title = document.querySelector('.name');
title.addEventListener('click', () => window.location.reload());

const radioInputs = document.querySelectorAll('input[name=options]');
const sketchPad = document.querySelector('.sketch-pad-work-area');

let gridSize = 16;
let mouseDown = false;
let randomColors = false;
let shading = false;
let pixelList = null;

function makeGrid(gridSize) {
    for (let i = 0; i < gridSize * gridSize; i++) {
        const pixelDiv = document.createElement('div');
        pixelDiv.classList.add('pixel');
        pixelDiv.style.backgroundColor = '#e7e9ef';
        
        // Single pixel coloring
        pixelDiv.addEventListener('mousedown', (e) => {
            mouseDown = true;
            drawPixels(e);
        });
        
        pixelDiv.addEventListener('mouseup', () => mouseDown = false);
        // Continuous coloring stroke
        pixelDiv.addEventListener('mouseover', (e) => {
            drawPixels(e);
        });
            
        sketchPad.appendChild(pixelDiv);
    }

    // CSS grid styles
    sketchPad.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    sketchPad.style.gridTemplateRows = 'auto';

    pixelList = sketchPad.querySelectorAll('.pixel');
}

// Controller for different coloring styles
function colorController(radioInputs) {
    for (const radio of radioInputs) {
        radio.onclick = (e) => {
          if (e.target.value === 'random-colors') {
              randomColors = true;
              shading = false;
          } else if (e.target.value === 'shading') {
              randomColors = false;
              shading = true;
          // Default setting
          } else {
              randomColors = false;
              shading = false;
          }
        };
    }
}

function drawPixels(e) {
    if (mouseDown) {
        // Random colors coloring style
        if (randomColors) {
            const randomColor = Math.floor(Math.random()*16777215).toString(16);
            if (e.target.style.backgroundColor === 'rgb(231, 233, 239)') {
                e.target.style.backgroundColor = '#' + randomColor;
            }
        // Shading coloring style
        } else if (shading) {
            if (e.target.style.backgroundColor === 'rgb(231, 233, 239)') {
                e.target.style.backgroundColor = `rgba(0, 0, 0, 0.1)`;
            } else {
                let currentOpacity = Number(e.target.style.backgroundColor.slice(-4, -1));
                if (currentOpacity < 0.9) {
                    e.target.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity + 0.1})`;
                }
            }
        // Default coloring style
        } else {
            e.target.style.backgroundColor = '#000000e6';
        }
    }  
}

function deleteGrid() {
    pixelList.forEach(pixel => pixel.parentNode.removeChild(pixel));
}

function clearGrid() {
    pixelList.forEach(pixel => {
        pixel.style.backgroundColor = '#e7e9ef'
    });
}

const clearButton = document.querySelector('.game-content .controls .clear-button');
clearButton.addEventListener('click', clearGrid);

const gridSizeSlider = document.querySelector('#grid-size');
gridSizeSlider.addEventListener('change', (e) => {
    document.querySelector('#rangeValue').innerText = e.originalTarget.value;
    deleteGrid();
    makeGrid(parseInt(e.originalTarget.value));
});

makeGrid(gridSize);
colorController(radioInputs);