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
    const maxHeight = Math.max(...heights);

    let tableHTML = '<table>';
    for (let row = 0; row < maxHeight; row++) {
        tableHTML += '<tr>';
        for (let col = 0; col < n; col++) {
            const height = heights[col];
            const waterHeight = Math.min(leftMax[col], rightMax[col]) - height;
            if (waterHeight > 0 && maxHeight - row <= waterHeight) {
                tableHTML += `<td style="background-color: #3498db;"></td>`;
                waterTrapped++;
            } else if (height >= maxHeight - row) {
                tableHTML += `<td style="background-color: #e74c3c;"></td>`;
            } else {
                tableHTML += `<td></td>`;
            }
        }
        tableHTML += '</tr>';
    }
    tableHTML += '</table>';

    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `<h2>Units of Water Trapped: ${waterTrapped} units</h2>`;
    resultElement.innerHTML += tableHTML;
}
