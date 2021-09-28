const router = require ("express").Router();
const bcrypt = require ("bcryptjs");
const User = require("../models/User.model");
const user = require("../models/User.model");

router.get("/:id",async(req,res)=>{
    try{
        const user =  await User.findById(req.params.id)
        //You will get all document except these two attributes password/updatedAt
         const {password,updatedAt, ...other} = user._doc
     
        return res.status(200).json(other)
    }catch(error){
       return res.status(500).json(error)
    }
})

// router.get("/:id", async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id);
//         res.status(200).json(user);
//     } catch(e) {
//         res.status(500).json({message: e});
//     }
// });

router.put("/:id/follow",async(req,res)=>{
    if(req.body.userId !=req.params.id){
        try{
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if(!user.followers.includes(req.body.userId)){
               await user.updateOne({$push: {followers: req.body.userId}})
               await currentUser.updateOne({$push: {followings: req.params.id}})
               res.status(200).json("User has been followed")
            }else{
                res.status(403).json("You already follow this User")
            }
        }catch(err){
            return res.status(500).json(err)
        }
    }else{
        res.status(403).json("You can't follow yourself")
    }
})

router.put("/:id/unfollow",async(req,res)=>{
    if(req.body.userId !=req.params.id){
        try{
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if(user.followers.includes(req.body.userId)){
               await user.updateOne({$pull: {followers: req.body.userId}})
               await currentUser.updateOne({$pull: {followings: req.params.id}})
               res.status(200).json("User has been unfollowed")
            }else{
                res.status(403).json("You don't  follow this user")
            }
        }catch(err){
            return res.status(500).json(err)
        }
    }else{
        res.status(403).json("You can't unfollow yourself")
    }
})


module.exports = router