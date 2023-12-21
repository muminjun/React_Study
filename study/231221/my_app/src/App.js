import './App.css';
import { useState } from 'react';

function Header(props) {
  return(
    <header>
      <h1><a href="/" onClick={(event)=>{
        event.preventDefault()
        props.onChangeMode()
      }}>{props.title}</a></h1>
    </header>
  )
}

function Nav(props) {
  const result = []
  for (let i = 0; i < props.lst.length; i++) {
    let j = props.lst[i]
    result.push(<li key={j.id}>
      <a id={j.id} href={'/read/'+j.id} onClick={(event)=>{
        event.preventDefault()
        props.onChangeMode(Number(event.target.id))
      }}>{j.title}</a>
    </li>)
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

function Create(props){
  return(
    <article>
      <h2>Create</h2>
      <form onSubmit={(event)=>{
        event.preventDefault()
        const title = event.target.title.value
        const body = event.target.body.value
        props.onCreate(title, body)
      }}>
        <p><input type="text" name="title" placeholder='TITLE'/></p>
        <p><textarea name="body" placeholder='BODY' cols="30" rows="10"></textarea></p>
        <p><input type="submit" value="생성"/></p>
      </form>
    </article>
  )
}

function Update(props){
  const [title, setTitle] = useState(props.title)
  const [body, setBody] = useState(props.body)
  return(
    <article>
      <h2>Update</h2>
      <form onSubmit={(event)=>{
        event.preventDefault()
        const title = event.target.title.value
        const body = event.target.body.value
        props.onUpdate(title, body)
      }}>
        <p><input type="text" name="title" value={title} onChange={event=>{
          setTitle(event.target.value)
        }}/></p>

        <p><textarea name="body" cols="30" rows="10" value={body} onChange={event=>{
          setBody(event.target.value)
        }}></textarea></p>

        <p><input type="submit" value="업데이트"/></p>
      </form>
    </article>
  )
}

function App() {
  const [mode, setMode] = useState("WELCOME")
  const [id, setId] = useState(null)
  const [nextid, setNextid] = useState(4)
  let content = null
  let context = null

  const [lst, setLst] = useState([
    {id:1, title:'html', body:'html is...'},
    {id:2, title:'js', body:'js is...'},
    {id:3, title:'vue', body:'vue is...'},
  ])


  if (mode === "WELCOME"){
    content = <Article title="Welcome" body="Hello, REACT"></Article>
  }

  else if (mode === "READ"){
    let title, body = null
    for (let i = 0; i < lst.length; i++){
      if (lst[i].id === id) {
        title = lst[i].title
        body = lst[i].body
      }
    }
    content = <Article title={title} body={body}></Article>
    context = 
    <>
      <li>
        <a href={'/update/'+id} onClick={(event)=> {
          event.preventDefault()
          setMode("UPDATE")
        }}>UPDATE</a>
      </li>

      <li>
        <input type="button" value="DELETE" onClick={()=>{
          const newLst = []
          for (let i = 0; i < lst.length; i++){
            if (lst[i].id !== id) {
              newLst.push(lst[i])
            }
          }
          setLst(newLst)
          setMode("WELCOME")
        }}/>
      </li>
    </>
  }

  else if (mode === "CREATE") {
    content = <Create onCreate={(title, body)=>{
      const newObj = {id:nextid, title:title, body:body}
      const newLst = [...lst]
      newLst.push(newObj)
      setLst(newLst)
      setMode("READ")
      setId(nextid)
      setNextid(nextid + 1)
    }}></Create>
  }

  else if (mode === "UPDATE") {
    let title, body = null
    for (let i = 0; i < lst.length; i++){
      if (lst[i].id === id) {
        title = lst[i].title
        body = lst[i].body
      }
    }
    content = <Update title={title} body={body} onUpdate={(title, body)=>{
      const upObj = {id:id, title:title, body:body}
      const newLst = [...lst]
      for (let i = 0; i < lst.length; i++){
        if (newLst[i].id === id) {
          newLst[i] = upObj
          break
        }
      }
      setLst(newLst)
      setMode("READ")
    }}></Update>
  }

  return (
    <div>
      <Header title="React" onChangeMode={()=>{
        setMode("WELCOME")
      }}></Header>

      <Nav lst={lst} onChangeMode={(_id)=>{
        setMode("READ")
        setId(_id)
      }}></Nav>

      {content}

      <ul>
        <li>
          <a href="/create" onClick={(event)=>{
            event.preventDefault()
            setMode("CREATE")
          }}>CREATE</a>
        </li>

        {context}
      </ul>
    </div>
  );
}

export default App;
