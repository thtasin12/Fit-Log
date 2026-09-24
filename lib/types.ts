export interface Workout {
    id: string | number;
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

}

export type SortKey = "duration" | "calories" | "rating"