const express = require("express");
const router = express.Router();
const {GamesPosts} = require("../models");
const {validateToken, checkVerification} = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
    const listOfPosts = await GamesPosts.findAll();
    res.json(listOfPosts);

});

router.get("/byId/:id", async (req, res) => {
    const id = req.params.id;
    const post = await GamesPosts.findByPk(id);
    res.json(post);
})

router.post("/", validateToken, checkVerification, async (req,res) => {
    const post = req.body;
    await GamesPosts.create(post);
    res.json(post);
});

router.delete("/byId/:id", async (req, res) => {
    const id = req.params.id;
    const post = await GamesPosts.findByPk(id);
    if (!post){
        res.json({error: "Post not found"});
    }
    else{
        await post.destroy();
        res.json("Post Deleted Successfully");
    }
})


module.exports = router;