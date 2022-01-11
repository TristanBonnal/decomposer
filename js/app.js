const app = {
    // Dimensions grille
    rowsNb: 4,
    columnsNb: 6,

    //Positions de départ et d'arivée aléatoire
    getRowAndColumnPosition: () => {
        //Départ
        let rowStartPosition = utils.getRandomNumber(1, app.rowsNb);
        let columnStartPosition = utils.getRandomNumber(0, app.columnsNb - 1);
    
        //Arrivée
        do {
            rowEndPosition = utils.getRandomNumber(1, app.rowsNb);
        } while (rowEndPosition == rowStartPosition);

        do {
            columnEndPosition = utils.getRandomNumber(0, app.columnsNb - 1);
        } while (columnEndPosition == columnStartPosition);

        return {
            'rowStart': rowStartPosition,
            'columnStart': columnStartPosition,
            'rowEnd': rowEndPosition,
            'columnEnd': columnEndPosition
        };
    },

    init: function() {
        app.drawBoard();
        document.addEventListener('keydown', app.handleKeydown);
        document.getElementById('launchScript').addEventListener('click', app.handleLaunchScriptButton);
    },

    drawBoard: () => {
        const boardElement = document.getElementById('board');

        //Définition de la grille
        for (let i = 1; i <= app.rowsNb; i++) {
            cellRowElement = document.createElement('div');
            cellRowElement.classList.add('cellRow');
            cellRowElement.id = 'row' + i;
            for (j = 1; j <= app.columnsNb; j++) {
                cellElement = document.createElement('div');
                cellElement.classList.add('cell');
                cellRowElement.append(cellElement);
            }
            boardElement.append(cellRowElement);
        }

        //Définition cellule de départ et cellule d'arrivée
        const positions = app.getRowAndColumnPosition();
        const firstRowElement = document.getElementById('row' + positions.rowStart);
        const firstCellElement = firstRowElement.childNodes.item(positions.columnStart);
        firstCellElement.classList.add('cellStart');

        const lastRowElement = document.getElementById('row' + positions.rowEnd);
        const lastCellElement = lastRowElement.childNodes.item(positions.columnEnd);
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
        const textContent = document.getElementById('userCode').value;

        let codeLines = textContent.split('\n');
        console.log(codeLines);


        window.setTimeout(
            function() {
                app.codeLineLoop(codeLines, 0);
            }, 
            2000);
    },
    
    codeLineLoop: function(codeLines, index) {

        let currentLine = codeLines[index];

        console.log(currentLine);
        if (currentLine == 'turn left') {
            app.turnLeft();
        } else if (currentLine == 'turn right') {
            app.turnRight();
        } else if (currentLine == 'move forward') {
            app.moveForward();
        } else {
            console.log('erreur script');
            alert('Erreurs dans le script :(\nLa ligne suivante n\' est pas reconnue : \n' + currentLine );
            // return;
        }

        index++;

        if (index < codeLines.length) {
            window.setTimeout(
                function() {
                    app.codeLineLoop(codeLines, index);
                },
                1000
            );
        } else {
            window.setTimeout(
                function() {
                    app.checkSuccess();
                },
                1000
            );
        }
    },
    checkSuccess: function() {
        const endCell = document.querySelector('.cellEnd');

        if (endCell.classList.contains('cellCurrent')) {
            alert('Gagné ! :)');
        } else {
            alert('Perdu ! :(');
        }
    },
    getRandomNumber: (min, max) => {
        let randomNumber =  Math.random() * (max - min) + min;
        return Math.round(randomNumber);
    }
};

document.addEventListener('DOMContentLoaded', app.init);
