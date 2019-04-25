// @flow
import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { logIn, signUp, googleLogIn } from "../../api";
import { FieldsWrapper, ButtonsWrapper, FormWrapper } from "./styled";
import { Button, Alert, Heading, Input, Label } from "../ui";

export function Login() {
  const [loading, setLoading] = useState(false);

  const [email, changeEmail] = useState("");
  const [pass, changePass] = useState("");
  const [error, setError] = useState("");

  const isSignIn = React.useRef(true);

  const onSingInClick = useCallback(() => (isSignIn.current = true), []);
  const onSingUpClick = useCallback(() => (isSignIn.current = false), []);

  const login = useCallback(
    e => {
      e.preventDefault();
      const signIn = isSignIn.current;
      const method = signIn ? logIn : signUp;
      setError("");
      setLoading(true);
      method(email, pass)
        .catch(e => {
          setError(e.message);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [email, pass]
  );

  const disabled = !pass || !email;
  return (
    <FormWrapper>
      <Heading>Log in</Heading>
      <form onSubmit={login}>
        <FieldsWrapper>
          <Label>
            Email
            <Input
              required
              autoFocus
              value={email}
              onChange={e => changeEmail(e.target.value)}
              name="email"
              type="email"
              placeholder="Enter email"
            />
          </Label>
          <Label>
            Password
            <Input
              required
              value={pass}
              onChange={e => changePass(e.target.value)}
              type="password"
              name="password"
              placeholder="Enter password"
            />
          </Label>
          {error && <Alert>{error}</Alert>}
        </FieldsWrapper>
        <ButtonsWrapper>
          <Button type="submit" onClick={onSingInClick} disabled={disabled}>
            Log in
          </Button>
          <Button type="submit" onClick={onSingUpClick} disabled={disabled}>
            Sign up
          </Button>
          <Button type="button" onClick={googleLogIn}>
            Log in with Google
          </Button>
        </ButtonsWrapper>
      </form>
    </FormWrapper>
  );
}
