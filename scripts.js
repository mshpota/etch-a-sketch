const sketchPad = document.querySelector('.game-content .sketch-pad');

function makeGrid(gridSize) {
    const pixelDivSize = sketchPad.clientHeight / 16 - 1; // -1 to account for 0.5px border

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
            
        sketchPad.appendChild(pixelDiv);
    }
}

let gridSize = 16;
makeGrid(gridSize);

let mouseDown = false;

// To draw on the sketch-pad
const pixelList = sketchPad.querySelectorAll('.pixel');
pixelList.forEach(pixel => pixel.addEventListener('mousedown', (e) => {
        mouseDown = true;
        e.target.style.backgroundColor = '#000000e6'; // can possibly play later with opacity using rgba
}));

pixelList.forEach(pixel => pixel.addEventListener('mouseup', () => mouseDown = false));

pixelList.forEach(pixel => pixel.addEventListener('mouseover', (e) => {
    if (mouseDown)
        e.target.style.backgroundColor = '#000000e6';
}));