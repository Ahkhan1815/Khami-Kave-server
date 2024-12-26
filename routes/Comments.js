const express = require("express");
const router = express.Router();
const { Comments } = require("../models");

const { validateToken, checkVerification } = require("../middlewares/AuthMiddleware");

router.get("/:postId", async (req, res) => {
    const postId = req.params.postId;
    const comments = await Comments.findAll(
        { where: { GamesPostId: postId } });
    res.json(comments);
});

router.post("/", validateToken, checkVerification, async (req, res) => {
    const comment = req.body;
    const username = req.user.username;
    comment.username = username;
    const newComment = await Comments.create(comment);
    res.json(newComment);
});

router.delete("/:commentId", async (req, res) => {
    const commentId = req.params.commentId;
    const comment = await Comments.findByPk(commentId);
    if (!comment){
        res.json({error: "Comment not found"});
    }
    else{
        await comment.destroy();
        res.json("Comment Deleted Successfully");
    }
});


module.exports = router;