const calculateBMI = (height: number, weight: number): string => {
    let bmi = weight / (height / 100) ** 2;
    
    if(bmi < 16){
        return 'Severely Underweight'
    }else if(bmi >= 16 && bmi < 18.5){
        return 'Underweight'
    }else if(bmi >= 18.5 && bmi < 25){
        return 'Normal (healthy weight)'
    }else if(bmi >= 25 && bmi < 30){
        return 'Overweight'
    }else{
        return 'Obese'
    }
}

interface bmiARGs {
    value1: number,
    value2: number
}

const bmi_parseArguments = (args: Array<string>): bmiARGs => {
    if(args.length < 4) throw new Error("not enough arguments")
    if(args.length > 4) throw new Error("too many arguments")

    if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))){
        return {
           value1: Number(args[2]),
           value2: Number(args[3]) 
        }
    }else{
        throw new Error("provided values were not numbers!")
    }
}
try {
    const { value1, value2 } = bmi_parseArguments(process.argv)
    console.log(calculateBMI(value1, value2))
} catch (err) {
    console.log('something bad happened, ', err.message)
}

