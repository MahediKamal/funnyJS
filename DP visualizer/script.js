// ................................global declearation..............................................
var board_array = new Array(5000).fill(0).map(() => new Array(4000).fill(0));
var clr = [ 'yellow',         'pink', 'Tomato',    'Orange', 'DodgerBlue',
            'MediumSeaGreen', 'Gray', 'SlateBlue' ,'Violet', 'LightGray'];





function create_cell(i, j, w, h, val){
	let tag = document.createElement("div");
	tag.classList.add("cell");
	tag.style.width = w + 'px';
	tag.style.height = h + 'px';
	if(i==0 || j==0){
		tag.style.backgroundColor = 'red';
	}else{
		tag.style.backgroundColor = clr[val];
	}
	
	let txt = document.createTextNode(val);
	tag.appendChild(txt);

	let element = document.getElementById("board");
	element.appendChild(tag);
}

function show_array(row, clm){
	const parent = document.getElementById("board");
	while (parent.firstChild) {
		parent.firstChild.remove()
	}
	
	l = 1200 / clm;
	h = 550 / row
	for(let i=0; i<=row; i++){
		for(let j=0; j<=clm; j++){
			if(i==0 && j==0){
				create_cell(i,j,l,h,board_array[i][j]);
			}else if(i==0){
				create_cell(i,j,l,h,j);
			}else if(j==0){
				create_cell(i,j,l,h,i);
			}else{
				create_cell(i,j,l,h,board_array[i][j]);
			}
		}
		let tag = document.createElement("br");
		document.getElementById("board").appendChild(tag);
	}
}


// .............................after refresh this will execute..................................
window.onload = function create_board(row, clm) {
    show_array(10,15);
}