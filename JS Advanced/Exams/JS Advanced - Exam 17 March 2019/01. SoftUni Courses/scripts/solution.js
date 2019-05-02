function solve() {
    let signBtn = $('.courseFoot button');
    signBtn.on('click', findCourses);

    function findCourses() {

        let myCourses = $('#myCourses ul');
        let myCost = $('.courseFoot p');

        let checkedBoxes = $('.courseBody').first().find(':checkbox:checked');
        let educationalForm = $('#educationForm :checked');
        let totalCost = 0;

        let checkedCount = checkedBoxes.length;

        if(checkedCount === 4){

            myCourses.append($('<li>').text('JS-Fundamentals')).append($('<li>').text('JS-Advanced')).append($('<li>').text('JS-Applications')).append($('<li>').text('JS-Web')).append($('<li>').text('HTML and CSS'));

            totalCost += 170 + 180 + 190 + 490;

        } else if(checkedCount === 2 && checkedBoxes.eq(0).val() === 'js-fundamentals' && checkedBoxes.eq(1).val() === 'js-advanced'){

            myCourses.append($('<li>').text('JS-Fundamentals')).append($('<li>').text('JS-Advanced'));

            totalCost += 170 + (180 * 0.90);
        } else if (checkedCount === 3 && checkedBoxes.eq(0).val() === 'js-fundamentals' && checkedBoxes.eq(1).val() === 'js-advanced' && checkedBoxes.eq(2).val() === 'js-applications' ){

            myCourses.append($('<li>').text('JS-Fundamentals')).append($('<li>').text('JS-Advanced')).append($('<li>').text('JS-Applications'));


            totalCost += (170 + 180 + 190) * 0.94;
        } else {
            let courses = [];

            for(let i = 0; i < checkedCount; i++){

                let current = checkedBoxes.eq(i).val().split('-');

                let courseName = current[0].substr(0,2).toUpperCase() + '-' + current[1].substr(0,1).toLocaleUpperCase() + current[1].substr(1);


                courses.push(courseName);

                switch (courseName) {
                    case 'JS-Fundamentals':
                        totalCost += 170;
                    break;
                    case 'JS-Advanced':
                        totalCost += 180;
                    break;
                    case 'JS-Applications':
                        totalCost += 190;
                    break;
                    case 'JS-Web':
                        totalCost += 490;
                    break;

                }

            }

            courses.forEach((x) => {

                myCourses.append($('<li>').text(x));
            })
        }

        if(educationalForm.val() === 'online'){

            totalCost = totalCost * 0.94;
        }
        let currentCost = myCost.text().split(': ')[1].split(' ')[0];
        let last = Number(currentCost) + +Math.floor(totalCost).toFixed(2);
        myCost.text(`Cost: ${last.toFixed(2)} BGN`);
    }
}

solve();
