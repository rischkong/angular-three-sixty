"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var three_sixty_1 = require("@mediaman/three-sixty");
var ThreeSixtyFactory = (function () {
    function ThreeSixtyFactory() {
    }
    /**
     * @param canvasElement
     * @param configuration
     */
    ThreeSixtyFactory.prototype.create = function (canvasElement, configuration) {
        return new three_sixty_1.default(canvasElement, configuration);
    };
    return ThreeSixtyFactory;
}());
exports.ThreeSixtyFactory = ThreeSixtyFactory;
//# sourceMappingURL=three-sixty.factory.js.map