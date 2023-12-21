import logo from './logo.svg';
import './App.css';

function Header(props) {
  return(
    <header>
      <h1><a href="/">{props.title}</a></h1>
    </header>
  )
}

function Nav(props) {
  const result = []
  for (let i = 0; i < props.lst.length; i++) {
    let j = props.lst[i]
    result.push(<li key={j.id}><a href={'/read/'+j.id}>{j.title}</a></li>)
  }
  return(
    <nav>
      <ol>
        {result}
      </ol>
    </nav>
  )
}

function Article(props) {
  return(
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  )
}

function App() {
  const lst = [
      {id:1, title:'html', body:'html is...'},
      {id:2, title:'js', body:'js is...'},
      {id:3, title:'vue', body:'vue is...'},
      {id:4, title:'react', body:'react is...'},
  ]
  return (
    <div>
      <Header title="React"></Header>
      <Nav lst={lst}></Nav>
      <Article title="Welcome" body="Hello, REACT"></Article>
      <Article title="HI" body="Hello, Vue"></Article>
    </div>
  );
}

export default App;
