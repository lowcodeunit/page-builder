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

  public componentDidMount() {
    let queries = queryString.parse(window.location.search);

    let appLookup = queries.appLookup || this.winAny.LCU?.State?.ApplicationLookup;

    grapesjs.init({
      container: '#gjs',
      // plugins: [webpage, exporter],
      // pluginOptions: {
      //   [exporter]: {
      //     btnLabel: 'Export to Fathym',
      //     sendToUrl: '/api/lowcodeunit/deploy/the-app-lookup/zip'
      //   }
      // },
      plugins: [
        (editor) =>
          webpage(editor, {
            exportOpts: false,
          }),
        (editor) =>
          exporter(editor, {
            btnLabel: 'Export to Fathym',
            sendToUrl: `/api/lowcodeunit/deploy/${}/zip`,
          }),
      ],
    });
  }

  public render() {
    return (
      <div>
        <div id="gjs"></div>
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
