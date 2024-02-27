const express = require("express")
const {connectToDb,getDb}=require("./db/db")
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
let db; 
connectToDb((err)=>{
    if(!err){
        app.listen(3002,()=>{
        console.log("server is listening on port 3002");
        })
        db= getDb()
    }
})
app.get("/recipes",(req,res)=>{
    let recipes =[]
    db.collection("recipes")
    .find()
    .sort({ingredients:1})
    .forEach((recipe)=> recipes.push(recipe))
    .then(()=>{
        res.status(200).json(recipes)
    })
    .catch(()=>{
        res.status(500).json({err:"internal server error"})
    })
})
app.post("/recipes",(req,res)=>{
    const pRecipe= req.body
    db.collection("recipes")
    .insertOne(pRecipe)
    .then((result)=>{
        res.status(201).json(result)
    })
    .catch((err)=>{
        res.status(500).json({err:"could not  add the recipe to database"});
    })
})
app.get("/employes",(req,res)=>{
    let employes =[]
    db.collection("employes")
    .find()
    .sort()
    .forEach((employer)=> employes.push(employer))
    .then(()=>{
        res.status(200).json(employes)
    })
    .catch(()=>{
        res.status(500).json({err:"internal server error"})
    })
})
app.post("/employes",(req,res)=>{
    const pEmployes= req.body
    db.collection("employes")
    .insertOne(pEmployes)
    .then((result)=>{
        res.status(201).json(result)
    })
    .catch(()=>{
        res.status(500).json({err:"could not  add the employes to database"});
    })
})
app.all("*",(req,res)=>{
    res.status(404).send("page not Not found")
})