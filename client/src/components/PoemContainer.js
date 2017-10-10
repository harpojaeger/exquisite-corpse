var React = require('react')
const ConnectedPoemList = require('./PoemList')
var Loader = require('./Loader')
var PropTypes = require('prop-types')
import '../styles/PoemContainer.css'
import ConnectedLoadMoreButton from './LoadMoreButton.js'

class PoemContainer extends React.Component {
  constructor(props) {
    super(props)
    var perPage = 50
    this.state = {
      quantity: perPage,
      from: 0,
      to: perPage,
      poems: [],
    }
    this.loadMorePoems = this.loadMorePoems.bind(this)
  }

  loadMorePoems(){
    this.setState(function(prevState){
      return {
        to: prevState.to + prevState.quantity,
      }
    })
  }

  // Useing this listener to jump to the requested poem after a state change and then set autoscroll to false.  Otherwise, this would jump whenever the user loads new poems; obviously not what we want.
  componentDidUpdate() {
    if (this.state.autoscroll) {
      // var hash = window.location.href.split('#')[1]
      var targetPoem = document.getElementById(this.state.autoscroll)
      console.log(targetPoem)
      if(targetPoem) document.body.scrollTop = targetPoem.offsetTop
      this.setState({ autoscroll: false })
    }
  }

  componentWillReceiveProps(newprops){
    this.setState({
      poems: newprops.poems,
    })
    // Check to see if the page was loaded with the permalink of a poem that's outside current params.  If so, load up to it.
    var id = parseInt(window.location.href.split('#')[1], 10)
    if(id) {
      console.log('hash requests poem id',id  )
      var index = 1 +  newprops.poems.findIndex(function(el) {
        return el.id === id
      })
      console.log('poem',id,'has index',index)
      this.setState({
        to: Math.max(index, this.state.to),
        autoscroll: id,
      })
    }
  }

  render() {
    return (
      <div className='poem-container'>
        <h3>Completed poems</h3>
        <Loader visible={ this.props.poems.length === 0 }>Loading...</Loader>
        <ConnectedPoemList />
        {/* <PoemList poems={this.state.poems.slice(this.state.from,this.state.to)} /> */}
        <ConnectedLoadMoreButton />
      </div>
    )
  }
}
PoemContainer.propTypes = {
  poems: PropTypes.array.isRequired,
}

module.exports = PoemContainer
