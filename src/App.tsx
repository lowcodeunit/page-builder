import React from 'react';
import './App.css';
import grapesjs from 'grapesjs';
import webpage from 'grapesjs-preset-webpage';
import exporter from '@fathym-it/grapesjs-plugin-export';
import queryString from 'query-string';

class App extends React.Component {
  private winAny: any;

  constructor(props: any) {
    super(props);

    this.winAny = window;
  }

  public async componentDidMount() {
    let queries = queryString.parse(window.location.search);

    let appLookup =
      queries.appLookup || this.winAny.LCU?.State?.ApplicationLookup;

    let appFilesResp = await fetch(
      `/api/lowcodeunit/download/${appLookup}/files/content`
    );

    let appFiles = await appFilesResp.json();

    let grapesInit = {
      components: appFiles.Model['index.html'] || '',
      style: appFiles.Model['css/style.css'] || '',
      plugins: [
        (editor) =>
          webpage(editor, {
            exportOpts: false,
            ...(this.winAny?.LCU?.State?.webpage || {}),
          }),
        (editor) =>
          exporter(editor, {
            btnLabel: 'Export to Fathym',
            sendToUrl: `/api/lowcodeunit/deploy/${appLookup}/zip`,
            ...(this.winAny?.LCU?.State?.exporter || {}),
          }),
      ],
      storageManager: {
        id: `gjs-${appLookup}`, // Prefix identifier that will be used on parameters
        type: 'local', // Type of the storage
        autosave: true, // Store data automatically
        autoload: true, // Autoload stored data on init
        stepsBeforeSave: 1, // If autosave enabled, indicates how many changes are necessary before store method is triggered
      },
      ...(this.winAny?.LCU?.State || {}),
      container: `#gjs-${appLookup}`,
    };

    grapesjs.init(grapesInit);
  }

  public render() {
    let queries = queryString.parse(window.location.search);

    let appLookup =
      queries.appLookup || this.winAny.LCU?.State?.ApplicationLookup;

    return (
      <div>
        <div id={`gjs-${appLookup}`}></div>
      </div>
    );
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
