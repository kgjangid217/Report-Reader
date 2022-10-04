let allPrescriptionsData = [];
getPrescriptions()
function getPrescriptions() {
   $.ajax({
        url: '/prescriptions',
        type: 'GET',
        success: (result) => {
            allPrescriptionsData = result.data;
        }
    })
}

const recognitionImageInputElement = document.getElementById(
'recognition-image-input',
);
const prescriptionBox = document.getElementById('prescription-box')
prescriptionBox.style.visibility = "hidden";

recognitionImageInputElement.addEventListener('change', () => {
  const file = recognitionImageInputElement.files[0];
  console.log("file uploaded", file)

  Tesseract.recognize(
  file,
  'eng',
  { logger: m => {
    console.log(m);

  }}
).then(({data}) => {
  console.log(data, "finalData");
  prescriptionBox.style.visibility = "visible";

  for(let j = 0; j< data.lines.length; j++) {
    let line = data.lines[j];

    for(let i =0; i< allPrescriptionsData.length; i++) {
      // "kartik \n".includes("kartik") = true;
      if(line.text.toLowerCase().includes(allPrescriptionsData[i].name.toLowerCase())) {
        let html = "";
        html += `<div class="row" style ="width: 500px;">
          <div class="col s12 m6" style ="width: 500px;">
            <div class="card blue-grey darken-1">
              <div class="card-content white-text">
                <span class="card-title">${allPrescriptionsData[i].name}</span>
                <p>${allPrescriptionsData[i].description}.</p>
                <br>
                <p>sideEffects: ${allPrescriptionsData[i].sideEffects}</p>
              </div>
            </div>
          </div>
        </div>`

        document.getElementById("suggested-medicine").innerHTML = html;
        break;
      }
    }
  }
})
})


$(document).ready(function(){
  $('.carousel').carousel();
  $('.materialboxed').materialbox();
  $('.modal').modal();
})