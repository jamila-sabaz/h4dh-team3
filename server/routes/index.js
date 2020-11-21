var express = require('express');
var router = express.Router();

var sanitizeHtml = require('sanitize-html');
var argon2 = require('argon2');

module.exports = router;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// user signing up
router.post('/sign-up-user', async function(req, res, next) {
  var p = sanitizeHtml(req.body.password);
  var e = sanitizeHtml(req.body.email);

  if (p == "" || e == "") {
    res.sendStatus(400);
  } else {
      var phash = null;
  try {
    phash = await argon2.hash(p);
  } catch (err) {
    res.sendStatus(500);
    return;
  }

  req.pool.getConnection( function(err,connection) {
	  if (err) {
		  res.sendStatus(500);
		  return;
	  }

    	// check if email is in the list
		var query = "SELECT * FROM Users WHERE email = ?";
  		connection.query(query, [e], function(err, rows, fields) {
    	if (err) {
    	    console.log(err);
  			res.sendStatus(500);
  			return;
  		}

  		if (rows == "") {
  			// insert new user
			var query = "INSERT INTO Users (password, email, isManager) VALUES (?, ?, 0)";
			connection.query(query, [phash, e], function(err, rows, fields) {
			if (err) {
				console.log(err);
				res.sendStatus(500);
				return;
			}
			req.session.user = e;
		  	res.sendStatus(200);
		  });

  		} else {
  		  connection.release();
  		  res.status(401).send();
  		}
    });
  });
  }
});


// manager signing up
router.post('/sign-up-manager', async function(req, res, next) {
  var p = sanitizeHtml(req.body.password);
  var e = sanitizeHtml(req.body.email);

  if (p == "" || e == "") {
    res.sendStatus(400);
  } else {
      var phash = null;
  try {
    phash = await argon2.hash(p);
  } catch (err) {
    res.sendStatus(500);
    return;
  }

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

      // check if email is in the list
    var query = "SELECT * FROM Users WHERE email = ?";
      connection.query(query, [e], function(err, rows, fields) {
      if (err) {
          console.log(err);
        res.sendStatus(500);
        return;
      }

      if (rows == "") {
        // insert new manager
        var query = "INSERT INTO Users (password, email, isManager) VALUES (?, ?, 1)";
        connection.query(query, [phash, e], function(err, rows, fields) {
        if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
        }
        req.session.user = e;
        res.sendStatus(200);
      });

      } else {
        connection.release();
        res.status(401).send();
      }
    });
  });
 }
});

router.post('/log-in', async function(req, res, next) {
  var e = sanitizeHtml(req.body.email);
  var p = sanitizeHtml(req.body.password);
  var phash = "";

  req.pool.getConnection( function(err,connection) {
	  if (err) {
		  res.sendStatus(500);
		  return;
	  }

	  var query = "SELECT * FROM Users WHERE email = ?";
    connection.query(query, [e], async function(err, rows, fields) {
    connection.release();    		// release connection
    if (err) {
  		res.sendStatus(500);
  		return;
  	}
     // if no user found
  	if (rows == "") {
      connection.release();
  	  res.status(400).send();

  	} else {
  	  phash = rows[0].password;
  	  try {
        if (await argon2.verify(phash, p)) {
          //record details - user / manager?
          req.session.user = e;
          req.session.status = rows[0].isManager;
          console.log(req.session);
          res.send(rows[0].isManager);
        } else {
          res.sendStatus(401);
          return;
        }
      } catch (err) {    // internal failure
        console.log(err);
        res.sendStatus(500);
        return;
      }
		}
  });
 });
});

router.post('/log-out', function(req, res, next) {
  console.log(req.session);
  delete req.session.user;

  res.status(200).send();

  console.log(req.session);
});