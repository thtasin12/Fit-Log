export interface Workout {
    id: number;
    exerciseName: string;
    image: string;
    bodyPart: string[];
    equipments: string[];
    description: string;
    instructions: string[];
    duration: number
    calories: number;
    difficulty: string;
    sets: number | string;
    reps: string;
    rating: number

}

export type SortKey = "duration" | "calories" | "rating"