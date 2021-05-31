import {
  useConstraints,
  useEffect,
  useElement,
  usePromise,
  useRect,
  useState,
  useStaleLayout,
  useTheme,
  useTranslator,
} from '@nebula.js/stardust';
import $ from 'jquery';
import picassoSetup from '@qlik/common/picasso/picasso-setup';

import properties from './object-properties';
import data from './data';
// import picSelections from './pic-selections';
// import definition from './pic-definition';
import ChartView from './waterfallchart-view';

// onResize(layout, options) {
//   if (!this._paintCalled) {
//     return Deferred.resolve();
//   }
//   const view = this.view;
//   const $scope = this.$scope;
//   view.refreshSelections();
//   return Deferred.resolve()
//     .then(() => {
//       let element = view.$element;
//       if ($scope.ext.hasDefaultTemplate()) {
//         // Use the contained div as content - for extension backwards compatibility
//         element = element.children().first();
//       }
//       return view.resize(element, layout, options);
//     })
//     .catch((err) => {
//       if (process.env.NODE_ENV === 'development') {
//         if (typeof err !== 'undefined') {
//           console.error(err);
//         }
//       }
//     });
// },

function usePromiseNoError(...args) {
  const [, error] = usePromise(...args);
  if (error) {
    throw error;
  }
}

export default function supernova(env) {
  const picasso = picassoSetup();

  return {
    qae: {
      properties,
      data: data(env),
    },
    component() {
      const element = useElement();
      const layout = useStaleLayout();
      const rect = useRect();
      // eslint-disable-next-line no-unused-vars
      const constraints = useConstraints();
      const translator = useTranslator();
      const theme = useTheme();

      const [instance, setInstance] = useState();

      useEffect(() => {
        const $scope = null;
        const $element = $(element);
        const options = null;
        const backendApi = null;
        const selectionsApi = null;
        const tooltipApi = null;
        const view = new ChartView(
          picasso,
          translator,
          theme,
          $scope,
          $element,
          options,
          backendApi,
          selectionsApi,
          tooltipApi
        );

        // const s = picSelections({
        //   selections,
        //   brush: p.brush('selection'),
        //   picassoQ,
        // });

        setInstance(view);

        return () => {
          // s.release();
          view.destroy();
          // p.destroy();
        };
      }, []);

      usePromiseNoError(async () => {
        if (!instance) {
          return;
        }
        // update theme
        instance.theme = theme;

        // TODO: confim selection if triggered from engine (another websocket to the same session (browser tab))
        // TODO: usingDerivedProperties

        await instance.updateData(layout);
        const $element = null;
        await instance.paint($element, layout);
      }, [layout, instance, theme.name()]);

      usePromiseNoError(async () => {
        if (!instance) {
          return;
        }
        const $element = null;
        await instance.resize($element, layout);
      }, [rect.width, rect.height]);
    },
  };
}
