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


// .............................after refresh this will execute..................................
window.onload = function create_board(row, clm) {
    create_cell(1, 2, 50, 50, 5);
}