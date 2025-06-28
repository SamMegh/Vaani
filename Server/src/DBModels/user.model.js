import mongoos from 'mongoose';

const userSchema= new mongoos.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
},
{
    timestamps:true
}
) ;
const User= mongoos.model("User",userSchema);
export default User
