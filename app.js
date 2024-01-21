let boxes=document.querySelectorAll(".box");
let turnX=true;  // true for X and false for O
let resetButton=document.querySelector("#reset-btn");
let msgContainer=document.querySelector(".msg-container");
let startButton=document.querySelector("#new-btn");
let container=document.querySelector(".container");
let message=document.querySelector("#msg");
let main=document.querySelector("#main");
console.log(main);
msgContainer.style.display="none";
let xWin=new Array(8);
let oWin=new Array(8);
let cnt=0;
for(let i=0;i<8;i++)
{
    xWin[i]=0;
    oWin[i]=0;
}

let rows=3;
let cols=3;

function showWinner(player)
{
   
    message.innerText=`Congratulations, Winner is ${player}`;
    msgContainer.style.display="inline-block";
     main.style.display="none";
    // container.style.display="none";
    // resetButton.style.display="none";
    
}

const resetGame=()=>
{
    turnX=true;
    cnt=0;
    enableBoxes();
};

const startGame=()=>{
    turnX=true;
    cnt=0;
    enableBoxes();
    msgContainer.style.display="none";
    // container.style.display="inline-block";
    // resetButton.style.display="inline-block";
    main.style.display="inline-block";
}

const enableBoxes=()=>{
    for(let box of boxes)
      {
        box.innerText="";
        box.disabled=false;
      }

      for(let i=0;i<8;i++)
{
    xWin[i]=0;
    oWin[i]=0;
}
};

function checkWinner(idx)
{
   // console.log(idx);
    let row=Math.trunc(idx/rows);
    let col=idx%cols;
    let flag=false;
    if(turnX==false)
    {  
       // console.log(row,col);
       // console.log(xWin[row],xWin[col+3],xWin[6],xWin[7]);
        if(xWin[row]==3 || xWin[col+3]==3 || xWin[6]==3 || xWin[7]==3)
          {     
                 flag=true;
                 showWinner("X");
          }
    }
    else{
        if(oWin[row]==3 || oWin[col+3]==3 || oWin[6]==3 || oWin[7]==3)
         {   
             flag=true;
             showWinner("O");
         }
    }

    if(cnt==9)
    {
        if(flag==false)
          {
            message.innerText=`Game is DRAW`;
            msgContainer.style.display="inline-block";
             main.style.display="none";
          }
    }
}

boxes.forEach((box,idx) =>{
    box.addEventListener("click", ()=>{
       let row=Math.trunc(idx/rows);
       let col=idx%cols;
      // console.log(row,col);
       if(turnX==true)
       {
        xWin[row]+=1;
        xWin[col+3]+=1;

         if(row==col)
           xWin[6]++;

        if(col+row==2)
           xWin[7]++;
            
           box.style.color="red";
           box.innerText="X";
           turnX=false;
       }
       else{
        oWin[row]+=1;
        oWin[col+3]+=1;

         if(row==col)
           oWin[6]++;

        if(col+row==2)
           oWin[7]++;

           box.style.color="yellow";
           box.innerText="O";
           turnX=true;
       }

       cnt++;
       box.disabled=true;
       checkWinner(idx);
    });
});


resetButton.addEventListener("click",resetGame);
startButton.addEventListener("click",startGame);