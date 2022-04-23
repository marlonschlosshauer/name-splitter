import { useState } from 'react';
import './App.css';

const Term = ({ term, terms, index }) => {
  return (
    <div>
      <h3>{term}</h3>
      <p>{terms.map((t, i) => (i !== index) ? `${term} ${t}` : '')} </p>
    </div>
  )
}

const App = () => {
  const [input, setInput] = useState('');
  const [terms, setTerms] = useState([]);

  return (
    <div className="App">
      <input
        name=""
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setTerms(e.target.value.split(/,/))
        }} />
      <div>
        {
          terms.map((term, index) => <Term key={index} term={term} terms={terms} index={index} />)
        }
      </div>
    </div>
  );
}

export default App;
