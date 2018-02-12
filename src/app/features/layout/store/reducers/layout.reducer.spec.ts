import { reducer } from '../reducers/layout.reducer';
import * as fromLayout from '../reducers/layout.reducer';

describe('LayoutReducer', () => {

  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;

      const result = reducer(undefined, action);
      expect(result).toEqual(fromLayout.initialState);
    });
  });

});