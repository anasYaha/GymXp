import { supabase } from "./supabase";

export const SINGLE_GYM = {
  id: "gymxp-single-gym",
  name: "GymXP",
  city: "Your Gym"
} as const;

export const getCurrentAuthUserId = async () => {
  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  if (!user) {
    throw new Error("Authentication required.");
  }

  return user.id;
};
