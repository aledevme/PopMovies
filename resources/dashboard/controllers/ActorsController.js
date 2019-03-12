$(document).ready(function(){
    $('.modal').modal();

    showTable();
    
});

const APIActors = '../../global/api/actors.php?site=dashboard&action=';

//Create Actor
$('#form-create').submit(function(){
    event.preventDefault();
    $.ajax({
      url: APIActors + 'createActor',
      type: 'post',
      data: new FormData($('#form-create')[0]),
      datatype: 'json',
      cache: false,
      contentType: false,
      processData: false
    })
    .done(function(response){
      if (isJSONString(response)) {
        const result = JSON.parse(response);
        if (result.status) {
            $('#form-create')[0].reset();
           
            if (result.status == 1) {
                M.toast({html: 'Actor Creado Correctamente!'})
                showTable();
              } 
        } else {
            alert(result.exception);
        }
    } else {
        console.log(response);
    }

  })
  .fail(function(jqXHR){
    console.log('Error: ' + jqXHR.status + ' ' + jqXHR.statusText);
  });

})
//Show all Actors
function fillTable(rows)
{
    let content = '';
    rows.forEach(function(row){
        content += `
            <tr>
                <td>${row.name}</td>
                <td>
                    <a href="#" onclick="ShowInformation(${row.id})" class="blue-text tooltipped modal-trigger" data-target="updateActor" data-tooltip="Modificar"><i class="material-icons">mode_edit</i></a>
                    <a href="#" onclick="ShowInformationDelete(${row.id})" class="red-text tooltipped modal-trigger" data-target="deleteActor" data-tooltip="Elimar"><i class="material-icons">delete</i></a>
                </td>
            </tr>
        `;
    });
    $('#ActorsRead').html(content);
}

function showTable()
{
    $.ajax({
        url: APIActors + 'showActors',
        type: 'post',
        data: null,
        datatype: 'json'
    })
    .done(function(response){
        if (isJSONString(response)) {
            const result = JSON.parse(response);
            if (result.status) {
                fillTable(result.dataset);
            } else {
                console.log(result.exception);
            }
        } else {
            console.log(response);
        }
    })
    .fail(function(jqXHR){
        console.log('Error: ' + jqXHR.status + ' ' + jqXHR.statusText);
    });
}

//Show Actor
function ShowInformation(id)
{
    console.log(id);
        $.ajax({
        url: APIActors + 'showActor',
        type: 'post',
        data:{
            id: id
        },
        datatype: 'json',
    })
    .done(function(response){
        console.log(response);
        if (isJSONString(response)) {

            const result = JSON.parse(response);
            if (result.status) {
                console.log(result.dataset);
                $('#idUpdateActor').val(result.dataset.id);                
                $('#UpdateNameActor').val(result.dataset.name);
            } else {

            }
        } else {
            console.log(response);
        }
    })
    .fail(function(jqXHR){
        console.log('Error: ' + jqXHR.status + ' ' + jqXHR.statusText);
    });
    
}

//Update Actor
$('#ActorFormUpdate').submit(function()
{
    event.preventDefault();
    $.ajax({
        url: APIActors + 'updateActor',
        type: 'post',
        data: new FormData($('#ActorFormUpdate')[0]),
        datatype: 'json',
        cache: false,
        contentType: false,
        processData: false
    })
    .done(function(response){
        if (isJSONString(response)) {
            const result = JSON.parse(response);
            if (result.status) {
                if (result.status == 1) {
                    M.toast({html: 'Actor Actualizado Correctamente!'})
                }
                else
                {
                    console.log(result.exception);
                }
                showTable();
            } else {

            }
        } else {
            console.log(response);
        }
    })
    .fail(function(jqXHR){
        //Se muestran en consola los posibles errores de la solicitud AJAX
        console.log('Error: ' + jqXHR.status + ' ' + jqXHR.statusText);
    });
})

//Show Actor - Delete
function ShowInformationDelete(id)
{
    console.log(id);
        $.ajax({
        url: APIActors + 'showActor',
        type: 'post',
        data:{
            id: id
        },
        datatype: 'json',
    })
    .done(function(response){
        console.log(response);
        if (isJSONString(response)) {

            const result = JSON.parse(response);
            if (result.status) {
                console.log(result.dataset);
                $('#idDeleteNameActor').val(result.dataset.id);                
                $('#DeleteNameActor').val(result.dataset.name);
            } else {

            }
        } else {
            console.log(response);
        }
    })
    .fail(function(jqXHR){
        console.log('Error: ' + jqXHR.status + ' ' + jqXHR.statusText);
    });
    
}

//Delete Actor
$('#DeleteActorForm').submit(function()
{
    event.preventDefault();
    $.ajax({
        url: APIActors + 'deleteActor',
        type: 'post',
        data: new FormData($('#DeleteActorForm')[0]),
        datatype: 'json',
        cache: false,
        contentType: false,
        processData: false
    })
    .done(function(response){
        if (isJSONString(response)) {
            const result = JSON.parse(response);
            if (result.status) {
                if (result.status == 1) {
                    M.toast({html: 'Actor Eliminado Correctamente!'})
                }
                else
                {
                    console.log(result.exception);
                }
                showTable();
            } else {

            }
        } else {
            console.log(response);
        }
    })
    .fail(function(jqXHR){
        //Se muestran en consola los posibles errores de la solicitud AJAX
        console.log('Error: ' + jqXHR.status + ' ' + jqXHR.statusText);
    });
})





