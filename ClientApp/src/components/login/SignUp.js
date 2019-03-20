import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { TextInputField, Button, Alert, Pane, Heading } from 'evergreen-ui';
import { Wrapper } from './Wrapper';
import { toLowerFirstLetter } from '../../utils';
import { signUp } from '../../api';

const Input = ({ onChange, label, ...rest }) => (
  <TextInputField
    {...rest}
    required
    onChange={e => onChange(e.target.value)}
    label={label}
    placeholder={`Enter ${toLowerFirstLetter(label)}`}
  />
);

export const SignUp = () => {
  const [loading, setLoading] = useState(false);

  const [user, changeUser] = useState('');
  const [pass, changePass] = useState('');
  const [error, setError] = useState('');
  const canSubmit = user && pass;

  const onSubmit = e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    signUp(user, pass)
      .catch(e => {
        setError(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Wrapper>
      <Heading size={700}>Sign up</Heading>
      <Pane marginTop={16}>
        <form onSubmit={onSubmit}>
          <Input
            required
            value={user}
            onChange={changeUser}
            name="email"
            type="email"
            label="Email"
          />
          <Input
            required
            value={pass}
            onChange={changePass}
            type="password"
            name="password"
            label="Password"
          />
          {error && <Alert intent="danger" title={error} marginBottom={16} />}
          <Link to="/login">
            <Button type="button" iconBefore="arrow-left">
              Back to login
            </Button>
          </Link>
          <Button
            disabled={!canSubmit}
            type="submit"
            appearance="primary"
            isLoading={loading}
            marginLeft={12}
            intent="success"
            iconAfter="arrow-right"
          >
            Sign up
          </Button>
        </form>
      </Pane>
    </Wrapper>
  );
};
