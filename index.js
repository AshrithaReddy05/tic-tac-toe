const x_class='x';
const circle_class='circle';
const win_comb=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const cellElement=document.querySelectorAll('[data-cell]');
const board=document.getElementById('board');
const winningMessageEle=document.getElementById('winningMessage');
const winningMessageTextEle=document.querySelector('[data-winning-message-text]')
const reset=document.getElementById('reset');
let circleturn;
startgame();
reset.addEventListener('click',startgame);
function startgame(){
    circleturn=false;
    cellElement.forEach(cell=>{
        cell.classList.remove(x_class);
        cell.classList.remove(circle_class);
        cell.removeEventListener('click',handleClick)
        cell.addEventListener('click',handleClick,{once:true})
    })
    setBoardHover();
    winningMessageEle.classList.remove('show')

}
function handleClick(e){
    const cell=e.target;
    const cur_class=circleturn?circle_class:x_class;
    placeMark(cell,cur_class);
    if(winning(cur_class)){
        endGame(false);
    }
    else if(isDraw()){
        endGame(true);
    }
    else{
        swapturn();
        setBoardHover()
    }
}
function endGame(draw){
    if(draw){
    winningMessageTextEle.innerText='Draw!!';
    }
    else{
        winningMessageTextEle.innerText=`${circleturn ? "0's":"X's"}Wins!!`;

    }
    winningMessageEle.classList.add('show');


}
function isDraw(){
    return [...cellElement].every(cell=>{
        return cell.classList.contains(x_class)  ||
        cell.classList.contains(circle_class)

    })
}
function placeMark(cell,cur_class){
    cell.classList.add(cur_class);

}
function swapturn(){
    circleturn=!circleturn;
}
function setBoardHover(){
    board.classList.remove(x_class);
    board.classList.remove(circle_class);
    if(circleturn){
        board.classList.add(circle_class)
    }
    else{
        board.classList.add(x_class);
    }
}
function winning(cur_class){
    return win_comb.some(comb=>{
        return comb.every(index=>{
            return cellElement[index].classList.contains(cur_class)
        })
    })
}

