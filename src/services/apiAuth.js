import supabase from "./supabase";

// This signs up our user to supabase
export async function signup({ email, password, fullName }) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          fullName,
          avatar: "",
        },
      },
    });

    if (error) {
      console.error("Signup Error", error);
      throw error;
    }
    return { user: data.user, session: data.session }; // Return the data from signup
  } catch (error) {
    console.error("Signup Error (Catch Block):", error);
    throw error;
  }
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  try {
    const { data: session, error: sessionError } =
      await supabase.auth.getSession();
    if (sessionError) {
      console.error("2. Session Error:", sessionError);
      return null;
    }

    if (!session?.session?.user) {
      return null;
    }

    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error("5. Auth.getUser Error:", error);
      return null;
    }

    return data?.user;
  } catch (error) {
    console.error("7. Error in getCurrentUser:", error);
    return null;
  }
}

export async function LoggedOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
