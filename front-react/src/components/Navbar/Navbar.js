import { useEffect, useState } from 'react'
import Logo from '../../images/Logo.png'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import './Navbar.css'
import ArteMartAPIService from '../../services/ArteMartAPIService'

const Navbar = () => {
  const [buscaArte, setBuscaArte] = useState('')
  const [nomeUsuario, setNomeUsuario] = useState('');

  const arteMartAPIService = new ArteMartAPIService();

  useEffect(() => {
    if (sessionStorage.getItem('token') != null) {
      document.getElementById('li-entrar').style.display = 'none';
      document.getElementById('li-sair').style.display = 'block';
      document.getElementById('user-ola').style.display = 'block';
      document.getElementById('user-perfil').style.display = 'block';

      arteMartAPIService.getPerfilInfo(sessionStorage.getItem('token'))
        .then((res) => document.getElementById('user-ola').innerHTML = 'Olá, ' + res.first_name);
    }
    else {
      document.getElementById('li-entrar').style.display = 'block';
      document.getElementById('li-sair').style.display = 'none';
      document.getElementById('user-ola').style.display = 'none';
      document.getElementById('user-perfil').style.display = 'none';
    }
  }, []);

  function fazerLogout() {
    arteMartAPIService.postLogout().then(() => {
      sessionStorage.removeItem('id');
      sessionStorage.removeItem('token');
      window.location.reload();
    });
  }

  return (
    <div className='surface-ground'>
      <ul className='flex align-items-center navbar-items' style={{ float: 'left' }}>
        <a href='/'>
          <li><img src={Logo} alt='Logo artemart' /></li>
        </a>
      </ul>

      <ul className='flex align-items-center navbar-items' style={{ float: 'right' }}>
        <li>
          <a href='/publicar'>
            <Button icon="pi pi-plus" className="p-button-rounded" aria-label="Publicar arte" />
          </a>
        </li>
        <li><InputText value={buscaArte} onChange={(e) => setBuscaArte(e.target.value)} placeholder="Search" /></li>
        <li><i className="pi pi-search cursor-pointer" /></li>
        <li id='li-entrar'><a href='/login'><Button label='Entrar' className="p-button-rounded button-entrar" aria-label="Entrar" /></a></li>
        <li id='user-ola'>Olá, {nomeUsuario}</li>
        <li id='user-perfil'>
          <div className='h-3rem w-3rem border-circle border-solid border-700 flex align-items-center surface-0 cursor-pointer'>
            <i className='pi pi-user m-auto'></i>
          </div>
        </li>
        <li id='li-sair'>
          <Button onClick={() => fazerLogout()}
            label='Sair' className="p-button-rounded button-entrar" aria-label="Sair" />
        </li>
      </ul>

      <div className='flex flex-wrap align-items-center div-header w-full'>
        <ul className='flex flex-wrap ul-header header-items'>
          <li><a>Em alta</a></li>
          <li><a>Promoções</a></li>
          <li><a>Encomendas</a></li>
          <li><a>Categorias</a></li>
          <li><a>Contato</a></li>
          <li><a>Ajuda</a></li>
          <li><a>Sobre</a></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar