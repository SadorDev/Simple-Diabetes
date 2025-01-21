import supabase from "./supabase";

export const signup = async ({ email, password, fullName }) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          fullName,
        },
      },
    });

    if (error) throw new Error(error.message);

    if (data?.user) {
      const { error: insertError } = await supabase.from("users").insert([
        {
          id: data.user.id,
          email,
        },
      ]);

      if (insertError) {
        console.error("Insert User Error:", insertError);
        throw new Error("Failed to create user in database.");
      }
    }

    return data;
  } catch (error) {
    console.error("Signup Error:", error);
    throw error;
  }
};

export const login = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getCurrentUser = async () => {
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

    // console.log("Current User:", data?.user);
    return data?.user;
  } catch (error) {
    console.error("7. Error in getCurrentUser:", error);
    return null;
  }
};

export const loggedOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
};

export const updateCurrentUser = async ({ password, fullName, avatar }) => {
  // 1. Update password or fullName
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // 2. Upload avatar image
  const fileName = `avater-$(data.user.id)-${Math.randon()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (storageError) throw new Error(error.message);

  // 3. Upload avatar in the user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: avatarUrl,
    },
  });
};
