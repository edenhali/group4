const sql = require('./db');
const path = require('path');


function isValidEmail(email) {
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return validEmail.test(email);
}

function isValidName(name) {
    const validFirstName = /^[a-zA-Z\s]+$/;
    return validFirstName.test(name);
}

function isValidPassword(password) {
    if (password.length < 8) {
        return false;
    }
    for (let i = 0; i < password.length; i++) {
        if (password[i] === " ") {
            return false;
        }
    }
    return true;
}

function isValidPhoneNumber(phoneNumber) {
    const validPhoneNumber = /^\d{10}$/;
    return validPhoneNumber.test(phoneNumber);
}

function isValidDate(dateString) {
    const validate = new Date(dateString);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - validate.getFullYear();
    const monthDiff = currentDate.getMonth() - validate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < validate.getDate())) {
        age--;
    }
    if (age < 16) {
        return false;
    }
    return true;
}

function renderError(res, message) {
    const Q1 = "SELECT * FROM cities";
    sql.query(Q1, (err, mysqlres1) => {
        if (err) {
            console.log('Error occurred while retrieving cities:', err);
            return res.status(500).send('Error occurred while retrieving cities.');
        }
        res.render('closet_signup', {
            city: mysqlres1,
            v1: message
        });
        return;
    });
}
const createUser = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "content cannot be empty" });
        return;
    }
    if (!req.body.email || !isValidEmail(req.body.email)) {
        const message = "Please enter a valid email";
        renderError(res, message);
        return;
    }

    if (!req.body.firstName || !isValidName(req.body.firstName)) {
        const message = "Please enter a valid first name";
        renderError(res, message);
        return;
    }

    if (!req.body.lastName || !isValidName(req.body.lastName)) {
        const message = "Please enter a valid last name";
        renderError(res, message);
        return;
    }

    if (!req.body.password || !isValidPassword(req.body.password)) {
        const message = "Password must be at least 8 characters long and not contain spaces";
        renderError(res, message);
        return;
    }

    if (!req.body.phoneNumber || !isValidPhoneNumber(req.body.phoneNumber)) {
        const message = "Please enter a valid phone number";
        renderError(res, message);
        return;
    }

    if (!req.body.dob || !isValidDate(req.body.dob)) {
        const message = "Please enter a valid birthdate-only 16+ can sign up";
        renderError(res, message);
        return;
    }
    const dateToday = new Date();
    const newUser = {
        "email": req.body.email,
        "firstname": req.body.firstName,
        "lastname": req.body.lastName,
        "password": req.body.password,
        "city": req.body.city,
        "picture": path.join('Static/photosFolder/' + req.body.picture),
        "phoneNumber": req.body.phoneNumber,
        "dob": req.body.dob,
        "joinDate": dateToday
    };
    const Q1 = "INSERT INTO users SET ?"
    sql.query(Q1, newUser, (err, mysqlres) => {
        if (err) {
            console.log("error:", err);
            res.status(400).render('closet', {
                v1: "The email already exists, login to the website",
            });
            return;
        }
        res.cookie("sign_in_user", req.body.email);
        res.render('closet', {
            user: newUser,
            v1: "Registration has been successfully completed, login to the website",
        });
        return;
    });
};

const addItem = (req, res) => {
    const v1 = req.query.v1 || '';
    const Q2 = 'SELECT * FROM categories';
    const Q3 = 'SELECT * FROM colors';
    const Q4 = 'SELECT * FROM fabricTypes';
    const Q5 = 'SELECT * FROM sizes';
    const Q6 = 'SELECT * FROM styles';
    const Q7 = 'SELECT * FROM goals';
    const Q8 = 'SELECT * FROM cities';

    sql.query(Q2, (err, mysqlres1) => {
        if (err) {
            console.log('Error occurred while retrieving categories:', err);
            return res.status(500).send('Error occurred while retrieving categories.');
        }

        sql.query(Q3, (err, mysqlres2) => {
            if (err) {
                console.log('Error occurred while retrieving colors:', err);
                return res.status(500).send('Error occurred while retrieving colors.');
            }

            sql.query(Q4, (err, mysqlres3) => {
                if (err) {
                    console.log('Error occurred while retrieving fabric types:', err);
                    return res.status(500).send('Error occurred while retrieving fabric types.');
                }

                sql.query(Q5, (err, mysqlres4) => {
                    if (err) {
                        console.log('Error occurred while retrieving sizes:', err);
                        return res.status(500).send('Error occurred while retrieving sizes.');
                    }

                    sql.query(Q6, (err, mysqlres5) => {
                        if (err) {
                            console.log('Error occurred while retrieving styles:', err);
                            return res.status(500).send('Error occurred while retrieving styles.');
                        }

                        sql.query(Q7, (err, mysqlres6) => {
                            if (err) {
                                console.log('Error occurred while retrieving goals:', err);
                                return res.status(500).send('Error occurred while retrieving goals.');
                            }

                            sql.query(Q8, (err, mysqlres7) => {
                                if (err) {
                                    console.log('Error occurred while retrieving cities:', err);
                                    return res.status(500).send('Error occurred while retrieving cities.');
                                }
                                res.render('closet_addItem', {
                                    v1: v1,
                                    category: mysqlres1,
                                    color: mysqlres2,
                                    fabricType: mysqlres3,
                                    size: mysqlres4,
                                    Style: mysqlres5,
                                    goal: mysqlres6,
                                    city: mysqlres7
                                });
                                return;
                            });
                        });
                    });
                });
            });
        });
    });
};


const createCloth = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Please fill all fields" });
        return;
    }
    const Q1 = "INSERT INTO clothes SET ?";
    const user = req.cookies.sign_in_user;
    const Q3 = "SELECT * FROM clothes";
    const Q4 = "SELECT * FROM yasNo WHERE yesNo = 'yes'";

    sql.query(Q3, (err, result) => {
        if (err) {
            console.log("error:", err);
            res.status(400).redirect('/addItem?v1=The item didnt add');
            return;
        }
        const newSerialNumber = result.length + 1;
        const newCloth = {
            "serialNumber": newSerialNumber,
            "user": user,
            "category": req.body.category,
            "color": req.body.colorPicker,
            "fabricType": req.body.fabricType,
            "size": req.body.size,
            "style": req.body.Style,
            "goal": req.body.goal,
            "picture": 'Static/photosFolder/' + req.body.picture,
            "available": Q4.toString(),
            "city": req.body.city
        }
        sql.query(Q1, newCloth, (err, mysqlres) => {
            if (err) {
                console.log("error:", err);
                res.status(400).redirect('/addItem?v1=The item didnt add');
                return;
            }
            res.redirect('/addItem?v1=The item added successfully');
            return;
        });
    });
};

const createNewRate = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Please fill all fields" });
        return;
    }
    const Q1 = "INSERT INTO rates SET ?";
    const Q2 = "SELECT * FROM rates";
    sql.query(Q2, (err, result) => {
        if (err) {
            console.log("error:", err);
            res.status(400).redirect('/MyOrders?v1=The rate didnt add');
            return;
        }
        const newSerialNumber = result.length + 1;
        const newRate = {
            "serialNumber": newSerialNumber,
            "serialNumberRequests": req.body.serialNumberRequest,
            "cleanliness": req.body.ratingCleanliness,
            "quality": req.body.ratingQuality,
            "reliability": req.body.ratingReliability,
            "userText": req.body.text
        }
        sql.query(Q1, newRate, (err, mysqlres) => {
            if (err) {
                console.log("error:", err);
                res.status(400).redirect('/MyOrders?v1=The rate didnt add');
                return;
            }
            res.redirect('/MyOrders?v1=The rate added successfully');
            return;
        });
    });
};

const createRequest = (cloth, serialNumber, req, res) => {
    if (!req.body.startDate) {
        res.status(400).send({ message: "Please fill all date fields" });
        return;
    }
    const Q1 = "INSERT INTO requests SET ?";
    const Q2 = "SELECT * FROM requests";
    sql.query(Q2, (err, result) => {
        if (err) {
            console.log("error:", err);
            return res.status(500).send('Error occurred while retrieving requests.');;
        }
        const newSerialNumber = result.length + 1;
        let endDate = null;  //for clothes that their goal is taking
        if (req.body.endDate) { // for clothes that their goal is rent
            endDate = req.body.endDate;
        };
        const newRequest = {
            serialNumber: newSerialNumber,
            user: req.cookies.sign_in_user,
            cloth: cloth,
            startDate: req.body.startDate,
            notes: req.body.textBox,
            isApproved: null,
            endDate: endDate
        };
        sql.query(Q1, newRequest, (err, mysqlres) => {
            if (err) {
                console.log("error:", err);
                res.status(400).redirect('/MyOrders?v1=The request didnt add');
                return;
            }
            res.redirect('/MyOrders?v1=The request added successfully');
            return;
        });
    });
};

const goToMyCloset = (req, res) => {
    const user = req.cookies.sign_in_user;
    const Q1 = `SELECT * FROM clothes WHERE user LIKE '${user}'`;
    const Q2 = `SELECT firstName FROM users WHERE email LIKE '${user}'`;
    const Q3 = `SELECT lastName FROM users WHERE email LIKE '${user}'`;
    const Q4 = `SELECT picture FROM users WHERE email LIKE '${user}'`;
    sql.query(Q1, user, (err, mysqlres1) => {
        if (err) {
            console.log("error:", err);
            res.status(400).send({ message: "Error occurred while retrieving data." });
            return;
        };
        sql.query(Q2, user, (err, mysqlres2) => {
            if (err) {
                console.log("error:", err);
                res.status(400).send({ message: "Error occurred while retrieving data" });
                return;
            };
            sql.query(Q3, user, (err, mysqlres3) => {
                if (err) {
                    console.log("error:", err);
                    res.status(400).send({ message: "Error occurred while retrieving data" });
                    return;
                };
                sql.query(Q4, user, (err, mysqlres4) => {
                    if (err) {
                        console.log("error:", err);
                        res.status(400).send({ message: "Error occurred while retrieving data" });
                        return;
                    };
                    const serialNumbersUserClothes = mysqlres1.map((row) => row.serialNumber);
                    const picturePromises = serialNumbersUserClothes.map((serialNumber) => {
                        return new Promise((resolve, reject) => {
                            const Q5 = `SELECT picture FROM clothes WHERE serialNumber = '${serialNumber}'`;
                            sql.query(Q5, (err, pictureResult) => {
                                if (err) {
                                    console.log("error:", err);
                                    reject(err);
                                } else {
                                    resolve(pictureResult[0].picture);
                                }
                            });
                        });
                    });
                    Promise.all(picturePromises)
                        .then((pictures) => {
                            res.render('closet_userCloset', {
                                serialNumbersUserClothes: serialNumbersUserClothes,
                                pictures: pictures,
                                firstName: mysqlres2[0].firstName,
                                lastName: mysqlres3[0].lastName,
                                profilePicture: mysqlres4[0].picture
                            });
                        })
                        .catch((err) => {
                            console.log("error:", err);
                            res.status(400).send({ message: "error" });
                        });
                });
            });
        });
    });
}

const signUp = (req, res) => {
    const Q1 = "SELECT * FROM cities";
    sql.query(Q1, (err, mysqlres1) => {
        if (err) {
            console.log('Error occurred while retrieving cities:', err);
            return res.status(500).send('Error occurred while retrieving cities.');
        }
        res.render('closet_signup', {
            city: mysqlres1
        });
        return;
    });
};

const validateUser = (req, res) => {
    if (!req.body.Email) {
        res.status(400).send({ message: "content cannot be empty" });
        return;
    }
    const Q1 = "SELECT * FROM users WHERE email=? AND password=?";
    sql.query(Q1, [req.body.Email, req.body.password], (err, mysqlres) => {
        if (err) {
            console.log("Error:", err);
            res.status(500).send({ message: "An error occurred" });
            return;
        }
        if (mysqlres.length > 0) {
            res.cookie("sign_in_user", req.body.Email);
            const Q2 = "SELECT * FROM categories";
            const Q3 = "SELECT * FROM colors";
            const Q4 = "SELECT * FROM fabricTypes";
            const Q5 = "SELECT * FROM sizes";
            const Q6 = "SELECT * FROM styles";
            const Q7 = "SELECT * FROM goals";
            const Q8 = "SELECT * FROM cities";
            sql.query(Q2, (err, mysqlres1) => {
                if (err) {
                    console.log("error:", err);
                    res.status(400).send({ message: "An error occurred while fetching" });
                    return;
                };
                sql.query(Q3, (err, mysqlres2) => {
                    if (err) {
                        console.log("error:", err);
                        res.status(400).send({ message: "An error occurred while fetching" });
                        return;
                    };
                    sql.query(Q4, (err, mysqlres3) => {
                        if (err) {
                            console.log("error:", err);
                            res.status(400).send({ message: "An error occurred while fetching" });
                            return;
                        };
                        sql.query(Q5, (err, mysqlres4) => {
                            if (err) {
                                console.log("error:", err);
                                res.status(400).send({ message: "An error occurred while fetching" });
                                return;
                            };
                            sql.query(Q6, (err, mysqlres5) => {
                                if (err) {
                                    console.log("error:", err);
                                    res.status(400).send({ message: "An error occurred while fetching" });
                                    return;
                                };
                                sql.query(Q7, (err, mysqlres6) => {
                                    if (err) {
                                        console.log("error:", err);
                                        res.status(400).send({ message: "An error occurred while fetching" });
                                        return;
                                    };
                                    sql.query(Q8, (err, mysqlres7) => {
                                        if (err) {
                                            console.log("error:", err);
                                            res.status(400).send({ message: "An error occurred while fetching" });
                                            return;
                                        };
                                        res.cookie("sign_in_user", req.body.Email);
                                        const user = req.cookies.sign_in_user;
                                        res.render('closet_search', {
                                            category: mysqlres1,
                                            color: mysqlres2,
                                            fabricType: mysqlres3,
                                            size: mysqlres4,
                                            Style: mysqlres5,
                                            goal: mysqlres6,
                                            city: mysqlres7
                                        });
                                        return;
                                    });
                                });
                            });
                        });
                    });
                });
            });
        }
        else {
            console.log("error: ", err);
            res.status(400).render('closet', {
                v1: "The details you entered are incorrect",
            });
            return;
        }
    });
};

const searchItems = (req, res) => {
    const user = req.cookies.sign_in_user;
    const Q2 = "SELECT * FROM categories";
    const Q3 = "SELECT * FROM colors";
    const Q4 = "SELECT * FROM fabricTypes";
    const Q5 = "SELECT * FROM sizes";
    const Q6 = "SELECT * FROM styles";
    const Q7 = "SELECT * FROM goals";
    const Q8 = "SELECT * FROM cities";
    sql.query(Q2, (err, mysqlres1) => {
        sql.query(Q3, (err, mysqlres2) => {
            sql.query(Q4, (err, mysqlres3) => {
                sql.query(Q5, (err, mysqlres4) => {
                    sql.query(Q6, (err, mysqlres5) => {
                        sql.query(Q7, (err, mysqlres6) => {
                            sql.query(Q8, (err, mysqlres7) => {
                                res.render('closet_search', {
                                    category: mysqlres1,
                                    color: mysqlres2,
                                    fabricType: mysqlres3,
                                    size: mysqlres4,
                                    Style: mysqlres5,
                                    goal: mysqlres6,
                                    city: mysqlres7
                                });
                                return;
                            });
                        });
                    });
                });
            });
        });
    });
};

const createRate = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Please fill all fields" });
        return;
    }
    const Q1 = "INSERT INTO rates SET ?";
    const Q2 = "SELECT * FROM users WHERE email=?";
    const Q3 = "SELECT * FROM clothes";
    const Q4 = "SELECT * FROM clothes WHERE ";
    const contact = {
        "serialNumber": Q3.length + 1,
        "user": Q2.email,
        "cloth": Q4,
        "ratingCleanliness": req.body.cleanliness,
        "ratingQuality": req.body.quality,
        "ratingReliability": req.body.reliability,
        "Checkbox": req.body.userText
    }
    sql.query(Q1, contact, (err, mysqlres) => {
        if (err) {
            res.status(400).send({ message: "There is an error, the item was not uploaded" });
            return;
        };
        res.redirect('closet');
        return;
    });
};

const selectItemsBySearch = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "content cannot be empty" });
        return;
    }
    const {
        category,
        color,
        fabricType,
        size,
        Style,
        goal,
        city
    } = req.body;
    // Construct the SQL query based on the selected search criteria
    let query = "SELECT * FROM clothes WHERE 1=1";
    let params = [];

    if (category) {
        query += " AND category LIKE ?";
        params.push(category);
    }

    if (color) {
        query += " AND color LIKE ?";
        params.push(color);
    }

    if (fabricType) {
        query += " AND fabricType LIKE ?";
        params.push(fabricType);
    }

    if (size) {
        query += " AND size LIKE ?";
        params.push(size);
    }

    if (Style) {
        query += " AND Style LIKE ?";
        params.push(Style);
    }

    if (goal) {
        query += " AND goal LIKE ?";
        params.push(goal);
    }

    if (city) {
        query += " AND city LIKE ?";
        params.push(city);
    }

    sql.query(query, params, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving search results');
        } else {
            const resultsWithCloth = results.map((result) => {
                return {
                    ...result,
                    cloth: {
                        serialNumber: result.serialNumber,
                        picture: result.picture
                    }
                };
            });
            res.render('search_res', { res: resultsWithCloth });
        }
    });
};

const showOrders = (req, res) => {
    const v1 = req.query.v1 || '';
    const user = req.cookies.sign_in_user;
    const Q1 = `SELECT r.serialNumber AS request, c.serialNumber AS cloth, c.picture AS picture, r.isApproved AS isApproved, r.notes AS notes, c.user AS userCloth, r.user AS userConnect
     FROM requests as r LEFT JOIN clothes as c ON c.serialNumber = r.cloth WHERE r.user LIKE '${user}'`;
    sql.query(Q1, user, (err, mysqlres1) => {
        if (err) {
            console.log("error:", err);
            res.status(400).send({ message: "error" });
            return;
        };
        res.render('rate_item', {
            v1: v1,
            data: mysqlres1
        });
        return;
    });
}

const viewCloth = (cloth, serialNumber, view, res) => {
    sql.query('SELECT * FROM clothes WHERE serialNumber = ?', [serialNumber], (err, result) => {
        if (err) {
            console.log('Error retrieving cloth details', err);
            res.status(400).send({ message: "error" });
            return;
        }
        if (result.length === 0) {
            console.log('Cloth not found');
            return;
        }
        const clothDetails = result[0];
        res.render('closet_details', {
            cloth: cloth,
            serialNumber: clothDetails.serialNumber,
            category: clothDetails.category,
            color: clothDetails.color,
            fabricType: clothDetails.fabricType,
            size: clothDetails.size,
            style: clothDetails.style,
            goal: clothDetails.goal,
            picture: clothDetails.picture,
            availability: clothDetails.availability,
            view: view
        });
        return;
    });
};

const tryDeleteCloth = (cloth, serialNumber, res) => {
    res.render('confirm_delete', {
        serialNumber: serialNumber,
        cloth: cloth
    });
};

const deleteCloth = (cloth, serialNumber, res) => {
    sql.query('DELETE FROM clothes WHERE serialNumber = ?', [serialNumber], (err, result) => {
        if (err) {
            console.log('Error deleting cloth', err);
            res.status(500).send('Error deleting cloth');
            return;
        }
        console.log('Cloth deleted successfully');
        res.send('<script>alert("Cloth deleted successfully"); window.location.href="/MyCloset";</script>');
        return;
    });
};


const showRequestsFromMe = (req, res) => {
    const user = req.cookies.sign_in_user;
    const Q1 = `SELECT r.serialNumber AS request, c.serialNumber AS cloth, c.picture AS picture, r.isApproved AS isApproved, r.notes AS notes, c.user AS userCloth, r.user AS userConnect, r.startDate AS startDate, r.endDate AS endDate
     FROM requests as r LEFT JOIN clothes as c ON c.serialNumber = r.cloth WHERE c.user LIKE '${user}'`;
    sql.query(Q1, user, (err, mysqlres1) => {
        if (err) {
            console.log("error:", err);
            res.status(400).send({ message: "error" });
            return;
        };
        res.render('accept_reject', {
            data: mysqlres1
        });
        return;
    });
}

const ShowRate = (cloth, serialNumber, view, res) => {
    const Q1 = `SELECT requests.cloth, AVG(r.cleanliness) AS avg_cleanliness, AVG(r.quality) AS avg_quality, AVG(r.reliability) AS avg_reliability
                FROM requests 
                JOIN rates r ON requests.serialNumber = r.serialNumberRequests
                WHERE requests.cloth  LIKE '${serialNumber}'
                GROUP BY requests.cloth`;
    const Q2 = `SELECT picture FROM clothes WHERE serialNumber = '${serialNumber}'`;

    sql.query(Q1, (err, mysqlres1) => {
        if (err) {
            console.log("error:", err);
            res.status(400).send({ message: "error" });
            return;
        }
        sql.query(Q2, (err, mysqlres2) => {
            if (err) {
                console.log("error:", err);
                res.status(400).send({ message: "error" });
                return;
            }
            const picture = mysqlres2[0].picture;
            res.render('show_rating', { result: mysqlres1, clothSerialNumber: serialNumber, picture, view, cloth });
        });
    });
};

const RateAnItem = (serialNumberC, serialNumberR, res) => {
    const Q1 = `SELECT * FROM rates WHERE rates.serialNumberRequests LIKE '${serialNumberR}'`;
    const Q2 = `SELECT picture FROM clothes WHERE clothes.serialNumber LIKE '${serialNumberC}'`;
    sql.query(Q1, (err, mysqlres1) => {
        if (err) {
            console.log("error:", err);
            res.status(400).send({ message: "error" });
            return;
        }
        sql.query(Q2, (err, mysqlres2) => {
            if (err) {
                console.log("error:", err);
                res.status(400).send({ message: "error" });
                return;
            }
            if (mysqlres1.length === 0) {
                res.render('rateTheItem', {
                    requestSerialNumber: serialNumberR,
                    picture: mysqlres2[0].picture
                });
                return;
            }
            if (mysqlres1 != null) {
                res.render('showMyRating', {
                    result: mysqlres1,
                    clothSerialNumber: serialNumberC,
                    picture: mysqlres2[0].picture
                });
                return;
            }
        });
    });
}

const UpdeteReq = (request, comment, res) => {
    const Q1 = 'UPDATE requests SET isApproved = ? WHERE serialNumber = ?';
    const updateParams = [comment, request];
    sql.query(Q1, updateParams, (err, mysqlres) => {
        if (err) {
            console.log("error:", err);
            res.status(400).send({ message: "error" });
            return;
        }
        res.redirect('/RequestsFromMyCloset');
    });

}


const requestItem = (cloth, serialNumber, res) => {
    const query = 'SELECT picture,goal FROM clothes WHERE serialNumber = ?';
    sql.query(query, [serialNumber], (err, results) => {
        if (err) {
            console.error('Error retrieving', err);
            res.status(400).send({ message: "error" });
            return;
        } else {
            const picture = results[0] ? results[0].picture : '';
            const goal = results[0].goal;
            res.render('request_item', { picture: `/${picture}`, serialNumber, cloth, goal });
        }
    });
};



module.exports = { createRequest, requestItem, UpdeteReq, RateAnItem, ShowRate, showRequestsFromMe, deleteCloth, tryDeleteCloth, viewCloth, createNewRate, showOrders, signUp, createRate, createCloth, createUser, validateUser, selectItemsBySearch, searchItems, addItem, goToMyCloset };