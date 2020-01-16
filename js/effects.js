"use strict";
var waitTimer='';
var validateTimer=false;
window.addEventListener('load', function(){
    var game=document.getElementById('game-box');
    play.addEventListener('click', function(){
        var memory=[];
        var i=0;
        var card='';
        do{
            var id_value=Math.round(Math.random()*(12-1)+1);
            var value=id_value;
            if(memory.indexOf(id_value)==-1)
            {
                memory[i]=id_value;
                if(value>6)
                {
                    value=value-6;
                }
                card+='<div id="'+id_value+'" class="game-card-hidden active">'+value+'</div>';               
                i++;
            }
        }while(i<12)
        console.log(memory);
        document.getElementById('game-box').innerHTML=card;    
        play.innerHTML="Iniciar juego";
        document.getElementById('timer').innerHTML="1:00";
        validateTimer=false;
        waitTimer=60;
        setTimeout(function(){
            validateTimer=true;
            timer(); 
        }, 1000)
         
    });
    
    game.addEventListener('click', function (evt) {
        var attribute=evt.target.getAttribute('class');
        if (attribute!=null && attribute.indexOf('active') !== -1) {
            var id=evt.target.getAttribute('id');
            document.getElementById(id).classList.add('game-card');
            document.getElementById(id).classList.add('validate');
            document.getElementById(id).classList.remove('game-card-hidden');
            let all = document.querySelectorAll('.validate');
            if(all.length==2)
            {
                if(all[0].innerHTML == all[1].innerHTML)
                {
                    all[0].classList.remove('validate');
                    all[0].classList.add('validate-true');
                    all[1].classList.remove('validate');
                    all[1].classList.add('validate-true');
                    all[0].classList.remove('active');
                    all[1].classList.remove('active');
                }else{
                    all[0].classList.remove('validate');
                    all[1].classList.remove('validate');
                    all[0].classList.add('validate-error');
                    all[1].classList.add('validate-error');
                    setTimeout(function(){
                        all[0].classList.remove('validate-error');
                        all[1].classList.remove('validate-error');
                        all[0].classList.add('game-card-hidden');
                        all[1].classList.add('game-card-hidden');
                    },400)
                }
            }else if(all.length>2)
            {
                document.getElementById(id).classList.add('game-card-hidden');
            }
            validateWinner();
        }
    });
});

function validateWinner()
{
    var validate = document.querySelectorAll('.validate-true');
    if(validate.length==12)
    {
        var winner='<div class="winner"><img src="./../img/ganaste.gif" alt="Ganaste"></div>';
        document.getElementById('game-box').innerHTML=winner;
        play.innerHTML="Jugar"; 
        if(validateTimer==true)
        {
            validateTimer=false;
        } 
    }
}
function timer()
{
    waitTimer=waitTimer-1;   
    if(waitTimer>=0 && validateTimer==true)
    {
        document.getElementById('timer').innerHTML='0:'+waitTimer;
        setTimeout('timer()', 1000);
    }else{
        validateTimer==false;
    }
    
}