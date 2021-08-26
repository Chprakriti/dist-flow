/**
 * Color information structure. Holds the actual color and index in palette.
 * @typedef {object} paletteColor
 * @property {string} color - Color as hex string (mandatory if index: -1)
 * @property {number} index - Index in palette
 */

/**
 * Styling settings for reference line
 * @typedef {object} refLineStyle
 * @property {number} [lineThickness=2] Set the thickness for this reference line.
 * @property {string} [lineType=''] Set the dash type for this reference line.
 */

/**
 * @typedef {object} refLine
 * @property {boolean|ValueExpression} show=true Set to true to display this reference line.
 * @property {string} label Reference line label.
 * @property {boolean} [showLabel=true] Set to true to show the label of this reference line.
 * @property {boolean} [showValue=true] Set to true to show the value of this reference line.
 * @property {paletteColor} paletteColor
 * @property {refLineStyle} [style] - Styling settings for reference line
 * @property {boolean} [coloredBackground=false] Set to true to fill the label and/or value of this reference line with this color
 */

/**
 * @namespace properties
 * @entry
 */
const properties = {
  /**
   * Current version of this generic object definition.
   * @type {string}
   * @default
   */
  version: process.env.PACKAGE_VERSION,

  /**
   * Settings specific to the boxplot
   * @type {object}
   */
  boxplotDef: {
    /**
     * Extends `HyperCubeDef`, see Engine API: `HyperCubeDef`.
     * @extends {HyperCubeDef}
     */
    qHyperCubeDef: {
      qDimensions: [],
      qMeasures: [],
      qMode: 'S',
      qAlwaysFullyExpanded: true,
      qSuppressZero: false,
      qSuppressMissing: true,
    },
    /**
     * Box plot calculation settings.
     * @type {object}
     */
    calculations: {
      /**
       * Use automatic calculations
       * @type {boolean}
       * @default
       */
      auto: true,
      /**
       * Auto calculation modes
       * @type {'tukey'|'fractiles'|'stdDev'}
       * @default
       */
      mode: 'tukey',
      /**
       * Box plot calculation settings
       * @type {object}
       */
      parameters: {
        /**
         * Number of interquartile ranges for whiskers.
         * @type {number}
         * @default
         */
        tukey: 1.5,
        /**
         * A number representing the two whisker fractiles as N and 1-N
         * @type {number}
         * @default
         */
        fractiles: 0.01,
        /**
         * Standard deviation spread for whiskers
         * @type {number}
         * @default
         */
        stdDev: 3,
      },
    },
    /**
     * Color settings.
     * Most color options for visualizations are set in the color object in the options. You activate custom coloring by setting `"auto": false` which turns off auto-coloring.
     * If `"auto": true`, no other properties need to be defined in the color object.
     * Note: Some of the color properties are depending on which theme is currently being used.
     * @type {object}
     */
    color: {
      /**
       * Set to use automatic coloring.
       * When `"auto": true`, color settings are based on the visualization used and the number of dimensions
       * and measures, that is, the settings are not fixed, but are dependent on the data input.
       * @type {boolean}
       * @default
       */
      auto: true,
      /**
       * Sets the coloring mode for the visualization when auto-coloring has been switched off (`"auto": false`). Can be one of:
       * * `primary`: a single color (by default blue) is used for all items in the chart. In visualizations that do not benefit from multiple colors (bar charts with one dimension and scatter plots), single color is the default setting.
       * * `byExpression`: coloring is based on an expression, which in most cases is a color code. Details are set in the `"expressionIsColor"`, `"expressionLabel`" and `"colorExpression"` properties.
       * * `byMultiple`: can be used when more than one measure is used. By default, 12 colors are used for the dimensions. The colors are reused when there are more than 12 dimension values.
       * @type {'primary'|'byExpression'|'byMultiple'}
       * @default "primary"
       */
      mode: 'primary',
      /**
       * Use colors encoded in master items.
       * Only applicable when `"mode": "primary"` has been defined.
       * @type {'off'|'dimension'|'measure'}
       * @default "off"
       */
      useBaseColors: 'off',
      /**
       * Should be true
       * @type {true}
       * @default
       */
      expressionIsColor: true,
      /**
       * Label to be defined on tool tips when using a coloring expression.
       * Only used if `'expressionIsColor': false`.
       * @type {string}
       * @default
       */
      expressionLabel: '',
      /**
       * @type {object}
       */
      box: {
        /**
         * The paletteColor object is used to define the box color when you color by single color `("mode": "primary")`.
         * @type {paletteColor}
         * @default { index: -1, color: '#e6e6e6' }
         */
        paletteColor: {
          index: -1,
          color: '#e6e6e6',
        },
      },
      /**
       * @type {object}
       */
      point: {
        /**
         * The paletteColor object is used to define the point color when you color by single color `("mode": "primary")`.
         * @type {paletteColor}
         * @default { index: 6 }
         */
        paletteColor: {
          index: 6,
          color: '#4477aa',
        },
      },
    },
    /**
     * Box plot elements settings.
     * @type {object}
     */
    elements: {
      /**
       * Box plot element settings
       * @type {object}
       */
      firstWhisker: {
        /**
         * Label for the boxplot element
         * @type {(string|StringExpression)=}
         * @default
         */
        name: '',
        // documenting this causes an error in the api-spec generation
        /*
         * Expression for the boxplot element
         * @type {?ValueExpression}
         */
        expression: null,
      },
      boxStart: {
        name: '',
        expression: null,
      },
      boxMiddle: {
        name: '',
        expression: null,
      },
      boxEnd: {
        name: '',
        expression: null,
      },
      lastWhisker: {
        name: '',
        expression: null,
      },
      /**
       * Box plot outliers element
       * @type {object}
       */
      outliers: {
        /**
         * Show the outliers.
         * @type {boolean}
         */
        include: true,
        /**
         * @type {boolean}
         */
        sortOutliers: true,
      },
    },
    /**
     * Presentation settings for the boxplots
     * @type {object}
     */
    presentation: {
      /**
       * Settings for the boxplot whiskers
       * @type {object}
       */
      whiskers: {
        /**
         * Show whiskers.
         * @type {boolean}
         * @default
         */
        show: true,
      },
    },
    /**
     * Wrapper for sorting properties which will be set on the outer dimension.
     * @type {object}
     */
    sorting: {
      /**
       * Sort automatically
       * @type {boolean}
       * @default
       */
      autoSort: true,
    },
  },
  /**
   * Dimension axis settings.
   * @type {object}
   */
  dimensionAxis: {
    /**
     * Axis docking position
     * @type {'near'|'far'}
     * @default "near"
     */
    dock: 'near',
    /**
     * Label orientation
     * @type {'auto'|'horizontal'|'tilted'}
     */
    label: 'auto',
    /**
     * Labels and title
     * @type {'all'|'labels'|'title'|'none'}
     */
    show: 'all',
  },
  /**
   * Measure axis settings.
   * @type {object}
   */
  measureAxis: {
    /**
     * Automatic max/min
     * @type {boolean}
     * @default
     */
    autoMinMax: true,
    /**
     * Axis docking position
     * @type {'near'|'far'}
     * @default "near"
     */
    dock: 'near',
    /**
     * Axis max value. `"autoMinMax"` must be set to false and `"minMax"`
     * must be set to `"max"` or `"minMax"` to use this property
     * @type {number|ValueExpression}
     * @default
     */
    max: 10,
    /**
     * Axis min value. `"autoMinMax"` must be set to false and `"minMax"`
     * must be set to `"min"` or `"minMax"` to use this property
     * @type {number|ValueExpression}
     * @default
     */
    min: 0,
    /**
     * Set custom max/min
     * @type {'min'|'max'|'minMax'}
     * @default "min"
     */
    minMax: 'min',
    /**
     * Labels and title
     * @type {'all'|'labels'|'title'|'none'}
     * @default "all"
     */
    show: 'all',
    /**
     * Axis scale
     * @type {number}
     * @default
     */
    spacing: 1,
  },
  /**
   * Grid lines settings.
   * @type {object}
   */
  gridLines: {
    /**
     * Automatic grid line spacing.
     * @type {boolean}
     * @default
     */
    auto: true,
    /**
     * Grid line spacing. Used only when auto is set to false.
     * @type {0|2|3}
     * @default
     */
    spacing: 2,
  },
  /**
   * Orientation setting.
   * If vertical, the dimension axis can only be docked on bottom or top and measure axis on left or right.
   * @type {'vertical'|'horizontal'}
   * @default "vertical"
   */
  orientation: 'vertical',
  /**
   * Reference lines settings
   * @type {object}
   */
  refLine: {
    /**
     * Array of measure based reference line definitions
     * @type {refLine[]}
     */
    refLines: [],
  },
  /**
   * Wrapper for sorting properties which will be set on the outer dimension.
   * @type {object}
   */
  sorting: {
    /**
     * Sort automatically
     * @type {boolean}
     * @default
     */
    autoSort: true,
    /**
     * Sorting preset
     * @type {'firstWhisker'|'boxStart'|'boxMiddle'|'boxEnd'|'lastWhisker'}
     */
    elementId: 'firstWhisker',
    /**
     * Expression for the sorting. Requires sortByExpression to be -1 or 1.
     * @type {ValueExpression}
     */
    expression: undefined,
    /**
     * @type {object}
     */
    sortCriteria: {
      /**
       * Sort by alphabetic
       * @type {number}
       * @default
       */
      sortByAscii: 0,
      /**
       * Sort by expression
       * @type {number}
       * @default
       */
      sortByExpression: 0,
      /**
       * Sort by numeric
       * @type {number}
       * @default
       */
      sortByNumeric: 0,
    },
  },
  /**
   * Show title for the visualization.
   * @type {boolean=}
   * @default
   */
  showTitles: true,
  /**
   * Visualization subtitle.
   * @type {(string|StringExpression)=}
   * @default
   */
  subtitle: '',
  /**
   * Visualization title.
   * @type {(string|StringExpression)=}
   * @default
   */
  title: '',
  /**
   * Visualization footnote.
   * @type {(string|StringExpression)=}
   * @default
   */
  footnote: '',
};

export default properties;
