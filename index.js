$(document).ready(function(){

    let symbols = [":)","(:","^-^",":D",":}",":|",";]",":p"];
    let cards = symbols.concat(symbols); 
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let moves = 0;
    let matchedPairs = 0;
    let timer = 0;
    let timerStarted = false;
    let timerInterval;

    cards.sort(() => 0.5 - Math.random());

    // Generate cards
    $.each(cards, function(index, symbol){
        $("#gameBoard").append(
            `<div class="card" data-symbol="${symbol}">?</div>`
        );
    });

    // Start timer
    function startTimer(){
        timerInterval = setInterval(function(){
            timer++;
            $("#timer").text(timer);
        },1000);
    }

    // Card click
    $(".card").click(function(){

        if(lockBoard || $(this).hasClass("flipped")) return;

        if(!timerStarted){
            startTimer();
            timerStarted = true;
        }

        $(this).addClass("flipped").text($(this).data("symbol"));

        if(!firstCard){
            firstCard = $(this);
        }else{
            secondCard = $(this);
            lockBoard = true;
            moves++;
            $("#moves").text(moves);

            checkMatch();
        }
    });

    function checkMatch(){
        if(firstCard.data("symbol") == secondCard.data("symbol")){
            $("#matchSound")[0].play();
            matchedPairs++;
            resetTurn();

            if(matchedPairs == symbols.length){
                clearInterval(timerInterval);
                $("#winMessage").fadeIn();
            }
        }else{
            $("#wrongSound")[0].play();
            setTimeout(function(){
                firstCard.removeClass("flipped").text("?");
                secondCard.removeClass("flipped").text("?");
                resetTurn();
            },1000);
        }
    }

    function resetTurn(){
        firstCard = null;
        secondCard = null;
        lockBoard = false;
    }

});


