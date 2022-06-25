var board_array = new Array(6).fill(0).map(() => new Array(7).fill(0));
var clr = [ 'White',  'pink', 'Red',    'Orange', 'DodgerBlue',
            'MediumSeaGreen', 'Gray', 'SlateBlue' ,'Violet', 'LightGray'];

cellHeight = 80;
cellWeight = 80;

emptyCell = 0;
oragneBall = 3; // player ball
redBall = 2; // AI ball


function delay(delayInms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(2);
        }, delayInms);
    });
    // const curSec=new Date().getSeconds();
    // while(new Date().getSeconds()!=((curSec+1)%60));
}

function create_cell(i, j, val){
	let tag = document.createElement("div");
	tag.classList.add("cell");
    tag.addEventListener("click",function(e){
        put_stone(j, oragneBall);
    })
	tag.style.width = cellHeight + 'px';
	tag.style.height = cellWeight + 'px';
	
    tag.style.backgroundColor = clr[board_array[i][j]];
	
	let element = document.getElementById("board");
	element.appendChild(tag);
}

async function show_array(row, clm){
	const parent = document.getElementById("board");
	while (parent.firstChild) {
		parent.firstChild.remove()
	}

	for(let i=0; i<row; i++){
		for(let j=0; j<clm; j++){
			create_cell(i,j,board_array[i][j]);
		}
		let tag = document.createElement("br");
		document.getElementById("board").appendChild(tag);
	}
}


function wining_state(colour){
    // horizontal check
    for(let i=0; i<6; i++){
        for(let j=0; j<7; j++){
            let cnt = 0;
            for(let elm=j, x=0; elm <7 && x <4; elm++, x++){
                if(board_array[i][elm] == colour) cnt++;
            }
            if(cnt == 4) return true;
        }
    }
    // vertical check
    for(let j=0; j<7; j++){
        for(let i=0; i<6; i++){
            cnt = 0;
            for(let elm=i, x=0; elm<6 && x<4; elm++, x++){
                if(board_array[elm][j] == colour) cnt++;
            }
            if(cnt == 4) return true;
        }
    }
    return false;
}

async function put_stone(column, colour){
    row = -1;
    for(let i = 0; i<6; i++){
        if(board_array[i][column] != 0){
            break;
        }
        row = i;
        if(i > 0){
            board_array[i-1][column] = emptyCell;
        }
        board_array[i][column] = colour;
        delay(10000);
        show_array(6,7);
        
    }
    if(row == -1){
        window.alert("wrong position selection");
    }

    console.log(Huristic_score(board_array, oragneBall));
}

window.onload = function create_board() {
    show_array(6,7);
    
}

// ..................................AI..................................

function consoleLogBoard(arr2){
    arr = JSON.parse(JSON.stringify(arr2));
    for(let i=0; i<6; i++){
        console.log(arr[i][0],arr[i][1], arr[i][2],arr[i][3], arr[i][4], arr[i][5], arr[i][6]);
        console.log(".")
    }
    console.log("**********************");
}
function Huristic_score(arr, colour){
    let score = 0;
    //.................................4 check...........................................
    // horizontal check 4
    for(let i=0; i<6; i++){
        for(let j=0; j<7; j++){
            let cnt = 0;
            for(let elm=j, x=0; elm <7 && x <4; elm++, x++){
                if(board_array[i][elm] == colour) cnt++;
            }
            if(cnt == 4) score += 100;
        }
    }
    // vertical check 4
    for(let j=0; j<7; j++){
        for(let i=0; i<6; i++){
            cnt = 0;
            for(let elm=i, x=0; elm<6 && x<4; elm++, x++){
                if(board_array[elm][j] == colour) cnt++;
            }
            if(cnt == 4) score += 100;
        }
    }
    // ......................cross check1 (/) 4
    for(let i = 0; i < 6; i++){
        let row = i;
        let col = 0;

        while(row >= 0 && col <7){
            let cnt = 0;
            let a = row; let b = col;
            for(let x=0; x<4 && a>=0 && b<7; x++, a--, b++){
                if(board_array[a][b] == colour) cnt++;
            }
            if(cnt == 4) score += 100;
            row--;
            col++;
        }
    }

    for(let i = 0; i < 7; i++){
        let col = i;
        let row = 5;

        while(row >= 0 && col <7){
            let cnt = 0;
            let a = row; let b = col;
            for(let x=0; x<4 && a>=0 && b<7; x++, a--, b++){
                if(board_array[a][b] == colour) cnt++;
            }
            if(cnt == 4) score += 100;
            row--;
            col++;
        }
    }

    // ......................cross check2 (\) 4
    for(let i=6; i>=0; i--){
        let col = i;
        let row = 5;

        while(col >=0 && row>=0){
            let cnt  = 0;
            let a = row; let b = col;

            for(let x=0; x<4 && a>=0 && b>=0; x++, a--, b--){
                if(board_array[a][b] == colour) cnt++;
            }
            if(cnt == 4) score += 100;
            row--; col--;
        }
    }

    for(let i=5; i>=0; i--){
        let row = i;
        let col = 6;

        while(col >= 0 && row >=0){
            let cnt = 0;
            let a = row; let b = col;
            for(let x=0; x<4 && a>=0 && b>=0; x++, a--, b--){
                if(board_array[a][b] == colour) cnt++;
            }
            if(cnt == 4) score += 100;
            row--; col--;
        }
    }
    //........................................check 3................................
     // horizontal check 3
     for(let i=0; i<6; i++){
        for(let j=0; j<7; j++){
            let cnt = 0;
            for(let elm=j, x=0; elm <7 && x <3; elm++, x++){
                if(board_array[i][elm] == colour) cnt++;
            }
            if(cnt == 3) score += 40;
        }
    }
    // vertical check 3
    for(let j=0; j<7; j++){
        for(let i=0; i<6; i++){
            cnt = 0;
            for(let elm=i, x=0; elm<6 && x<3; elm++, x++){
                if(board_array[elm][j] == colour) cnt++;
            }
            if(cnt == 3) score += 40;
        }
    }
    // ......................cross check1 (/) 3
    for(let i = 0; i < 6; i++){
        let row = i;
        let col = 0;

        while(row >= 0 && col <7){
            let cnt = 0;
            let a = row; let b = col;
            for(let x=0; x<3 && a>=0 && b<7; x++, a--, b++){
                if(board_array[a][b] == colour) cnt++;
            }
            if(cnt == 3) score += 40;
            row--;
            col++;
        }
    }

    for(let i = 0; i < 7; i++){
        let col = i;
        let row = 5;

        while(row >= 0 && col <7){
            let cnt = 0;
            let a = row; let b = col;
            for(let x=0; x<3 && a>=0 && b<7; x++, a--, b++){
                if(board_array[a][b] == colour) cnt++;
            }
            if(cnt == 3) score += 40;
            row--;
            col++;
        }
    }

    // ......................cross check2 (\) 3
    for(let i=6; i>=0; i--){
        let col = i;
        let row = 5;

        while(col >=0 && row>=0){
            let cnt  = 0;
            let a = row; let b = col;

            for(let x=0; x<3 && a>=0 && b>=0; x++, a--, b--){
                if(board_array[a][b] == colour) cnt++;
            }
            if(cnt == 3) score += 40;
            row--; col--;
        }
    }

    for(let i=5; i>=0; i--){
        let row = i;
        let col = 6;

        while(col >= 0 && row >=0){
            let cnt = 0;
            let a = row; let b = col;
            for(let x=0; x<3 && a>=0 && b>=0; x++, a--, b--){
                if(board_array[a][b] == colour) cnt++;
            }
            if(cnt == 3) score += 40;
            row--; col--;
        }
    }

    //........................................check 2................................
     // horizontal check 2
     for(let i=0; i<6; i++){
        for(let j=0; j<7; j++){
            let cnt = 0;
            for(let elm=j, x=0; elm <7 && x <2; elm++, x++){
                if(board_array[i][elm] == colour) cnt++;
            }
            if(cnt == 2) score += 10;
        }
    }
    // vertical check 3
    for(let j=0; j<7; j++){
        for(let i=0; i<6; i++){
            cnt = 0;
            for(let elm=i, x=0; elm<6 && x<2; elm++, x++){
                if(board_array[elm][j] == colour) cnt++;
            }
            if(cnt == 2) score += 10;
        }
    }
    // ......................cross check1 (/) 2
    for(let i = 0; i < 6; i++){
        let row = i;
        let col = 0;

        while(row >= 0 && col <7){
            let cnt = 0;
            let a = row; let b = col;
            for(let x=0; x<2 && a>=0 && b<7; x++, a--, b++){
                if(board_array[a][b] == colour) cnt++;
            }
            if(cnt == 2) score += 10;
            row--;
            col++;
        }
    }

    for(let i = 0; i < 7; i++){
        let col = i;
        let row = 5;

        while(row >= 0 && col <7){
            let cnt = 0;
            let a = row; let b = col;
            for(let x=0; x<2 && a>=0 && b<7; x++, a--, b++){
                if(board_array[a][b] == colour) cnt++;
            }
            if(cnt == 2) score += 10;
            row--;
            col++;
        }
    }

    // ......................cross check2 (\) 2
    for(let i=6; i>=0; i--){
        let col = i;
        let row = 5;

        while(col >=0 && row>=0){
            let cnt  = 0;
            let a = row; let b = col;

            for(let x=0; x<2 && a>=0 && b>=0; x++, a--, b--){
                if(board_array[a][b] == colour) cnt++;
            }
            if(cnt == 2) score += 10;
            row--; col--;
        }
    }

    for(let i=5; i>=0; i--){
        let row = i;
        let col = 6;

        while(col >= 0 && row >=0){
            let cnt = 0;
            let a = row; let b = col;
            for(let x=0; x<2 && a>=0 && b>=0; x++, a--, b--){
                if(board_array[a][b] == colour) cnt++;
            }
            if(cnt == 2) score += 10;
            row--; col--;
        }
    }
    return score;
    
}