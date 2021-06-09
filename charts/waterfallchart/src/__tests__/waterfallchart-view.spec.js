import chai from 'chai';
import sinon from 'sinon';
import angular from 'angular';
import WaterfallChartView from '../waterfallchart-view';
import CubeGenerator from '../waterfallchart-cube-generator-by-measures';

const expect = chai.expect;
let sandbox;

describe('Waterfallchart-view', () => {
  let waterfallchart;
  let $element;
  let options;
  let backendApi;
  let selectionsApi;
  let tooltipApi;

  beforeEach(() => {
    $element = angular.element("<div><div style='width: 100px; height: 100px' class='picasso-chart'></div></div>");
    document.body.appendChild($element[0]);
    options = {};
    backendApi = {
      setPath: sinon.stub(),
      setCacheOptions: sinon.stub(),
      model: {
        layout: {
          generated: {
            qHyperCube: {
              qDataPages: [
                {
                  qArea: {},
                },
              ],
            },
          },
          generatedMatrix: { length: 0 },
          qHyperCube: {
            qDataPages: [
              {
                qArea: { qWidth: 2 },
              },
            ],
            qMeasureInfo: [],
          },
        },
      },
      cacheCube: {
        setOptions() {},
      },
    };
    selectionsApi = {
      clear: {
        bind() {},
      },
      watchDeactivated() {},
      watchActivated() {},
    };
    tooltipApi = {};
    sandbox = sinon.createSandbox();
    sandbox.stub(CubeGenerator, 'generateHyperCube');
    sandbox.stub(CubeGenerator, 'generateSlicedHyperCube');
    sandbox.stub(CubeGenerator, 'getGeneratedDimensionPath');
    sandbox.stub(CubeGenerator, 'getGeneratedMeasurePath');
  });

  afterEach(() => {
    sandbox.restore();
    $element.remove();
  });

  it('should work when export sheet to pdf', () => {
    options.navigation = true;
    options.viewState = { scroll: 5 };
    backendApi.model.layout.generatedMatrix.length = 15;
    waterfallchart = new WaterfallChartView(undefined, $element, options, backendApi, selectionsApi, tooltipApi);
    waterfallchart.layout = backendApi.model.layout;
    sandbox.stub(waterfallchart._scrollHandler, 'getScrollViewSizeInItem').returns(10);
    waterfallchart.updateData(backendApi.model.layout);
    window.flush();
    expect(CubeGenerator.generateHyperCube).have.been.calledOnce;
    expect(CubeGenerator.generateSlicedHyperCube).have.been.calledWith(sinon.match.any, options.viewState.scroll, 10);
  });

  it('should work in snapshot mode', () => {
    options.navigation = true;
    backendApi.model.layout.generatedMatrix.length = 15;
    backendApi.model.layout.generated.qHyperCube.qDataPages[0].qArea = { qTop: 3, qHeight: 12 };
    backendApi.isSnapshot = true;
    waterfallchart = new WaterfallChartView(undefined, $element, options, backendApi, selectionsApi, tooltipApi);
    waterfallchart.layout = backendApi.model.layout;
    waterfallchart.updateData(backendApi.model.layout);
    window.flush();
    expect(CubeGenerator.generateHyperCube).have.been.calledOnce;
    expect(CubeGenerator.generateSlicedHyperCube).have.been.calledWith(sinon.match.any, 3, 12);
  });
});
