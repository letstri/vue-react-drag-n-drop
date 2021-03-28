import React, { useState } from 'react';
import PhotoUploader from './components/PhotoUploader';

function App() {
  const [files, setFiles] = useState<Array<File>>([]);

  return (
    <div className="App">
      <PhotoUploader value={files} onChange={setFiles} />
    </div>
  );
}

export default App;
