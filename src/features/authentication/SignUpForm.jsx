import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignUp } from "./useSignUp";
// import { useEffect, useState } from "react";
// import { getCurrentUser } from "../../services/apiAuth";

// Email regex: /\S+@\S+\.\S+/

const SignupForm = () => {
  const { signup, isLoading } = useSignUp();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   const checkAuthStatus = async () => {
  //     const currentUser = await getCurrentUser();
  //     if (currentUser) {
  //       setIsAuthenticated(false);
  //     }
  //   };
  //   checkAuthStatus();
  // }, []);

  const onSubmit = async ({ fullName, email, password }) => {
    try {
      await signup({ fullName, email, password });
      reset();
    } catch (error) {
      console.error("Signup failed");
    }
  };

  // if (isAuthenticated) {
  //   console.error(
  //     "A user is already logged in. You cannot create a new user"
  //   );
  //   return;
  // }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* {isAuthenticated && (
        <p>A user is already logged in. Cannot create a new user.</p>
      )} */}

      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Provide a valid emial address",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs to have a minimum of 8 characters",
              validate: (value) =>
                value === getValues().password || "Password needs to match",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Password do not match",
          })}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" disabled={isLoading}>
          Cancel
        </Button>
        <Button disabled={isLoading}>Create new user</Button>
      </FormRow>
    </Form>
  );
};

export default SignupForm;
