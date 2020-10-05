interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = ( target: number, dailyH: number[]): Result => {
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


interface exerciseARGs {
    target: number,
    dailyH: number[]
}

const exercise_ParseArguments = (args: Array<string>): exerciseARGs => {
    if(args.length < 4) throw new Error("not enough arguments")
    if(args.length > 12) throw new Error("too many arguments")

    const target = Number(args[2]),
    dailyH = args.slice(3).map( h => Number(h)),
    isNaNDailyH = dailyH.some( h => !isNaN(h))

    if(!isNaN(target) && isNaNDailyH){
        return {
            target,
            dailyH
        }
    }else{
        throw new Error("provided values were not numbers!")
    }
}
try {
    const { target, dailyH } = exercise_ParseArguments(process.argv)
    console.log(calculateExercises(target,dailyH))
} catch (err) {
    console.log('something bad happened, ', err.message)
}


