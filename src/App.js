import React, { useState } from 'react';
import { Steps } from 'primereact/steps';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { AutoComplete } from 'primereact/autocomplete';
import { Checkbox } from 'primereact/checkbox';
import terminos from './components/TerminosCondiciones';

import "./Apps.css";
import "./estilos/estilos.scss";
import Loader from './components/Loader';
function App() {

  const [comenzar, setComenzar] = useState(false);
  const [loader, setLoader] = useState(true);
  const [direccionAv, setDireccionAv] = useState("");
  const [direccion, setDireccion] = useState("");
  const [direccionNumero, setDireccionNumero] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [distrito, setDistrito] = useState("");
  const [distritos, setDistritos] = useState([]);
  const [sede, setSede] = useState({});
  const [terminosCondiciones, setTerminosCondiciones] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [finalizarFormulario, setFinalizarFormulario] = useState(false);

  const cities = [
    { name: 'Ancón', code: 'Ancón' },
    { name: 'Ate', code: 'Ate' },
    { name: 'Barranco', code: 'Barranco' },
    { name: 'Breña', code: 'Breña' },
    { name: 'Carabayllo', code: 'Carabayllo' },
    { name: 'Chaclacayo', code: 'Chaclacayo' },
    { name: 'Chorrillos', code: 'Chorrillos' },
    { name: 'Cieneguilla', code: 'Cieneguilla' },
    { name: 'Comas', code: 'Comas' },
    { name: 'El Agustino', code: 'El Agustino' },
    { name: 'Independencia', code: 'Independencia' },
    { name: 'Jesús María', code: 'Jesús María' },
    { name: 'La Molina', code: 'La Molina' },
    { name: 'La Victoria', code: 'La Victoria' },
    { name: 'Lima', code: 'Lima' },
    { name: 'Lince', code: 'Chaclacayo' },
    { name: 'Los Olivos', code: 'Los Olivos' },
    { name: 'Lurigancho', code: 'Lurigancho' },
    { name: 'Lurín', code: 'Lurín' },
    { name: 'Magdalena del Mar', code: 'Magdalena del Mar' },
    { name: 'Miraflores', code: 'Miraflores' },
    { name: 'Pachacamac', code: 'Pachacamac' },
    { name: 'Pueblo Libre', code: 'Pueblo Libre' },
    { name: 'Puente Piedra', code: 'Puente Piedra' },
    { name: 'Punta Hermosa', code: 'Punta Hermosa' },
    { name: 'Punta Negra', code: 'Punta Negra' },
    { name: 'Rímac', code: 'Rímac' },
    { name: 'San Bartolo', code: 'San Bartolo' },
    { name: 'San Borja', code: 'San Borja' },
    { name: 'San Isidro', code: 'San Isidro' },
    { name: 'San Juan de Lurigancho', code: 'San Juan de Lurigancho' },
    { name: 'San Juan de Miraflores', code: 'San Juan de Miraflores' },
    { name: 'San Luis', code: 'San Luis' },
    { name: 'San Martín de Porres', code: 'San Martín de Porres' },
    { name: 'San Miguel', code: 'San Miguel' },
    { name: 'Santa Anita', code: 'Santa Anita' },
    { name: 'Santa María del Mar', code: 'Santa María del Mar' },
    { name: 'Santa Rosa', code: 'Santa Rosa' },
    { name: 'Santiago de Surco', code: 'Santiago de Surco' },
    { name: 'Surquillo', code: 'Surquillo' },
    { name: 'Villa El Salvador', code: 'Villa El Salvador' },
    { name: 'Villa María del Triunfo', code: 'Villa María del Triunfo' },
  ];

  const items = [
    {
        label: 'Dirección',
    },
    {
        label: 'Sede',
    },
    {
        label: 'Términos',
    }
  ];

  const sedes = [
    {
        id:"1",
        distrito: 'ATE',
        direccion: "AV. LOS PARACAS 203 URB. SALAMANCA",
        oficina: "SALAMANCA"
    },
    {
      id:"2",
      distrito: 'ATE',
      direccion: "AV. NICOLAS AYLLON 5345 - URB LOS ANGELES",
      oficina: "CERES"
    },
    {
      id:"3",
      distrito: 'BARRANCO',
      direccion: "AV. GRAU 414 ESQ. CA. UNION",
      oficina: "BARRANCO"
    },
    {
      id:"4",
      distrito: 'BARRANCO',
      direccion: "PLAZA BUTTERS 101",
      oficina: "PLAZA BUTTERS"
    },
  ];

  React.useEffect(() => {
    setTimeout(() => {
      if(comenzar === true){
        setDistritos(cities)
        setLoader(false)
      }
    }, 1500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comenzar]);

  const validNumber = new RegExp(/^[\d\s]*$/);

  const searchDistrito = (event) => {
    setTimeout(() => {
        let _filteredCountries;
        if (!event.query.trim().length) {
            _filteredCountries = [...cities];
        }
        else {
            _filteredCountries = cities.filter((country) => {
                return country.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
        setDistritos(_filteredCountries);
    }, 0);
}

  const checkFormulario = () => {
    switch (activeIndex) {
      case 0:
        if(direccionAv === "" ||  direccion === "" || direccionNumero === "" || ciudad === "" || distrito === ""){
          return true
        }else{
          return false;
        }
      case 1:
        if(sede.id === undefined){
          return true
        }else{
          return false;
        }
      case 2:
        if(terminosCondiciones === false){
          return true
        }else{
          return false;
        }
      default:
        break;
    }
  }

  const verSedesCercanas = () => {
    let distritioUpper = distrito.name.toUpperCase()
    let sedeCercana = sedes.filter(e => e.distrito === distritioUpper)
    let sedeNoCercana = sedes.filter(e => e.distrito !== distritioUpper)
    if(sedeCercana.length > 0){
      return(
        <React.Fragment>
          <p className='mb-[20px]'>Estas son las sedes mas cercanas en su distrito:</p>
          <div className="flex w-full gap-[20px] justify-center items-center flex-wrap">
            {sedeCercana.map((t) => {
              return(
                cardContainer(t)
              )
            })}
          </div>
          <div className='border-t border-t-[#6c757d] w-full py-[17px]'></div>
          <div className="flex w-full gap-[20px] justify-center items-center flex-wrap">
            {sedeNoCercana.map((t) => {
              return(
                cardContainer(t)
              )
            })}
          </div>
        </React.Fragment>
      )
    }else{
      return (
        <React.Fragment>
          <p className='mb-[20px]'>Lo sentimos, no hay una sede cercana a su dirección, puede elegir cualquiera de estas otras sedes.</p>
          <div className='border-t border-t-[#6c757d] w-full py-[17px]'></div>
          <div className="flex w-full gap-[20px] justify-center items-center flex-wrap">
            {sedeNoCercana.map((t) => {
              return(
                cardContainer(t)
              )
            })}
          </div>
        </React.Fragment>
      )
    }
  }

  const cardContainer = (data) => {
    return(
      <Card className={`card-sede ${sede.id === data.id ? "active" : ""}`} title={data.distrito}
        onClick={() => {
          setSede(data)
        }}
      >
        <p className="m-0"><b>Oficina:</b>{` ${data.oficina}`}</p>
        <p className="m-0"><b>Distrito:</b>{` ${data.direccion}`}</p>
      </Card>
    )
  }
  
  return (
    <div className="container-fluid p-[20px] min-h-[100vh] w-[100%] flex justify-center items-center">
      {comenzar === false ? (
        <div className="home-container">
          <div className='flex flex-col gap-[30px]'>
            <p className="font-['Montserrat'] text-[4em] font-bold text-[#004680]">Bienvenido a BBVA AQUA</p>
            <p className="font-['Montserrat'] text-[1.4em] font-bold text-[#0D0B30]">¡Felicitaciones! Usted tiene una tarjeta pre-aprobada, a continuacion llenaremos algunos datos.</p>
          </div>
          <div className='min-h-[80px]'>
            <Button className="button-comenzar"
              onClick={() => {
                setComenzar(true)
              }}
            >COMENZAR</Button>
          </div>
        </div>
      ) : (
        <React.Fragment>
          {loader ? (
            <Loader />
          ) : (
            <div className="steps-demo">
              {finalizarFormulario === false ? (
                <React.Fragment>
                  <div className="card">
                      <Steps model={items} activeIndex={activeIndex} readOnly={false}/>
                  </div>
                  <div className='steps'>
                    {activeIndex === 0 &&(
                      <React.Fragment>
                        <p className="font-['Montserrat'] text-[1.4em] font-bold text-[#0D0B30]">Primero debera llenar los datos de su dirección.</p>
                        <div className='form-info flex gap-[50px] justify-around'>
                          <div>
                            <h5>(Av. Jr. Psj. Calle)<span className='text-[#ff0000] text-[16px]'>*</span></h5>
                            <InputText maxLength={8} className='w-[200px]' value={direccionAv} onChange={(e) => setDireccionAv(e.target.value)} />
                          </div>
                          <div>
                            <h5>Dirección<span className='text-[#ff0000] text-[16px]'>*</span></h5>
                            <InputText className='w-[500px]' value={direccion}  onChange={(e) => {setDireccion(e.target.value)}} />
                          </div>
                        </div>
                        <div className='form-info flex gap-[50px] justify-around'>
                          <div>
                            <h5>Número<span className='text-[#ff0000] text-[16px]'>*</span></h5>
                            <InputText maxLength={7} className='w-[200px]' value={direccionNumero} 
                              onChange={(e) => {
                                if(validNumber.test(e.target.value)){
                                  setDireccionNumero(e.target.value)
                                }
                              }}
                            />              
                          </div>
                          <div>
                            <h5>Ciudad<span className='text-[#ff0000] text-[16px]'>*</span></h5>
                            <InputText className='w-[500px]' value={ciudad} onChange={(e) => setCiudad(e.target.value)} />
                          </div>
                        </div>
                        <div className='form-info flex gap-[50px] justify-around'>
                          <div>
                            <h5>Distrito<span className='text-[#ff0000] text-[16px]'>*</span></h5>
                            <AutoComplete className='w-[500px] autocomplete-form' value={distrito} suggestions={distritos} dropdown forceSelection completeMethod={searchDistrito} field="name" onChange={(e) => setDistrito(e.value)} aria-label="Countries" dropdownAriaLabel="Select Country" />
                          </div>
                        </div>
                      </React.Fragment>
                    )}
                    {activeIndex === 1 &&(
                      <React.Fragment>
                        <p className="font-['Montserrat'] text-[1.4em] font-bold text-[#0D0B30]">A continuación, deberá escoger la sede en la que recogerá su nueva tarjeta.</p>
                        <div className="sedes-container flex w-full gap-[20px] justify-center items-center flex-wrap max-h-[518px] overflow-y-auto">
                          <div className='sedes-cercanas'>
                            {verSedesCercanas()}
                          </div>
                        </div>
                      </React.Fragment>
                    )}
                    {activeIndex === 2 &&(
                      <React.Fragment>
                        <p className="font-['Montserrat'] text-[1.4em] font-bold text-[#0D0B30]">A continuación, deberá aceptar los Términos y Condiciones.</p>
                        <div className='terminos-container'>
                          <p>{terminos}</p>
                        </div>
                        <div className="field-checkbox">
                            <Checkbox inputId="binary" checked={terminosCondiciones} onChange={e => setTerminosCondiciones(e.checked)} />
                            <label htmlFor="binary">He leído y Acepto los Términos y Condiciones</label>
                        </div>
                      </React.Fragment>
                    )}
                    <div className='flex p-[20px] justify-evenly'>
                      {activeIndex !== 0 && (
                        <Button label="Anterior" className="button-anterior p-button-lg" 
                            onClick={()=>{
                              setActiveIndex(activeIndex - 1)

                          }}
                        />
                      )}
                      {activeIndex !== 2 && (
                        <Button label="Siguiente" className="button-siguiente p-button-lg"
                            disabled={checkFormulario()}
                            onClick={()=>{
                              setActiveIndex(activeIndex + 1)
                          }}
                        />
                      )}
                      {activeIndex === 2 && (
                        <Button label="Finalizar" className="button-siguiente p-button-lg" 
                            disabled={checkFormulario()}
                            onClick={()=>{
                              setFinalizarFormulario(true);
                          }}
                        />
                      )}
                    </div>
                  </div>
                </React.Fragment>
              ) : (
                <div className="home-container">
                  <div className='flex flex-col gap-[30px]'>
                    <p className="font-['Montserrat'] text-[3em] font-bold text-[#004680]">Muchas gracias por completar sus datos</p>
                    <p className="font-['Montserrat'] text-[1.4em] font-bold text-[#0D0B30]">En breves momentos, un asesor del BBVA se contactara con usted para continuar con el proceso.</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </React.Fragment>  
      )}
    </div>
  );
}

export default App;
