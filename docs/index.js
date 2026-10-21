

class MonospaceTextDisplay {
  constructor(width, height, elementId) {
    this.height = height;
    this.width = width;
    this.element = document.getElementById(elementId);
    this.data = []
    for (let rowIndex = 0; rowIndex < this.height; ++rowIndex) {
      const row = Array(width).fill("<span class=\"ground\">.</span>")
      this.data.push(row)
    }
  }

  drawGrass(x, y, width) {
    for (let colIndex = x; colIndex - x < width && colIndex < this.width; ++colIndex) {
      this.data[y][colIndex] = "<span class=\"grass\">w</span>";
    }
  }
  
  render() {
    this.element.innerHTML = this.data.map((row) => row.join("")).join("\n");
  }
}


function randomInt(max) {
  return Math.floor(Math.random() * max);
}

function main() {
  const width = 160;
  const height = 60;
  const display = new MonospaceTextDisplay(width, height, "graveyard");
  const numGrass = 50;
  for (let i = 0; i < numGrass; ++i) {
    display.drawGrass(randomInt(width), randomInt(height), randomInt(3) + 2);
  }

  // display.drawTombstone(100, 100, "tensorflow")
  
  display.render();
}

main();