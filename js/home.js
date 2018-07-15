$(document).ready(function () {

  $(".submit_an_ad").click(function () {
    $(".ads").css("display", "none")
    $(".browseCategory").css("display", "none")
    $(".submit_ad").css("display", "block")
  });

  $(".return_home").click(function () {
    $(".submit_ad").css("display", "none")
    $(".browseCategory").css("display", "none")
    $(".ads").css("display", "block")
    $(".ad1").remove();
  });

  $(".browseCategory1").click(function () {
    $(".submit_ad").css("display", "none")
    $(".ads").css("display", "none")
    $(".browseCategory").css("display", "block")
    $(".ad1").remove();
  });

});


var _db = firebase.database();
var addSubmitted = document.getElementById('submission_ad');
var form = document.querySelector('form');
var formData = new FormData(form);

AddingAds();

addSubmitted.addEventListener('click', e => {
  const newAds = _db.ref('ADS').push();
  const newAd = {
  };
  
  
  const ref = firebase.storage().ref();
  const file = $('#exampleInputFile').get(0).files[0];
  const name = (+new Date() + '-' + file.name);
  const task = ref.child(name).put(file, {contentType: file.type});
  
  function abc() {
    task.snapshot.ref.getDownloadURL().then((downloadURL) => {
      console.log('File available at', downloadURL); 
      var ab = downloadURL;
      console.log(ab);
      newAds.update({ picLink: downloadURL });
    });
    
    task.catch(error => {
      // Use to signal error if something goes wrong.
      console.log(`Failed to upload file and get link - ${error}`);
    });
    
  }
  
  setTimeout(abc,8000);
  
  
  
  
  var selectBox = document.getElementById("myselect");
  var opNo = selectBox.options[selectBox.selectedIndex].value;
  newAd.adTitle = document.getElementById('title').value;
  newAd.adDescription = document.getElementById('description').value;
  newAd.adCategory = opNo;
  // newAd.picLink = picLinkReturn;
  newAds.set(newAd);
  console.log('Ad added successfully');
  return false;
  form.reset();
  });



function AddingAds() {
  var adsRef = _db.ref('ADS');
  adsRef.on('child_added', (data) => {
    var div = document.createElement("div");
      div.className += "jumbotron ads"
      document.body.appendChild(div);
      console.log(data.val(), data.key);
      var generateAd = generateRow(data.val(), data.key);
      div.innerHTML += generateAd;
    });
  }

  function generateRow(data, key) {
    return `<h1 class="display-4 ad_title">${data.adTitle}</h1>
    <img src=${data.picLink} height="225" width="225" class="ad_image" alt="logo">   
    <p class="lead ad_description">${data.adDescription} </p>
        <button type="button" class="btn btn-info">View Details</button>
        <button type="submit" class="btn btn-danger" onclick="deletingAd('${key}',this)">Delete this Ad</button>`
  }

  function deletingAd(key, generateAd) {
    $(generateAd).parent().remove();
    var ref = _db.ref('ADS/' + key).set({});
  }


  

  var catSearch = document.getElementById('gettingCategory');
  catSearch.addEventListener('click', e => {
    e.preventDefault();
    $(".ad1").remove();
    var selectBox = document.getElementById("catSelect");
    var opNo = selectBox.options[selectBox.selectedIndex].value;

    let ref = firebase.database().ref("ADS");
    ref.orderByChild("adCategory").equalTo(opNo).on("child_added", function (snapshot) {
      console.log(snapshot.key);
      var keyofAd = snapshot.key;
      var div = document.createElement("div");
      div.className += "jumbotron ads ad1"
      document.body.appendChild(div);
      var generateAd = generateRow(snapshot.val(), keyofAd);
      div.innerHTML += generateAd;
    });

  });


