import supabase from "./supabase";

export const signup = async ({ email, password, fullName }) => {
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

export const login = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export const getCurrentUser = async() => {
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

export const LoggedOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
