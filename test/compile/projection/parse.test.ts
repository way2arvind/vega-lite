import {assert} from 'chai';
import {parseLayerModel, parseUnitModelWithScaleAndLayoutSize} from '../../util';
/* tslint:disable:quotemark */

describe('src/compile/projection/parse', function () {
  describe('parseUnitProjection', () => {
    it('should create projection from specified projection', () => {
      const model = parseUnitModelWithScaleAndLayoutSize({
        "mark": "geoshape",
        "projection": {
          "type": "albersUsa"
        },
        "data": {
          "url": "data/us-10m.json",
          "format": {
            "type": "topojson",
            "feature": "states"
          }
        },
        "encoding": {}
      });
      model.parse();
      assert.deepEqual(model.component.projection.explicit, {type: 'albersUsa'});
    });

    it('should create projection with no props', () => {
      const model = parseUnitModelWithScaleAndLayoutSize({
        "mark": "geoshape",
        "data": {
          "url": "data/us-10m.json",
          "format": {
            "type": "topojson",
            "feature": "states"
          }
        },
        "encoding": {}
      });
      model.parse();
      assert.deepEqual(model.component.projection.explicit, {});
    });

    it('should create projection from config', () => {
      const model = parseUnitModelWithScaleAndLayoutSize({
        "mark": "geoshape",
        "data": {
          "url": "data/us-10m.json",
          "format": {
            "type": "topojson",
            "feature": "states"
          }
        },
        "encoding": {},
        "config": {
          "projection": {
            "type": "albersUsa"
          }
        }
      });
      model.parse();
      assert.deepEqual(model.component.projection.explicit, {type: 'albersUsa'});
    });

    it('should add data with signal', () => {
      const model = parseUnitModelWithScaleAndLayoutSize({
        "data": {
          "url": "data/airports.csv",
          "format": {
            "type": "csv"
          }
        },
        "mark": "circle",
        "projection": {
          "type": "albersUsa"
        },
        "encoding": {
          "x": {
            "field": "longitude",
            "type": "longitude"
          },
          "y": {
            "field": "latitude",
            "type": "latitude"
          }
        }
      });
      model.parse();
      assert.isObject(model.component.projection.data[0]);
      assert.property(model.component.projection.data[0], 'signal');
    });

    it('should add data from main', () => {
      const model = parseUnitModelWithScaleAndLayoutSize({
        "mark": "geoshape",
        "data": {
          "url": "data/us-10m.json",
          "format": {
            "type": "topojson",
            "feature": "states"
          }
        },
        "encoding": {}
      });
      model.parse();
      assert.isString(model.component.projection.data[0]);
      assert.isNotObject(model.component.projection.data[0]);
      assert.notProperty(model.component.projection.data[0], 'signal');
    });
  });

  describe('parseNonUnitProjection', () => {
    it('should merge the same projection', () => {
      const model = parseLayerModel({
        "layer": [
          {
            "mark": "geoshape",
            "projection": {
              "type": "albersUsa"
            },
            "data": {
              "url": "data/us-10m.json",
              "format": {
                "type": "topojson",
                "feature": "states"
              }
            },
            "encoding": {}
          },
          {
            "data": {
              "url": "data/airports.csv",
              "format": {
                "type": "csv"
              }
            },
            "mark": "circle",
            "projection": {
              "type": "albersUsa"
            },
            "encoding": {
              "x": {
                "field": "longitude",
                "type": "longitude"
              },
              "y": {
                "field": "latitude",
                "type": "latitude"
              }
            }
          }
        ]
      });
      model.parse();
      assert.deepEqual(model.component.projection.explicit, {type: 'albersUsa'});
    });

    it('should merge in empty projection to specified projection', () => {
      const emptyFirst = parseLayerModel({
        "layer": [
          {
            "mark": "geoshape",
            "data": {
              "url": "data/us-10m.json",
              "format": {
                "type": "topojson",
                "feature": "states"
              }
            },
            "encoding": {}
          },
          {
            "data": {
              "url": "data/airports.csv",
              "format": {
                "type": "csv"
              }
            },
            "mark": "circle",
            "projection": {
              "type": "albersUsa"
            },
            "encoding": {
              "x": {
                "field": "longitude",
                "type": "longitude"
              },
              "y": {
                "field": "latitude",
                "type": "latitude"
              }
            }
          }
        ]
      });
      emptyFirst.parse();
      assert.deepEqual(emptyFirst.component.projection.explicit, {type: 'albersUsa'});
      const emptyLast = parseLayerModel({
        "layer": [
          {
            "mark": "geoshape",
            "data": {
              "url": "data/us-10m.json",
              "format": {
                "type": "topojson",
                "feature": "states"
              }
            },
            "encoding": {}
          },
          {
            "data": {
              "url": "data/airports.csv",
              "format": {
                "type": "csv"
              }
            },
            "mark": "circle",
            "projection": {
              "type": "albersUsa"
            },
            "encoding": {
              "x": {
                "field": "longitude",
                "type": "longitude"
              },
              "y": {
                "field": "latitude",
                "type": "latitude"
              }
            }
          }
        ]
      });
      emptyLast.parse();
      assert.deepEqual(emptyLast.component.projection.explicit, {type: 'albersUsa'});
    });

    it('should merge projections with same size, different data', () => {
      const model = parseLayerModel({
        "layer": [
          {
            "mark": "geoshape",
            "projection": {
              "type": "albersUsa"
            },
            "data": {
              "url": "data/us-10m.json",
              "format": {
                "type": "topojson",
                "feature": "states"
              }
            },
            "encoding": {}
          },
          {
            "data": {
              "url": "data/airports.csv",
              "format": {
                "type": "csv"
              }
            },
            "mark": "circle",
            "projection": {
              "type": "albersUsa"
            },
            "encoding": {
              "x": {
                "field": "longitude",
                "type": "longitude"
              },
              "y": {
                "field": "latitude",
                "type": "latitude"
              }
            }
          }
        ]
      });
      model.parse();
      assert.deepEqual(model.component.projection.explicit, {type: 'albersUsa'});
    });

    it('should not merge different specified projections', () => {
      const model = parseLayerModel({
        "layer": [
          {
            "mark": "geoshape",
            "projection": {
              "type": "mercator"
            },
            "data": {
              "url": "data/us-10m.json",
              "format": {
                "type": "topojson",
                "feature": "states"
              }
            },
            "encoding": {}
          },
          {
            "data": {
              "url": "data/airports.csv",
              "format": {
                "type": "csv"
              }
            },
            "mark": "circle",
            "projection": {
              "type": "albersUsa"
            },
            "encoding": {
              "x": {
                "field": "longitude",
                "type": "longitude"
              },
              "y": {
                "field": "latitude",
                "type": "latitude"
              }
            }
          }
        ]
      });
      model.parse();
      assert.isUndefined(model.component.projection);
    });
  });
});
