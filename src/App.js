import React, { useState } from 'react';
import { Steps } from 'primereact/steps';
import { Slider } from 'primereact/slider';
import { Button } from 'primereact/button';
import { SelectButton } from 'primereact/selectbutton';
import Bfree from './assets/Bfree.jpeg'
import Black from './assets/Black.jpeg'
import Cero from './assets/Cero.jpeg'
import Platinum from './assets/Gray.jpeg'

import "./Apps.css";
function App() {

  const [activeIndex, setActiveIndex] = useState(0);
  const [puntoPaso1, setPuntoPaso1] = useState(0);
  const [puntoPaso2, setPuntoPaso2] = useState(0);
  const [puntoPaso3, setPuntoPaso3] = useState(0);
  const [puntoPaso4, setPuntoPaso4] = useState([]);
  const [obtenerTarjeta, setObtenerTarjeta] = useState(false);
  const [puntajes, setPuntajes] = useState([0,0,0,0,0]);
  const [tarjeta, setTarjeta] = useState(null);

    const items = [
        {
            label: 'Viajes',
        },
        {
            label: 'Restaurantes',
        },
        {
            label: 'Cine',
        },
        {
            label: 'Compras',
        }
    ];

    const paymentOptions = [
      {name: 'Linio', value: 1},
      {name: 'Saga Falabella', value: 2},
      {name: 'Ripley', value: 3},
      {name: 'Mercado Libre', value: 4},
  ];
  
  function calcularPuntaje(){
    let suma=0;
    for (let index = 0; index < puntajes.length; index++) {
      suma += puntajes[index];
    }
    return suma/puntajes.length
  }

  let tarjetas = [{
    imagen: Cero,
    nivel: 0,
    nombre: "Visa Cero",
    beneficios: ["CVV Dinámico","Pagos sin intereses y promociones","Sin costo de membresia","Sin costo por retiro en cajeros"],
    lineaCredito: 700
  },{
    imagen: Bfree,
    nivel: 1,
    nombre: "Visa BFree",
    beneficios: ["CVV Dinámico","Pagos sin intereses","Acumula puntos y obten beneficios","Bono de 2000 puntos de bienvenida","Seguro Visa"],
    lineaCredito: 1000
  },{
    imagen: Platinum,
    nivel: 2,
    nombre: "Visa Platinum",
    beneficios: ["CVV Dinámico","Pagos sin intereses","Acumula puntos y obten beneficios","Bono de 4000 puntos de bienvenida","Seguro Visa","Beneficios Visa"],
    lineaCredito: 3000
  },{
    imagen: Black,
    nivel: 3,
    nombre: "Visa signature",
    beneficios: ["CVV Dinámico","Pagos sin intereses","Acumula puntos y obten beneficios","Bono de 8000 puntos de bienvenida","Acceso a salas VIP","Beneficios Visa"],
    lineaCredito: 12000
  }]

  function evaluarTarjeta(puntaje){
    setObtenerTarjeta(true)
    switch (puntaje) {
      case puntaje<=1:
        setTarjeta(tarjetas[0]);
        break;
      case puntaje<=2:
        setTarjeta(tarjetas[1]);
        break;
      case puntaje<=3:
        setTarjeta(tarjetas[2]);
        break;
      case puntaje<=4:
        setTarjeta(tarjetas[3]);
        break;
      default:
        setTarjeta(tarjetas[0]);
        break;
    }
    return;
  }

  const numerosFrases = (valor) => {
    switch (valor) {
      case 0:
        return <p>No viajo</p>
      case 1:
        return <p>Casi nunca</p>
      case 2:
        return <p>A veces</p>
      case 3:
        return <p>Siempre</p>
      default:
        return <p>Amo viajar</p>
    }
  }

  const numerosFrasesPaso3 = (valor) => {
    switch (valor) {
      case 0:
        return <p>Prefiero ver pelis en casa</p>
      case 1:
        return <p>Voy un par de veces al año</p>
      case 2:
        return <p>Solo si hay una muy buena pelicula</p>
      case 3:
        return <p>Voy una vez al mes</p>
      default:
        return <p>¡Soy un cinéfilo!</p>
    }
  }

  const calcularPaso1 = () => {
    let copyPuntajes = [].concat(puntajes)
    copyPuntajes[0] = puntoPaso1
    setPuntajes(copyPuntajes);
  }

  const calcularPaso2 = () => {
    let copyPuntajes = [].concat(puntajes)
    copyPuntajes[1] = puntoPaso2
    setPuntajes(copyPuntajes);
  }

  const calcularPaso3 = () => {
    let copyPuntajes = [].concat(puntajes)
    copyPuntajes[2] = puntoPaso3
    setPuntajes(copyPuntajes);
  }

  const calcularPaso4 = () => {
    let copyPuntajes = [].concat(puntajes)
    let puntos = 0;
    puntoPaso4.forEach(element => {
      puntos += element
    });
    copyPuntajes[2] = puntos
    setPuntajes(copyPuntajes);
    calcularPuntaje();
    evaluarTarjeta(copyPuntajes);
  }
  

  return (
    <div className="container-fluid flex">
      <div className="menu-home bg-[#ff0000] w-full h-[80px] fixed flex">
        MENÚ
      </div>
      
        <div className="steps-demo">
          <div className="card">
              <Steps model={items} activeIndex={activeIndex} onSelect={(e) => setActiveIndex(e.index)} readOnly={false} />
          </div>
          {obtenerTarjeta === false ? (
              <div className='steps'>
              {activeIndex === 0 &&(
                <React.Fragment>
                  <p>¿Con que Frecuencia sueles viajar?</p>
                  <h5>{numerosFrases(puntoPaso1)}</h5>
                  <Slider 
                    value={puntoPaso1} 
                    onChange={(e) => {
                      setPuntoPaso1(e.value)
                    }}
                    step={1} 
                    max={4}
                    animate={"true"}
                  />
                </React.Fragment>
              )}
              {activeIndex === 1 &&(
                <React.Fragment>
                  <p>¿Con que Frecuencia sales a comer fuera de casa?</p>
                  <div className='paso2-botones flex flex-row'>
                    <Button label="Prefiero comer en casa" className="p-button-outlined w-[300px]" 
                      onClick={() => {
                        setPuntoPaso2(0)
                      }}
                    />
                    <Button label="Una vez al mes" className="p-button-outlined w-[300px] " 
                      onClick={() => {
                        setPuntoPaso2(1)
                      }}
                    />
                    <Button label="Cada 15 días" className="p-button-outlined w-[300px]" 
                      onClick={() => {
                        setPuntoPaso2(2)
                      }}
                    />
                    <Button label="Una vez por semana" className="p-button-outlined w-[300px]" 
                      onClick={() => {
                        setPuntoPaso2(3)
                      }}
                    />
                  </div>
                </React.Fragment>
              )}
              {activeIndex === 2 &&(
                <React.Fragment>
                <p>¿Con que Frecuencia sueles ir al cine?</p>
                <h5>{numerosFrasesPaso3(puntoPaso3)}</h5>
                <Slider 
                  value={puntoPaso3} 
                  onChange={(e) => {
                    setPuntoPaso3(e.value)
                  }}
                  step={1} 
                  max={4}
                  animate={"true"}
                />
              </React.Fragment>
              )}
              {activeIndex === 3 &&(
                <React.Fragment>
                  <p>En cuales de estas tiendas sueles comprar mas</p>
                  <SelectButton className='multiple-option-button' value={puntoPaso4} options={paymentOptions} onChange={(e) => { console.log(e); setPuntoPaso4(e.value)}} optionLabel="name" multiple />
                </React.Fragment>
              )}
              <div className='flex p-[20px] justify-evenly'>
                {activeIndex !== 0 && (
                  <Button label="Anterior" className="p-button-lg" 
                      onClick={()=>{
                        setActiveIndex(activeIndex - 1)

                    }}
                  />
                )}
                {activeIndex !== 3 && (
                  <Button label="Siguiente" className="p-button-lg" 
                      onClick={()=>{
                        if(activeIndex === 0){
                          calcularPaso1()
                        }
                        if(activeIndex === 1){
                          calcularPaso2()
                        }
                        if(activeIndex === 2){
                          calcularPaso3()
                        }
                        setActiveIndex(activeIndex + 1)
                    }}
                  />
                )}
                {activeIndex === 3 && (
                  <Button label="Finalizar" className="p-button-lg" 
                      onClick={()=>{
                        calcularPaso4()
                    }}
                  />
                )}
              </div>
          </div>
          ) : (
            <div>
              <img src={tarjeta.imagen} alt=""className='w-[100px] h-[100px]'/>
              <p>{tarjeta.nombre}</p>
              {tarjeta.beneficios.map((elem) => {
                return (
                  <p>{elem}</p>
                )
              })}
              <p>{tarjeta.lineaCredito}</p>
            </div>
          )}
          
      </div>
    </div>
  );
}

export default App;
