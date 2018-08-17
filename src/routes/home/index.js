import { h, Component } from 'preact'
import style from './style'
import cerberus from '../../client'
import Nav from '../../components/layout/nav'

class Home extends Component {
  constructor () {
    super()
    this.state = { clients: [] }
  }

  async componentDidMount () {
    const clients = await cerberus.getClients()
    this.setState({ clients })
  }

  render (_, { clients }) {
    return (
      <div class={style.home}>
        <Nav />
        <div class={style.content}>
          <section>
            <h2>Clients</h2>
            <p>{ clients.length > 0 && clients.length }</p>
          </section>
          <section>
            <h2>Placeholder</h2>
          </section>
          <section>
            <h2>Placeholder</h2>
          </section>
        </div>
      </div>
    )
  }
}

export default Home
