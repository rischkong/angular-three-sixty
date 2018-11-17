"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var three_sixty_component_1 = require("../src/three-sixty.component");
var three_sixty_factory_1 = require("../src/three-sixty.factory");
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
describe('ThreeSixtyComponent', function () {
    var fixture;
    var component;
    var canvasElement;
    var threeSixtyFactory;
    var threeSixty;
    beforeEach(function (done) {
        testing_1.TestBed.configureTestingModule({
            declarations: [three_sixty_component_1.ThreeSixtyComponent],
            providers: [three_sixty_factory_1.ThreeSixtyFactory]
        });
        testing_1.TestBed.compileComponents().then(done);
    });
    beforeEach(testing_1.inject([three_sixty_factory_1.ThreeSixtyFactory], function (_threeSixtyFactory) {
        fixture = testing_1.TestBed.createComponent(three_sixty_component_1.ThreeSixtyComponent);
        component = fixture.componentInstance;
        threeSixtyFactory = _threeSixtyFactory;
        canvasElement = fixture.debugElement.query(platform_browser_1.By.css('canvas')).nativeElement;
        threeSixty = threeSixtyFactory.create(canvasElement, {
            angles: 36,
            anglesPerImage: 6
        });
        spyOn(threeSixtyFactory, 'create').and.returnValue(threeSixty);
        spyOn(threeSixty, 'initialize');
        spyOn(threeSixty, 'preload').and.returnValue(new Promise(function (resolve) { return resolve(); }));
        spyOn(threeSixty, 'updateConfiguration');
        spyOn(threeSixty, 'updateImages');
    }));
    it('should set the canvas dimension', function () {
        component.width = 1280;
        component.height = 720;
        fixture.detectChanges();
        expect(canvasElement.width).toBe(1280);
        expect(canvasElement.height).toBe(720);
    });
    describe('::ngOnInit', function () {
        var angles = 36;
        var anglesPerImage = 6;
        var images = [
            'http://example.com/image-0.jpg',
            'http://example.com/image-1.jpg',
            'http://example.com/image-2.jpg',
            'http://example.com/image-3.jpg',
            'http://example.com/image-4.jpg',
            'http://example.com/image-5.jpg'
        ];
        beforeEach(function () {
            component.angles = angles;
            component.anglesPerImage = anglesPerImage;
            component.images = { 1024: images };
        });
        it('should initialize a ThreeSixty instance', function () {
            component.ngOnInit();
            expect(threeSixtyFactory.create).toHaveBeenCalledWith(canvasElement, {
                angles: angles,
                anglesPerImage: anglesPerImage
            });
            expect(threeSixty.initialize).toHaveBeenCalledWith({ 1024: images }, 0);
            expect(threeSixty.preload).not.toHaveBeenCalled();
        });
        it('should use the specified start angle', function () {
            component.startAngle = 185;
            component.ngOnInit();
            expect(threeSixtyFactory.create).toHaveBeenCalledWith(canvasElement, {
                angles: angles,
                anglesPerImage: anglesPerImage
            });
            expect(threeSixty.initialize).toHaveBeenCalledWith({ 1024: images }, 185);
            expect(threeSixty.preload).not.toHaveBeenCalled();
        });
        it('should configure the speedFactor if the input parameter is set', function () {
            var speedFactor = 10;
            component.speedFactor = speedFactor;
            component.ngOnInit();
            expect(threeSixtyFactory.create).toHaveBeenCalledWith(canvasElement, {
                angles: angles,
                anglesPerImage: anglesPerImage,
                speedFactor: speedFactor
            });
        });
        it('should configure the hotspots if the input parameter is set', function () {
            var hotspots = [
                {
                    text: 'Lorem ipsum 1',
                    angle: 0.78,
                    endAngle: 0.95,
                    top: '25%',
                    left: '27.5%'
                },
                {
                    text: 'Lorem ipsum 2',
                    angle: 0.4,
                    endAngle: 0.6,
                    top: '65%',
                    left: '60%'
                }
            ];
            component.hotspots = hotspots;
            component.ngOnInit();
            expect(threeSixtyFactory.create).toHaveBeenCalledWith(canvasElement, {
                angles: angles,
                anglesPerImage: anglesPerImage,
                hotspots: hotspots
            });
        });
        it('should preload the images if the preload flag is set', function () {
            component.preload = true;
            component.ngOnInit();
            expect(threeSixty.preload).toHaveBeenCalled();
        });
        it('should trigger the preloaded event when the images are preloaded', function (done) {
            spyOn(component.preloaded, 'emit');
            component.preload = true;
            component.ngOnInit();
            setTimeout(function () {
                expect(component.preloaded.emit).toHaveBeenCalled();
                done();
            });
        });
    });
    describe('ngOnChanges', function () {
        it('should update the three sixty instance configuration', function () {
            var newSpeedFactor = 20;
            var newConfiguration = {
                angles: component.angles,
                anglesPerImage: component.anglesPerImage,
                speedFactor: newSpeedFactor
            };
            component.ngOnInit();
            component.speedFactor = newSpeedFactor;
            component.ngOnChanges({ speedFactor: new core_1.SimpleChange(component.speedFactor, newSpeedFactor, false) });
            expect(threeSixty.updateConfiguration).toHaveBeenCalledWith(newConfiguration);
        });
        it('should not update the three sixty instance does not exist yet', function () {
            component.ngOnChanges({ speedFactor: new core_1.SimpleChange(null, component.speedFactor, true) });
            expect(threeSixty.updateConfiguration).not.toHaveBeenCalled();
        });
        it('should not update the three sixty instance configuration if the only changed property was images', function () {
            component.ngOnInit();
            component.ngOnChanges({ images: new core_1.SimpleChange(component.images, [], false) });
            expect(threeSixty.updateConfiguration).not.toHaveBeenCalled();
        });
        it('should update the three sixty instance images if the images property has been changed', function () {
            var newImages = [
                'http://example.com/image-0.jpg',
                'http://example.com/image-1.jpg',
                'http://example.com/image-2.jpg',
                'http://example.com/image-3.jpg',
                'http://example.com/image-4.jpg',
                'http://example.com/image-5.jpg'
            ];
            component.ngOnInit();
            component.images = { 1024: newImages };
            component.ngOnChanges({ images: new core_1.SimpleChange([], newImages, false) });
            expect(threeSixty.updateImages).toHaveBeenCalledWith({ 1024: newImages });
            expect(threeSixty.preload).not.toHaveBeenCalled();
        });
        it('should preload the images after changing them when the preload flag is set', function (done) {
            var newImages = [
                'http://example.com/image-0.jpg',
                'http://example.com/image-1.jpg',
                'http://example.com/image-2.jpg',
                'http://example.com/image-3.jpg',
                'http://example.com/image-4.jpg',
                'http://example.com/image-5.jpg'
            ];
            spyOn(component.preloaded, 'emit');
            component.ngOnInit();
            component.preload = true;
            component.images = { 1024: newImages };
            component.ngOnChanges({ images: new core_1.SimpleChange([], newImages, false) });
            expect(threeSixty.preload).toHaveBeenCalled();
            setTimeout(function () {
                expect(component.preloaded.emit).toHaveBeenCalled();
                done();
            });
        });
        it('should not update the three sixty instance images if the images property has not been changed', function () {
            component.ngOnInit();
            component.ngOnChanges({ foo: new core_1.SimpleChange('foo', 'bar', false) });
            expect(threeSixty.updateImages).not.toHaveBeenCalled();
        });
    });
    describe('::forcePreload', function () {
        beforeEach(function () { return component.ngOnInit(); });
        it('should preload the images if the preload flag is set', function () {
            component.forcePreload();
            expect(threeSixty.preload).toHaveBeenCalled();
        });
        it('should trigger the preloaded event when the images are preloaded', function (done) {
            spyOn(component.preloaded, 'emit');
            component.forcePreload();
            setTimeout(function () {
                expect(component.preloaded.emit).toHaveBeenCalled();
                done();
            });
        });
    });
});
//# sourceMappingURL=three-sixty.component.spec.js.map