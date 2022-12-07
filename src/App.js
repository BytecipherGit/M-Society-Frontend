import './App.css';
import { Router } from './utils/routes';
import { createBrowserHistory } from 'history';
import ReduxToastr from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import React from 'react';

function App() {
  const { createHistory } = createBrowserHistory;

  return (
    <React.Fragment>
      <Router history={createHistory}></Router>
      <ReduxToastr
        timeOut={3000}
        newestOnTop={false}
        preventDuplicates
        position='top-right'
        getState={(state) => state.toastr}
        transitionIn='fadeIn'
        transitionOut='fadeOut'
        progressBar={true}
        closeOnToastrClick />


    </React.Fragment>
  );
}

export default App;
