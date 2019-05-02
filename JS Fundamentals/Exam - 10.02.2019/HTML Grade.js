function solve(examPoints, completedHomework, totalHomework) {
    let totalPoints = ((examPoints * 100) / 400) * 0.9;
    let homeworkPoints = (completedHomework * 100) / totalHomework * 0.1;


    let grade = 3 + 2 * ((totalPoints + homeworkPoints) - 100 / 5) / (100 / 2);

    if(grade < 3) {

        grade = 2;
    } else if (grade > 6){

        grade = 6;
    } else if (examPoints === 400){
        grade = 6;
    }


    console.log(grade.toFixed(2));
}

//solve(300, 10, 10);
solve(200, 5, 5);