var app = {
  init: function() {
    console.log('init');

    // TODO
    app.drawBoard();

    // Event listeners - TODO
  },
  drawBoard: () => {
    const boardElement = document.getElementById('board');
    const rows = 4;
    const columns = 6;

    for (let i = 1; i <= rows; i++) {
        cellRowElement = document.createElement('div');
        cellRowElement.classList.add('cellRow');
        cellRowElement.id = 'row' + i;
        for (j = 1; j <= columns; j++) {
            cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellRowElement.append(cellElement);
        }
        boardElement.append(cellRowElement);
    }
  },
  handleLaunchScriptButton: function() {
    // TODO
    
    // TODO : get all lines as an array

    window.setTimeout(function() {
      app.codeLineLoop(codeLines, 0);
    }, 2000);
  },
  codeLineLoop: function(codeLines, index) {
    // Getting currentLine
    var currentLine = codeLines[index];
    console.log(currentLine);


    // Increment
    index++;

    // if still a line to interpret
    if (index < codeLines.length) {
      // Recall same method (=> make a loop)
      window.setTimeout(function() {
        app.codeLineLoop(codeLines, index);
      }, 1000);
    } else {
      window.setTimeout(function() {
        app.checkSuccess();
      }, 1000);
    }
  },
  checkSuccess: function() {
    // TODO display if the game is won or not
  }
};

document.addEventListener('DOMContentLoaded', app.init);
