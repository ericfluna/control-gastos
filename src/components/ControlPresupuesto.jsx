import React, { useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
const ControlPresupuesto = ({
  gastos,
  presupuesto,
  setGastos,
  setPresupuesto,
  setIsValidPresupuesto,
  setGastosFiltrados,
  setFiltro,
}) => {
  const [porcentaje, setPorcentaje] = useState(0)
  const [disponible, setDisponible] = useState(0)
  const [gastado, setGastado] = useState(0)

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => gasto.cantidad + total,
      0
    )

    setGastado(totalGastado)
    setDisponible(presupuesto - totalGastado)

    setTimeout(() => {
      setPorcentaje(((totalGastado * 100) / presupuesto).toFixed(2))
    }, 500)
  }, [gastos])

  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString('es-EU', {
      style: 'currency',
      currency: 'EUR',
    })
  }
  const handleResetApp = () => {
    const resultado = confirm('¿Deseas reiniciar presupuesto y gastos?')
    if (resultado) {
      setGastos([])
      setGastosFiltrados([])
      setPresupuesto(0)
      setIsValidPresupuesto(false)
      setFiltro('')
    }
  }
  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: porcentaje > 100 ? '#dc2626' : '#3B82F6',
            trailColor: '#e8eaed',
            textColor: porcentaje > 100 ? '#dc2626' : '#3B82F6',
          })}
          value={porcentaje}
          text={`${porcentaje}% Gastado`}
        />
      </div>

      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleResetApp}>
          Resetear App
        </button>
        <p>
          <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
        </p>
        <p className={disponible < 0 ? 'negativo' : ''}>
          <span>Disponible: </span> {formatearCantidad(disponible)}
        </p>
        <p>
          <span>Gastado: </span> {formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  )
}

export default ControlPresupuesto
