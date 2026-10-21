

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
      this.data[y + 10][colIndex] = "-";
      this.data[y][colIndex] = "<span class=\"tombstone\">" + text[i] + "</span>";
      if (i == 0) {
        this.data[y][colIndex] = "<a href=\"https://github.com/" + text + "\" class=\"tombstone\">" + this.data[y][colIndex];
      } else if (i == text.length - 1) {
        this.data[y][colIndex] += "</a>"
      }

      for (let j = 1; j < 10; ++j) {
        this.data[y + j][colIndex] = " ";
      }
    }

    for (let i = 0; i < 10; ++i) {
      // for (let j = 0; j < text.length; ++j) {
      //   const colIndex = x + i;
      //   this.data[y + j][colIndex] = ".";
      // }
      this.data[y + i][x - 1] = "|";
      this.data[y + i][x + width] = "|";
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

  const repositories = [
    "Reactive-Extensions/RxJS",
    "railsware/upterm",
    "reddit-archive/reddit",
    "Kotlin/anko",
    "boltdb/bolt",
    "youfou/wxpy",
    "angular-ui/bootstrap",
    "schickling/chromeless",
    "cubiq/iscroll",
  ]
  const width = 160;
  const height = 60;
  const display = new MonospaceTextDisplay(width, height, "graveyard");
  const numGrass = 50;
  for (let i = 0; i < numGrass; ++i) {
    display.drawGrass(randomInt(width), randomInt(height), randomInt(5) + 5);
  }
  const tombstoneText = repositories[randomInt(repositories.length)];
  display.drawTombstone(Math.floor(width / 2 - tombstoneText.length / 2), Math.floor(height / 2), tombstoneText)
  
  display.render();
}

main();