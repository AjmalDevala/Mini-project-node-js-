const db=require('../config/connection')
const objectId=require('mongodb').ObjectId
const bcrypt=require('bcrypt')
const { ObjectId } = require('mongodb')

module.exports={

    adminlogin: (adminlogin) => {
        return new Promise(async (resolve, reject) => {
            let response = {
                status: false,
                usernotfound: false

            }
            //   adminlogin.password = await bcrypt.hash(adminlogin.password , 10)
            //   db.get().collection('admin').insert(adminlogin);

            let admin = await db.get().collection('admin').findOne({ email: adminlogin.email });
            if (admin) {
                bcrypt.compare(adminlogin.password, admin.password, (err, status) => {
                    if (status) {

                        console.log("login success")
                        response.admin = admin
                        response.status = true;
                       

                        resolve(response)
                        
                    } else {
                        resolve({status:false})
                        console.log(err);

                    }

                })
            } else {
                response.usernotfound = true
                resolve({status:false})
            }
        })
    },

    getUserData: () => {
        return new Promise(async (resolve,reject) => {

            let user = await db.get().collection('details').find().toArray()
            resolve(user)

        })

    },
    addUser: (user) => {
        return new Promise(async (resolve, reject) => {
            user.password = await bcrypt.hash(user.password, 10);
            db.get().collection('details').insertOne(user).then((data) => {
                resolve(data)
            })
        })
    },

    deleteUser: (userid) => {
     
        return new Promise((resolve, reject) => {


            db.get().collection('details').remove({ _id: objectId(userid) }).then((response) => {

                console.log("delete")
                resolve(response)

            })
        })
    },
    getOneUser:(userid)=>{
        return new Promise(async(resolve,reject)=>{
            let userdata=await db.get().collection('details').find({_id:objectId(userid)}).toArray();
            
                resolve(userdata)
                
            
        })
    },

    updateUserData:(id,updatedData)=>{
        return new Promise((resolve,reject)=>{
            console.log(id,updatedData)
            db.get().collection('details').updateOne({_id:ObjectId(id)},{$set:{
                name:updatedData.name,
                email:updatedData.email,
            }}).then((response)=>{
                resolve(response)
            })
        })
    }
}




    // addUser:(user,callback)=>{
    //     console.log(user)
    //     db.get().collection('user').insertOne(user).then((data)=>{
    //         callback(true)

    //     })
        
    // }
    

