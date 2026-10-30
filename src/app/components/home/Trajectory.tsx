type TrajectoryItem = {
  year?: string | null
  title?: string | null
  description?: string | null
}

type TrajectoryProps = {
  items?: TrajectoryItem[] | null
}

export default function Trajectory({ items }: TrajectoryProps) {
  if (!items?.length) {
    return null
  }

  return (
    <section className="trajectory" id="trayectoria">
      <div className="container">
        <div className="trajectory__header">
          <span className="trajectory__label">Trayectoria</span>

          <h2 className="trajectory__title">Una historia construida desde el territorio.</h2>
        </div>

        <div className="trajectory__timeline">
          {items.map((item, index) => (
            <article className="trajectory__item" key={`${item.year}-${index}`}>
              <div className="trajectory__year">{item.year}</div>

              <div className="trajectory__marker" />

              <div className="trajectory__content">
                {item.title && <h3 className="trajectory__item-title">{item.title}</h3>}

                {item.description && (
                  <p className="trajectory__item-description">{item.description}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
