"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = asyncHandler;
function asyncHandler(fn) {
    return (req, res, next) => {
        fn(req, res, next).catch(next); // Pass any errors to Express's error handler
    };
}
//# sourceMappingURL=asyncHandler.js.map