import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ArticleList from './components/ArticleList';
import ArticleForm from './components/ArticleForm';
import LoginForm from './components/LoginForm';
import Registration from './components/Registration';
import ArticleDetail from './components/ArticleDetail';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} >
          <Route index element={<ArticleList />} />
          <Route path='/article/:id' element={<ArticleDetail />} />
          <Route path='login' element={<LoginForm />} />
          <Route path='register' element={<Registration />} />
          <Route path='drafts' element={<ArticleForm />} />
          {/* <Route path='admin' element={<Admin />} /> */}
          <Route path='*' element={
            <main style={{ padding: '1 rem' }}>
              <p>There's nothing here!</p>
            </main>
          } /> 
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
