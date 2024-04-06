const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors')
const employeeRouter = require('./Routers/EmployeesRouters');
const trackRouter = require('./Routers/TrackEquipments')
const equipmentRouter = require('./Routers/EquipmentsRoutes');
const atelierRouter = require('./Routers/AtelierRoutes')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    credentials: true,
    origin: ['http://localhost:5173'],
    methods: ["GET", "POST", "DELETE", "PUT"],
}))
app.get('/', (req, res) => {
    res.send('work');
})

// employee Router : 
app.use('/employees', employeeRouter);

// track Router : 
app.use('/tracks', trackRouter);

// equipment Router :
app.use('/equipment', equipmentRouter);

// atelier Router :
app.use("/atelier", atelierRouter);


app.listen(port, () => {
    console.log(`connected at port ${port}`);
});