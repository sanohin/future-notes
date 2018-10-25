import React from 'react';
import { Link } from 'react-router-dom';

export const NavMenu = () => (
  <nav>
    <Link to={'/'} exact>
      Home
    </Link>
    <Link to={'/counter'}>Counter</Link>
    <Link to={'/fetchdata'}>Fetch data</Link>
  </nav>
);
