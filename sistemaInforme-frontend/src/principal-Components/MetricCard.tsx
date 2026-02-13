interface MetricCardProps {
  title: string
  value: number
  color: string
  icon: string
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, color, icon }) => {
  return (
    <div className="col-md-3">
      <div className={`card text-white p-3 ${color}`}>
        <div className="d-flex justify-content-between">
          <div>
            <h6>{title}</h6>
            <h3>{value}</h3>
          </div>
          <i className={`bi ${icon} fs-1`} />
        </div>
      </div>
    </div>
  )
}

export default MetricCard
