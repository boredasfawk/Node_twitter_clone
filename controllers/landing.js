const models = require("../models");
// renders landing page
exports.get_landing = function(req, res, next) {
  res.render("landing", { title: "Express", user: req.user });
};

// submit inputted email into DB
exports.submit_lead = function(req, res, next) {
  // test
  console.log("lead email: ", req.body.lead_email);

  return models.Lead.create({
    email: req.body.lead_email
  }).then(lead => {
    res.redirect("/leads");
  });
};

// full list of leads
exports.show_leads = function(req, res, next) {
  return models.Lead.findAll().then(leads => {
    res.render("lead/leads", { title: "Express", leads: leads });
  });
};

// shows individual lead
exports.show_lead = function(req, res, next) {
  return models.Lead.findOne({
    where: {
      id: req.params.lead_id
    }
  }).then(lead => {
    res.render("lead/lead", { lead: lead });
  });
};

// displays form to update/edit leads
exports.show_edit_lead = function(req, res, next) {
  return models.Lead.findOne({
    where: {
      id: req.params.lead_id
    }
  }).then(lead => {
    res.render("lead/edit_lead", { lead: lead });
  });
};

// edit route
exports.edit_lead = function(req, res, next) {
  req.params.lead_id;
  req.body.lead_email;

  return models.Lead.update(
    {
      email: req.body.lead_email
    },
    {
      where: {
        id: req.params.lead_id
      }
    }
  ).then(result => {
    res.redirect("/lead/" + req.params.lead_id);
  });
};

// deletes lead
exports.delete_lead = function(req, res, next) {
  return models.Lead.destroy({
    where: {
      id: req.params.lead_id
    }
  }).then(result => {
    res.redirect("/leads");
  });
};

// deletes lead and send back json object
exports.delete_lead_json = function(req, res, next) {
  return models.Lead.destroy({
    where: {
      id: req.params.lead_id
    }
  }).then(result => {
    res.send({ msg: "success" });
  });
};
