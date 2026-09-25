import type { Workout } from "./types"

export const fallbackWorkouts: Workout[] = [
    {
        id: 1,
        exerciseName: "Barbel Bench Press",
        image: "BBP",
        bodyPart: ["Chest", "Arms"],
        equipments: ["Barbell", "Bench"],
        description: "A compound press that builds chest thikness, triceps, and pressing power from a stable bench",
        instructions: ["Lie flat on the bench, eyes under the bar, feet planted firmly on the floor.", "Grip the bar slightly wider than shoulder width and unrack it over your chest.", "Lower the bar under control until it lightly touches your mid chest."],
        duration: 25,
        calories: 180,
        rating: 4.8,
        difficulty: "intermediate",
        sets: 4,
        reps: "6-7"
        

    }

    ,
  {
    id: 2,
    exerciseName: "Barbell Back Squat",
    image: "BBS",
    bodyPart: ["Legs", "Glutes"],
    equipments: ["Barbell", "Squat Rack"],
    description:
      "The king of lower-body lifts: heavy quad, glute, and core strength from a deep, braced squat.",
    instructions: [
      "Set the bar on your upper traps and step back with feet shoulder-width apart.",
      "Brace your core hard and initiate the descent by pushing your hips back.",
      "Squat down until your thighs pass parallel while keeping your chest up.",
      "Drive through your whole foot and stand back up, knees tracking over toes.",
    ],
    duration: 30,
    calories: 220,
    rating: 4.9,
    difficulty: "Advanced",
    sets: 4,
    reps: "5-8",
  }
]