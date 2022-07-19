import './Footer.css'
import logoImg from '../../images/Logo.png'

const Footer = () => {
  return (
    <div className='footer-body flex flex-wrap'>
      <ul style={{listStyleType: 'none'}}>
        <li><img src={logoImg} alt='Logo artemart'></img></li>
        <li><h2>Por: ArteMart TEAM</h2></li>
      </ul>
      <ul className='footer-info flex flex-wrap'>
        <li>
          <ul className='footer-contact'>
            <li>
              <h3>CONTATO</h3>
            </li>
            <li className='pt-3'>
              <i className='pi pi-envelope'></i>
              <a href='mailto:contato@artemart.com'>Contato Profissional</a>
            </li>
            <li className='pt-3'>
              <i className='pi pi-github'></i>
              <a href='https://github.com/JoPedro'>JoPedro</a>
            </li>
            <li className='pt-3'>
              <i className='pi pi-github'></i>
              <a href='https://github.com/rosenildofurtado'>rosenildofurtado</a>
            </li>
            <li className='pt-3 mb-4'>
              <i className='pi pi-github'></i>
              <a href='https://github.com/JeffersonThiago'>JeffersonThiago</a>
            </li>
          </ul>
        </li>
        <li>
          <ul className='footer-contact'>
            <li>
              <h3>DESTAQUES</h3>
            </li>
            <li className='pt-3'>
              <i className='pi pi-chart-line'></i>
              <a>Em alta</a>
            </li>
            <li className='pt-3'>
              <i className='pi pi-percentage'></i>
              <a>Promoções</a>
            </li>
            <li className='pt-3'>
              <i className='pi pi-palette'></i>
              <a>Encomendas</a>
            </li>
            <li className='pt-3 mb-4'>
              <i className='pi pi-th-large'></i>
              <a>Categorias</a>
            </li>
          </ul>
        </li>
        <li>
          <ul className='footer-contact'>
            <li>
              <h3>SUPORTE</h3>
            </li>
            <li className='pt-3'>
              <i className='pi pi-info-circle'></i>
              <a>Guia da plataforma</a>
            </li>
            <li className='pt-3'>
              <i className='pi pi-ticket'></i>
              <a>Criar um ticket</a>
            </li>
            <li className='pt-3 mb-4'>
              <i className='pi pi-exclamation-triangle'></i>
              <a>Denunciar uma arte</a>
            </li>
          </ul>
        </li>
        <li>
          <ul className='footer-contact'>
            <li>
              <h3>SOBRE</h3>
            </li>
            <li className='pt-3 mb-4'>
              <i className='pi pi-users'></i>
              <a>Quem somos</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  )
}

export default Footer