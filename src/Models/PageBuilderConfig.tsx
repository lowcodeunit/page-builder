export class PageBuilderConfig {
  [prop: string]: any;

  /**
   * Documentation on available options can be found here: https://github.com/artf/grapesjs-style-bg
   */
  public BGOptions?: any;

  /**
   * Documentation on available options can be found here: https://github.com/artf/grapesjs-blocks-basic
   */
  public BlocksBasicOptions?: any;

  /**
   * Documentation on available options can be found here: https://github.com/artf/grapesjs-plugin-ckeditor
   */
  public CKEditorOptions?: any;

  /**
   * Documentation on available options can be found here: https://github.com/artf/grapesjs-component-countdown
   */
  public Initial?: {
    Components: any;
    Style: any;
  };

  /**
   * Documentation on available options can be found here: https://github.com/artf/grapesjs-component-countdown
   */
  public CountdownOptions?: any;

  /**
   * Documentation on available options can be found here: https://github.com/artf/grapesjs-custom-code
   */
  public CustomCodeOptions?: any;

  /**
   * Documentation on available options can be found here: https://github.com/artf/grapesjs-plugin-export
   */
  public ExportOptions?: any;

  /**
   * Documentation on available options can be found here: https://github.com/artf/grapesjs-blocks-flexbox
   */
  public FlexBoxOptions?: any;

  /**
   * Documentation on available options can be found here: https://github.com/artf/grapesjs-plugin-forms
   */
  public FormsOptions?: any;

  /**
   * Documentation on available options can be found here: https://github.com/artf/grapesjs-style-gradient
   */
  public GradientStyle?: any;

  /**
   * Documentation on available options can be found here: https://github.com/artf/grapesjs-navbar
   */
  public NavbarOptions?: any;

  /**
   * Documentation on available options can be found here: https://github.com/fathym-it/page-builder-powerbi
   */
   public PageBuilderPowerBI?: any;

  /**
   * Documentation on available options can be found here: https://github.com/artf/grapesjs-parser-postcss
   */
   public PostCSSParserOptions?: any;

  /**
   * Documentation on available options can be found here: https://github.com/artf/grapesjs-tabs
   */
  public TabsOptions?: any;

  /**
   * Documentation on available options can be found here: https://github.com/artf/grapesjs-tooltip
   */
  public TooltipOptions?: any;

  /**
   * Documentation on available options can be found here: https://github.com/artf/grapesjs-touch
   */
  public TouchOptions?: any;

  /**
   * Documentation on available options can be found here: https://github.com/artf/grapesjs-tui-image-editor
   */
  public TUIImageEditorOptions?: any;

  /**
   * Documentation on available options can be found here: https://github.com/artf/grapesjs-typed
   */
  public TypedOptions?: any;

  constructor() {
    this.BGOptions = {};

    this.BlocksBasicOptions = {};

    //  TODO:  Why not working?
    // this.CKEditorOptions = {};

    this.CountdownOptions = {};

    this.CustomCodeOptions = {};

    this.ExportOptions = {};

    this.FlexBoxOptions = {};

    this.FormsOptions = {};

    this.GradientStyle = {};

    this.NavbarOptions = {};

    this.PageBuilderPowerBI = {};

    this.PostCSSParserOptions = {};

    this.TabsOptions = {};

    this.TooltipOptions = {};

    this.TouchOptions = {};

    // TODO:  Fix icons
    // this.TUIImageEditorOptions = {
    //   config: {
    //     includeUI: {
    //       initMenu: 'filter',
    //     },
    //   },
    //   // icons: {
    //   //   'menu.normalIcon.path': '../icon-d.svg',
    //   //   'menu.activeIcon.path': '../icon-b.svg',
    //   //   'menu.disabledIcon.path': '../icon-a.svg',
    //   //   'menu.hoverIcon.path': '../icon-c.svg',
    //   //   'submenu.normalIcon.path': '../icon-d.svg',
    //   //   'submenu.activeIcon.path': '../icon-c.svg',
    //   // },
    // };
    
    this.TypedOptions = {};
  }
}
