const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { token } = require('./middleware/token');
const { checkAdmin, checkTeacher, checkStudent } = require('./middleware/checkRole');

require('dotenv').config();

const app = express();
mongoose.connect(process.env.DB_global_link)
  .then(data => {
    if (data) {
      console.log("DB connected");
    }
  })
  .catch(err => {
    console.log(err)
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use("/", require('./routes/index'))
app.use("/auth", require('./routes/auth'))

app.use("/admin", token, checkAdmin, require('./routes/admin'))
app.use("/admin/teachers", token, checkAdmin, require('./routes/teachers'))
app.use("/admin/groups", token, checkAdmin, require('./routes/groups'))
app.use("/admin/students", token, checkAdmin, require('./routes/students'))

app.use("/teacher", token, checkTeacher, require('./routes/teacherRoute'))
app.use("/teacher/group", token, checkTeacher, require('./routes/groups'))
app.use("/teacher/attendance", token, checkTeacher, require('./routes/attendance'))

app.use("/student", token, checkStudent, require('./routes/studentRoute'))





const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
