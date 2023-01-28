const db=require('../config/connection')
const Promise = require('promise')
const bcrypt=require('bcrypt')

  module.exports = {

       usersignup:(userdata) => {
        return new Promise(async (resolve, reject) => {
        let user = await db.get().collection('details').findOne({ email: userdata.email });
        const state = {
            userexist: false,
            user:null
        }
        if (!user) {
            console.log(userdata);
            userdata.password = await bcrypt.hash(userdata.password , 10)
            db.get().collection('details').insertOne(userdata).then((data) => {
                state.userexist =false
                state.user=userdata
                console.log(userdata,"function");
                console.log('insert');
                resolve(state)
            })
        } else {
            state.userexist = true
            resolve(state)
            console.log("else");
        }

    })

},

userlogin: (loginDetails) => {

    return new Promise(async (resolve,reject) => {
        console.log(loginDetails)
        let response = {
            status: false,
            usernotfound: false

        }
        let user = await db.get().collection('details').findOne({ email: loginDetails.email });
        if (user) {
            bcrypt.compare(loginDetails.password, user.password, (err, status) => {
                if (status) {

                    console.log("login success")
                    response.user = user
                    response.status = true;
                    

                    resolve(response)
                    
                } else {
                    console.log("login failed")
                    resolve({status:false})
                  

                }

            })
        } else {
            response.usernotfound = true
            resolve({status:false})
        }
    })

 }

}
