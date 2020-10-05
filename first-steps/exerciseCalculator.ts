interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (dailyH: number[], target: number): Result => {
    const periodLength = dailyH.length,
    trainingDays = dailyH.filter( h => h > 0).length,
    totalHours = dailyH.reduce( (t, h) => t + h, 0),
    average = totalHours / periodLength,
    success = average >= target

    let precentage = average / target * 100,
    rating,
    ratingDescription

    console.log(precentage)

    if(precentage >= 100){
        rating = 3
        ratingDescription = "so proud of you"
    }else if(precentage >= 70 && precentage < 100){
        rating = 2
        ratingDescription = "not too bad but could be better"
    }else{
        rating = 1
        ratingDescription = "you need do more"
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
}

console.log(calculateExercises([3,0,2,4.5,0,3,1], 2))
