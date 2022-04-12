const express = require('express');
const router = express.Router();
const User = require("../models/Users");
const {body, validationResult} = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const getuser = require("../middleware/getuser");

JWT_SECRET = "shashwatsecret";


// ROUTE 1:  createuser

router.post('/createuser',[
    body('name',"wrong name").isLength(4),
    body('username').isLength(4),
    body('password').isLength(8),
],async (req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success:false, errors: errors.array() });
    }


    try
    {

    let userFind = await User.findOne({username:req.body.username});
    if(userFind)
    {
        return res.status(400).json({success:false, error:"Username already present."});
    }

    const salt = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(req.body.password,salt);



    let thisUser = await User.create({
        name: req.body.name,
        username: req.body.username,
        password: passHash
      })

    const data = {id:thisUser.id};
    const authToken = jwt.sign(data,JWT_SECRET);
    res.json({success:true, authToken});

    }
    catch(error)
    {
        return res.status(500).json({success:false, error:"Some error occured."});
    }
      

})


// ROUTE 2:  login

router.post('/login',[
    body('username').isLength(4),
    body('password').isLength(8),
],async (req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success:false, errors: errors.array() });
    }


    try
    {

    let userFind = await User.findOne({username:req.body.username});
    if(!userFind)
    {
        return res.status(400).json({success:false, error:"Invalid Credentials."});
    }

    const passwordCompare = await bcrypt.compare(req.body.password,userFind.password);

    if(!passwordCompare)
    {
        return res.status(400).json({success:false, error:"Invalid Credentials."});
    }


    const data = {id:userFind.id};
    const authToken = jwt.sign(data,JWT_SECRET);
    res.json({success:true, authToken});

    }
    catch(error)
    {
        return res.status(500).json({success:false, error:"Some error occured."});
    }
      

})


// ROUTE 2:  getuser

router.post('/getuser', getuser ,async (req,res)=>{

    try
    {
    let userId = req.id;
    let userFind = await User.findById(userId).select("-password");
    res.json({success:true, userFind});
    }
    catch(error)
    {
        return res.status(500).json({success:false, error:"Some error occured."});
    }
      
})


module.exports = router;