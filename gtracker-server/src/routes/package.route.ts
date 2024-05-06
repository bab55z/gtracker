import express from "express"
import { create, index, view, update, destroy, suggestIds } from "../controllers/package.controller"
import { CreatePackageValidator,  } from "../middlewares/validators/package.validators";

const router = express.Router();

// get all packages route
router.get('/package', index);

// create a new package route
router.post('/package',CreatePackageValidator, create);

// suggest ids
router.get('/package/suggestions', suggestIds);

// get a package route
router.get('/package/:packageId', view);

// update a package route
router.put('/package/:packageId', CreatePackageValidator, update);

// delete a package route
router.delete('/package/:packageId', destroy);

export default router;