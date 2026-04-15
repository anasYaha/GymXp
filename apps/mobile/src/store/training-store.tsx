import { createContext, useContext, useEffect, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type DayName = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";

export interface ExerciseConfig {
  id: string; // unique ID for this list entry
  machineId: string;
  name: string;
  sets: number;
}

export interface DayPlan {
  day: DayName;
  type: string; // e.g., "Push", "Pull", "Rest"
  exercises: ExerciseConfig[];
}

export interface TrainingState {
  planName: string;
  trainingStyle: string;
  days: DayPlan[];
}

const initialState: TrainingState = {
  planName: "My Plan",
  trainingStyle: "Push Pull Legs",
  days: [
    { day: "MON", type: "Push", exercises: [] },
    { day: "TUE", type: "Pull", exercises: [] },
    { day: "WED", type: "Legs", exercises: [] },
    { day: "THU", type: "Rest", exercises: [] },
    { day: "FRI", type: "Push", exercises: [] },
    { day: "SAT", type: "Pull", exercises: [] },
    { day: "SUN", type: "Rest", exercises: [] },
  ],
};

type Action =
  | { type: "SET_STATE"; payload: TrainingState }
  | { type: "UPDATE_DAY"; payload: { day: DayName; type: string; exercises: ExerciseConfig[] } }
  | { type: "UPDATE_PLAN_NAME"; payload: string }
  | { type: "SET_STYLE"; payload: { style: string; defaultDays: DayPlan[] } };

function trainingReducer(state: TrainingState, action: Action): TrainingState {
  switch (action.type) {
    case "SET_STATE":
      return action.payload;
    case "UPDATE_DAY":
      return {
        ...state,
        days: state.days.map((d) =>
          d.day === action.payload.day
            ? { ...d, type: action.payload.type, exercises: action.payload.exercises }
            : d
        ),
      };
    case "UPDATE_PLAN_NAME":
      return {
        ...state,
        planName: action.payload,
      };
    case "SET_STYLE":
      return {
        ...state,
        trainingStyle: action.payload.style,
        days: action.payload.defaultDays,
      };
    default:
      return state;
  }
}

const TrainingContext = createContext<{ state: TrainingState; dispatch: React.Dispatch<Action> } | undefined>(undefined);

export const TrainingProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(trainingReducer, initialState);

  // Load initially
  useEffect(() => {
    const loadState = async () => {
      try {
        const saved = await AsyncStorage.getItem("@gymxp_training_state");
        if (saved) {
          dispatch({ type: "SET_STATE", payload: JSON.parse(saved) });
        }
      } catch (e) {
        console.error("Failed to load training state", e);
      }
    };
    loadState();
  }, []);

  // Save whenever modified
  useEffect(() => {
    const saveState = async () => {
      try {
        await AsyncStorage.setItem("@gymxp_training_state", JSON.stringify(state));
      } catch (e) {
        console.error("Failed to save training state", e);
      }
    };
    saveState();
  }, [state]);

  return <TrainingContext.Provider value={{ state, dispatch }}>{children}</TrainingContext.Provider>;
};

export const useTrainingContext = () => {
  const context = useContext(TrainingContext);
  if (!context) throw new Error("useTrainingContext must be used within TrainingProvider");
  return context;
};
