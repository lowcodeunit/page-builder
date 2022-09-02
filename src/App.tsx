import React from 'react';
import queryString from 'query-string';
import grapesjs from 'grapesjs';
import basicBlocksPlugin from 'grapesjs-blocks-basic';
import flexBlocksPlugin from 'grapesjs-blocks-flexbox';
import navbarPlugin from 'grapesjs-navbar';
import ckeditorPlugin from 'grapesjs-plugin-ckeditor';
import fathymExporterPlugin from '@fathym-it/grapesjs-plugin-export';
import formsPlugin from 'grapesjs-plugin-forms';
import gradientStyle from 'grapesjs-style-gradient';
import bgStyle from 'grapesjs-style-bg';
import countdownPlugin from 'grapesjs-component-countdown';
import postCssParser from 'grapesjs-parser-postcss';
import customCodePlugin from 'grapesjs-custom-code';
import tabsPlugin from 'grapesjs-tabs';
import tooltipPlugin from 'grapesjs-tooltip';
import touchPlugin from 'grapesjs-touch';
import tUIImageEditorPlugin from 'grapesjs-tui-image-editor';
import typedPlugin from 'grapesjs-typed';
import pageBuilderPowerBi from '@fathym-it/page-builder-powerbi';
import { PageBuilderConfig } from './Models/PageBuilderConfig';
import './App.css';

class App extends React.Component {
  //  Fields
  protected plugins: ((editor: any) => any)[];

  protected winAny: any;

  //  Properties
  public Config: PageBuilderConfig;

  constructor(props: any) {
    super(props);

    this.winAny = window;

    this.plugins = [];

    this.Config = {
      ...new PageBuilderConfig(),
      ...(this.winAny?.LCU?.State || {}),
    };
  }

  //  API Methods
  public async componentDidMount() {

    let appLookup = this.loadAppLookup();

    let appFiles = await this.loadAppFiles(appLookup);

    this.registerDefaultPlugins();

    let grapesInit: any = {
      storageManager: {
        id: `gjs-${appLookup}`,
        type: 'local',
        autosave: true,
        autoload: true,
        stepsBeforeSave: 1,
      },
      height: '100vh',
      width: '100vw',
      ...this.Config,
      components: appFiles.Model ? appFiles.Model['index.html'] : null,
      style: appFiles.Model ? appFiles.Model['css/style.css'] : null,
    };

    grapesInit = {
      ...grapesInit,

      //  Ensure that components and styles are loaded from remote first, config second
      components: grapesInit.components || this.Config.Initial?.Components || '',
      style: grapesInit.style || this.Config.Initial?.Style || '',

      //  Register the plugins
      
      plugins: [
        (editor) =>
        fathymExporterPlugin(editor, {
            btnLabel: 'Export to Fathym',
            sendToUrl: `/api/lowcodeunit/deploy/${appLookup}/zip`,
          }), ...this.plugins],

      //  Force container to the correct container
      container: `#gjs-${appLookup}`,


    };

    const editor = grapesjs.init(grapesInit);
    editor.Panels.addButton('options', [{ id: 'save', className: 'fa fa-floppy-o icon-blank', command: function(e){ return e.store() }, attributes: { title: 'Save Template' } },]);


  }



  public render() {
    let appLookup = this.loadAppLookup();

    return (
      <div>
        <div id={`gjs-${appLookup}`}></div>
      </div>
    );
  }

  //  Helpers
  protected async loadAppFiles(
    appLookup: string
  ): Promise<{ Model: { [file: string]: string } }> {
    let appFilesResp = await fetch(
      `/api/lowcodeunit/download/${appLookup}/files/content`
    );

    let fileBlob = await appFilesResp.blob();

    let fileText = await fileBlob.text();

    let appFiles = fileText.startsWith('<') ? {} : JSON.parse(fileText);

    return appFiles;
  }

  protected loadAppLookup() {
    let queries = queryString.parse(window.location.search);

    let appLookup =
      queries.appLookup || this.winAny.LCU?.State?.ApplicationLookup;

    return appLookup;
  }

  protected registerDefaultPlugins() {
    this.registerPlugin(this.Config?.BGOptions, bgStyle);

    this.registerPlugin(this.Config?.BlocksBasicOptions, basicBlocksPlugin);

    this.registerPlugin(this.Config?.CKEditorOptions, ckeditorPlugin);

    this.registerPlugin(this.Config?.CountdownOptions, countdownPlugin);

    this.registerPlugin(this.Config?.CustomCodeOptions, customCodePlugin);

    this.registerPlugin(this.Config?.FlexBoxOptions, flexBlocksPlugin);

    this.registerPlugin(this.Config?.FormsOptions, formsPlugin);

    this.registerPlugin(this.Config?.GradientStyle, gradientStyle);

    this.registerPlugin(this.Config?.NavbarOptions, navbarPlugin);

    this.registerPlugin(this.Config?.PageBuilderPowerBI, pageBuilderPowerBi)

    this.registerPlugin(this.Config?.PostCSSParserOptions, postCssParser);

    this.registerPlugin(this.Config?.TabsOptions, tabsPlugin);

    this.registerPlugin(this.Config?.TooltipOptions, tooltipPlugin);

    this.registerPlugin(this.Config?.TouchOptions, touchPlugin);

    this.registerPlugin(
      this.Config?.TUIImageEditorOptions,
      tUIImageEditorPlugin
    );

    this.registerPlugin(this.Config?.TypedOptions, typedPlugin);
  }

  protected registerPlugin(check: boolean, plugin: any, opts: {} = {}): void {
    if (check) {
      this.plugins.push((editor) => plugin(editor, opts));
    }
  }
}

export default App;
