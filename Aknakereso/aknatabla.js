var M = 6, S = 6, B = 6;
/*--------------------------------*/
var tabla = [];
var pontok = [];
var Semmi = 0,
    Flag = 1,
    Ures = 2;
var Bomba = -1;
var Jatek = true;

function onTable(x, y) {
    return x >= 0 && y >= 0 && x < M && y < S;
}

function countMines(x, y) {
    var count = 0;
    for (var dx = -1; dx <= 1; ++dx) {
        for (var dy = -1; dy <= 1; ++dy) {
            if (dx == 0 && dy == 0) {
                continue;
            }
            var yy = y + dy,
                xx = x + dx;
            if (onTable(xx, yy)) {
                if (tabla[yy][xx] == Bomba) {
                    ++count;
                }
            }
        }
    }
    return count;
}

function generateMinefield() {
    for (var y = 0; y < S; ++y) {
        tabla.push([]);
        pontok.push([]);
        for (var x = 0; x < M; ++x) {
            tabla[y].push(0);
            pontok[y].push(Semmi);
        }
    }

    for (var mine = 0; mine < B; ++mine) {
        var x, y;
        do {
            x = Math.floor(Math.random() * M),
                y = Math.floor(Math.random() * S);
        } while (tabla[y][x] == Bomba);

        tabla[y][x] = Bomba;
    }

    for (var y = 0; y < S; ++y) {
        for (var x = 0; x < M; ++x) {
            if (tabla[y][x] != Bomba) {
                tabla[y][x] = countMines(x, y);
            }
        }
    }
}

function guiWin(x, y) {
    if (!Jatek) {
        return;
    }
    if (pontok[y][x] == Flag) {
        return;
    }

    if (tabla[y][x] == Bomba) {
        alert('Vége a játéknak');
        Jatek = false;
        felfed(false);
        return;
    }

    pontok[y][x] = Ures;
    if (tabla[y][x] == 0) {
        for (var dx = -1; dx <= 1; ++dx) {
            for (var dy = -1; dy <= 1; ++dy) {
                var xx = x + dx,
                    yy = y + dy;
                if (onTable(xx, yy)) {
                    if (pontok[yy][xx] != Ures) {
                        guiWin(xx, yy);
                    }
                }
            }
        }

    }

    if (nyertE()) {
        alert('Nyertél');
        Jatek = false;
        felfed(true);
    }
}

function nyertE() {
    for (var y = 0; y < S; ++y) {
        for (var x = 0; x < M; ++x) {
            if (tabla[y][x] != Bomba) {
                if (pontok[y][x] != Ures) {
                    return false;
                }
            }
        }
    }
    return true;
}

function zBlock(x, y) {
    if (pontok[y][x] == Ures) {
        return;
    }
    pontok[y][x] = 1 - pontok[y][x];
}

function felfed(victorious) {
    for (var y = 0; y < S; ++y) {
        for (var x = 0; x < M; ++x) {
            if (tabla[y][x] == Bomba && victorious) {
                pontok[y][x] = Flag;
                continue;
            }
            pontok[y][x] = Ures;
        }
    }
}