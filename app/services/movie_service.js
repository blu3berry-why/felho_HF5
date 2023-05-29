"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import express:
const express_1 = __importDefault(require("express"));
const movie_schemas_1 = require("../schemas/movie_schemas");
// Create a new express router:
const router = express_1.default.Router();
let id = 1;
const movie_filter_id = {
    _id: 0,
    id: 0,
    __v: 0,
};
router.get("/movies", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const movies = yield movie_schemas_1.Movie.find({}, { _id: 0, id: 0, __v: 0 });
    res.send({ movie: movies });
}));
router.get("/movies/find", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(`called, year=${req.query.year}, orderby=${req.query.orderby}`);
    const movies = (_a = (yield movie_schemas_1.Movie.find({ year: req.query.year }).sort(String(req.query.orderby).toLowerCase()))) !== null && _a !== void 0 ? _a : [];
    console.log(movies);
    let mId = [];
    movies.forEach((i) => mId.push(i.id));
    res.send({ id: mId });
}));
router.get("/movies/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movie = yield movie_schemas_1.Movie.findOne({ id: Number(req.params.id) }, movie_filter_id);
        if (movie == null) {
            return res.status(404).send();
        }
        res.send(movie);
    }
    catch (_b) {
        return res.status(400).send();
    }
}));
router.post("/movies", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let movie = {
        id: Math.floor(Math.random() * 100000000),
        title: req.body.title,
        year: req.body.year,
        director: req.body.director,
        actor: req.body.actor,
    };
    const savedMovie = yield movie_schemas_1.Movie.create(movie);
    const movieId = {
        id: movie.id,
    };
    res.send(movieId);
}));
router.put("/movies/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    const dbMovie = yield movie_schemas_1.Movie.findOne({ id: id });
    if (dbMovie == null) {
        let movie = {
            id: id,
            title: req.body.title,
            year: req.body.year,
            director: req.body.director,
            actor: req.body.actor,
        };
        movie_schemas_1.Movie.create(movie);
        return res.send().status(201);
    }
    else {
        (dbMovie.title = req.body.title),
            (dbMovie.year = req.body.year),
            (dbMovie.director = req.body.director),
            (dbMovie.actor = req.body.actor);
        dbMovie.save();
    }
    return res.send().status(200);
}));
router.delete("/movies/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield movie_schemas_1.Movie.deleteOne({ id: req.params.id });
    res.send().status(204);
}));
// Export the router:
exports.default = router;
//# sourceMappingURL=movie_service.js.map