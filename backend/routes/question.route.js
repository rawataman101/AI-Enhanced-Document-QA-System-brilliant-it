const router = require("express").Router();
const { askquestionController } = require("../controllers/question.controller");

router.post("/question", askquestionController);

module.exports = router;
