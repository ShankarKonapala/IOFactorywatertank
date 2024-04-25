function calculateWater() {
    const heightsInput = document.getElementById('heights').value.trim();
    const heights = heightsInput.split(',').map(Number);

    if (!heightsInput || !heights.every(Number.isInteger)) {
        alert('Please enter valid comma-separated block heights (e.g., 3,1,2,4,3)');
        return;
    }

    const n = heights.length;
    const leftMax = Array(n).fill(0);
    const rightMax = Array(n).fill(0);

    leftMax[0] = heights[0];
    rightMax[n - 1] = heights[n - 1];

    for (let i = 1; i < n; i++) {
        leftMax[i] = Math.max(leftMax[i - 1], heights[i]);
    }

    for (let i = n - 2; i >= 0; i--) {
        rightMax[i] = Math.max(rightMax[i + 1], heights[i]);
    }

    let waterTrapped = 0;
    const svgWidth = 600;
    const svgHeight = Math.max(...heights) + 50;

    let svg = `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">`;

    heights.forEach((height, index) => {
        const x = (index * svgWidth) / n;
        const rectWidth = svgWidth / n;
        const rectHeight = height;

        svg += `<rect x="${x}" y="${svgHeight - rectHeight}" width="${rectWidth}" height="${rectHeight}"
                fill="#3498db" stroke="#2980b9" stroke-width="2" />`;
    });

    heights.forEach((height, index) => {
        const x = (index * svgWidth) / n;
        const rectWidth = svgWidth / n;
        const waterHeight = Math.min(leftMax[index], rightMax[index]) - height;

        if (waterHeight > 0) {
            svg += `<rect x="${x}" y="${svgHeight - height - waterHeight}" width="${rectWidth}" height="${waterHeight}"
                    fill="#e74c3c" stroke="#c0392b" stroke-width="2" />`;
            waterTrapped += waterHeight;
        }
    });

    svg += `</svg>`;

    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `<h2>Units of Water Trapped: ${waterTrapped} units</h2>`;
    resultElement.innerHTML += svg;
}
