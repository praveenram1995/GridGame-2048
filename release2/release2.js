document.addEventListener('DOMContentLoaded',() =>{      //attaches an event handler to specified element
     const gridDisplay = document.querySelector('.grid')  //stores the grid & returns the first matched element
     const width = 4
    let squares = []

  function createBoard(){                                 //created a board
    for (let i=0; i<width*width ; i++){ 
      square = document.createElement('div')              //stores an element into each block
      square.innerHTML=0
      gridDisplay.appendChild(square)
      squares.push(square)
    }
   generate()
 }
   createBoard()

 function generate(){
  let randomNumber = Math.floor(Math.random() * squares.length)  //generates a random integer element
  if (squares[randomNumber].innerHTML == 0){
      squares[randomNumber].innerHTML = 2
  }
  else generate()
 }
    
})
