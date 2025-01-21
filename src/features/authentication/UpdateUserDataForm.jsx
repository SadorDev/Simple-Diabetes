import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";

export const UpdateUserDataForm = () => {
  const { user } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();

  const email = user?.email || "";
  const currentFullName = user?.user_metadata?.fullName || "";

  const [avatar, setAvatar] = useState(null);
  const [fullName, setFullName] = useState(currentFullName);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName) return;
    const data = { fullName, avatar };
    updateUser(data, { onSuccess: () => console.log("Update successful") });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input type="email" value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Avatar">
        <FileInput onChange={(e) => setAvatar(e.target.files[0])} />
      </FormRow>
      <Button type="submit" disabled={isUpdating}>
        {isUpdating ? "Updating..." : "Update"}
      </Button>
    </Form>
  );
};
