import supabase from "./supabase";


export async function addBloodGlucoseReadings() {
  
}

export async function getBloodGlucoseReadings(userId) {
  const { data, error } = await supabase
    .from("blood_glucose_log")
    .select("created_at, user_id, reading, insulin_units, timestamp, notes")
    .eq("user_id", userId);

  if (error) {
    console.error("Data could not be loaded");
    throw new Error("BG readings could not be loaded");
  }

  return data;
}
