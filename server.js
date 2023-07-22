// const http = require('http');
const express = require('express');
const app = express();
// const fs = require('fs')
var bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose');
const DB = 'mongodb://localhost:27017/FoodDataBase';
const PORT = 8080;
const Tour = require('./model/dataModel');
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors())



// const toure = JSON.parse(fs.readFileSync(`${__dirname}/store/data.json`))

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

})
.then(() => console.log('MongoDB connection established.'))
.catch((error) => console.error("MongoDB connection failed:", error.message));






app.get('/',async(req,res)=> {
    try{
        const tutorial = await Tour.find({});
        res.status(200)
        .json({message:"Hello get From Server Side", app:{tutorial}});
       
    }catch{
        
          res.status(200).json({
            status: 'fail to get',
          });
    }
});
   
// app.get('/search/:searchSection',async(req,res)=> {
//     var param = req.params.searchSection;
//     try{
//        var abc=  await Tour.find({ 
//         // productName: { $regex: new RegExp(param, "i")  },
//          price: {$eq: param}
           
//         });
//         res.status(200)
//         .json({message:"Hello get From Server Side",
//              Data:abc.length,
//              app:abc});
       
//     }catch{
        
//           res.status(200).json({
//             status: 'fail to get',
//           });
//     }
// });

app.get('/:id', async (req,res)=>{
    try{
    const getById = await Tour.findById(req.params.id)
    res.status(200).json({
        status: "get Data by Id",
        data:{getById}
    });
    }catch{
       res.status(200).json({
           status: "Fail to get data",
           data:"data can not find"
       })
    }

     });

   app.put('/:id',async(req,res)=>{
   try{
     const updateById =  await Tour.findByIdAndUpdate(req.params.id, req.body, {new:true,runValidators: true});
     res.status(200).json({
         status:'Data updated successfully',
         data:{updateById}
     })
   }catch{
    res.status(200).json({
        status: 'Fail to get data',
        data:"Data can not find"
      });
      }
     });


 app.delete('/:id', async(req,res)=>{
     try{
      await Tour.findByIdAndDelete(req.params.id)
      res.status(200).json({
          status:"Data deleted succesfully",
          data:null
      })
     } catch{
        res.status(200).json({
            status: 'Fail delete data',
            data:"not Dat found"

          });
       }
    })

 app.post('/post',async(req,res)=>{
    try{
        const newDataAdd = await Tour.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                tutorial: newDataAdd
            }
          });
    

    }
    catch(exception)
    {
        res.status(201).json({
            status: 'fail',
            message:'Invalid data sets'
          })
       }
     }); 



   app.listen(PORT, ()=>{
    console.log(`App is running on port ${PORT}`)
     });