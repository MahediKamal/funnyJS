var board_array = new Array(10).fill(0).map(() => new Array(10).fill(0));
var clr = [ 'White',  'pink', 'Red',    'Orange', 'DodgerBlue',
            'MediumSeaGreen', 'Gray', 'SlateBlue' ,'Violet', 'LightGray'];

cellHeight = 80;
cellWeight = 80;

oragneBall = 3; // player ball
redBall = 2; // AI ball

function delay(delayInms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(2);
        }, delayInms);
    });
}


function create_cell(i, j, val){
	let tag = document.createElement("div");
	tag.classList.add("cell");
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
    delay(100);
}


// function wining_state(){
//     for(let i=0; i<6; i++){
//         for(let j=0; j<7; j++){

//         }
//     }
// }

function put_stone(column, colour){
    row = -1;
    for(let i = 0; i<6; i++){
        if(board_array[i][column] != 0){
            break;
        }
        row = i;
    }
    if(row == -1){
        window.alert("wrong position selection");
    }else{
        board_array[row][column] = colour;
    }
    show_array(6,7);
}

window.onload = function create_board() {
    put_stone(2, oragneBall);
    put_stone(2, oragneBall);
    put_stone(4, redBall);
}