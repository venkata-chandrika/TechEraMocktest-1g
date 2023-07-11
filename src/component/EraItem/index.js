import {Link} from 'react-router-dom'

import './index.css'

const EraItem = props => {
  const {eraItem} = props
  const {id, name, logoUrl} = eraItem
  return (
    <Link to={`/courses/${id}`} className="link">
      <li className="list-course-item">
        <div className="course-item-container">
          <img src={logoUrl} alt={name} className="course-img" />
          <p className="course-name">{name}</p>
        </div>
      </li>
    </Link>
  )
}
export default EraItem
