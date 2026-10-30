import AccommodationRequestForm from './AccommodationRequestForm'

const PosadaVillanueva = () => {
  return (
    <div>
      <section id="solicitud" className="posada-request">
        <div className="container">
          <div className="posada-request__intro">
            <h2>Solicita alojamiento</h2>
            <p>
              Completa la información para que el equipo responsable pueda revisar tu solicitud.
            </p>
          </div>

          <AccommodationRequestForm />
        </div>
      </section>
    </div>
  )
}

export default PosadaVillanueva
