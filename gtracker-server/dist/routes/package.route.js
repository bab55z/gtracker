"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const package_controller_1 = require("../controllers/package.controller");
const package_validators_1 = require("../middlewares/validators/package.validators");
const router = express_1.default.Router();
// get all packages route
router.get('/package', package_controller_1.index);
// create a new package route
router.post('/package', package_validators_1.CreatePackageValidator, package_controller_1.create);
// suggest ids
router.get('/package/suggestions', package_controller_1.suggestIds);
// get a package route
router.get('/package/:packageId', package_controller_1.view);
// update a package route
router.put('/package/:packageId', package_validators_1.CreatePackageValidator, package_controller_1.update);
// delete a package route
router.delete('/package/:packageId', package_controller_1.destroy);
exports.default = router;
//# sourceMappingURL=package.route.js.map