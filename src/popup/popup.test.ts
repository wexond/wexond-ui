import 'mocha';
import { expect } from 'chai';
import * as sinon from 'sinon';

import {
  getPopupPosition,
  PopupHorizontalPlacement,
  PopupPosition,
  PopupPositionerOptions,
} from './popup';

describe('views/app/popup/popup', () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  describe('getPopupPosition()', () => {
    const popupOptions = {
      width: 10,
      height: 5,
      parentWidth: 20,
      viewportWidth: 60,
      viewportHeight: 10,
    } as PopupPositionerOptions;

    describe('From left to right', () => {
      describe(`It's not relative`, () => {
        it(`Fits in viewport`, () => {
          const res = getPopupPosition({ ...popupOptions, parentX: 10 });
          expect(res.x).equals(30);
          expect(res.horizontalPlacement).equals('left');
        });

        describe(`Doesn't fit in viewport`, () => {
          it('Fallback is viewport', () => {
            const res = getPopupPosition({
              ...popupOptions,
              parentX: 35,
              overflowFallback: 'viewport',
            });
            expect(res.x).equals(50);
            expect(res.horizontalPlacement).equals('right');
          });

          it('Fallback is parent', () => {
            const res = getPopupPosition({
              ...popupOptions,
              parentX: 35,
              overflowFallback: 'parent',
            });
            expect(res.x).equals(25);
            expect(res.horizontalPlacement).equals('right');
          });
        });
      });

      describe(`It's relative`, () => {
        it(`Fits in viewport`, () => {
          const res = getPopupPosition({
            ...popupOptions,
            parentX: 20,
            relative: true,
          });
          expect(res.x).equals(20);
          expect(res.horizontalPlacement).equals('left');
        });

        it(`Doesn't fit in viewport`, () => {
          const res = getPopupPosition({
            ...popupOptions,
            parentX: 35,
            relative: true,
          });
          expect(res.x).equals(-10);
          expect(res.horizontalPlacement).equals('right');
        });
      });
    });

    describe('From right to left', () => {
      describe(`It's not relative`, () => {
        it(`Fits in viewport`, () => {
          const res = getPopupPosition({
            ...popupOptions,
            parentX: 30,
            horizontalPlacement: 'right',
          });
          expect(res.x).equals(20);
          expect(res.horizontalPlacement).equals('right');
        });

        describe(`Doesn't fit in viewport`, () => {
          it('Fallback is viewport', () => {
            const res = getPopupPosition({
              ...popupOptions,
              parentX: 5,
              horizontalPlacement: 'right',
              overflowFallback: 'viewport',
            });

            expect(res.x).equals(0);
            expect(res.horizontalPlacement).equals('left');
          });

          it('Fallback is parent', () => {
            const res = getPopupPosition({
              ...popupOptions,
              parentX: 5,
              horizontalPlacement: 'right',
              overflowFallback: 'parent',
            });
            expect(res.x).equals(25);
            expect(res.horizontalPlacement).equals('left');
          });
        });
      });

      describe(`It's relative`, () => {
        it(`Fits in viewport`, () => {
          const res = getPopupPosition({
            ...popupOptions,
            parentX: 15,
            relative: true,
            horizontalPlacement: 'right',
          });
          expect(res.x).equals(-10);
          expect(res.horizontalPlacement).equals('right');
        });

        it(`Doesn't fit in viewport`, () => {
          const res = getPopupPosition({
            ...popupOptions,
            parentX: 5,
            relative: true,
            horizontalPlacement: 'right',
          });
          expect(res.x).equals(20);
          expect(res.horizontalPlacement).equals('left');
        });
      });
    });
  });
});
