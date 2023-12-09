
document.addEventListener("DOMContentLoaded", function() {
    const displayArea = document.getElementById('displayArea');
    const diagramLabel = document.getElementById("diagramLabel");
    let showDiagram = 0;
    let data;

    fetch('/diagram-data')
        .then(response => response.json())
        .then(fetchedData => {
            data = fetchedData;
            renderData(data);
        });

    document.getElementById('toggleView').addEventListener('click', () => {
        showDiagram = (showDiagram + 1) % 4;
        renderData(data); // Make sure 'data' is accessible here
    });

    function renderDisplayArea(value) {
        if (Array.isArray(value)) {
            // Join the array elements with \n and then display
            displayArea.innerHTML = value.join('\n');
        } else if (typeof value === 'string') {
            // Directly display the string
            displayArea.innerHTML = value;
        } else {
            // For other types, use JSON.stringify
            displayArea.innerHTML = JSON.stringify(value, null, 2);
        }
    }
    
    function renderData(data) {
        if (showDiagram === 0) {
            // Render diagram
            renderDisplayArea(data.diagram);
            diagramLabel.innerHTML = 'Diagram';
        } else if (showDiagram === 1) {
            renderDisplayArea(data.symbol_mask);
            diagramLabel.innerHTML = 'Symbol Mask';
        } else if (showDiagram === 2) {
            renderDisplayArea(data.gearlike_mask);
            diagramLabel.innerHTML = 'Gearlike Mask';
        } else if (showDiagram === 3) {
            renderDisplayArea(data.gear_mask);
            diagramLabel.innerHTML = 'Gear Mask';
        }
    }
});
