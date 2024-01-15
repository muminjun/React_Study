// import "./style.css"

function Card(props) {
  const {title, children} = props

  return (
    <div>
      {props.title}
      {props.children}
    </div>
  )
}

export default Card