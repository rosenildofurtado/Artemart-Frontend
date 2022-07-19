import "./Cadastro.css"
import "../Login/Login.css"
import Logo from '../../images/Logo.png'
import { InputText } from 'primereact/inputtext';
import { useState } from "react";
import { Button } from 'primereact/button'
import ArteMartAPIService from '../../services/ArteMartAPIService';
import { Toast } from 'primereact/toast'
import { useRef } from "react";
import { Checkbox } from 'primereact/checkbox';

export const Cadastro = () => {
  const [userNameValue, setUserNameValue] = useState('');
  const [password1Value, setPassword1Value] = useState('');
  const [password2Value, setPassword2Value] = useState('');
  const [firstNameValue, setFirstNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [isArtista, setIsArtista] = useState(false);

  const arteMartAPIService = new ArteMartAPIService();
  const toastErr = useRef(null);

  async function fazerCadastro(email, username, first_name, last_name, password1, password2, isArtista) {
    try {
      const res = await arteMartAPIService.postCadastro(email, username, first_name, last_name, password1, password2, isArtista);

      sessionStorage.setItem('token', res.token);
      sessionStorage.setItem('id', res.id);
      window.location.href = '/';
    }
    catch (e) {
      toastErr.current.show({ severity: 'error', summary: 'Erro', detail: 'Não foi possível fazer o cadastro.', life: 3000 });
      console.log(e);
    }
  }

  return (
    <div>
      <Toast ref={toastErr} id="toast-ref" />
      <div className="login-body">
        <div className='login-card'></div>
        <div className="login-content w-27rem">
          <div className="logo-cadastro">
            <a href="/"><img src={Logo} alt="Logo artemart" /></a>
          </div>
          <ul>
            <li>
              <h2>Faça seu cadastro</h2>
            </li>
            <li>
              <div className="formgrid grid flex-nowrap">
                <div className="field col pr-0 mb-0">
                  <label htmlFor="username" className="mb-0">Usuário:</label>
                  <br></br>
                  <span className="p-input-icon-right input-text-login">
                    <i className="pi pi-user" />
                    <InputText className="w-12rem" data-cy="usernameD" id="usernameD" name="username" autoFocus autoCapitalize="none" autoComplete="username"
                      placeholder="Nome de usuário" value={userNameValue} onChange={(e) => setUserNameValue(e.target.value)}
                      required />
                  </span>
                </div>
                <div className="field col pr-0 mb-0">
                  <label htmlFor="email" className="mb-0">Email:</label>
                  <br></br>
                  <span className="p-input-icon-right input-text-login">
                    <i className="pi pi-envelope" />
                    <InputText className="w-12rem" data-cy="emailD" name="email" autoFocus autoCapitalize="none" autoComplete="email"
                      placeholder="Email válido" value={emailValue} onChange={(e) => setEmailValue(e.target.value)}
                      required type='email' />
                  </span>
                </div>
              </div>
            </li>

            <li>
              <div className="formgrid grid flex-nowrap">
                <div className="field col pr-0 mb-0">
                  <label htmlFor="first_name" className="mb-0">Nome:</label>
                  <br></br>
                  <span className="p-input-icon-right input-text-login">
                    <InputText className="w-12rem" data-cy="first_nameD" name="first_name" autoFocus autoCapitalize="none" autoComplete="first_name"
                      placeholder="Nome" value={firstNameValue} onChange={(e) => setFirstNameValue(e.target.value)}
                      required />
                  </span>
                </div>
                <div className="field col pr-0 mb-0">
                  <label htmlFor="last_name" className="mb-0">Sobrenome:</label>
                  <br></br>
                  <span className="p-input-icon-right input-text-login">
                    <InputText className="w-12rem" data-cy="last_nameD" name="last_name" autoFocus autoCapitalize="none" autoComplete="last_name"
                      placeholder="Sobrenome" value={lastNameValue} onChange={(e) => setLastNameValue(e.target.value)}
                      required />
                  </span>
                </div>
              </div>
            </li>

            <li>
              <div className="formgrid grid flex-nowrap">
                <div className="field col pr-0 mb-0">
                  <label htmlFor="username" className="mb-0">Senha:</label>
                  <br></br>
                  <span className="p-input-icon-right input-text-login">
                    <i className="pi pi-lock" />
                    <InputText className="w-12rem" type='password' data-cy="password1D" name="password1" autoComplete="current-password"
                      placeholder="Senha" value={password1Value} onChange={(e) => setPassword1Value(e.target.value)}
                      required />
                  </span>
                </div>
                <div className="field col pr-0 mb-0">
                  <label htmlFor="password" className="mb-0">Confirme a senha:</label>
                  <br></br>
                  <span className="p-input-icon-right input-text-login">
                    <i className="pi pi-lock" />
                    <InputText className="w-12rem" type='password' data-cy="password2D" name="password2" autoComplete="current-password"
                      placeholder="Confirme a senha" value={password2Value} onChange={(e) => setPassword2Value(e.target.value)}
                      required />
                  </span>
                </div>
              </div>
            </li>

            <li>
              <div className="field flex align-items-center">
                <label htmlFor="isArtista" className="m-0 p-0">Você é artista?</label>
                <Checkbox data-cy="isArtistaD" name='isArtista' className="ml-1"
                  onChange={e => setIsArtista(e.checked)} checked={isArtista}></Checkbox>
              </div>
            </li>

            <li className="button-form">
              <Button label="Cadastrar" data-cy="cadastrarD" aria-label="Cadastrar" onClick={
                () => fazerCadastro(emailValue, userNameValue, firstNameValue, lastNameValue, password1Value, password2Value, isArtista)
              } />
            </li>
          </ul>

          <div className="registro-login mb-0">
            <a className="link-registro" href='/login'>
              Já tem cadastro? Clique aqui para entrar!
            </a>
          </div>
        </div>
        <div className="login-responsive">
          <div className="logo-login text-center mb-0 pt-4">
            <a><img src={Logo} alt="Logo" /></a>
          </div>
          <ul>
            <li className="text-center text-sm">
              <h2>Faça seu cadastro</h2>
            </li>
            <li>
              <div className="field">
                <label htmlFor="username" className="mb-0">Usuário:</label>
                <br></br>
                <span className="p-input-icon-right input-text-login w-full">
                  <i className="pi pi-user" />
                  <InputText className="w-full" data-cy="usernameR" name="username" autoFocus autoCapitalize="none" autoComplete="username"
                    placeholder="Nome de usuário" value={userNameValue} onChange={(e) => setUserNameValue(e.target.value)}
                    required />
                </span>
              </div>
            </li>

            <li>
              <div className="field">
                <label htmlFor="email" className="mb-0">Email:</label>
                <br></br>
                <span className="p-input-icon-right input-text-login w-full">
                  <i className="pi pi-envelope" />
                  <InputText className="w-full" data-cy="emailR" name="email" autoFocus autoCapitalize="none" autoComplete="email"
                    placeholder="Email válido" value={emailValue} onChange={(e) => setEmailValue(e.target.value)}
                    required type='email' />
                </span>
              </div>
            </li>

            <li>
              <div className="field">
                <label htmlFor="first_name" className="mb-0">Nome:</label>
                <br></br>
                <span className="p-input-icon-right input-text-login w-full">
                  <InputText className="w-full" data-cy="first_nameR" name="first_name" autoFocus autoCapitalize="none" autoComplete="first_name"
                    placeholder="Nome" value={firstNameValue} onChange={(e) => setFirstNameValue(e.target.value)}
                    required />
                </span>
              </div>
            </li>

            <li>
              <div className="field">
                <label htmlFor="last_name" className="mb-0">Sobrenome:</label>
                <br></br>
                <span className="p-input-icon-right input-text-login w-full">
                  <InputText className="w-full" data-cy="last_nameR" name="last_name" autoFocus autoCapitalize="none" autoComplete="last_name"
                    placeholder="Sobrenome" value={lastNameValue} onChange={(e) => setLastNameValue(e.target.value)}
                    required />
                </span>
              </div>
            </li>

            <li>
              <div className="field">
                <label htmlFor="username" className="mb-0">Senha:</label>
                <br></br>
                <span className="p-input-icon-right input-text-login w-full">
                  <i className="pi pi-lock" />
                  <InputText className="w-full" type='password' data-cy="password1R" name="password1" autoComplete="current-password"
                    placeholder="Senha" value={password1Value} onChange={(e) => setPassword1Value(e.target.value)}
                    required />
                </span>
              </div>
            </li>

            <li>
              <div className="field">
                <label htmlFor="password" className="mb-0">Confirme a senha:</label>
                <br></br>
                <span className="p-input-icon-right input-text-login w-full">
                  <i className="pi pi-lock" />
                  <InputText className="w-full" type='password' data-cy="password2R" name="password2" autoComplete="current-password"
                    placeholder="Confirme a senha" value={password2Value} onChange={(e) => setPassword2Value(e.target.value)}
                    required />
                </span>
              </div>
            </li>

            <li>
              <div className="field flex align-items-center">
                <label htmlFor="isArtista" className="m-0 p-0">Você é artista?</label>
                <Checkbox data-cy="isArtistaR" name='isArtista' className="ml-1"
                  onChange={e => setIsArtista(e.checked)} checked={isArtista}></Checkbox>
              </div>
            </li>

            <li className="button-form text-center pt-2 pb-0">
              <Button label="Cadastrar" data-cy="cadastrarR" aria-label="Cadastrar" onClick={
                () => fazerCadastro(emailValue, userNameValue, firstNameValue, lastNameValue, password1Value, password2Value, isArtista)
              } />
            </li>
          </ul>

          <div className="registro-login text-center mt-3 pb-3">
            <a className="link-registro" href='/login'>
              Já tem cadastro? Clique aqui para entrar!
            </a>
          </div>
        </div>
        <div className="credits">
          Photo by <a href="https://unsplash.com/@joshtw?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Josh Liu</a> on <a href="https://unsplash.com/s/photos/art-gallery?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
        </div>
      </div>
    </div >
  )
}