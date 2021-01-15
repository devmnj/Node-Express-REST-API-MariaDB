const express = require("express");
const bodyParser = require("body-parser");
const db = require("./config/database");
require("dotenv").config();
const Todo = require("./models/todo.model");
const app = express();
app.use(bodyParser.urlencoded({extended:false})) 

//Test DB
db.authenticate()
  .then(() => console.log("Database connected"))
  .catch((e) => console.log("Error:" + e));
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/todo", (req, res, next) => {
  Todo.findAll()
    .then((model) => {
        res.json({
            error: false,
            data: model
        })
    })
    .catch(error => res.json({
        error: true,
        data: [],
        error: error
    }))
});

app.get("/todo/:id", (req, res, next) => {
    const id =req.params.id
    Todo.findByPk(id)
      .then((model) => {
          res.json({
              error: false,
              data: model
          })
      })
      .catch(error => res.json({
          error: true,
          data: [],
          error: error
      }))
  });

app.put('/todo/update/:id',bodyParser.json(),(req, res,next)=>{
    const id =req.params.id
    const {item,description}=req.body
    Todo.update({item:item},{where:{id:id}})
    .then((uTodo) => {
         console.log('got item and updated ' + uTodo);
        
        res.json({
            error: false,
            data: uTodo
        })
    })
    .catch(error => res.json({
        error: true,
        data: [],
        error: error
    }))
})

app.delete('/todo/delete/:id' ,(req, res,next)=>{
    const id =req.params.id
    
    Todo.destroy({where:{id:id}})
    .then((dTodo) => {
         console.log('got item and deleted ' + dTodo);
         
        res.json({
            error: false,
            data: dTodo
        })
    })
    .catch(error => res.json({
        error: true,
        data: [],
        error: error
    }))
})
app.post("/todo", bodyParser.json(),(req, res, next) => {
    const {item,description}=req.body
    Todo.create({item:item,description:description})
    .then((model) => {
      res.status(200).send(model);
      })
      .catch((e) => {
        res.status(400).send("Error:" + e);
      });
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
