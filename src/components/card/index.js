import { h } from 'preact'
import style from './style'

const Card = ({ children }) => (
  <div class={style.card}>
    {children}
  </div>
)

export default Card
