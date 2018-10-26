import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Textarea, TextInputField, Button, Pane, Heading } from 'evergreen-ui';
import { Wrapper } from './Wrapper';

export const Login = () => {
  const [user, changeUser] = useState('');
  const [pass, changePass] = useState('');
  return (
    <Wrapper>
      <Heading size={700}>Log in</Heading>
      <Pane marginTop={16}>
        <form onSubmit={e => e.preventDefault()}>
          <TextInputField
            required
            autoFocus
            value={user}
            onChange={e => changeUser(e.target.value)}
            name="username"
            label="Username"
            placeholder="Enter username"
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
          <Button
            type="submit"
            iconAfter="arrow-right"
            appearance="primary"
            disabled={!pass || !user}
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
        </form>
      </Pane>
    </Wrapper>
  );
};
