import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { TextInputField, Button, Alert, Pane, Heading } from "evergreen-ui";
import { Wrapper } from "./Wrapper";
import { logIn, googleLogIn } from "../../api";
import { Google } from "../ui/icons";

export const Login = () => {
  const [loading, setLoading] = useState(false);

  const [email, changeEmail] = useState("");
  const [pass, changePass] = useState("");
  const [error, setError] = useState("");
  const login = useCallback(
    e => {
      e.preventDefault();
      setError("");
      setLoading(true);
      logIn(email, pass)
        .catch(e => {
          setError(e.message);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [setError, setLoading]
  );

  return (
    <Wrapper>
      <Heading size={700}>Log in</Heading>
      <Pane marginTop={16}>
        <form onSubmit={login}>
          <TextInputField
            required
            autoFocus
            value={email}
            onChange={e => changeEmail(e.target.value)}
            name="email"
            label="Email"
            type="email"
            placeholder="Enter email"
          />
          <TextInputField
            required
            value={pass}
            onChange={e => changePass(e.target.value)}
            type="password"
            name="password"
            label="Password"
            placeholder="Enter password"
          />
          {error && <Alert intent="danger" title={error} marginBottom={16} />}
          <Button
            type="submit"
            iconAfter="arrow-right"
            appearance="primary"
            isLoading={loading}
            disabled={!pass || !email}
          >
            Login
          </Button>
          <Link to="/sign-up">
            <Button
              type="button"
              appearance="primary"
              marginLeft={12}
              intent="success"
              iconBefore="add"
            >
              Sign up
            </Button>
          </Link>
          <Button marginLeft={12} onClick={googleLogIn}>
            <Google width={24} height={24} />
          </Button>
        </form>
      </Pane>
    </Wrapper>
  );
};
