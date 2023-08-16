


const Student = require('../model/student.Model'); // Import the Student model

class StudentService {
    async getAllStudent(req,res,next){
        try{
            const student = await Student.findAll();
            return student
        }
        catch(err){
            console.log(err);
        }
    }
    
}
module.exports = new StudentService();