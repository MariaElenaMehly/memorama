"use strict";
window.addEventListener('load', function(){
    var game=document.getElementById('game-box');
    play.addEventListener('click', function(){
        var memory=[];
        var i=0;
        var card='';
        do{
            var value=Math.round(Math.random()*(12-1)+1);
            if(memory.indexOf(value)==-1)
            {
                memory[i]=value;
                card+='<div id="'+value+'" class="game-card-hidden active">'+value+'</div>';               
                i++;
            }
        }while(i<12)
        console.log(memory);
        document.getElementById('game-box').innerHTML=card;      
    });
    
    game.addEventListener('click', function (evt) {
        var attribute=evt.target.getAttribute('class');
        if (attribute!=null && attribute.indexOf('active') !== -1) {
            var id=evt.target.getAttribute('id');
            document.getElementById(id).classList.toggle('game-card-hidden');
            document.getElementById(id).classList.toggle('game-card');
        }
    });
});