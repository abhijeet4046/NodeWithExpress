var mongoose=require('mongoose')

var Schema  = mongoose.Schema;

var EmpSchema= new Schema({ID:Number,Name:String,Dept:String})

module.exports=mongoose.model('EmpModel',EmpSchema)
