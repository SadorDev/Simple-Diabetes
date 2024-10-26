import supabase from "./supabase";

export async function getBloodGlucoseReadings() {
  const { data, error } = await supabase.from("blood_glucose_log").select("*");

  if (error) {
    console.error("Data could not be loaded");
    throw new Error("BG readings could not be loaded");
  }

  return data;
}
