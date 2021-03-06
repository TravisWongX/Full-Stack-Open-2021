interface BodyData {
  w: number
  h: number
}

const parseArgument = (args: Array<string>): BodyData => {
  if (args.length < 4) throw new Error('Not enough arguments')
  if (args.length > 4) throw new Error('Too many arguments')

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      w: Number(args[2]),
      h: Number(args[3]),
    }
  } else {
    throw new Error('Provided values were not numbers!')
  }
}

const calculateBmi = (w: number, h: number) => {
  const bmi = w / (h * h)
  let result = 'Normal'
  if (bmi < 0.74) {
    result = 'Underweight'
  } else if (bmi > 0.99 && bmi < 1.2) {
    result = 'Overweight'
  } else if (bmi >= 1.2) {
    result = 'Obese'
  }

  return {
    weight: w,
    height: h,
    bmi: `${result} (${w}, ${h})`,
  }
}

export default calculateBmi
