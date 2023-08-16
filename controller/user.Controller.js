
const {getAllStudent} = require('../service/user.Service')


class StudentController{
    async getAllStudents(req,res){
       try {
        const result = await getAllStudent()
        res.json(result)
       } catch (error) {
        console.log(error)
       }
    }
}

module.exports = new StudentController()