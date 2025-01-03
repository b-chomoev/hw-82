import express from "express";
import Album from "../models/Album";
import Track from "../models/Track";

const trackRouter = express.Router();

trackRouter.post('/', async (req, res, next) => {
    if (req.body.album) {
        const album = await Album.findById(req.body.album);

        if (!album) res.status(404).send({error: 'Album not found'});
    }

    const newTrack = {
        name: req.body.name,
        album: req.body.album,
        duration: req.body.duration,
    }

    try {
        const track = new Track(newTrack);
        await track.save();
        res.send(track);
    } catch (e) {
        next(e);
    }
});

export default trackRouter;