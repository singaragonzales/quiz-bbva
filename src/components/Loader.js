import React from "react";
import { ProgressBar } from "primereact/progressbar";

const Loader = () => {
  let valorInicial;

  const [value, setValue] = React.useState(0);
  const intervalo = React.useRef(valorInicial);

  React.useEffect(() => {
    let val = value;
    intervalo.current = setInterval(() => {
      val += Math.floor(Math.random() * 20) + 1;
      if (val >= 100) {
        val = 100;
        clearInterval(intervalo.current);
      }
      setValue(val);
    }, 10);

    return () => {
      if (intervalo.current) {
        clearInterval(intervalo.current);
        intervalo.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="loading">
      <div className="progress-container">
        <ProgressBar
          className="loading-progress"
          showValue={false}
          value={value}
        ></ProgressBar>
      </div>
    </div>
  );
};

export default Loader;
