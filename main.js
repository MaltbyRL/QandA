'use strict';
var $postersName;
var $postersQuestion;
var questionID;


var ref = new Firebase('https://richardsquestionapp.firebaseio.com/')
var newQuestionRef = ref.child('Questions');



$(document).ready(init);

function init(){
$('#postQuestion').click(postQuestion);
$('table').on("click", ".answersBTN", answerBTN);
$('#myModal').on("click", ".submitAnswer", submitAnswers);
}

function postQuestion(){
  $postersName = $("#postersName").val();
  $postersQuestion = $("#postersQuestion").val();
  $("#postersName").val("");
  $("#postersQuestion").val("");
  console.log($postersName);
  console.log($postersQuestion);
  newQuestionRef.push({
    "postersName": $postersName,
    "postersQuestion": $postersQuestion
  });
}



newQuestionRef.on('value', function(snap) {
  var $rows = [];
  console.log("snap:", typeof snap.val());
  var obj = snap.val()
  for(var i in obj){

    var posted = obj[i];
    var postedKey = i;
    var $answer= $('<input class="answersBTN" data-toggle="modal" data-target="#myModal" type="button" id ="'+ postedKey +'" value="Answer"/>')
    var $name = posted.postersName;
    var $question = posted.postersQuestion;

    console.log("button id value:", $answer.val());


    var $tr = $('#template').clone();
    $tr.removeAttr("id");
    $tr.removeAttr("style");
    $tr.children('.name').text($name);
    $tr.children('.question').text($question);
    $tr.children('.answer').append($answer);

    // $('#template').hide();
    $rows.push($tr);
  //  $('.tableBody').empty();
    $('.tableBody').append($rows);
    console.log("row:", $rows);

  }
  // obj.forEach(function(childsnap){
  //
  // })
  // $('.tableBody').empty();
});

var answerKey;
function answerBTN(e){

  console.log("buttonClicked");
  console.log($(this).attr('id'));
  var refNum = $(this).attr('id');
  console.log("refNum:", refNum);
  answerKey = refNum;
  // console.log("snap:", snap)

  newQuestionRef.child(refNum).once('value', function(snap){
    console.log("snap2:", snap.val() )
    var postersName = snap.val().postersName;
    console.log("posters:", postersName);
    var postersQuestion = snap.val().postersQuestion;
    console.log("question:", postersQuestion);

    $(".pName").text(postersName);
    $(".pQuestion").text(postersQuestion);

  })

}
ref.childkey


function submitAnswers(e){
  console.log("button Clicked");
  console.log("key:", answerKey);
  $posteredAnswer = $("$inputAnswer").val();
  console.log("answer:", $posteredAnswer);
  newQuestionRef.push({
    "posteredAnswer": $posteredAnswer,

  });
}
