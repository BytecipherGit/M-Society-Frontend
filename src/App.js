import "./App.css";
import { Router } from "./utils/routes";

import ReduxToastr from "react-redux-toastr";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import React from "react";

function App() {
  // sasfa
  return (
    <React.Fragment>
      <Router />
      <ReduxToastr
        timeOut={2000}
        newestOnTop={false}
        preventDuplicates
        position="top-right"
        getState={(state) => state.toastr}
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar={false}
        closeOnToastrClick={true}
      />
    </React.Fragment>
  );
}

export default App;
