export class Output {
    constructor(w, h) {
        this.w = w;
        this.h = h;
        this.tileIndex = 0;
        this.gridBox = document.getElementById("grid");
        this.lastRow = undefined;
    }

    addTile(tile) {
        this.preBox.innerHTML += tile;
        if(((this.tileIndex + 1) % this.w) == 0)
            this.breakLine();
        this.tileIndex += 1;
    }

    addColorTile(color, text = undefined) {
        if(this.tileIndex % this.w == 0) {
            let row = document.createElement("div");
            row.className = "grid-row";
            this.lastRow = row;
            this.gridBox.appendChild(this.lastRow);
        }

        let element = document.createElement("div");
        element.style.backgroundColor = color;
        element.className = "grid-item";
        element.innerText = text ? text : "u";

        this.lastRow.appendChild(element);
        this.tileIndex += 1;
    }

    breakLine() {
        this.preBox.innerHTML += "\n";
    }

    reset() {
        // remove all child nodes of container
        while(this.gridBox.lastChild) {
            this.gridBox.removeChild(this.gridBox.lastChild);
        }
    }
}