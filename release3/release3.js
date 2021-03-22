document.addEventListener('DOMContentLoaded',() =>{        //attaches an event handler to specified element
  const gridDisplay = document.querySelector('.grid')      //stores the grid & returns the first matched element
  const scoreDisplay = document.getElementById('score')     
  const resultDisplay = document.getElementById('result')
  const width = 4
  let squares = []
  let score = 0

 //creating a createboard function
 function createBoard(){                            
     for (let i=0; i<width*width ; i++){
         square = document.createElement('div')        //stores an element into each block
         square.innerHTML= 0
         gridDisplay.appendChild(square)
         squares.push(square)
      }
      generate()
      generate()
  }
  createBoard()

//creating a generate function
 function generate(){
 let randomNumber = Math.floor(Math.random() * squares.length)    //generates a random integer element
         if (squares[randomNumber].innerHTML == 0){
             squares[randomNumber].innerHTML = 2               //replaces element '0' with element '2'
             checkForGameOver()
          }
      else generate()
  }


    //swipe right
    function moveRight() {
      for ( let i=0; i<16; i++){
        if (i % 4 === 0){                         //considers every 4th element and stores it in following variables
           let totalOne = squares[i].innerHTML  
           let totalTwo = squares[i+1].innerHTML
           let totalThree = squares[i+2].innerHTML
           let totalFour = squares[i+3].innerHTML
           let row = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]

 
           let filteredRow = row.filter(num => num)   //filters the generated elements in a row
           let missing = 4 - filteredRow.length     // stores missing elements 
           let zeros = Array(missing).fill(0)      
           let newRow = zeros.concat(filteredRow)   //concatinates and then stores 2 similar elements


           squares[i].innerHTML = newRow[0]
           squares[i+1].innerHTML = newRow[1]
           squares[i+2].innerHTML = newRow[2]
           squares[i+3].innerHTML = newRow[3]
         }
     }
 }
 
 
//swipe left
function moveLeft() {
    for ( let i=0; i<16; i++){
        if (i % 4 === 0){
           let totalOne = squares[i].innerHTML  
           let totalTwo = squares[i+1].innerHTML
           let totalThree = squares[i+2].innerHTML
           let totalFour = squares[i+3].innerHTML
           let row = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)];

   
           let filteredRow = row.filter(num => num)
           let missing = 4 - filteredRow.length
           let zeros = Array(missing).fill(0)
           let newRow = filteredRow.concat(zeros)
    
           squares[i].innerHTML = newRow[0]
           squares[i+1].innerHTML = newRow[1]
           squares[i+2].innerHTML = newRow[2]
           squares[i+3].innerHTML = newRow[3]
         }
     }
 }

    //swipe down
    function moveDown() {
      for ( let i=0; i<4; i++){
          let totalOne = squares[i].innerHTML  
          let totalTwo = squares[i+width].innerHTML
          let totalThree = squares[i+(width*2)].innerHTML
          let totalFour = squares[i+(width*3)].innerHTML
          let column = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)];
  
       
      
          let filteredColumn = column.filter(num => num)
          let missing = 4 - filteredColumn.length
          let zeros = Array(missing).fill(0)
          let newColumn = zeros.concat(filteredColumn)
         
          squares[i].innerHTML = newColumn[0]
          squares[i+width].innerHTML = newColumn[1]
          squares[i+(width*2)].innerHTML = newColumn[2]
          squares[i+(width*3)].innerHTML = newColumn[3]
      }
  }


  //swipe up
  
  function moveUp() {
      for ( let i=0; i<4; i++){
          let totalOne = squares[i].innerHTML  
          let totalTwo = squares[i+width].innerHTML
          let totalThree = squares[i+(width*2)].innerHTML
          let totalFour = squares[i+(width*3)].innerHTML
          let column = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)];
  
       
      
          let filteredColumn = column.filter(num => num)
          let missing = 4 - filteredColumn.length
          let zeros = Array(missing).fill(0)
          let newColumn = filteredColumn.concat(zeros)
         
          squares[i].innerHTML = newColumn[0]
          squares[i+width].innerHTML = newColumn[1]
          squares[i+(width*2)].innerHTML = newColumn[2]
          squares[i+(width*3)].innerHTML = newColumn[3]          
      }
  }

   // creating combinerow function
    function combineRow() {
         for(let i=0; i<15; i++) {
              if(squares[i].innerHTML === squares[i+1].innerHTML){
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML)
                squares[i].innerHTML = combinedTotal
                squares[i+1].innerHTML = 0    
                score += combinedTotal
                scoreDisplay.innerHTML = score
              }
          }
       checkForWin()
      }
      
   
       // creating combinecolumn function
      function combineColumn() {
          for(let i=0; i<12; i++) {
              if(squares[i].innerHTML === squares[i+width].innerHTML){
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+width].innerHTML)
                squares[i].innerHTML = combinedTotal
                squares[i+width].innerHTML = 0 
                score += combinedTotal
                scoreDisplay.innerHTML = score   
              }
          }
          checkForWin()
      }
      

 //assign keycodes
function control(e){                    //keyboard key functionalities and values
    if(e.keyCode === 39){
      keyRight()  
    }else if(e.keyCode === 37){
       keyLeft()
    }else if(e.keyCode === 40){
      keyDown()
    }else if(e.keyCode === 38){
      keyUp()
    }
  }
  document.addEventListener('keyup',control) //eventlistner for key controls

 function keyRight(){
       moveRight()
       combineRow()
       moveRight()
       generate()
  }
  
 function keyLeft(){
     moveLeft()
     combineRow()
     moveLeft()
     generate()
  }

 function keyDown(){
     moveDown()
     combineColumn()
     moveDown()
     generate()
  }

 function keyUp(){
     moveUp()
     combineColumn()
     moveUp()
     generate()
  }

//check for the number  2048 in th squares to win
 function checkForWin(){
     for(let i=0; i < squares.length; i++){
         if(squares[i].innerHTML ==  2048){
            resultDisplay.innerHTML = 'YOU WIN!!'
            document.removeEventListener('keyup', control)
          }
      } 
  }


//check if there are no zeros on the board to lose
  function checkForGameOver(){
  let zeros = 0
     for(let i = 0; i<squares.length; i++){
         if(squares[i].innerHTML == 0){
            zeros++
          }
      }
      if(zeros === 0){
         resultDisplay.innerHTML = 'YOU LOSE'
         document.removeEventListener('keyup',control)
      }
  }
})