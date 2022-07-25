const sketchPad = document.querySelector('.game-content .sketch-pad');
let gridSize = 16;
let pixelList;
let mouseDown = false;

function makeGrid(gridSize) {
    const pixelDivSize = sketchPad.clientHeight / gridSize - 1; // -1 to account for 0.5px border

    for (let i = 0; i < gridSize * gridSize; i++) {
        const pixelDiv = document.createElement('div');
        pixelDiv.style.flex = `0 0 ${pixelDivSize}px`;
        pixelDiv.style.border = '0.5px solid #00000012';
        pixelDiv.classList.add('pixel');

        if (i === 0)
            pixelDiv.style.borderTopLeftRadius = '0.8rem';
        else if (i === gridSize - 1)
            pixelDiv.style.borderTopRightRadius = '0.8rem';
        else if (i === gridSize * gridSize - gridSize)
            pixelDiv.style.borderBottomLeftRadius = '0.8rem';
        else if (i === gridSize * gridSize - 1)
            pixelDiv.style.borderBottomRightRadius = '0.8rem';

        pixelDiv.addEventListener('mousedown', (e) => {
            mouseDown = true;
            e.target.style.backgroundColor = '#000000e6'; // can possibly play later with opacity using rgba
        });
        
        pixelDiv.addEventListener('mouseup', () => mouseDown = false);
        
        pixelDiv.addEventListener('mouseover', (e) => {
            if (mouseDown)
                e.target.style.backgroundColor = '#000000e6';
        });
            
        sketchPad.appendChild(pixelDiv);
    }
    pixelList = sketchPad.querySelectorAll('.pixel');
}

function deleteGrid() {
    pixelList.forEach(pixel => pixel.parentNode.removeChild(pixel));
}

function clearGrid() {
    pixelList.forEach(pixel => pixel.style.backgroundColor = '#e7e9ef');
}

makeGrid(gridSize);

const clearButton = document.querySelector('.game-content .controls .clear-button');
clearButton.addEventListener('click', clearGrid);

const gridSizeSlider = document.querySelector('#grid-size');
gridSizeSlider.addEventListener('change', (e) => {
    document.querySelector('#rangeValue').innerText = e.originalTarget.value;
    deleteGrid();
    makeGrid(parseInt(e.originalTarget.value));
});