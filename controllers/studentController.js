

const db= require("../config/db");

//GET all students lIst
const getStudents = async(req,res)=>{

    try {
       const data = await db.query("SELECT * FROM students");

       if(!data){
        return res.status(404).send({
            success:false,
            message: "NO Records found"
        })
       }
       res.status(200).send({
        success:true,
        message:"All students Records",
        totalStudents:data[0].length,
        data:data[0],
       });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in get All student API",
            error
        })
    }
};

//GET STUDENT BY ID
const getStudentByID = async(req,res)=>{
    try{
const studentId = req.params.id
if (!studentId) {    //if studentId ya id nahi hai...
    return res.status(404).send({
        success:false,
        message: "No student found with the given ID",
    })
}


const [rows]= await db.query(`SELECT * FROM students WHERE id =?`,[studentId]);
if(rows.length===0){   // if no database record found
    return res.status(404).send({
        success:false,
        message:"NO Records Found"
    });
}
res.status(200).send({
    success:true,
    studentDetails: rows,
});
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,  message: "Error in Get Student by id API",  message:"Error in Get Student by id API",
            error: error.message || error,
        })
    }
};

//CREATE STUDENT
const createStudent= async(req,res)=>{
try {
  //Yeh line req.body se sabhi fields ko destructure kar ke variables me store karti hai.
const{name,subject,phone,address,marks}= req.body   //req.body.name → name variable me store hoga vse hi or sb  req.body.subject  etc etc....
  if(!name || !subject || !phone || !address || !marks) {   //if koi field nahi hai to...
    return res.status(500).send({
        success:false,
        message:"please Provide all fields"
    })
  }
  const data = await db.query(`INSERT INTO students (name,subject,phone,address,marks) VALUES (?,?,?,?,?)`,[name,subject,phone,address,marks])
 // INSERT INTO students (...) ka matlab hai:students table me naya row insert karo.

//(name, subject, phone, address, marks) ye table ke columns hain.
//VALUES (?,?,?,?,?) ka matlab hai: ye values ya data example (kajal,cse,989786756,rdc,45) insert karne ke liye placeholders hain.
//[name, subject, phone, address, marks] ye values hain jo placeholders ke liye hain.
  if(!data){  
    return res.status(404).send({
        success:false,
        message:"Error In INSERT QUERY"
    })
  }
  res.status(201).send({
    success:true,
    message:"New student Record Created"
  })
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error in Create Student API",
        error: error.message 
    })
}
}

//UPDATE STUDENT    
 
const updateStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    if (!studentId) {
      return res.status(404).send({
        success: false,
        message: "Invalid ID or provide id"
      });
    }

    const { name, subject, phone, address, marks } = req.body;

    if (!name || !subject || !address || !marks || !phone) {
      return res.status(400).send({
        success: false,
        message: "Missing required fields"
      });
    }

    // Check if student exists
    const [existing] = await db.query(`SELECT * FROM students WHERE id = ?`, [studentId]);   //[existing]  bcz data aayega array me...
    if (existing.length === 0) {   // array me koi record nahi hai to...
      return res.status(404).send({
        success: false,
        message: "Student not found"
      });
    }

    // Perform the update
    const [result] = await db.query(
      `UPDATE students SET name = ?, subject = ?, phone = ?, marks = ?, address = ? WHERE id = ?`,   //SET yeh batata hai ki aapko kaunse columns update karne hain.
      [name, subject, phone, marks, address, studentId]
    );

    if (result.affectedRows === 0) {    // affectedRows Ye batata hai kitne rows (records) aapki query se effected (affected) yaani badle gaye hain.
      return res.status(400).send({
        success: false,
        message: "Update failed or no changes made"
      });
    }

    res.status(200).send({
      success: true,
      message: "Student details updated"
    });

  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in update student API",
      error: error.message || error,
    });
  }
};

//DELETE STUDENT
const deleteStudent = async(req,res)=>{
 try {
    const studentId = req.params.id
    if(!studentId){
        return res.status(404).send({
            success:false,
            message:"Invalid ID or provide id"
        })
    }
    await db.query(`DELETE FROM students WHERE id = ?`,[studentId]);
    res.status(200).send({
        success:true,
        message:"Student Record Deleted sucessfully"
    })
 } catch (error) {
   console.log(error)
   res.status(500).send({
    success:false,
    message:"Error in delete student API",
    error: error.message || error,
   }) 
 }
}


module.exports= {getStudents, getStudentByID, createStudent, updateStudent, deleteStudent};
