var app = {
    //Position de départ
    rowPosition: 1,
    columnPosition: 0,

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
        //Récupération de la cellule contenant le curseur
        const currentCellCursor = document.querySelector('.cellCurrent');
        
        //Mouvement en avant en fonction de la direction du curseur
        if (currentCellCursor.classList.contains('cellCurrent-right')) {
            app.columnPosition++;
            direction = 'cellCurrent-right';
        } else if (currentCellCursor.classList.contains('cellCurrent-bottom')) {
            app.rowPosition++;
            direction = 'cellCurrent-bottom';
        } else if (currentCellCursor.classList.contains('cellCurrent-left')) {
            app.columnPosition--;
            direction = 'cellCurrent-left';
        } else if (currentCellCursor.classList.contains('cellCurrent-top')) {
            app.rowPosition--;
            direction = 'cellCurrent-top';
        }
        
        //Empêche de sortir de la grille en respectant les coordonnées mini et maxi
        if (app.rowPosition < 1) app.rowPosition = 1;
        if (app.rowPosition > 4) app.rowPosition = 4;
        if (app.columnPosition < 0) app.columnPosition = 0;
        if (app.columnPosition > 5) app.columnPosition = 5;
        
        //Actualisation position curseur
        let newRow = document.getElementById('row' + app.rowPosition)
        let newCellCursor = newRow.childNodes.item(app.columnPosition);

        currentCellCursor.classList.remove('cellCurrent', direction);
        newCellCursor.classList.add('cellCurrent', direction);
    },

    turnRight: () => {
        const currentCellCursor = document.querySelector('.cellCurrent');

        if (currentCellCursor.classList.contains('cellCurrent-right')) {
            currentCellCursor.classList.replace('cellCurrent-right', 'cellCurrent-bottom');
        } else if (currentCellCursor.classList.contains('cellCurrent-bottom')) {
            currentCellCursor.classList.replace('cellCurrent-bottom', 'cellCurrent-left');
        } else if (currentCellCursor.classList.contains('cellCurrent-left')) {
            currentCellCursor.classList.replace('cellCurrent-left', 'cellCurrent-top');
        } else if (currentCellCursor.classList.contains('cellCurrent-top')) {
            currentCellCursor.classList.replace('cellCurrent-top', 'cellCurrent-right');
        }
    },

    turnLeft: () => {
        const currentCellCursor = document.querySelector('.cellCurrent');

        if (currentCellCursor.classList.contains('cellCurrent-right')) {
            currentCellCursor.classList.replace('cellCurrent-right', 'cellCurrent-top');
        } else if (currentCellCursor.classList.contains('cellCurrent-bottom')) {
            currentCellCursor.classList.replace('cellCurrent-bottom', 'cellCurrent-right');
        } else if (currentCellCursor.classList.contains('cellCurrent-left')) {
            currentCellCursor.classList.replace('cellCurrent-left', 'cellCurrent-bottom');
        } else if (currentCellCursor.classList.contains('cellCurrent-top')) {
            currentCellCursor.classList.replace('cellCurrent-top', 'cellCurrent-left');
        }
    },

    handleKeydown: (e) => {
        if (e.code == 'ArrowUp') {
            app.moveForward();
        }
        if (e.code == 'ArrowRight') {
            app.turnRight();
        }
        if (e.code == 'ArrowLeft') {
            app.turnLeft();
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
