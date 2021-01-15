const Sequelize=require('sequelize')
module.exports=new Sequelize('todo_manager','root','123',{
    host:'localhost',
    port:4001,
    dialect:'mariadb',
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
})