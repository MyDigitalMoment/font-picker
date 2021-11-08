import './App.css';
import { FontPicker } from './lib';

function App() {
  return (
    <div className='App'>
      <FontPicker
        apiKey=''
        activeFontFamily='Open Sans'
        pickerId='first-picker'
        pickerName='first-picker-name'
        categories={['sans-serif', 'serif', 'display', 'handwriting']}
        families={[]}
        scripts={['latin', 'latin-ext']}
        variants={['regular']}
        filter={() => true}
        limit={100}
        sort='popularity'
        onChange={(e) => {
          console.log(e.target.value);
        }}
      />
    </div>
  );
}

export default App;
