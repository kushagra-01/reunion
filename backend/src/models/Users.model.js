const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const adminSchema = mongoose.Schema({
    name:{type:String},
    lastname:{type:String},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    followers:[{type:String}],
    followings:[{type:String}]
},{
   versionKey:false,
   timestamps:true,
});

adminSchema.methods.check=function(password){
    return bcrypt.compareSync(password,this.password)
}
adminSchema.pre("save",function(next){
    if(!this.isModified("password"))return next();
    var hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;
    return next();
})

module.exports =mongoose.model('admins', adminSchema)