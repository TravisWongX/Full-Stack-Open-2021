import React, { useState } from 'react'
import { useField } from './hooks'
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useRouteMatch,
  useHistory,
} from 'react-router-dom'

const Menu = () => {
  const padding = {
    paddingRight: 5,
  }
  return (
    <div>
      <Link to={'/anecdotes'} style={padding}>
        anecdotes
      </Link>
      <Link to={'/create'} style={padding}>
        create new
      </Link>
      <Link to={'/about'} style={padding}>
        about
      </Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for{' '}
    <a href="https://courses.helsinki.fi/fi/tkt21009">
      Full Stack -websovelluskehitys
    </a>
    . See{' '}
    <a href="https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js
    </a>{' '}
    for the source code.
  </div>
)

const CreateNew = (props) => {
  const content = useField('text', 'content')
  const author = useField('text', 'author')
  const info = useField('text', 'info')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.vlaue,
      votes: 0,
    })
  }

  const reset = (event) => {
    event.stopPropagation()
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.props} />
        </div>
        <div>
          author
          <input {...author.props} />
        </div>
        <div>
          url for more info
          <input {...info.props} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={reset}>
          Reset
        </button>
      </form>
    </div>
  )
}

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <div>has {anecdote.votes} likes</div>
    </div>
  )
}

const Notification = ({ notification }) => {
  const style = {
    border: '3px solid pink',
    padding: 10,
    borderRadius: 3,
    fontSize: 24,
  }

  return notification !== '' ? <div style={style}>{notification}</div> : null
}
const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 1,
      id: '1',
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2',
    },
  ])
  const history = useHistory()
  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    history.push('/')
    setNotification(`${anecdote.content} created`)
    setTimeout(() => {
      setNotification('')
    }, 10000)
  }

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)))
  }

  const match = useRouteMatch('/anecdotes/:id')
  const anecdote = match ? anecdoteById(match.params.id) : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Switch>
        <Route path={'/anecdotes/:id'}>
          <Anecdote anecdote={anecdote} />
        </Route>
        <Route path={'/anecdotes'}>
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
        <Route path={'/about'}>
          <About />
        </Route>
        <Route path={'/create'}>
          <CreateNew addNew={addNew} />
        </Route>
        <Route path={'/'}>
          <Notification notification={notification} />
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>
      <Footer />
    </div>
  )
}

export default App
