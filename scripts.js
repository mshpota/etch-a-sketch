// Reload page when clicking on the title of the game
const title = document.querySelector('.name');
title.addEventListener('click', () => window.location.reload());

let gridSize = 16;
let pixelList;
let mouseDown = false;
let randomColors = false;
let shading = false;

const radios = document.querySelectorAll('input[name=options]');

// Selector block for different coloring styles
for (const radio of radios) {
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
  }
}

const sketchPad = document.querySelector('.game-content .sketch-pad');

function makeGrid(gridSize) {
    const sketchPadStyles = window.getComputedStyle(sketchPad, null);
   
    // there is an issue with sizing for curtain values, maybe some truncation happening?
    const pixelDivSize = (sketchPad.clientHeight - parseInt(sketchPadStyles.getPropertyValue('padding')) * 2) / gridSize;

    for (let i = 0; i < gridSize * gridSize; i++) {
        const pixelDiv = document.createElement('div');
        pixelDiv.style.flex = `0 0 ${pixelDivSize}px`;
        // pixelDiv.style.border = '0.5px solid #00000012';
        pixelDiv.classList.add('pixel');

        // Round specific corners for the corner pixels
        if (i === 0)
            pixelDiv.style.borderTopLeftRadius = '0.8rem';
        else if (i === gridSize - 1)
            pixelDiv.style.borderTopRightRadius = '0.8rem';
        else if (i === gridSize * gridSize - gridSize)
            pixelDiv.style.borderBottomLeftRadius = '0.8rem';
        else if (i === gridSize * gridSize - 1)
            pixelDiv.style.borderBottomRightRadius = '0.8rem';
        
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
    pixelList = sketchPad.querySelectorAll('.pixel');
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

