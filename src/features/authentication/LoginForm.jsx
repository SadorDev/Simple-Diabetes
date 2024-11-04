import { useState } from "react";
import { useLogin } from "./useLogin.js";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical.jsx";

function LoginForm() {
  const [email, setEmail] = useState("sador@example.com");
  const [password, setPassword] = useState("12345");
  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    
    
    login({ email, password });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
