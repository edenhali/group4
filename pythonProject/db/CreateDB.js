var SQL = require('./db');
const csv = require('csvtojson');
const path = require('path');

const CreateTableRateNumbers = (req, res, next) => {
    var Q1 = "CREATE TABLE IF NOT EXISTS `rateNumbers`(rateNumber INT primary key not null)";
    SQL.query(Q1, (err, mySQLres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({ message: "error in creating table" });
            return;
        }
        console.log('created rateNumbers table');
    })
    next();
}

const CreateTableGoals = (req, res, next) => {
    var Q1 = "CREATE TABLE IF NOT EXISTS `goals`(goal VARCHAR(255) primary key not null)";
    SQL.query(Q1, (err, mySQLres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({ message: "error in creating table" });
            return;
        }
        console.log('created goals table');
    })
    next();
}

const CreateTableStyles = (req, res, next) => {
    var Q1 = "CREATE TABLE IF NOT EXISTS `styles`(style VARCHAR(255) primary key not null)";
    SQL.query(Q1, (err, mySQLres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({ message: "error in creating table" });
            return;
        }
        console.log('created styles table');
    })
    next();
}

const CreateTableSizes = (req, res, next) => {
    var Q1 = "CREATE TABLE IF NOT EXISTS `sizes`(size VARCHAR(255) primary key not null)";
    SQL.query(Q1, (err, mySQLres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({ message: "error in creating table" });
            return;
        }
        console.log('created sizes table');
    })
    next();
}

const CreateTableFabricTypes = (req, res, next) => {
    var Q1 = "CREATE TABLE IF NOT EXISTS `fabricTypes`(fabricType VARCHAR(255) primary key not null)";
    SQL.query(Q1, (err, mySQLres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({ message: "error in creating table" });
            return;
        }
        console.log('created fabricTypes table');
    })
    next();
}

const CreateTableColors = (req, res, next) => {
    var Q1 = "CREATE TABLE IF NOT EXISTS `colors`(color VARCHAR(255) primary key not null)";
    SQL.query(Q1, (err, mySQLres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({ message: "error in creating table" });
            return;
        }
        console.log('created colors table');
    })
    next();
}

const CreateTableCategories = (req, res, next) => {
    var Q1 = "CREATE TABLE IF NOT EXISTS `categories`(category VARCHAR(255) primary key not null)";
    SQL.query(Q1, (err, mySQLres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({ message: "error in creating table" });
            return;
        }
        console.log('created categories table');
    })
    next();
}

const CreateTableCities = (req, res, next) => {
    var Q1 = "CREATE TABLE IF NOT EXISTS `cities`(city VARCHAR(255) primary key not null)";
    SQL.query(Q1, (err, mySQLres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({ message: "error in creating table" });
            return;
        }
        console.log('created cities table');
    })
    next();
}

const CreateTableYesNo = (req, res, next) => {
    var Q1 = "CREATE TABLE IF NOT EXISTS `yesNo`(yesorno VARCHAR(255) primary key not null)";
    SQL.query(Q1, (err, mySQLres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({ message: "error in creating table" });
            return;
        }
        console.log('created yesNo table');
    })
    next();
}

const CreateTableUsers = (req, res, next) => {
    var Q1 = "CREATE TABLE IF NOT EXISTS `users`(email VARCHAR(255) primary key,firstname VARCHAR(255) not null,lastname VARCHAR(255) not null,password VARCHAR(255) not null,picture VARCHAR(1000),dob date not null,joinDate date not null,phoneNumber VARCHAR(11) not null,city VARCHAR(255) not null references cities(city))";
    SQL.query(Q1, (err, mySQLres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({ message: "error in creating table" });
            return;
        }
        console.log('created users table');
    })
    next();
}

const CreateTableClothes = (req, res, next) => {
    var Q1 = "CREATE TABLE IF NOT EXISTS `clothes`(serialNumber INT not null,user VARCHAR(255) not null references users(email),category VARCHAR(255) not null references categories(category),color VARCHAR(255) not null references colors(color),fabricType VARCHAR(255) not null references fabricTypes(fabricType),size VARCHAR(255) not null references sizes(size),style VARCHAR(255) not null references styles(style),goal VARCHAR(255) not null references goals(goal),picture VARCHAR(1000) not null,available VARCHAR(255) not null references yesNo(yesorno),city VARCHAR(255) not null references cities(city),primary key(serialNumber,user))";
    SQL.query(Q1, (err, mySQLres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({ message: "error in creating table" });
            return;
        }
        console.log('created clothes table');
    })
    next();
}

const CreateTableRequests = (req, res, next) => {
    var Q1 = "CREATE TABLE IF NOT EXISTS `requests`(serialNumber INT not null primary key,user VARCHAR(255) not null references users(email),cloth INT not null references clothes(serialNumber),startDate date not null,notes VARCHAR(255),isApproved varchar(4),endDate date)";
    SQL.query(Q1, (err, mySQLres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({ message: "error in creating table" });
            return;
        }
        console.log('created requests table');
    })
    next();
}

const CreateTableRates = (req, res, next) => {
    var Q1 = "CREATE TABLE IF NOT EXISTS `rates` (serialNumber INT NOT NULL PRIMARY KEY,serialNumberRequests INT NOT NULL REFERENCES requests(serialNumber),cleanliness INT NOT NULL REFERENCES rateNumbers(rateNumber),quality INT NOT NULL REFERENCES rateNumbers(rateNumber),reliability INT NOT NULL REFERENCES rateNumbers(rateNumber),userText VARCHAR(255))"
    SQL.query(Q1, (err, mySQLres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({ message: "error in creating table" });
            return;
        }
        console.log('created rates table');
    })
    next();
}


const DropTableUsers = (req, res, next) => {
    var Q4 = "DROP TABLE IF EXISTS users";
    SQL.query(Q4, (err, mySQLres) => {
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({ message: "error in dropping table" + err });
            return;
        }
        console.log("table users dropped");
    })
    next()
}

const DropTableRequests = (req, res, next) => {
    var Q4 = "DROP TABLE IF EXISTS requests";
    SQL.query(Q4, (err, mySQLres) => {
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({ message: "error in dropping table" + err });
            return;
        }
        console.log("table requests dropped");
    })
    next()
}

const DropTableClothes = (req, res, next) => {
    var Q4 = "DROP TABLE IF EXISTS clothes";
    SQL.query(Q4, (err, mySQLres) => {
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({ message: "error in dropping table" + err });
            return;
        }
        console.log("table clothes dropped");
    })
    next()
}

const DropTableYesNo = (req, res, next) => {
    var Q4 = "DROP TABLE IF EXISTS yesNo";
    SQL.query(Q4, (err, mySQLres) => {
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({ message: "error in dropping table" + err });
            return;
        }
        console.log("table yesNo dropped");
    })
    next()
}

const DropTableCities = (req, res, next) => {
    var Q4 = "DROP TABLE IF EXISTS cities";
    SQL.query(Q4, (err, mySQLres) => {
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({ message: "error in dropping table" + err });
            return;
        }
        console.log("table cities dropped");
    })
    next()
}

const DropTableCategories = (req, res, next) => {
    var Q4 = "DROP TABLE IF EXISTS categories";
    SQL.query(Q4, (err, mySQLres) => {
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({ message: "error in dropping table" + err });
            return;
        }
        console.log("table categories dropped");
    })
    next()
}

const DropTableColors = (req, res, next) => {
    var Q4 = "DROP TABLE IF EXISTS colors";
    SQL.query(Q4, (err, mySQLres) => {
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({ message: "error in dropping table" + err });
            return;
        }
        console.log("table colors dropped");
    })
    next()
}

const DropTableFabricTypes = (req, res, next) => {
    var Q4 = "DROP TABLE IF EXISTS fabricTypes";
    SQL.query(Q4, (err, mySQLres) => {
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({ message: "error in dropping table" + err });
            return;
        }
        console.log("table fabricTypes dropped");
    })
    next()
}

const DropTableSizes = (req, res, next) => {
    var Q4 = "DROP TABLE IF EXISTS sizes";
    SQL.query(Q4, (err, mySQLres) => {
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({ message: "error in dropping table" + err });
            return;
        }
        console.log("table sizes dropped");
    })
    next()
}

const DropTableStyles = (req, res, next) => {
    var Q4 = "DROP TABLE IF EXISTS styles";
    SQL.query(Q4, (err, mySQLres) => {
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({ message: "error in dropping table" + err });
            return;
        }
        console.log("table styles dropped");
    })
    next()
}

const DropTableGoals = (req, res, next) => {
    var Q4 = "DROP TABLE IF EXISTS goals";
    SQL.query(Q4, (err, mySQLres) => {
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({ message: "error in dropping table" + err });
            return;
        }
        console.log("table goals dropped");
    })
    next()
}

const DropTableRates = (req, res, next) => {
    var Q4 = "DROP TABLE IF EXISTS rates";
    SQL.query(Q4, (err, mySQLres) => {
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({ message: "error in dropping table" + err });
            return;
        }
        console.log("table rates dropped");
    })
    next()
}

const DropTableRateNumbers = (req, res, next) => {
    var Q4 = "DROP TABLE IF EXISTS rateNumbers";
    SQL.query(Q4, (err, mySQLres) => {
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({ message: "error in dropping table" + err });
            return;
        }
        console.log("table rateNumbers dropped");
    })
    next()
}

const InsertDataUsers = (req, res, next) => {
    var Q2 = "INSERT INTO users SET ?";
    const csvFilePath = path.join(__dirname, "/content/users.csv");
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            console.log(jsonObj); // for learning perpose
            jsonObj.forEach(element => {
                var NewEntry = {
                    "email": element.email,
                    "firstname": element.firstname,
                    "lastname": element.lastname,
                    "password": element.password,
                    "picture": element.picture,
                    "dob": element.dob,
                    "joinDate": element.joinDate,
                    "phoneNumber": element.phoneNumber,
                    "city": element.city
                }
                SQL.query(Q2, NewEntry, (err, mysqlres) => {
                    if (err) {
                        console.log("error in inserting data", err);
                    }
                    console.log("created row sucssefuly ");
                });
            });
        });
    next()
};

const InsertDataRequests = (req, res, next) => {
    var Q2 = "INSERT INTO requests SET ?";
    const csvFilePath = path.join(__dirname, "/content/requests.csv");
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            console.log(jsonObj); // for learning purpose
            jsonObj.forEach(element => {
                const endDate = element.endDate !== '' ? element.endDate : null;
                var NewEntry = {
                    serialNumber: element.serialNumber,
                    user: element.user,
                    cloth: element.cloth,
                    startDate: element.startDate,
                    notes: element.notes,
                    isApproved: element.isApproved,
                    endDate: endDate // Use the endDate variable here
                }
                SQL.query(Q2, NewEntry, (err, mysqlres) => {
                    if (err) {
                        console.log("error in inserting data", err);
                    }
                    console.log("created row successfully");
                });
            });
        });
    next();
};




const InsertDataYesNo = (req, res, next) => {
    var Q2 = "INSERT INTO yesNo SET ?";
    const csvFilePath = path.join(__dirname, "/content/yesNo.csv");
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            console.log(jsonObj); // for learning perpose
            jsonObj.forEach(element => {
                var NewEntry = {
                    "yesorno": element.yesorno
                }
                SQL.query(Q2, NewEntry, (err, mysqlres) => {
                    if (err) {
                        console.log("error in inserting data", err);
                    }
                    console.log("created row sucssefuly ");
                });
            });
        });
    next()
};

const InsertDataCities = (req, res, next) => {
    var Q2 = "INSERT INTO cities SET ?";
    const csvFilePath = path.join(__dirname, "/content/cities.csv");
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            console.log(jsonObj); // for learning perpose
            jsonObj.forEach(element => {
                var NewEntry = {
                    "city": element.city
                }
                SQL.query(Q2, NewEntry, (err, mysqlres) => {
                    if (err) {
                        console.log("error in inserting data", err);
                    }
                    console.log("created row sucssefuly ");
                });
            });
        });
    next()
};

const InsertDataCategories = (req, res, next) => {
    var Q2 = "INSERT INTO categories SET ?";
    const csvFilePath = path.join(__dirname, "/content/categories.csv");
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            console.log(jsonObj); // for learning perpose
            jsonObj.forEach(element => {
                var NewEntry = {
                    "category": element.category
                }
                SQL.query(Q2, NewEntry, (err, mysqlres) => {
                    if (err) {
                        console.log("error in inserting data", err);
                    }
                    console.log("created row sucssefuly ");
                });
            });
        });
    next()
};

const InsertDataColors = (req, res, next) => {
    var Q2 = "INSERT INTO colors SET ?";
    const csvFilePath = path.join(__dirname, "/content/colors.csv");
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            console.log(jsonObj); // for learning perpose
            jsonObj.forEach(element => {
                var NewEntry = {
                    "color": element.color
                }
                SQL.query(Q2, NewEntry, (err, mysqlres) => {
                    if (err) {
                        console.log("error in inserting data", err);
                    }
                    console.log("created row sucssefuly ");
                });
            });
        });
    next()
};

const InsertDataFabricTypes = (req, res, next) => {
    var Q2 = "INSERT INTO fabricTypes SET ?";
    const csvFilePath = path.join(__dirname, "/content/fabricTypes.csv");
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            console.log(jsonObj); // for learning perpose
            jsonObj.forEach(element => {
                var NewEntry = {
                    "fabricType": element.fabricType
                }
                SQL.query(Q2, NewEntry, (err, mysqlres) => {
                    if (err) {
                        console.log("error in inserting data", err);
                    }
                    console.log("created row sucssefuly ");
                });
            });
        });
    next()
};

const InsertDataSizes = (req, res, next) => {
    var Q2 = "INSERT INTO sizes SET ?";
    const csvFilePath = path.join(__dirname, "/content/sizes.csv");
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            console.log(jsonObj); // for learning perpose
            jsonObj.forEach(element => {
                var NewEntry = {
                    "size": element.size
                }
                SQL.query(Q2, NewEntry, (err, mysqlres) => {
                    if (err) {
                        console.log("error in inserting data", err);
                    }
                    console.log("created row sucssefuly ");
                });
            });
        });
    next()
};

const InsertDataStyles = (req, res, next) => {
    var Q2 = "INSERT INTO styles SET ?";
    const csvFilePath = path.join(__dirname, "/content/styles.csv");
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            console.log(jsonObj); // for learning perpose
            jsonObj.forEach(element => {
                var NewEntry = {
                    "style": element.style
                }
                SQL.query(Q2, NewEntry, (err, mysqlres) => {
                    if (err) {
                        console.log("error in inserting data", err);
                    }
                    console.log("created row sucssefuly ");
                });
            });
        });
    next()
};

const InsertDataGoals = (req, res, next) => {
    var Q2 = "INSERT INTO goals SET ?";
    const csvFilePath = path.join(__dirname, "/content/goals.csv");
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            console.log(jsonObj); // for learning perpose
            jsonObj.forEach(element => {
                var NewEntry = {
                    "goal": element.goal
                }
                SQL.query(Q2, NewEntry, (err, mysqlres) => {
                    if (err) {
                        console.log("error in inserting data", err);
                    }
                    console.log("created row sucssefuly ");
                });
            });
        });
    next()
};

const InsertDataRates = (req, res, next) => {
    var Q2 = "INSERT INTO rates SET ?";
    const csvFilePath = path.join(__dirname, "/content/rates.csv");
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            console.log(jsonObj); // for learning perpose
            jsonObj.forEach(element => {
                var NewEntry = {
                    serialNumber: element.serialNumber,
                    serialNumberRequests: element.serialNumberRequests,
                    cleanliness: element.cleanliness,
                    quality: element.quality,
                    reliability: element.reliability,
                    userText: element.userText
                }
                SQL.query(Q2, NewEntry, (err, mysqlres) => {
                    if (err) {
                        console.log("error in inserting data", err);
                    }
                    console.log("created row sucssefuly ");
                });
            });
        });
    next()
};

const InsertDataRateNumbers = (req, res, next) => {
    var Q2 = "INSERT INTO rateNumbers SET ?";
    const csvFilePath = path.join(__dirname, "/content/rateNumbers.csv");
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            console.log(jsonObj); // for learning perpose
            jsonObj.forEach(element => {
                var NewEntry = {
                    "rateNumber": element.rateNumber
                }
                SQL.query(Q2, NewEntry, (err, mysqlres) => {
                    if (err) {
                        console.log("error in inserting data", err);
                    }
                    console.log("created row sucssefuly ");
                });
            });
        });
    next()
};

const InsertDataClothes = (req, res, next) => {
    var Q2 = "INSERT INTO clothes SET ?";
    const csvFilePath = path.join(__dirname, "/content/clothes.csv");
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            console.log(jsonObj); // for learning perpose
            jsonObj.forEach(element => {
                var NewEntry = {
                    "serialNumber": element.serialNumber,
                    "user": element.user,
                    "category": element.category,
                    "color": element.color,
                    "fabricType": element.fabricType,
                    "size": element.size,
                    "style": element.style,
                    "goal": element.goal,
                    "picture": element.picture,
                    "available": element.available,
                    "city": element.city
                }
                SQL.query(Q2, NewEntry, (err, mysqlres) => {
                    if (err) {
                        console.log("error in inserting data", err);
                    }
                    console.log("created row sucssefuly ");
                });
            });
        });
    next()
};

const ShowTableCities = (req, res) => {
    var Q3 = "SELECT * FROM cities";
    SQL.query(Q3, (err, mySQLres1) => {
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        }
        console.log("showing table cities");
        res.send({ mySQLres1 });
        return;
    })
};

const ShowTableUsers = (req, res) => {
    var Q3 = "SELECT * FROM users";
    SQL.query(Q3, (err, mySQLres1) => {
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        }
        console.log("showing table users");
        res.send({ mySQLres1 });
        return;
    })
};
const ShowTableStyles = (req, res) => {
    var Q3 = "SELECT * FROM styles";
    SQL.query(Q3, (err, mySQLres1) => {
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        }
        console.log("showing table users");
        res.send({ mySQLres1 });
        return;
    })
};
const ShowTableClothes = (req, res) => {
    var Q3 = "SELECT * FROM clothes";
    SQL.query(Q3, (err, mySQLres1) => {
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        }
        console.log("showing table users");
        res.send({ mySQLres1 });
        return;
    })
};

const ShowTableRequest = (req, res) => {
    var Q3 = "SELECT * FROM requests";
    SQL.query(Q3, (err, mySQLres1) => {
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        }
        console.log("showing table requests");
        res.send({ mySQLres1 });
        return;
    })
};

module.exports = {
    ShowTableRequest, ShowTableClothes, ShowTableStyles, ShowTableCities, ShowTableUsers, CreateTableCategories, CreateTableCities, CreateTableColors, CreateTableFabricTypes, CreateTableGoals, CreateTableRateNumbers, CreateTableSizes, CreateTableStyles, CreateTableUsers, CreateTableYesNo, CreateTableClothes, CreateTableRequests, CreateTableRates,
    DropTableCategories, DropTableCities, DropTableColors, DropTableFabricTypes, DropTableGoals, DropTableRateNumbers, DropTableSizes, DropTableStyles, DropTableUsers, DropTableYesNo, DropTableClothes, DropTableRates, DropTableRequests,
    InsertDataCategories, InsertDataCities, InsertDataColors, InsertDataFabricTypes, InsertDataGoals, InsertDataRateNumbers, InsertDataSizes, InsertDataStyles, InsertDataUsers, InsertDataYesNo, InsertDataClothes, InsertDataRequests, InsertDataRates
}