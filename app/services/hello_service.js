"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import express:
const express_1 = __importDefault(require("express"));
// Create a new express router:
const router = express_1.default.Router();
/* GET request: */
router.get("/", (req, res) => {
    // Get the 'name' query param:
    const name = req.query.name;
    // Send response:
    res.send("Hello, " + name);
});
// Export the router:
exports.default = router;
//# sourceMappingURL=hello_service.js.map