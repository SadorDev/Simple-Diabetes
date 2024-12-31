import supabase from "./supabase";

// This holds an asynchronous function that inserts a new record into the table. This record is an object
// Logs the userId, inserts a new blood glucose reading into the db and handles errors if the insert fails. 
export const addBloodGlucoseReadings = async ({  userId,  reading,  insulinUnits,  timestamp,  notes,}) => {
  console.log("User ID being added: ", userId);
    const { data, error } = await supabase
    .from("blood_glucose_log")
    .insert([
    {
      user_id: userId,
      reading,
      insulin_units: insulinUnits,
      timestamp,
      notes,
    },
  ]);

  if (error) {
    console.error("error adding blood glucose reading", error);
    throw new Error("BG reading could not be added");
  }

  return data;
}

// This is an asynchronous function that takes one arg, userId, to get readings from a specific user
export const getBloodGlucoseReadings = async (userId) => {
  console.log("Querying for user ID:", userId); 
  const { data, error } = await supabase
    .from("blood_glucose_log")
    .select("created_at, user_id, reading, insulin_units, timestamp, notes")
    .eq("user_id", userId);
  console.log("Fetched Logbook Data:", data); 
  if (error) {
    console.error("Data could not be loaded", error);
    throw new Error("BG readings could not be loaded");
  }

  return data;
};
