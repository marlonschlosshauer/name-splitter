import { useState } from 'react';
import './App.css';

const { row, column } = { row: { display: 'flex', flexDirection: 'row' }, column: { display: 'flex', flexDirection: 'column' } };

const Term = ({ term, terms, index, options }) => {
  return (
    <div style={{ width: '512px' }}>
      <h3>{term}</h3>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {
          terms.filter((_, i) => i !== index)
            .map(t => `${term} ${t}`)
            .filter(s => s.length < options.maxLength)
            .map(s => (options.allowUppercase) ? s : s.toLowerCase())
            .filter(s => (!options.allowNumbers) ? !s.match(/[0-9]/) : true)
            .map((t, i) => (<p key={i}>{t}</p>))
        }

      </div>
    </div>
  )
}

const App = () => {
  const [input, setInput] = useState('');
  const [terms, setTerms] = useState([]);

  const [allowUppercase, setAllowUppercase] = useState(false);
  const [allowNumbers, setAllowNumbers] = useState(false);

  const [maxLength, setMaxLength] = useState(22);

  return (
    <div className="App" style={{ height: '100vh', ...column }}>
      <div style={{ margin: '12px 0', ...row, alignItems: 'flex-start', gridGap: '32px', justifyContent: 'center' }}>
        <div>
          <h2>Terms:</h2>
          <input
            name=""
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setTerms(e.target.value.trim().split(/,/).map(s => s.trim()))
            }} />
        </div>

        <div style={{ ...column, alignItems: 'center' }}>
          <h2>Options</h2>
          <div style={{ ...row, gap: '32px' }}>
            <div style={{ ...column, alignItems: 'flex-start' }}>
              <div>
                <input name='option-uppercase' type="checkbox" value={allowUppercase} onChange={() => {
                  setAllowUppercase(!allowUppercase)
                }} />
                <label htmlFor='option-upppercase'>{"Allow Upper-Case"}</label>
              </div>

              <div style={{}}>
                <input name='option-numbers' type="checkbox" value={allowNumbers} onChange={() => setAllowNumbers(!allowNumbers)} />
                <label htmlFor='option-numbers'>{"Allow numbers"}</label>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <div style={{ display: 'flex', flexDirection: 'row', marginTop: '-16px' }}>
                <p>{5}</p>
                <input name='option-max-length' type="range" min={5} max={50} value={maxLength} onChange={(e) => setMaxLength(e.target.value)} />
                <p>{50}</p>
              </div>
              <label htmlFor='option-max-length'>{`Max. length: `}<b>{maxLength}</b> </label>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflow: 'scroll', width: '100vw' }}>
        {
          terms.map((term, index) => <Term key={index} term={term} terms={terms} index={index} options={{ allowNumbers, allowUppercase, maxLength }} />)
        }
      </div>


    </div>
  );
}

export default App;
