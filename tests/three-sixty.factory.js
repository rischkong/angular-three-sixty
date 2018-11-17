"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var three_sixty_factory_1 = require("../src/three-sixty.factory");
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/core/testing");
var three_sixty_1 = require("@mediaman/three-sixty");
describe('ThreeSixtyFactory', function () {
    var threeSixtyFactory;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [three_sixty_factory_1.ThreeSixtyFactory]
        });
    });
    beforeEach(testing_2.inject([three_sixty_factory_1.ThreeSixtyFactory], function (_threeSixtyFactory) {
        threeSixtyFactory = _threeSixtyFactory;
    }));
    describe('::create', function () {
        it('should create a ThreeSixty instance', function () {
            var threeSixty = threeSixtyFactory.create(document.createElement('canvas'), {
                angles: 36,
                anglesPerImage: 6
            });
            expect(threeSixty instanceof three_sixty_1.default).toBeTruthy();
        });
    });
});
//# sourceMappingURL=three-sixty.factory.js.map