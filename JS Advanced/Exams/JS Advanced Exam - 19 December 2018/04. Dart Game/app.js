function dart(){

    $('#playBoard').on('click', 'div', getPoints);
    let playerTurn = 0;
    const maxPoints = 100;
    const colorMapping = {

        firstLayer: 0,
        secondLayer: 1,
        thirdLayer: 2,
        fourthLayer: 3,
        fifthLayer: 4,
        sixthLayer: 5
    };

    function getPoints(e) {
        e.stopPropagation();

        let id = e.target.id;

        let targetPoints = +$('#scoreBoard tbody tr')
            .eq(colorMapping[id])
            .children()
            .eq(1)
            .text()
            .split(' ')[0];

        assignPoints(targetPoints);
    }

    function assignPoints(points) {

        let playerToTurn = switchPlayers();

        if(playerToTurn === 'Home'){

            let currentPoints = Number($('#Home p').first().text());

            let totalPoints = currentPoints + Number(points);

            Number($('#Home p').first().text(totalPoints));

            isThereWinner(totalPoints, playerToTurn);

        } else {

            let currentPoints = Number($('#Away p').first().text());

            let totalPoints = currentPoints + Number(points);

            Number($('#Away p').first().text(totalPoints));

            isThereWinner(totalPoints, playerToTurn);

        }
    }

    function isThereWinner(totalPoints, player) {

        if(totalPoints >= maxPoints){

            $('#playBoard').off('click');

            if(player === 'Home'){

                $('#Home').children().eq(1).css('backgroundColor', 'green');
                $('#Away').children().eq(1).css('backgroundColor', 'red');
            } else if (player === 'Away'){

                $('#Home').children().eq(1).css('backgroundColor', 'red');
                $('#Away').children().eq(1).css('backgroundColor', 'green');
            }
        }
    }

    function switchPlayers() {

         if (playerTurn % 2 === 0){
            playerTurn++;

             $('#turns p').first().css(
                 {
                     textDecoration: 'none',
                     fontWeight: 'normal'
                 });

             $('#turns p').eq(1).css({
                 textDecoration: 'underline',
                 fontWeight: 'bold'
             });
             return 'Home';
        }

            $('#turns p').first().css(
                {
                    textDecoration: 'underline',
                    fontWeight: 'bold'
                });

            $('#turns p').eq(1).css({
                textDecoration: 'none',
                fontWeight: 'normal'
            });

            playerTurn++;
            return 'Away'
    }
}