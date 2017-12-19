var matrix = [];
var n=6;
var table = document.getElementById("tablazat");
for(var i=0;i<n;i++)
{
    var tr = document.createElement("tr");
    table.appendChild(tr);

    matrix.push([]);

    for(var j=0;j<n;j++)
    {
        var td = document.createElement("td");
        tr.appendChild(td);
        td.innerHTML = i+":"+j;

        matrix[i].push(td);

        var fn = function (i2, j2) {
            td.onclick = function() {
                matrix[i][j]=fn(i2,j2);
                console.log("Rákattintottál a ["+i2+":"+j2+"] mezőre.");
            }
        };

        fn(i, j);
    }
}