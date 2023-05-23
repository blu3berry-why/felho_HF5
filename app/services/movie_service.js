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
const http_errors_1 = require("http-errors");
const movie_schemas_1 = require("../schemas/movie_schemas");
// Create a new express router:
const router = express_1.default.Router();
const movie_filter_id = {
    _id: 0,
    id: 0,
    __v:0
};
router.get("/movies", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const movies = yield movie_schemas_1.Movie.find({}, { _id: 0, id: 0, __v: 0 });
    res.send({ movie: movies });
}));
router.get("/movies/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movie = yield movie_schemas_1.Movie.find({ id: Number(req.params.id) }, movie_filter_id);
        if (movie == null) {
            return res.send(http_errors_1.NotFound);
        }
        res.send(movie);
    }
    catch (_a) {
        res.send((0, http_errors_1.BadRequest)());
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
router.post("/movies/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    const dbMovie = yield movie_schemas_1.Movie.findOne({ id: id }, movie_filter_id);
    if (dbMovie == null) {
        let movie = {
            id: Math.floor(Math.random() * 100000000),
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
            (dbMovie.director = dbMovie.director),
            (dbMovie.actor = dbMovie.actor);
        dbMovie.save();
    }
    return res.send().status(200);
}));
router.delete("/movies/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield movie_schemas_1.Movie.deleteOne({ id: req.params.id });
    res.send().status(204);
}));
router.get("/movies/find/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const movies = (_b = (yield movie_schemas_1.Movie.find({ year: req.query.year }, { _id: 0, id: 1, title: 0, year: 0, director: 0, actor: 0 }).sort(String(req.query.orderby)))) !== null && _b !== void 0 ? _b : [];
    let mId = [];
    movies.forEach((i) => mId.push(i.id));
    res.send({ id: mId });
}));
// Export the router:
exports.default = router;
//# sourceMappingURL=movie_service.js.map