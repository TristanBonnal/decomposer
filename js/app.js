const app = {
    // Dimensions grille
    rowsNb: 4,
    columnsNb: 6,
    
    init: function() {
        //Positions de départ et d'arivée
        app.positions = app.getRowAndColumnPosition();

        //Position actuelle
        app.currentRow = app.positions.rowStart;
        app.currentColumn = app.positions.columnStart;
        
        //Définition de la grille
        app.drawBoard();

        //Listeners pour les scripts de jeu
        document.addEventListener('keydown', app.handleKeydown);
        document.getElementById('launchScript').addEventListener('click', app.handleLaunchScriptButton);
    },

    //Methode renvoyant un objet qui contient les positions de départ et d'arrivée aléatoirement
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
        const firstRowElement = document.getElementById('row' + app.positions.rowStart);
        const firstCellElement = firstRowElement.childNodes.item(app.positions.columnStart);
        firstCellElement.classList.add('cellStart');

        const lastRowElement = document.getElementById('row' + app.positions.rowEnd);
        const lastCellElement = lastRowElement.childNodes.item(app.positions.columnEnd);
        lastCellElement.classList.add('cellEnd');

        //Définition position de départ du curseur
        firstCellElement.classList.add('cellCurrent', 'cellCurrent-right');


    },

    moveForward: () => {
        //Récupération de la cellule contenant le curseur
        const currentCellCursor = document.querySelector('.cellCurrent');
        
        //Mouvement en avant en fonction de la direction du curseur
        if (currentCellCursor.classList.contains('cellCurrent-right')) {
            app.currentColumn++;
            direction = 'cellCurrent-right';
        } else if (currentCellCursor.classList.contains('cellCurrent-bottom')) {
            app.currentRow++;
            direction = 'cellCurrent-bottom';
        } else if (currentCellCursor.classList.contains('cellCurrent-left')) {
            app.currentColumn--;
            direction = 'cellCurrent-left';
        } else if (currentCellCursor.classList.contains('cellCurrent-top')) {
            app.currentRow--;
            direction = 'cellCurrent-top';
        }
        
        //Empêche de sortir de la grille en respectant les coordonnées mini et maxi
        if (app.currentRow < 1) app.currentRow = 1;
        if (app.currentRow > app.rowsNb) app.currentRow = app.rowsNb;
        if (app.currentColumn < 0) app.currentColumn = 0;
        if (app.currentColumn > app.columnsNb -1) app.currentColumn = app.columnsNb -1;
        
        //Actualisation position curseur
        let newRow = document.getElementById('row' + app.currentRow)
        let newCellCursor = newRow.childNodes.item(app.currentColumn);

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
        } else if (currentLine.trim() != '') {
            console.log('erreur script');
            alert('Erreurs dans le script :(\nLa ligne suivante n\' est pas reconnue : \n' + currentLine);
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
    }
};

document.addEventListener('DOMContentLoaded', app.init);
