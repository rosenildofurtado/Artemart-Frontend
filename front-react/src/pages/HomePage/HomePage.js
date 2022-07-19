import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import './HomePage.css'
import { Button } from 'primereact/button'
import arteImg from '../../images/HomePage/arte.jpg';
import CarouselDestaques from '../../components/CarouselDestaques/CarouselDestaques';

const HomePage = () => {
  return (
    <div className='homepage-body'>
      <Navbar />

      <div className="grid grid-nogutter surface-0 text-800">
        <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center">
          <section>
            <span className="block text-6xl font-bold mb-1">É um artista?</span>
            <div className="text-6xl text-primary font-bold mb-3">Que tal publicar sua arte?</div>
            <p className="mt-0 mb-4 text-700 line-height-3">Cadastre sua conta de artista para publicar suas artes na nossa plataforma.</p>

            <Button label="Publicar" type="button" className="mr-3 p-button-raised" />
            <Button label="Cadastrar" type="button" className="p-button-outlined" />
          </section>
        </div>
        <div className="col-12 md:col-6 overflow-hidden">
          <img src={arteImg} alt="A" className="block" style={{ clipPath: 'polygon(8% 0, 100% 0%, 100% 100%, 0 100%)', height: '50em' }} />
        </div>
      </div>

      <hr className='hr-homepage'></hr>
      <div className='surface-200 pt-6 pb-6'>
        <CarouselDestaques header='Em alta' />
        <CarouselDestaques header='Promoções' />
      </div>
      <Footer />
    </div>
  )
}

export default HomePage