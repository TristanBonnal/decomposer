var app = {
    init: function() {
        console.log('init');

        // TODO
        app.drawBoard();

        document.addEventListener('keydown', app.handleKeydown)
    },

    drawBoard: () => {
        const boardElement = document.getElementById('board');
        const rowsNb = 4;
        const columnsNb = 6;

        //Définition de la grille
        for (let i = 1; i <= rowsNb; i++) {
            cellRowElement = document.createElement('div');
            cellRowElement.classList.add('cellRow');
            cellRowElement.id = 'row' + i;
            for (j = 1; j <= columnsNb; j++) {
                cellElement = document.createElement('div');
                cellElement.classList.add('cell');
                cellRowElement.append(cellElement);
            }
            boardElement.append(cellRowElement);
        }

        //Définition cellule de départ et cellule d'arrivée
        const firstRowElement = document.getElementById('row1');
        const firstCellElement = firstRowElement.firstChild;
        firstCellElement.classList.add('cellStart');

        const lastRowElement = document.getElementById('row' + rowsNb);
        const lastCellElement = lastRowElement.lastChild;
        lastCellElement.classList.add('cellEnd');

        //Définition position de départ du curseur
        firstCellElement.classList.add('cellCurrent', 'cellCurrent-right');


    },

    moveForward: () => {
        const currentCellCursor = document.querySelector('.cellCurrent');
        const currentRow = currentCellCursor.closest('.cellRow');
        let newCellCursor = null;

        //Mouvement en avant si le curseur est orienté vers la droite
        if (currentCellCursor.classList.contains('cellCurrent-right')) {
            newCellCursor = currentCellCursor.nextSibling;
        }


        //Actualisation position curseur
        currentCellCursor.classList.remove('cellCurrent', 'cellCurrent-right');
        newCellCursor.classList.add('cellCurrent', 'cellCurrent-right');
        console.log(newCellCursor);
    },

    turnRight: () => {
        const currentCellCursor = document.querySelector('.cellCurrent');

        if (currentCellCursor.classList.contains('cellCurrent-right')) {
            currentCellCursor.classList.replace('cellCurrent-right', 'cellCurrent-bottom');
        }
        // if (currentCellCursor.classList.contains('cellCurrent-bottom')) {
        //     currentCellCursor.classList.replace('cellCurrent-bottom', 'cellCurrent-left');
        // }
        // if (currentCellCursor.classList.contains('cellCurrent-left')) {
        //     currentCellCursor.classList.replace('cellCurrent-left', 'cellCurrent-top');
        // }
        // if (currentCellCursor.classList.contains('cellCurrent-top')) {
        //     currentCellCursor.classList.replace('cellCurrent-top', 'cellCurrent-right');
        // }
    },

    handleKeydown: (e) => {
        console.log(e.code);
        if (e.code == 'ArrowUp') {
            app.moveForward();
        }
        if (e.code == 'ArrowRight') {
            app.turnRight();
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
