// ................................global declearation..............................................
var board_array = new Array(5000).fill(0).map(() => new Array(4000).fill(0));
var board_color = new Array(5000).fill(0).map(() => new Array(4000).fill(0));
var clr = [ 'yellow',         'pink', 'Tomato',    'Orange', 'DodgerBlue',
            'MediumSeaGreen', 'Gray', 'SlateBlue' ,'Violet', 'LightGray'];
var board_weight = 900;
var board_height = 550;


//....................time delay
function delay(delayInms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(2);
        }, delayInms);
    });
}


function create_cell(i, j, w, h, val){
	let tag = document.createElement("div");
	tag.classList.add("cell");
	tag.style.width = w + 'px';
	tag.style.height = h + 'px';
	let txt = document.createTextNode(val);
	if(i==0 || j==0){
		tag.style.backgroundColor = 'red';
		
	}else{
        tag.style.backgroundColor = clr[board_color[i][j]+3];
		if(board_color[i][j] != 2) txt = document.createTextNode("-");
		
	}
	
	// let txt = document.createTextNode(val);
	tag.appendChild(txt);

	let element = document.getElementById("board");
	element.appendChild(tag);
}

function show_array(row, clm){
	const parent = document.getElementById("board");
	while (parent.firstChild) {
		parent.firstChild.remove()
	}
	
	l = board_weight / clm;
	h = board_height / row
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
    // show_array(30,35);
    // change_color();
	
    dp();
}


// ......................dp........................
var call_stack = new Array(1000).fill(0).map(() => new Array(2).fill(0)); // arr[i][j]
var mode = new Array(5000).fill(0); // 1=>called  2=>got_value
var val = new Array(5000).fill(0);
var stack_sz = 0;

var n = 8;
var w = new Array(500).fill(0);
var v = new Array(500).fill(0);
//let board_array[109][109];

function max(n1, n2){
	if(n2 > n1) return n2;
	return n1;
}
function solve(i,lft){
	// console.log(i,lft);
	
	
    if(i>n){
        return 0;
	}
    if(board_array[i][lft]!=-1){
        return board_array[i][lft];
	}
	call_stack[stack_sz][0] = i;
	call_stack[stack_sz][1] = lft; 
	mode[stack_sz] = 1;
	stack_sz++;

    if(w[i]<=lft){
        board_array[i][lft]= max(v[i]+solve(i+1,lft-w[i]) , solve(i+1,lft));
	}
    else{
        board_array[i][lft]=solve(i+1,lft);
	}
	
	call_stack[stack_sz][0] = i;
	call_stack[stack_sz][1] = lft; 
	mode[stack_sz] = 2;
	val[stack_sz] = board_array[i][lft];
	stack_sz++;
	// console.log(board_array[i][lft]);
    return board_array[i][lft];
}

async function print_dp_step(){
	for(let i=0; i<stack_sz; i++){
		let x = call_stack[i][0];
		let y = call_stack[i][1];
		let v = val[i];
		let m = mode[i];

		board_array[x][y] = v;
		board_color[x][y] = m;
		show_array(20,20);
		let delayres = await delay(100);
		console.log(x,y);
	}
}
function dp() {
    for(let i=1;i<=8;i++){
        let a = i; let b = (i*4) % 9;
        w[i]=a;
        v[i]=b;
    }
    let maxW = 18;
    for(let i=0;i<100;i++){
        for(let j=0;j<100;j++){
            board_array[i][j]=-1;
        }
    }
    
    solve(1,maxW);
    
    
	print_dp_step();
    console.log("DP");

} 