var board_array = new Array(6).fill(0).map(() => new Array(7).fill(0));
var clr = [ 'White',  'pink', 'Red',    'Orange', 'DodgerBlue',
            'MediumSeaGreen', 'Gray', 'SlateBlue' ,'Violet', 'LightGray'];

cellHeight = 80;
cellWeight = 80;

emptyCell = 0;
oragneBall = 3; // player ball
redBall = 2; // AI ball

function min(a, b){
    if(a < b) return a;
    return b;
}
function max(a, b){
    if(a > b) return a;
    return b;
}
function reSet(){
    for(let i=0; i<6; i++){
        for(let j=0; j<7; j++){
            board_array[i][j] = emptyCell;
        }
    }
}
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
        show_array(6,7);
        if(wining_state(board_array ,oragneBall) == true){
            alert("player has won");
            reSet();
            show_array(6,7);
        }
        play();
        if(wining_state(board_array, redBall) == true){
            alert("AI has won");
            reSet();
            show_array(6,7);
        }
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
function wining_state(arr, colour){
    // horizontal check
    for(let i=0; i<6; i++){
        for(let j=0; j<7; j++){
            let cnt = 0;
            for(let elm=j, x=0; elm <7 && x <4; elm++, x++){
                if(arr[i][elm] == colour) cnt++;
            }
            if(cnt == 4) return true;
        }
    }
    // vertical check
    for(let j=0; j<7; j++){
        for(let i=0; i<6; i++){
            cnt = 0;
            for(let elm=i, x=0; elm<6 && x<4; elm++, x++){
                if(arr[elm][j] == colour) cnt++;
            }
            if(cnt == 4) return true;
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
                if(arr[a][b] == colour) cnt++;
            }
            if(cnt == 4) return true;
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
                if(arr[a][b] == colour) cnt++;
            }
            if(cnt == 4) return true;
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
                if(arr[a][b] == colour) cnt++;
            }
            if(cnt == 4) return true;
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
                if(arr[a][b] == colour) cnt++;
            }
            if(cnt == 4) return true;
            row--; col--;
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

    // console.log(Huristic_score(board_array, oragneBall));
    // get_child_nodes();
    // play();
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
                if(arr[i][elm] == colour) cnt++;
            }
            if(cnt == 4) score += 10000;
        }
    }
    // vertical check 4
    for(let j=0; j<7; j++){
        for(let i=0; i<6; i++){
            cnt = 0;
            for(let elm=i, x=0; elm<6 && x<4; elm++, x++){
                if(arr[elm][j] == colour) cnt++;
            }
            if(cnt == 4) score += 10000;
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
                if(arr[a][b] == colour) cnt++;
            }
            if(cnt == 4) score += 10000;
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
                if(arr[a][b] == colour) cnt++;
            }
            if(cnt == 4) score += 10000;
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
                if(arr[a][b] == colour) cnt++;
            }
            if(cnt == 4) score += 10000;
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
                if(arr[a][b] == colour) cnt++;
            }
            if(cnt == 4) score += 10000;
            row--; col--;
        }
    }
    //........................................check 3................................
     // horizontal check 3
     for(let i=0; i<6; i++){
        for(let j=0; j<7; j++){
            let cnt = 0;
            for(let elm=j, x=0; elm <7 && x <3; elm++, x++){
                if(arr[i][elm] == colour) cnt++;
            }
            if(cnt == 3) score += 40;
        }
    }
    // vertical check 3
    for(let j=0; j<7; j++){
        for(let i=0; i<6; i++){
            cnt = 0;
            for(let elm=i, x=0; elm<6 && x<3; elm++, x++){
                if(arr[elm][j] == colour) cnt++;
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
                if(arr[a][b] == colour) cnt++;
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
                if(arr[a][b] == colour) cnt++;
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
                if(arr[a][b] == colour) cnt++;
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
                if(arr[a][b] == colour) cnt++;
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
                if(arr[i][elm] == colour) cnt++;
            }
            if(cnt == 2) score += 5;
        }
    }
    // vertical check 3
    for(let j=0; j<7; j++){
        for(let i=0; i<6; i++){
            cnt = 0;
            for(let elm=i, x=0; elm<6 && x<2; elm++, x++){
                if(arr[elm][j] == colour) cnt++;
            }
            if(cnt == 2) score += 5;
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
                if(arr[a][b] == colour) cnt++;
            }
            if(cnt == 2) score += 5;
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
                if(arr[a][b] == colour) cnt++;
            }
            if(cnt == 2) score += 5;
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
                if(arr[a][b] == colour) cnt++;
            }
            if(cnt == 2) score += 5;
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
                if(arr[a][b] == colour) cnt++;
            }
            if(cnt == 2) score += 5;
            row--; col--;
        }
    }
    return score;
    
}
function Emergency_block_needed(arr, colour){
    // horizontal check 4
    for(let i=0; i<6; i++){
        for(let j=0; j<7; j++){
            let cnt = 0;
            for(let elm=j, x=0; elm <7 && x <4; elm++, x++){
                if(arr[i][elm] == colour) cnt++;
            }
            if(cnt == 4) return true;
        }
    }
    // vertical check 4
    for(let j=0; j<7; j++){
        for(let i=0; i<6; i++){
            cnt = 0;
            for(let elm=i, x=0; elm<6 && x<4; elm++, x++){
                if(arr[elm][j] == colour) cnt++;
            }
            if(cnt == 4) return true;
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
                if(arr[a][b] == colour) cnt++;
            }
            if(cnt == 4) return true;
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
                if(arr[a][b] == colour) cnt++;
            }
            if(cnt == 4) return true;
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
                if(arr[a][b] == colour) cnt++;
            }
            if(cnt == 4) return true;
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
                if(arr[a][b] == colour) cnt++;
            }
            if(cnt == 4) return true;
            row--; col--;
        }
    }
}
function get_child_nodes(arr){
    let clm = [];
    for(let i=0; i<7; i++){
        if(arr[0][i] == emptyCell){
            clm.push(i);
        }
    }

    let row = [];
    for(let c of clm){
        // find row
        let r = 0;
        let res = 0;
        while(r < 6){
            if(arr[r][c] == 0){
                res = r;
            }else break;
            r++;
        }
        row.push(res);
    }
    rr = [...row];
    cc = [...clm];

    
    
    return [rr, cc];
}
function isTerminalNode(arr){
    if(wining_state(arr, redBall) == true || wining_state(arr, oragneBall) == true){
        return true;
    }
    let flg = true;
    for(let i=0; i<6; i++){
        for(let j=0; j<7; j++){
            if(arr[i][j] == 0){
                flg = false;
            }
        }
    }
    return flg;
}
function normalAI(){
    nodes = get_child_nodes(board_array);
    row = nodes[0]
    clm = nodes[1];
    if(row.length == 0){
        alert("AI has no move");
        return;
    }
    // first check if emergency block is needed
    let next_sate = JSON.parse(JSON.stringify(board_array));
    let i = 0;
    for(let r of row){
        c = clm[i];
        tmp_board = arr = JSON.parse(JSON.stringify(board_array));
        tmp_board[r][c] = oragneBall; // human player ball is orange
        
        if(Emergency_block_needed(tmp_board, oragneBall) == true){
            board_array[r][c] = redBall;
            show_array(6,7);
            return;
        }
        i++;
    }
    
    // if block is not needed then do optimal move

    i = 0;
    let max_score = 0;
    next_sate = JSON.parse(JSON.stringify(board_array));
    for(let r of row){
        c = clm[i];
        tmp_board = arr = JSON.parse(JSON.stringify(board_array));
        tmp_board[r][c] = redBall; // AI ball is red
        let sc = Huristic_score(tmp_board, redBall);

        
        if(sc >= max_score){
            max_score = sc;
            next_sate = JSON.parse(JSON.stringify(tmp_board));
        }
        i++;
    }
    board_array = JSON.parse(JSON.stringify(next_sate));
    show_array(6,7);
}

function minmax(board, depth, maximizingPlayer){
    let nodes = get_child_nodes(board);
    let row = nodes[0];
    let col = nodes[1];
    // consoleLogBoard(board);
    

    // console.log(row);
    terminal = isTerminalNode(board);
    if(depth == 0 || terminal == true){
        if(terminal == true){
            if(wining_state(board, redBall)){// AI win
                return [0, 1000000000];
            }else if(wining_state(board, oragneBall)){// player win
                return [0, -1000000000];
            }else{
                return [0, 0];
            }
        }else{ // depth = 0
            return [0, Huristic_score(board, redBall)];
        }
    }
    if(maximizingPlayer == true){
        let val = -1000000000;

        let idxC = col[Math.floor(Math.random()*col.length)];
        let i = 0;
        for(let c of col){
            let r = row[i];
            let new_board = JSON.parse(JSON.stringify(board));
            new_board[r][c] = redBall;
            let ret = minmax(JSON.parse(JSON.stringify(new_board)), depth-1, false);
            let score = ret[1]; 
            if(score > val){
                val = score;
                idxC = c;
            }
            i++;
        }
        return [idxC, val];
    }else{ // minimizing player
        let val = 1000000000;
        let idxC = col[Math.floor(Math.random()*col.length)];
        let i = 0;
        for(let c of col){
            let r = row[i];
            let new_board = JSON.parse(JSON.stringify(board));
            new_board[r][c] = oragneBall;
            let ret = minmax(JSON.parse(JSON.stringify(new_board)), depth-1, true);
            let score = ret[1]; 
            if(score < val){
                val = score;
                idxC = c;
            }
            i++;
        }
        return [idxC, val];
    }

}
function advancedAI(){
    let new_board = JSON.parse(JSON.stringify(board_array));
    let ret = minmax(JSON.parse(JSON.stringify(new_board)), 5, false);
    let col = ret[0];
    put_stone(col, redBall);
}
function minmax_with_alphaBetaPruning(board, depth, maximizingPlayer, alpha, beta){
    let nodes = get_child_nodes(board);
    let row = nodes[0];
    let col = nodes[1];
    // consoleLogBoard(board);
    

    // console.log(row);
    terminal = isTerminalNode(board);
    if(depth == 0 || terminal == true){
        if(terminal == true){
            if(wining_state(board, redBall)){// AI win
                return [0, 1000000000];
            }else if(wining_state(board, oragneBall)){// player win
                return [0, -1000000000];
            }else{
                return [0, 0];
            }
        }else{ // depth = 0
            return [0, Huristic_score(board, redBall)];
        }
    }
    if(maximizingPlayer == true){
        let val = -1000000000;

        let idxC = col[Math.floor(Math.random()*col.length)];
        let i = 0;
        for(let c of col){
            let r = row[i];
            let new_board = JSON.parse(JSON.stringify(board));
            new_board[r][c] = redBall;
            let ret = minmax(JSON.parse(JSON.stringify(new_board)), depth-1, false);
            let score = ret[1]; 
            if(score > val){
                val = score;
                idxC = c;
            }
            alpha = max(alpha, val);
            if(alpha >= beta){
                break
            }
            i++;
        }
        return [idxC, val];
    }else{ // minimizing player
        let val = 1000000000;
        let idxC = col[Math.floor(Math.random()*col.length)];
        let i = 0;
        for(let c of col){
            let r = row[i];
            let new_board = JSON.parse(JSON.stringify(board));
            new_board[r][c] = oragneBall;
            let ret = minmax(JSON.parse(JSON.stringify(new_board)), depth-1, true);
            let score = ret[1]; 
            if(score < val){
                val = score;
                idxC = c;
            }
            beta = min(beta, val);
            if(alpha >= beta){
                break;
            }
            i++;
        }
        return [idxC, val];
    }

}
function expertAI(){
    let new_board = JSON.parse(JSON.stringify(board_array));
    let ret = minmax_with_alphaBetaPruning(JSON.parse(JSON.stringify(new_board)), 6, false);
    let col = ret[0];
    put_stone(col, redBall);
}
function play(){
    // AI move
    console.log("AI move is on--");
    // normalAI();
    // advancedAI();
    expertAI();
}