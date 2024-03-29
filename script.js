let base2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let griglia = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
griglia = shuffle(griglia);
array = grigliaFinale(base2, 4, 16);
let posizione = 16;
let mosse = 0;
let finito = false;

// Generazione griglia
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while(currentIndex > 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}
function creaGriglia(array) {
    for(let i = 0; i < array.length; i++) {

        let blocco = document.createElement('div');
        blocco.onclick = function(e) {
            muovi(e.target.parentNode.id);
        };
        blocco.innerHTML += griglia[i]; 
        blocco.className = "blocco";

        document.getElementById(`${i+1}`).appendChild(blocco);
    }

    let blocco = document.createElement('div');
        blocco.className = "bloccoVuoto";

        document.getElementById(`16`).appendChild(blocco);
}
function grigliaFinale(list, elementi, fin) {
    var matrix = [], i, k;
    let j = 0;

    for(i = 0, k = -1; i < list.length; i++) {
        if(i % elementi === 0) {
            k++;
            matrix[k] = [];
        }

        matrix[k].push(list[i]);
        if(i == list.length -1) {
            matrix[3].push(fin);
        }
    }

    return matrix;
}

let row = 3;
let col = 3;

function muovi(e) {
    if(!finito) {
        let position = e;
        console.log(position);
        let blocco1 = document.getElementById(position.toString()).children[0];
        let blocco2 = document.querySelector(".bloccoVuoto");

        let riga;
        if(position <= 4) {riga = 1}
        if(position > 4 && position <= 8) {riga = 2;}
        if(position > 8 && position <= 12) {riga = 3;}
        if(position > 12 && position <= 16) {riga = 4;}
        let colonna = 4;
        for(let i = 0; i < colonna; i++) {
            if(riga == 1) {
                if(riga + i == position) {
                    colonna = i;
                    riga--;
                    break;
                }
            }
            if(riga == 2) {
                if(5 + i == position) {
                    colonna = i;
                    riga--;
                    break;
                }
            }
            if(riga == 3) {
                if(9 + i == position) {
                    colonna = i;
                    riga--;
                    break;
                }
            }
            if(riga == 4) {
                if(13 + i == position) {
                    colonna = i;
                    riga--;
                    break;
                }
            }
        }

        if( riga-1 != -1 && array[riga-1][colonna] == 16) {
            console.log(1);
            mosse++;
            row++;

            document.getElementById(posizione).append(blocco1);
            document.getElementById(position).append(blocco2); 

            posizione = position;

            let x = array[riga][colonna];
            array[riga][colonna] = array[riga-1][colonna];
            array[riga-1][colonna] = x;

            x = griglia2[riga][colonna];
            griglia2[riga][colonna] = griglia2[riga-1][colonna];
            griglia2[riga-1][colonna] = x;

            console.log(checkWin());
            
        }
        else if(riga+1 != 4 && array[riga+1][colonna] == 16) {
            console.log(2);
            mosse++;
            row--;

            document.getElementById(posizione).append(blocco1);
            document.getElementById(position).append(blocco2);

            posizione = position;

            let x = array[riga][colonna];
            array[riga][colonna] = array[riga+1][colonna];
            array[riga+1][colonna] = x;

            x = griglia2[riga][colonna];
            griglia2[riga][colonna] = griglia2[riga+1][colonna];
            griglia2[riga+1][colonna] = x;

            console.log(checkWin());
            
        }
        else if(colonna-1 != -1 && array[riga][colonna-1] == 16) {
            console.log(3);
            mosse++;
            col++;

            document.getElementById(posizione).append(blocco1);
            document.getElementById(position).append(blocco2); 

            posizione = position

            let x = array[riga][colonna];
            array[riga][colonna] = array[riga][colonna-1];
            array[riga][colonna-1] = x;

            x = griglia2[riga][colonna];
            griglia2[riga][colonna] = griglia2[riga][colonna-1];
            griglia2[riga][colonna-1] = x;

            console.log(checkWin());
            
        }
        else if(colonna+1 != 4 && array[riga][colonna+1] == 16) {
            console.log(4);
            mosse++;
            col--;
            
            document.getElementById(posizione).append(blocco1);
            document.getElementById(position).append(blocco2); 

            posizione = position;

            let x = array[riga][colonna];
            array[riga][colonna] = array[riga][colonna+1];
            array[riga][colonna+1] = x;

            x = griglia2[riga][colonna];
            griglia2[riga][colonna] = griglia2[riga][colonna+1];
            griglia2[riga][colonna+1] = x;

            console.log(checkWin());
            
        }
    }
    
}

creaGriglia(griglia);
griglia2 = grigliaFinale(griglia, 4, 0);

let grz = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 0]];

function checkWin() {
    if(mosse > 0) {
        document.getElementById('primaMossa').style.display = 'none';
    }
    let x = 0;
    for(let i = 0; i < griglia2.length; i++) {

        for(let j = 0; j < griglia2[i].length; j++) {
            console.log(griglia2[i][j])

            if(x == 15) {
                document.getElementById('mossa').innerHTML = "Vittoria: " + mosse;
                document.getElementById('mossa').style.color = "green"
                finito = true;
                return true;
            }

            if(griglia2[i][j] == x+1) {
                x++; 
                continue;
            }
            else{
                x = 0;
                document.getElementById('mossa').innerHTML = "Mosse: " + mosse;
                return false;
            } 
        }

    }
}

