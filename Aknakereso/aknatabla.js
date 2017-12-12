var M = 10, S = 10, B = 10;
var asztal = [];
var allas = [];
var Clear = 0,
    Flag = 1,
    Szabad = 2;
var Bomba = -1;
var jatek = true;

function onTable(x, y) {
    return x >= 0 && y >= 0
        && x < M && y < S;
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
                if (asztal[yy][xx] == Bomba) {
                    ++count;
                }
            }
        }
    }
    return count;
}

function init() {
    for (var y = 0; y < S; ++y) {
        asztal.push([]);
        allas.push([]);
        for (var x = 0; x < M; ++x) {
            asztal[y].push(0);
            allas[y].push(Clear);
        }
    }

    for (var mine = 0; mine < B; ++mine) {
        var x, y;
        do {
            x = Math.floor(Math.random() * M),
                y = Math.floor(Math.random() * S);
        } while (asztal[y][x] == Bomba);

        asztal[y][x] = Bomba;
    }

    for (var y = 0; y < S; ++y) {
        for (var x = 0; x < M; ++x) {
            if (asztal[y][x] != Bomba) {
                asztal[y][x] = countMines(x, y);
            }
        }
    }
}

function nyBlock(x, y) {
    if (!jatek) {
        return;
    }
    if (allas[y][x] == Flag) {
        return;
    }

    if (asztal[y][x] == Bomba) {
        alert('Vége a játéknak');
        jatek = false;
        felfed(false);
        return;
    }

    allas[y][x] = Szabad;
    if (asztal[y][x] == 0) {
        for (var dx = -1; dx <= 1; ++dx) {
            for (var dy = -1; dy <= 1; ++dy) {
                var xx = x + dx,
                    yy = y + dy;
                if (onTable(xx, yy)) {
                    if (allas[yy][xx] != Szabad) {
                        nyBlock(xx, yy);
                    }
                }
            }
        }
    }

    if (nyertE()) {
        alert('Nyertél');
        jatek = false;
        felfed(true);
    }
}

function nyertE() {
    for (var y = 0; y < S; ++y) {
        for (var x = 0; x < M; ++x) {
            if (asztal[y][x] != Bomba) {
                if (allas[y][x] != Szabad) {
                    return false;
                }
            }
        }
    }
    return true;
}

function zBlock(x, y) {
    if (allas[y][x] == Szabad) {
        return;
    }
    allas[y][x] = 1 - allas[y][x];
}

function felfed(victorious) {
    for (var y = 0; y < S; ++y) {
        for (var x = 0; x < M; ++x) {
            if (asztal[y][x] == Bomba && victorious) {
                allas[y][x] = Flag;
                continue;
            }
            allas[y][x] = Szabad;
        }
    }
}

init();