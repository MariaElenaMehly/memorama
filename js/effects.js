"use strict";
var waitTimer='';
var validateTimer=false;
window.addEventListener('load', function(){
    var game=document.getElementById('game-box');
    var stop=document.getElementById('stop');
    play.addEventListener('click', function(){
        console.log('play')
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
        document.getElementById('game-box').innerHTML=card;    
        document.getElementById('timer').innerHTML="1:00";
        play.classList.add('invisible');
        buttons2.classList.remove('invisible');
        validateTimer=false;
        waitTimer=60;
        setTimeout(function(){
            validateTimer=true;
            timer(); 
        }, 1000)
         
    });
    
    game.addEventListener('click', function (evt) {
        var attribute=evt.target.getAttribute('class');
        console.log(attribute);
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
    stop.addEventListener('click', function(){
        if(stop.innerHTML=='Detener')
        {
            validateTimer=false;
            var active=document.querySelectorAll('.active');
            for(var i=0; i<active.length; i++)
            {
                active[i].classList.remove('active');
                active[i].classList.add('disabled');
            }
            stop.innerHTML='Continuar';
        }else{
            validateTimer=true;
            var inactive=document.querySelectorAll('.disabled');
            for(var i=0; i<inactive.length; i++)
            {
                inactive[i].classList.add('active');
                inactive[i].classList.remove('disabled');
            }
            stop.innerHTML='Detener';  
            timer();
        }

    });
    restore.addEventListener('click', function(){
        validateTimer=false;
        waitTimer=0;
        play.click();
    });
});

function validateWinner()
{
    var validate = document.querySelectorAll('.validate-true');
    if(validate.length==12)
    {
        var winner='<div class="winner"><img src="./../img/ganaste.gif" alt="Ganaste"></div>';
        document.getElementById('game-box').innerHTML=winner;
        if(validateTimer==true)
        {
            validateTimer=false;
        } 
        buttons2.classList.add('invisible');
        play.classList.remove('invisible');
    }
}
function validateLoser()
{
    var timer=document.getElementById('timer').innerHTML;
    var validate = document.querySelectorAll('.validate-true');
    if(timer=='0:0' && validate.length<12)
    {
        validateTimer=false;
        var active=document.querySelectorAll('.active');
        for(var i=0; i<active.length; i++)
        {
            active[i].classList.remove('active');
        }
        document.getElementById('game-box').classList.add('invisible');
        document.getElementById('buttons').classList.add('invisible');
        document.getElementById('loser').classList.remove('invisible');
        setTimeout(function(){
            document.getElementById('game-box').classList.remove('invisible');
            document.getElementById('buttons').classList.remove('invisible');     
            document.getElementById('loser').classList.add('invisible');
            buttons2.classList.add('invisible');
            play.classList.remove('invisible');
            var hidden=document.querySelectorAll('.game-card-hidden');
            for(var i=0; i<active.length; i++)
            {
                hidden[i].classList.remove('game-card-hidden');
                hidden[i].classList.add('game-card');
            }
        }, 2000)
    }
}
function timer()
{
    if(validateTimer==true)
    {
        waitTimer=waitTimer-1;   
        if(waitTimer>=0)
        {
            document.getElementById('timer').innerHTML='0:'+waitTimer;
            setTimeout('timer()', 1000);
        }else{
            validateTimer==false;
        }
        validateLoser();
    }
    
}