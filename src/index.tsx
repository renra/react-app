import React from 'react';
import ReactDOM from 'react-dom/client';
import useResize from 'utils/useResize';
import { MainContextProvider, useMainContext } from 'MainContext';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


export interface LayoutProps {
  children?: React.ReactNode
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  useResize({})
  const [mainContext] = useMainContext()

  return (
    <div className="react-app" style={{ minHeight: mainContext.window.height }} >
      { children }
    </div>
  )
}

const Router = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/*'} element={ <App /> } />
      </Routes>
    </BrowserRouter>
  )
}

root.render(
  <MainContextProvider>
    <Layout>
      <Router />
    </Layout>
  </MainContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
