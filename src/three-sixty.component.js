"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var three_sixty_factory_1 = require("./three-sixty.factory");
var ThreeSixtyComponent = (function () {
    /**
     * @param threeSixtyFactory
     */
    function ThreeSixtyComponent(threeSixtyFactory) {
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
        this.preloaded = new core_1.EventEmitter();
    }
    /**
     * @inheritDoc
     */
    ThreeSixtyComponent.prototype.ngOnInit = function () {
        this.threeSixty = this.threeSixtyFactory.create(this.canvasElement.nativeElement, this.getThreeSixtyConfiguration());
        this.threeSixty.initialize(this.images, this.startAngle);
        this.preloadImages();
    };
    /**
     * @inheritDoc
     */
    ThreeSixtyComponent.prototype.ngOnChanges = function (changes) {
        if (!this.threeSixty) {
            return;
        }
        // Don't update the configuration if only the images have been changed
        var changedProperties = Object.keys(changes);
        if (changedProperties.length > 1 || !changes.hasOwnProperty('images')) {
            this.threeSixty.updateConfiguration(this.getThreeSixtyConfiguration());
        }
        if (changes.hasOwnProperty('images')) {
            this.threeSixty.updateImages(this.images);
            this.preloadImages();
        }
    };
    /**
     * Force a preload of all images
     */
    ThreeSixtyComponent.prototype.forcePreload = function () {
        var _this = this;
        this.threeSixty.preload().then(function () { return _this.preloaded.emit(); });
    };
    /**
     * Preload all images if the preload flag is set
     */
    ThreeSixtyComponent.prototype.preloadImages = function () {
        var _this = this;
        if (this.preload) {
            this.threeSixty.preload().then(function () { return _this.preloaded.emit(); });
        }
    };
    /**
     * Get the configuration object for the ThreeSixty instance
     */
    ThreeSixtyComponent.prototype.getThreeSixtyConfiguration = function () {
        var configuration = {
            angles: this.angles,
            anglesPerImage: this.anglesPerImage
        };
        if (this.speedFactor >= 0) {
            configuration.speedFactor = this.speedFactor;
        }
        if (this.hotspots) {
            configuration.hotspots = this.hotspots;
        }
        return configuration;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], ThreeSixtyComponent.prototype, "width", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], ThreeSixtyComponent.prototype, "height", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], ThreeSixtyComponent.prototype, "angles", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], ThreeSixtyComponent.prototype, "anglesPerImage", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], ThreeSixtyComponent.prototype, "startAngle", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ThreeSixtyComponent.prototype, "images", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], ThreeSixtyComponent.prototype, "speedFactor", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], ThreeSixtyComponent.prototype, "hotspots", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ThreeSixtyComponent.prototype, "preload", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ThreeSixtyComponent.prototype, "preloaded", void 0);
    __decorate([
        core_1.ViewChild('canvasElement'),
        __metadata("design:type", core_1.ElementRef)
    ], ThreeSixtyComponent.prototype, "canvasElement", void 0);
    ThreeSixtyComponent = __decorate([
        core_1.Component({
            selector: 'mm-three-sixty',
            styleUrls: ['../node_modules/@mediaman/three-sixty/dist/three-sixty.css'],
            template: "<canvas #canvasElement class=\"mm-three-sixty\" [width]=\"width\" [height]=\"height\"></canvas>",
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [three_sixty_factory_1.ThreeSixtyFactory])
    ], ThreeSixtyComponent);
    return ThreeSixtyComponent;
}());
exports.ThreeSixtyComponent = ThreeSixtyComponent;
//# sourceMappingURL=three-sixty.component.js.map