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

console.log(calculateBMI(180, 74))
