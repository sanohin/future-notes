import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextInputField, Button, Pane, Heading } from 'evergreen-ui';
import { Wrapper } from './Wrapper';
import { toLowerFirstLetter } from '../../utils';

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
  const [user, changeUser] = useState('');
  const [pass, changePass] = useState('');
  const [name, changeName] = useState('');
  const [surname, changeSurname] = useState('');
  const canSubmit = user && pass && name && surname;
  return (
    <Wrapper>
      <Heading size={700}>Sign up</Heading>
      <Pane marginTop={16}>
        <form onSubmit={e => e.preventDefault()}>
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
          <Link to="/login">
            <Button type="button" iconBefore="arrow-left">
              Back to login
            </Button>
          </Link>
          <Button
            disabled={!canSubmit}
            type="submit"
            appearance="primary"
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
