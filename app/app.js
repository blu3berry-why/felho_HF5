"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const movie_service_1 = __importDefault(require("./services/movie_service"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(body_parser_1.default.json());
app.use(movie_service_1.default);
mongoose_1.default
    .connect("mongodb://127.0.0.1:27017/vsquvg")
    .then((res) => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log("Listening on:", PORT);
    });
})
    .catch((err) => console.log(err));
//# sourceMappingURL=app.js.map