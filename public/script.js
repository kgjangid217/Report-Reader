const submitForm = async (e) =>  {
    e.preventDefault();
    let formData = {};
    formData.first_name = $('#first_name').val();
    formData.last_name = $('#last_name').val();
    formData.password = $('#password').val();
    formData.email = $('#email').val();
    let response

   fetch('http://localhost:3000/api/form', {
        headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
      method: 'POST',
      body: JSON.stringify(formData),
    }).then((status) => {
      response = status
      return status.json()

    }).then((statusBody) => {
      console.log(response, statusBody);

      if(response.status == 200) {
        console.log("Form Data Submitted: ", response);
          M.toast({html: '  <div class="card-panel green darken-2">' + statusBody.message + '</div>', class: 'round'})
          $("#modal1").modal();
      }
      else {
         M.toast({html: '  <div class="card-panel deep-orange darken-3">' + statusBody.message + '</div>', class: 'rounded'})
      console.log("error occurred Post form: ", response)
      }
    })
 
}

$(document).ready(function(){
    $('.materialboxed').materialbox();
    $('.modal').modal();
    $('#formSubmit').click(async (e)=>{
        await submitForm(e);
        return 0;
    })
})