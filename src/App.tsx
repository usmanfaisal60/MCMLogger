import React from 'react'
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from './react-alert-template-oldschool-dark';
import thunk from 'redux-thunk';
import Routes from './routes';
import stores from './stores';

const App = () => {
  const options = {
    position: positions.TOP_RIGHT,
    timeout: 5000,
    transition: transitions.FADE,
  }

  return (
    <div className="bg-light-theme-gradient w-100 h-100">
      <AlertProvider template={AlertTemplate} type="info" {...options}>
        <Provider store={createStore(stores, applyMiddleware(thunk))}>
          <Routes />
        </Provider>
      </AlertProvider>
    </div>
  );
}

export default App;
