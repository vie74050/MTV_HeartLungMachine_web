export function UpdateTooltipText(text: string) {
    const tooltipDiv = document.getElementById("unity-tooltip");

    if (!tooltipDiv) {
        createTooltipElement();
    }

    if (tooltipDiv) {
        tooltipDiv.innerHTML = text;
        // position the tooltipDiv based on mouse position
        document.onmousemove = function(e) {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            tooltipDiv.style.left = (mouseX + 15) + "px";
            tooltipDiv.style.top = (mouseY + 15) + "px";
        }

        // if text is empty, hide the tooltipDiv
        if (text.trim() === "") {
            tooltipDiv.style.display = "none";
        } else {
            tooltipDiv.style.display = "block";
        }
    }
}

function createTooltipElement() {
    const tooltipElem = `<div id="unity-tooltip"></div>`;
    document.body.insertAdjacentHTML('beforeend', tooltipElem);
}