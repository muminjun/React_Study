function MyButton(props) {
  const [ isClicked, setIsClicked ] = React.useState(false);

  return React.createElement(
    'button',
    { onClick: () => setIsClicked(true) },
    isClicked ? 'Click!' : 'Click Here'
  )
}

const domContainer = document.querySelector('#root');
const root = ReactDOM.createRoot(domContainer);
root.render(React.createElement(MyButton));