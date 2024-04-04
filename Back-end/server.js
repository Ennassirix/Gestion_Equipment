const express = require('express');
const app = express();
const port = 3001;
const employeeRouter = require('./Routers/EmployeesRouters');
const trackRouter = require('./Routers/TrackEquipments')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('work');
})

// employee Router : 
app.use('/employees', employeeRouter);

// track Router : 
app.use('/tracks', trackRouter);


app.listen(port, () => {
    console.log(`connected at port ${port}`);
});