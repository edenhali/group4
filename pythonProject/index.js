//improt&init
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const CRUD = require('./db/CRUD');
const CreateDB = require('./db/CreateDB');
const port = 3000;
const cookieParser = require('cookie-parser');

app.use('/Static', express.static('static'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//route
app.get('/', (req, res) => {
  res.render('closet');
});
app.get('/LogOut', (req, res) => {
  res.render('closet');
});
app.get('/SearchItems', CRUD.searchItems);
app.get('/AddItem', CRUD.addItem);
app.get('/MyCloset', CRUD.goToMyCloset);
app.get('/MyOrders', CRUD.showOrders);
app.get('/RequestsFromMyCloset', CRUD.showRequestsFromMe);
app.get('/init_DB', (req, res) => {
  res.render('DB_initDb');
});
app.get('/createTable', [CreateDB.CreateTableRateNumbers,
CreateDB.CreateTableGoals,
CreateDB.CreateTableStyles,
CreateDB.CreateTableYesNo,
CreateDB.CreateTableCities,
CreateDB.CreateTableCategories,
CreateDB.CreateTableColors,
CreateDB.CreateTableFabricTypes,
CreateDB.CreateTableSizes,
CreateDB.CreateTableUsers,
CreateDB.CreateTableClothes,
CreateDB.CreateTableRequests,
CreateDB.CreateTableRates,
], (req, res) => {
  res.render('db_opretion', { v1: "created tables" });
});
app.get('/insertTable', [CreateDB.InsertDataRateNumbers,
CreateDB.InsertDataYesNo,
CreateDB.InsertDataCities,
CreateDB.InsertDataCategories,
CreateDB.InsertDataColors,
CreateDB.InsertDataFabricTypes,
CreateDB.InsertDataSizes,
CreateDB.InsertDataStyles,
CreateDB.InsertDataGoals,
CreateDB.InsertDataUsers,
CreateDB.InsertDataClothes,
CreateDB.InsertDataRequests,
CreateDB.InsertDataRates
], (req, res) => {
  res.render('db_opretion', { v1: "inserted tables" });
});
app.get('/dropTable', [CreateDB.DropTableRateNumbers,
CreateDB.DropTableYesNo,
CreateDB.DropTableCities,
CreateDB.DropTableCategories,
CreateDB.DropTableColors,
CreateDB.DropTableFabricTypes,
CreateDB.DropTableSizes,
CreateDB.DropTableStyles,
CreateDB.DropTableGoals,
CreateDB.DropTableUsers,
CreateDB.DropTableClothes,
CreateDB.DropTableRequests,
CreateDB.DropTableRates
], (req, res) => {
  res.render('db_opretion', { v1: "dropped tables" });
});


app.post('/LogIn', CRUD.validateUser);
app.post('/SearchRes', CRUD.selectItemsBySearch);
app.post('/signUp', CRUD.signUp);
app.post('/AddCloth', CRUD.createCloth);
app.post('/RateTheItem', CRUD.createNewRate);
app.post('/clothes/:cloth/view', (req, res) => {
  const cloth = req.params.cloth;
  const serialNumber = req.body.serialNumber;
  const displaybut = req.body.view;
  CRUD.viewCloth(cloth, serialNumber, displaybut, res);
});
app.post('/clothes/:cloth/delete', (req, res) => {
  const cloth = req.params.cloth;
  const serialNumber = req.body.serialNumber;
  CRUD.tryDeleteCloth(cloth, serialNumber, res);
});
app.post('/clothes/:cloth/confirm_delete', (req, res) => {
  const cloth = req.params.cloth;
  const serialNumber = req.body.serialNumber;
  CRUD.deleteCloth(cloth, serialNumber, res);
});
app.post('/clothes/:cloth/rating', (req, res) => {
  const cloth = req.params.cloth;
  const serialNumber = req.body.serialNumber;
  const view = req.body.view;
  CRUD.ShowRate(cloth, serialNumber, view, res);
});
app.post('/rateItem', (req, res) => {
  const serialNumberC = req.body.serialNumberC;
  const serialNumberR = req.body.serialNumberR;
  CRUD.RateAnItem(serialNumberC, serialNumberR, res);
});
app.post('/updateReq', (req, res) => {
  const request = req.body.serialNumberRequest;
  let comment = 'no';
  if (req.body.accept) {
    comment = 'yes';
  }
  CRUD.UpdeteReq(request, comment, res);
});
app.post('/createNewUser', CRUD.createUser);
app.post('/clothes/:cloth/requestItem', (req, res) => {
  const cloth = req.params.cloth;
  const serialNumber = req.body.serialNumber;
  CRUD.requestItem(cloth, serialNumber, res);
});
app.post('/clothes/:cloth/addRequest', (req, res) => {
  const cloth = req.params.cloth;
  const serialNumber = req.body.serialNumber;
  CRUD.createRequest(cloth, serialNumber, req, res);
});


//listen port 3000
app.listen(port, () => {
  console.log("server is running on port ", port);
});