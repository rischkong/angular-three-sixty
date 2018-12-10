/**
 * @license angular-three-sixty
 * MIT license
 */

import { Component, EventEmitter, Input, NgModule, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import ThreeSixty from '@mediaman/three-sixty';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ThreeSixtyFactory = (function () {
  function ThreeSixtyFactory() {
  }

  /**
   * @param {?} canvasElement
   * @param {?} configuration
   * @return {?}
   */
  ThreeSixtyFactory.prototype.create = /**
   * @param {?} canvasElement
   * @param {?} configuration
   * @return {?}
   */
  function ( canvasElement, configuration ) {
    return new ThreeSixty( canvasElement, configuration );
  };
  return ThreeSixtyFactory;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ThreeSixtyComponent = (function () {
  function ThreeSixtyComponent( threeSixtyFactory ) {
    this.threeSixtyFactory = threeSixtyFactory;
    /**
     * The initial angle to show (number between 0 and 360)
     */
    this.startAngle = 0;
    /**
     * Image set with all (ordered) image urls
     */
    this.images = {};
    /**
     * Flag to control if all images should be preloaded
     */
    this.preload = false;
    /**
     * Gets emitted when the images were preloaded
     */
    this.preloaded = new EventEmitter();

    /**

     */
    this.angle = 0;
    /**
     * Gets emitted when the images were preloaded
     */
    this.rotated = new EventEmitter();

  }

  /**
   * @inheritDoc
   * @return {?}
   */
  ThreeSixtyComponent.prototype.ngOnInit = /**
   * @inheritDoc
   * @return {?}
   */
  function () {
    this.threeSixty = this.threeSixtyFactory.create( this.canvasElement.nativeElement, this.getThreeSixtyConfiguration() );
    this.threeSixty.initialize( this.images, this.startAngle );
    this.preloadImages();
  };
  /**
   * @inheritDoc
   * @param {?} changes
   * @return {?}
   */
  ThreeSixtyComponent.prototype.ngOnChanges = /**
   * @inheritDoc
   * @param {?} changes
   * @return {?}
   */
  function ( changes ) {
    if ( !this.threeSixty ) {
      return;
    }
    // Don't update the configuration if only the images have been changed
    var /** @type {?} */ changedProperties = Object.keys( changes );
    if ( changedProperties.length > 1 || !changes.hasOwnProperty( 'images' ) ) {
      this.threeSixty.updateConfiguration( this.getThreeSixtyConfiguration() );
    }
    if ( changes.hasOwnProperty( 'images' ) ) {
      this.threeSixty.updateImages( this.images );
      this.preloadImages();
    }
  };
  /**
   * Force a preload of all images
   * @return {?}
   */
  ThreeSixtyComponent.prototype.forcePreload = /**
   * Force a preload of all images
   * @return {?}
   */
  function () {
    var _this = this;
    this.threeSixty.preload().then( function () {
      return _this.preloaded.emit();
    } );
  };
  /**
   * Preload all images if the preload flag is set
   * @return {?}
   */
  ThreeSixtyComponent.prototype.preloadImages = /**
   * Preload all images if the preload flag is set
   * @return {?}
   */
  function () {
    var _this = this;
    if ( this.preload ) {
      this.threeSixty.preload().then( function () {
        return _this.preloaded.emit();
      } );
    }
  };
  /**
   * Goto desired angle
   * @return {?}
   */
  ThreeSixtyComponent.prototype.gotoAngle = /**
   * Goto desired angle
   * @return {?}
   */
  function ( desiredAngle ) {
    var _this = this;
    if ( desiredAngle ) {
      this.threeSixty.gotoAngle( desiredAngle );
    }
  };

  /**
   * Goto desired angle with Distance
   * @return {?}
   */
  ThreeSixtyComponent.prototype.gotoAngleWithDistance = /**
   * Goto desired angle
   * @return {?}
   */
  function ( desiredAngle ) {
    var _this = this;
    if ( desiredAngle ) {
      this.threeSixty.gotoAngleWithDistance( desiredAngle );
    }
  };
  /**
   * Goto desired angle
   * @return {?}
   */
  ThreeSixtyComponent.prototype.getAngle = /**
   * Goto desired angle
   * @return {?}
   */
  function () {
    var _this = this;
    if ( _this ) {
      this.angle = this.threeSixty.getAngle();
      return this.angle;
    }
  };
  /**
   * Get the configuration object for the ThreeSixty instance
   * @return {?}
   */
  ThreeSixtyComponent.prototype.getThreeSixtyConfiguration = /**
   * Get the configuration object for the ThreeSixty instance
   * @return {?}
   */
  function () {
    var /** @type {?} */ configuration = {
      angles: this.angles,
      anglesPerImage: this.anglesPerImage
    };
    if ( this.speedFactor >= 0 ) {
      configuration.speedFactor = this.speedFactor;
    }
    if ( this.hotspots ) {
      configuration.hotspots = this.hotspots;
    }
    return configuration;
  };
  ThreeSixtyComponent.decorators = [
    {
      type: Component, args: [{
        selector: 'mm-three-sixty',
        styles: ['.three-sixty-container{position:relative;cursor:move;cursor:-webkit-grab;-ms-touch-action:none;touch-action:none}.three-sixty__hotspot{display:none;position:absolute;width:200px;padding:10px 15px;background:rgba(0,0,0,.5);border-radius:20px;color:#fff}.three-sixty__hotspot--active{display:block}'],
        template: "<canvas #canvasElement class=\"mm-three-sixty es5\" [width]=\"width\" [height]=\"height\"  style=\"width:100%\"></canvas>",
        encapsulation: ViewEncapsulation.None
      },]
    },
  ];
  /** @nocollapse */
  ThreeSixtyComponent.ctorParameters = function () {
    return [
      { type: ThreeSixtyFactory, },
    ];
  };
  ThreeSixtyComponent.propDecorators = {
    "width": [{ type: Input },],
    "height": [{ type: Input },],
    "angles": [{ type: Input },],
    "anglesPerImage": [{ type: Input },],
    "startAngle": [{ type: Input },],
    "images": [{ type: Input },],
    "speedFactor": [{ type: Input },],
    "hotspots": [{ type: Input },],
    "preload": [{ type: Input },],
    "preloaded": [{ type: Output },],
    "rotated": [{ type: Output },],
    "angle": [{ type: Input },],
    "canvasElement": [{ type: ViewChild, args: ['canvasElement',] },],
  };
  return ThreeSixtyComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ThreeSixtyModule = (function () {
  function ThreeSixtyModule() {
  }

  ThreeSixtyModule.decorators = [
    {
      type: NgModule, args: [{
        declarations: [ThreeSixtyComponent],
        providers: [ThreeSixtyFactory],
        exports: [ThreeSixtyComponent]
      },]
    },
  ];
  /** @nocollapse */
  ThreeSixtyModule.ctorParameters = function () {
    return [];
  };
  return ThreeSixtyModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
// Public classes.

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Angular library starter
 * Build an Angular library compatible with AoT compilation & Tree shaking like an official package
 * Copyright Roberto Simonetti
 * MIT license
 * https://github.com/mediamanDE/angular-three-sixty
 */
/**
 * Entry point for all public APIs of the package.
 */

// This file only reexports content of the `src` folder. Keep it that way.

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { ThreeSixtyModule, ThreeSixtyComponent, ThreeSixtyFactory as ɵa };
//# sourceMappingURL=angular-three-sixty.js.map
