import React from 'react';
import Router from '../Router';
import classNames from 'classnames';
import s from './App.module.scss'

function App() {
  return (
    <div className={classNames(s.appWrapper, "appContainer")}>
      <Router />
    </div>
  );
}

export default App;
