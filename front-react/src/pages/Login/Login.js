import "./Login.css"
import Logo from '../../images/Logo.png'
import { InputText } from 'primereact/inputtext';
import { useState } from "react";
import { Button } from 'primereact/button'
import ArteMartAPIService from '../../services/ArteMartAPIService';
import { Toast } from 'primereact/toast'
import { useRef } from "react";

export const Login = () => {
  const [userNameValue, setUserNameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const arteMartAPIService = new ArteMartAPIService();
  const toastErr = useRef(null);

  async function fazerLogin(username, password) {
    try {
      const res = await arteMartAPIService.postLogin(username, password);

      sessionStorage.setItem('token', res.key);
      sessionStorage.setItem('id', res.user);
      window.location.href = '/';
    }
    catch (e) {
      toastErr.current.show({ severity: 'error', summary: 'Erro', detail: 'Usuário ou senha incorreta', life: 3000 });
      console.log(e);
    }
  }

  return (
    <div>
      <Toast ref={toastErr} id="toast-ref" />
      <div className="login-body">
        <div className='login-card'></div>
        <div className="login-content w-25rem">
          <div className="logo-login">
            <a href="/"><img src={Logo} alt="Logo artemart" /></a>
          </div>
          <ul>
            <li>
              <h2>Entre para publicar ou comprar artes</h2>
            </li>
            <li>
              <div className="formgrid grid flex-nowrap">
                <div className="field col pr-0">
                  <label htmlFor="username">Usuário:</label>
                  <br></br>
                  <span className="p-input-icon-right input-text-login">
                    <i className="pi pi-user" />
                    <InputText className="w-12rem" name="username" autoFocus autoCapitalize="none" autoComplete="username"
                      placeholder="Nome de usuário" value={userNameValue} onChange={(e) => setUserNameValue(e.target.value)}
                      required />
                  </span>
                </div>
                <div className="field col pr-0">
                  <label htmlFor="password">Senha:</label>
                  <br></br>
                  <span className="p-input-icon-right input-text-login">
                    <i className="pi pi-lock" />
                    <InputText className="w-12rem" type='password' name="password" autoComplete="current-password"
                      placeholder="Senha" value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)}
                      required />
                  </span>
                </div>
              </div>

            </li>

            <li>

            </li>

            <li className="button-form">
              <Button label="Entrar" aria-label="Entrar" onClick={() => fazerLogin(userNameValue, passwordValue)} />
            </li>
          </ul>

          <div className="registro-login">
            <a className="link-registro" href='/cadastro'>
              Não tem conta? Clique aqui para criar!
            </a>
          </div>
        </div>
        <div className="login-responsive">
          <div className="logo-login text-center">
            <a><img src={Logo} alt="Logo" /></a>
          </div>
          <ul>
            <li className="text-center">
              <h2>Entre para publicar ou comprar artes</h2>
            </li>
            <li className="field">
              <label htmlFor="username" className="mb-0">Usuário:</label>
              <br></br>
              <span className="p-input-icon-right input-text-login w-full">
                <i className="pi pi-user" />
                <InputText className="w-full" name="username" autoFocus autoCapitalize="none" autoComplete="username"
                  placeholder="Nome de usuário" value={userNameValue} onChange={(e) => setUserNameValue(e.target.value)}
                  required />
              </span>
            </li>

            <li className="field">
              <label htmlFor="password" className="mt-2 mb-0">Senha:</label>
              <br></br>
              <span className="p-input-icon-right input-text-login w-full">
                <i className="pi pi-lock" />
                <InputText className="w-full" type='password' name="password" autoComplete="current-password"
                  placeholder="Senha" value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)}
                  required />
              </span>
            </li>

            <li className="button-form text-center pt-2">
              <Button label="Entrar" aria-label="Entrar" onClick={() => fazerLogin(userNameValue, passwordValue)} />
            </li>
          </ul>

          <div className="registro-login text-center">
            <a className="link-registro" href='/cadastro'>
              Não tem conta? Clique aqui para criar!
            </a>
          </div>
        </div>
        <div className="credits">
          Photo by <a href="https://unsplash.com/@joshtw?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Josh Liu</a> on <a href="https://unsplash.com/s/photos/art-gallery?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
        </div>
      </div>
    </div>
  )
}