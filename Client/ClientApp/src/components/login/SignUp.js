import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  TextInputField,
  Button,
  Alert,
  Pane,
  Heading,
  Spinner
} from 'evergreen-ui';
import { Wrapper } from './Wrapper';
import { toLowerFirstLetter, extractError } from '../../utils';
import { signUp } from '../../api';
import { AuthContext } from '../auth';

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
  const ctx = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [user, changeUser] = useState('');
  const [pass, changePass] = useState('');
  const [name, changeName] = useState('');
  const [surname, changeSurname] = useState('');
  const [error, setError] = useState('');
  const canSubmit = user && pass && name && surname;

  const onSubmit = e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    signUp({
      userName: user,
      password: pass,
      firstName: name,
      lastName: surname
    })
      .then(res => {
        ctx.setToken(res.token);
        setLoading(false);
      })
      .catch(e => {
        setError(extractError(e.response));
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
            autoFocus
            value={name}
            onChange={changeName}
            label="First name"
          />
          <Input
            required
            value={surname}
            onChange={changeSurname}
            label="Last Name"
          />
          <Input
            required
            value={user}
            onChange={changeUser}
            name="username"
            label="Username"
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
