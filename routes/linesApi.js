const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");

const { LinesDB, IdgenDB } = require("../model/lineSchema");

const linesRouter = express.Router();

linesRouter.get("/", async (req, res) => {
  try {
    const idlen = await IdgenDB.find();
    let Id = Math.floor(Math.random() * idlen[0].seq);
    const lines = await LinesDB.find({ uniqId: Id });
    if (lines.length > 0) {
      res.status(200).json({
        line: lines[0].Pickupline,
      });
    } else {
      res.status(404).json({
        message: "Refresh again",
      });
    }
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
});

linesRouter.post("/", (req, res) => {
  try {
    const idgen = IdgenDB.findOneAndUpdate(
      { idname: "linesID" },
      { $inc: { seq: 1 } },
      {
        new: true,
      },
      async (err, cd) => {
        let seqid;
        if (cd == null) {
          const idgen = new IdgenDB({ idname: "linesID", seq: 1 });
          idgen.save();
          seqid = 1;
        } else {
          seqid = cd.seq;
        }
        const lines = await LinesDB.create({
          uniqId: seqid,
          Pickupline: req.body.Pickupline,
          date: new Date(),
        });
        res.status(200).json({
          message: "Content Added to DB",
        });
      }
    );
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
});

module.exports = linesRouter;
