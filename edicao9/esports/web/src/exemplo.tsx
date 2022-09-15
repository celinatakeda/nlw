// JSX: Javascript + XML(HTML)
// Componentes / Propriedades
import { useState, useEffect } from 'react'
import './styles.css';

interface ButtonProps {
  title: string;
}

function Button(props: ButtonProps) {
  return (
    <button>
      {props.title}
    </button>
  )
}

function App() {
  const [hasUserClickedOnButton, setHasUserClickedOnButton] = useState(false)

  function handleButtonClick() {
    setHasUserClickedOnButton(!hasUserClickedOnButton);
  }

  useEffect(() => {
    console.log(hasUserClickedOnButton)
  }, [hasUserClickedOnButton])

  return (
    <div>
      <Button title="Send 1" />
      <Button title="Send 2" />
      <Button title="Send 3" />

      <button onClick={handleButtonClick}>Clique aqui</button>
      {hasUserClickedOnButton ? 'Usuário clicou' : null}
    </div>

  )
}

export default App