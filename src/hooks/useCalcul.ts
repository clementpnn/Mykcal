interface UserData {
  gender: string
  weight: number
  size: number
  age: number
  activity: string
  goal: string
}

function calculateBMR(gender: string, weight: number, size: number, age: number): number {
  if (gender === 'male') {
    return 88.362 + (13.397 * weight) + (4.799 * size) - (5.677 * age)
  } else {
    return 447.593 + (9.247 * weight) + (3.098 * size) - (4.330 * age)
  }
}

function calculateTDEE(bmr: number, activity: string): number {
  switch (activity) {
    case 'sedentary':
      return bmr * 1.2
    case 'lightly':
      return bmr * 1.375
    case 'moderately':
      return bmr * 1.55
    case 'very':
      return bmr * 1.725
    case 'super':
      return bmr * 1.9
    default:
      throw new Error('Invalid activity level')
  }
}

export default function useCalcul(user: UserData): number {
  const bmr = calculateBMR(user.gender, user.weight, user.size, user.age)
  const tdee = calculateTDEE(bmr, user.activity)

  switch (user.goal) {
    case 'lose':
      return tdee - 250
    case 'maintain':
      return tdee
    case 'gain':
      return tdee + 250
    default:
      throw new Error('Invalid goal')
  }
}

