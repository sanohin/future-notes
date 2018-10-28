import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { TextInputField, Button, Alert, Pane, Heading } from 'evergreen-ui';
import { AuthContext } from '../auth';
import { Wrapper } from './Wrapper';
import { logIn } from '../../api';
import { extractError } from '../../utils';

export const Login = () => {
  const [user, changeUser] = useState('');
  const [pass, changePass] = useState('');
  const [error, setError] = useState('');
  const ctx = useContext(AuthContext);
  const login = e => {
    setError('');
    e.preventDefault();
    logIn({ userName: user, password: pass })
      .then(res => {
        if (res) {
          ctx.setToken(res.token);
        }
      })
      .catch(e => {
        setError(extractError(e.response));
      });
  };
  return (
    <Wrapper>
      <Heading size={700}>Log in</Heading>
      <Pane marginTop={16}>
        <form onSubmit={login}>
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
          {error && <Alert intent="danger" title={error} marginBottom={16} />}
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
