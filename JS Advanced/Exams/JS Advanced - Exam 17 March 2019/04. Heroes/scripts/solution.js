function solve(){

    let rebuildBtn = $('#kingdom button');
    rebuildBtn.on('click', rebuildKingdom);
    let joinBtn = $('#characters button');
    joinBtn.on('click', joinKingdom);
    let warBtn = $('#actions button');
    warBtn.on('click', startWar);

    let kingdoms = ['CASTLE', 'DUNGEON', 'FORTRESS', 'FORTRESS', 'INFERNO', 'NECROPOLIS', 'RAMPART', 'STRONGHOLD', 'TOWER', 'CONFLUX'];

    function startWar() {

        let attacker = $('#actions input').first();
        let defender = $('#actions input').last();

        let totalAttackerPower = 0;
        let totalDefenderPower = 0;

        let isValid = validateAttackerAndDefender(attacker.val(),  defender.val());

        if(isValid) {
            let defenderTanksCount = $(`#${defender.val().toLocaleLowerCase()} fieldset p`).first().text().split(' - ')[1];
            let defenderTanksPower = 0;

            if(+defenderTanksCount > 0) {

                defenderTanksPower += +defenderTanksCount * 70;
            }

            let defenderMagesCount = $(`#${defender.val().toLocaleLowerCase()} fieldset p`).last().text().split(' - ')[1];
            let defenderMagesPower = 0;

            if(+defenderMagesCount > 0) {
                defenderMagesPower += +defenderMagesCount * 20;
            }

            let defenderFighterCount = $(`#${defender.val().toLocaleLowerCase()} fieldset p`)[1].textContent.split(' - ')[1];
            let defenderFighterPower = 0;

            if(+defenderFighterCount > 0){
                defenderFighterPower += +defenderFighterCount * 50;
            }

            totalDefenderPower += defenderFighterPower + defenderMagesPower + defenderTanksPower;

            let attackerTanksCount = $(`#${attacker.val().toLocaleLowerCase()} fieldset p`).first().text().split(' - ')[1];
            let attackerTanksPower = 0;

            if(+attackerTanksCount > 0) {

                attackerTanksPower += +attackerTanksCount * 70;
            }

            let attackerMagesCount = $(`#${attacker.val().toLocaleLowerCase()} fieldset p`).last().text().split(' - ')[1];
            let attackerMagesPower = 0;

            if(+attackerMagesCount > 0) {
                attackerMagesPower += +attackerMagesCount * 20;
            }

            let attackerFighterCount = $(`#${attacker.val().toLocaleLowerCase()} fieldset p`)[1].textContent.split(' - ')[1];
            let attackerFighterPower = 0;

            if(+attackerFighterCount > 0){
                attackerFighterPower += +attackerFighterCount * 50;
            }

            totalAttackerPower += attackerTanksPower + attackerMagesPower + attackerFighterPower;

            if(totalAttackerPower > totalDefenderPower){

               let attackerKing = $(`#${attacker.val()} h2`).text();
                $(`#${defender.val()} h2`).text(attackerKing);

            }
        } else {
            attacker.val('');
            defender.val('');
        }
    }

    function joinKingdom() {

        let character = $('#characters :checked');

        let characterName = $('#characters div').last().find('input').first();

        let kingdomName = $('#characters div').last().find('input').last();

        let isValid = validateCharacterInputs(characterName.val(), kingdomName.val());

        if(isValid){

            let currentArmy = $(`#${kingdomName.val().toLocaleLowerCase()} .armyOutput`).text();

            $(`#${kingdomName.val().toLocaleLowerCase()} .armyOutput`).html(currentArmy + `${characterName.val()} `);

            let lastMagesCount =  $(`#${kingdomName.val().toLocaleLowerCase()} fieldset p`)[2].textContent.split(' - ')[1];
            let lastFightCount =  $(`#${kingdomName.val().toLocaleLowerCase()} fieldset p`)[1].textContent.split(' - ')[1];
            let lastTankCount =  $(`#${kingdomName.val().toLocaleLowerCase()} fieldset p`)[0].textContent.split(' - ')[1];

            if(character.val() === 'mage'){
               $(`#${kingdomName.val().toLocaleLowerCase()} fieldset p`)[2].textContent = `MAGES - ${Number(lastMagesCount) + 1}`;
            } else if(character.val() === 'tank'){
                $(`#${kingdomName.val().toLocaleLowerCase()} fieldset p`)[0].textContent = `TANKS - ${Number(lastTankCount) + 1}`;
            } else if (character.val() === 'fighter'){
                $(`#${kingdomName.val().toLocaleLowerCase()} fieldset p`)[1].textContent = `FIGHTERS - ${Number(lastFightCount) + 1}`;

            }
        } else {

            characterName.val('');
            kingdomName.val('');
        }
    }

    function rebuildKingdom() {

        let kingdom = $('#kingdom input').first();
        let king = $('#kingdom input').last();

        let isValid = validateCastleInputs(kingdom, king);

        if(isValid){

            let mapKingdom = $(`#${kingdom.val().toLocaleLowerCase()}`);

            mapKingdom.css('display', 'inline-block');

            let h1El = $('<h1>').text(kingdom.val().toLocaleUpperCase());

            let divCastle = $('<div>').addClass(kingdom.val().toLocaleLowerCase());

            let h2El = $('<h2>').text(king.val().toLocaleUpperCase().trim());

            let fieldset = $('<fieldset>');

            let legend = $('<legend>').text('Army');

            let pTanks = $('<p>').text(`TANKS - 0`);
            let pFighters = $('<p>').text(`FIGHTERS - 0`);
            let pMages = $('<p>').text(`MAGES - 0`);

            let divOutput = $('<div>').addClass('armyOutput');

            fieldset.append(legend).append(pTanks).append(pFighters).append(pMages).append(divOutput);

            mapKingdom.append(h1El).append(divCastle).append(h2El).append(fieldset);
        } else {

            kingdom.val('');
            king.val('');
        }
    }

    function validateAttackerAndDefender(attacker, defender) {

        if(kingdoms.includes(attacker.toLocaleUpperCase()) && kingdoms.includes(defender.toLocaleUpperCase())){

            let isAttackerRebuilded = $(`#${attacker.toLocaleLowerCase()}`).css('display');
            let isDefenderRebuilded = $(`#${defender.toLocaleLowerCase()}`).css('display');

            if(isAttackerRebuilded !== 'none' && isDefenderRebuilded !== 'none'){

                return true;
            }

        }

        return false;
    }

    function validateCharacterInputs(name, kingdom) {

        if(name.length >= 2){

            if(kingdoms.includes(kingdom.toLocaleUpperCase())){

                let isRebuilded = $(`#${kingdom}`).css('display');
                
                if(isRebuilded !== 'none'){

                    return true;
                }
            }

        }
    }

    function validateCastleInputs(kingdom, king) {

        if(king.val().length >= 2){

            if(kingdoms.includes(kingdom.val().toLocaleUpperCase())){
                return true;
            }
        }

        return false;
        }
}

solve();




