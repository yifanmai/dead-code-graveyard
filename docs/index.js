

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

  drawTombstone(x, y, text) {
    const width = text.length;
    for (let i = 0; i < text.length; ++i) {
      const colIndex = x + i;
      this.data[y - 1][colIndex] = "-";
      this.data[y][colIndex] = "<span class=\"tombstone\">" + text[i] + "</span>";
      if (i == 0) {
        this.data[y][colIndex] = "<a href=\"#\" class=\"tombstone\">" + this.data[y][colIndex];
      } else if (i == text.length - 1) {
        this.data[y][colIndex] += "</a>"
      }
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
  const tombstoneText = "asdf"
  display.drawTombstone(Math.floor(width / 2 - tombstoneText.length / 2), Math.floor(height / 2), tombstoneText)
  
  display.render();
}

main();