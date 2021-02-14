// import 'mocha';
// import { expect } from 'chai';
// import * as sinon from 'sinon';

// import { getPopupPosition, PopupSafePosition } from './popup-utils';

// describe('views/app/popup/popup-utils', () => {
//   const sandbox = sinon.createSandbox();

//   afterEach(() => {
//     sandbox.restore();
//   });

//   describe('getPopupPosition()', () => {
//     const opts = {
//       width: 64,
//       height: 32,
//       windowWidth: 256,
//       windowHeight: 128,
//     };

//     it('from left to right, top to bottom', () => {
//       expect(
//         getPopupPosition({
//           x: 8,
//           y: 8,
//           xMargin: 0,
//           yMargin: 0,
//           preferXPos: 'right',
//           preferYPos: 'top',
//           ...opts,
//         }),
//       ).deep.equal(
//         ({
//           xPos: 'right',
//           yPos: 'top',
//           x: 8,
//           y: 8,
//         } as unknown) as PopupSafePosition,
//         'fits, no margin',
//       );

//       expect(
//         getPopupPosition({
//           x: 8,
//           y: 8,
//           xMargin: 8,
//           yMargin: 8,
//           preferXPos: 'right',
//           preferYPos: 'top',
//           ...opts,
//         }),
//       ).deep.equal(
//         ({
//           xPos: 'right',
//           yPos: 'top',
//           x: 16,
//           y: 16,
//         } as unknown) as PopupSafePosition,
//         'fits with margin',
//       );

//       expect(
//         getPopupPosition({
//           x: 200,
//           y: 200,
//           xMargin: 0,
//           yMargin: 0,
//           preferXPos: 'right',
//           preferYPos: 'top',
//           ...opts,
//         }),
//       ).deep.equal(
//         ({
//           xPos: 'left',
//           yPos: 'bottom',
//           x: 256 - 64,
//           y: 128 - 32,
//         } as unknown) as PopupSafePosition,
//         `doesn't fit, no margin`,
//       );

//       expect(
//         getPopupPosition({
//           x: 200,
//           y: 200,
//           xMargin: 8,
//           yMargin: 8,
//           preferXPos: 'right',
//           preferYPos: 'top',
//           ...opts,
//         }),
//       ).deep.equal(
//         ({
//           xPos: 'left',
//           yPos: 'bottom',
//           x: 256 - 64 - 8,
//           y: 128 - 32 - 8,
//         } as unknown) as PopupSafePosition,
//         `doesn't fit with margin`,
//       );
//     });

//     it('from right to left, top to bottom', () => {
//       expect(
//         getPopupPosition({
//           x: 256,
//           y: 0,
//           xMargin: 0,
//           yMargin: 0,
//           preferXPos: 'left',
//           preferYPos: 'top',
//           ...opts,
//         }),
//       ).deep.equal(
//         ({
//           xPos: 'left',
//           yPos: 'top',
//           x: 192,
//           y: 0,
//         } as unknown) as PopupSafePosition,
//         'fits, no margin',
//       );

//       expect(
//         getPopupPosition({
//           x: 256,
//           y: 0,
//           xMargin: 8,
//           yMargin: 8,
//           preferXPos: 'left',
//           preferYPos: 'top',
//           ...opts,
//         }),
//       ).deep.equal(
//         ({
//           xPos: 'left',
//           yPos: 'top',
//           x: 184,
//           y: 8,
//         } as unknown) as PopupSafePosition,
//         'fits with margin',
//       );

//       expect(
//         getPopupPosition({
//           x: 16,
//           y: 256,
//           xMargin: 0,
//           yMargin: 0,
//           preferXPos: 'left',
//           preferYPos: 'top',
//           ...opts,
//         }),
//       ).deep.equal(
//         ({
//           xPos: 'right',
//           yPos: 'bottom',
//           x: 0,
//           y: 128 - 32,
//         } as unknown) as PopupSafePosition,
//         `doesn't fit, no margin`,
//       );

//       expect(
//         getPopupPosition({
//           x: 16,
//           y: 256,
//           xMargin: 8,
//           yMargin: 8,
//           preferXPos: 'left',
//           preferYPos: 'top',
//           ...opts,
//         }),
//       ).deep.equal(
//         ({
//           xPos: 'right',
//           yPos: 'bottom',
//           x: 8,
//           y: 128 - 32 - 8,
//         } as unknown) as PopupSafePosition,
//         `doesn't fit with margin`,
//       );
//     });

//     it('from left to right, bottom to top', () => {
//       expect(
//         getPopupPosition({
//           x: 8,
//           y: 128,
//           xMargin: 0,
//           yMargin: 0,
//           preferXPos: 'right',
//           preferYPos: 'bottom',
//           ...opts,
//         }),
//       ).deep.equal(
//         ({
//           xPos: 'right',
//           yPos: 'bottom',
//           x: 8,
//           y: 96,
//         } as unknown) as PopupSafePosition,
//         'fits, no margin',
//       );

//       expect(
//         getPopupPosition({
//           x: 8,
//           y: 128,
//           xMargin: 8,
//           yMargin: 8,
//           preferXPos: 'right',
//           preferYPos: 'bottom',
//           ...opts,
//         }),
//       ).deep.equal(
//         ({
//           xPos: 'right',
//           yPos: 'bottom',
//           x: 16,
//           y: 88,
//         } as unknown) as PopupSafePosition,
//         'fits with margin',
//       );

//       expect(
//         getPopupPosition({
//           x: 8,
//           y: 16,
//           xMargin: 0,
//           yMargin: 0,
//           preferXPos: 'right',
//           preferYPos: 'bottom',
//           ...opts,
//         }),
//       ).deep.equal(
//         ({
//           xPos: 'right',
//           yPos: 'top',
//           x: 8,
//           y: 0,
//         } as unknown) as PopupSafePosition,
//         `doesn't fit, no margin`,
//       );

//       expect(
//         getPopupPosition({
//           x: 8,
//           y: 16,
//           xMargin: 8,
//           yMargin: 8,
//           preferXPos: 'right',
//           preferYPos: 'bottom',
//           ...opts,
//         }),
//       ).deep.equal(
//         ({
//           xPos: 'right',
//           yPos: 'top',
//           x: 16,
//           y: 8,
//         } as unknown) as PopupSafePosition,
//         `doesn't fit with margin`,
//       );
//     });

//     it('from right to left, bottom to top', () => {
//       expect(
//         getPopupPosition({
//           x: 96,
//           y: 128,
//           xMargin: 0,
//           yMargin: 0,
//           preferXPos: 'left',
//           preferYPos: 'bottom',
//           ...opts,
//         }),
//       ).deep.equal(
//         ({
//           xPos: 'left',
//           yPos: 'bottom',
//           x: 32,
//           y: 96,
//         } as unknown) as PopupSafePosition,
//         'fits, no margin',
//       );

//       expect(
//         getPopupPosition({
//           x: 96,
//           y: 128,
//           xMargin: 8,
//           yMargin: 8,
//           preferXPos: 'left',
//           preferYPos: 'bottom',
//           ...opts,
//         }),
//       ).deep.equal(
//         ({
//           xPos: 'left',
//           yPos: 'bottom',
//           x: 24,
//           y: 88,
//         } as unknown) as PopupSafePosition,
//         'fits with margin',
//       );

//       expect(
//         getPopupPosition({
//           x: 8,
//           y: 8,
//           xMargin: 0,
//           yMargin: 0,
//           preferXPos: 'left',
//           preferYPos: 'bottom',
//           ...opts,
//         }),
//       ).deep.equal(
//         ({
//           xPos: 'right',
//           yPos: 'top',
//           x: 0,
//           y: 0,
//         } as unknown) as PopupSafePosition,
//         `doesn't fit, no margin`,
//       );

//       expect(
//         getPopupPosition({
//           x: 8,
//           y: 8,
//           xMargin: 8,
//           yMargin: 8,
//           preferXPos: 'left',
//           preferYPos: 'bottom',
//           ...opts,
//         }),
//       ).deep.equal(
//         ({
//           xPos: 'right',
//           yPos: 'top',
//           x: 8,
//           y: 8,
//         } as unknown) as PopupSafePosition,
//         `doesn't fit with margin`,
//       );
//     });

//     it(`repositions relatively to parent if doesn\t fit`, () => {
//       expect(
//         getPopupPosition({
//           x: 200,
//           y: 0,
//           xMargin: 8,
//           yMargin: 8,
//           parentX: 96,
//           parentWidth: 32,
//           preferXPos: 'right',
//           preferYPos: 'top',
//           ...opts,
//         }),
//       ).deep.equal(
//         ({
//           xPos: 'left',
//           yPos: 'top',
//           x: 24,
//           y: 8,
//         } as unknown) as PopupSafePosition,
//         `from right to left`,
//       );

//       expect(
//         getPopupPosition({
//           x: 16,
//           y: 0,
//           xMargin: 8,
//           yMargin: 0,
//           parentX: 96,
//           parentWidth: 32,
//           preferXPos: 'left',
//           preferYPos: 'top',
//           ...opts,
//         }),
//       ).deep.equal(
//         ({
//           xPos: 'right',
//           yPos: 'top',
//           x: 136,
//           y: 0,
//         } as unknown) as PopupSafePosition,
//         `from left to right`,
//       );
//     });
//   });
// });
