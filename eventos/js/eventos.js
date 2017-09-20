var reqUri = "https://ws.rosario.gov.ar/web/api/agenda.json" + "?limit=21"

function stringTrim(text, lng) {
    if (text != null && text.length < lng)
    {
      return text.substring(0,lng-3) + "..."
    }
    else if (text != null)
    {
      return text
    }
    else 
    {
      return null
    }
}

function makeDiv(eventData) {
  var item = document.createElement("div")
    item.classList.add("col-lg-4")
    item.classList.add("col-md-4")
    item.classList.add("col-xs-12")
    item.classList.add("portfolio-item")
    item.classList.add("container-fluid")
    item.classList.add("info-div")
  var picture = document.createElement("img")
    //picture.width = "700"
    picture.style = "width: 335px; height: 150px;"
    
    
    picture.classList.add("img-responsive")
    picture.src = eventData.uri_imagen
    
    if(picture.src != eventData.uri_imagen) {
        var source= "https://www.rosario.gov.ar/web/sites/default/files/7105.jpg";
        picture.src = source;
    }
  var title = document.createElement("a")
    title.innerHTML = "<h3>" + stringTrim(eventData.title,3) + "</h3>"
    title.style="position: relative; width: 100%;"
  var desc = document.createElement("div")
    if (stringTrim(eventData.texto, 3) != null)
    {
      desc.innerHTML = stringTrim(eventData.texto, 3) 
    }
    else if (stringTrim(eventData.resumen, 3) != null)
    {
      desc.innerHTML = stringTrim(eventData.resumen, 3) 
    }
    else
    {
      console.log(eventData)
    }
    desc.style="max-height: 100px; overflow-y: auto; overflow-x: hidden;"
  var loc = document.createElement("span")
    loc.classList.add("glyphicon")
    loc.classList.add("glyphicon-map-marker")
    if (eventData.lugar_eventual != null)
    {
      loc.innerHTML = eventData.lugar_eventual
    }
    else if (eventData.lugares[0] != null)
    {
      loc.innerHTML = eventData.lugares[0].nombre
    }
  var date = document.createElement("span")
  var inicio = eventData.fecha_y_hora_inicio.slice(0,10);
  var fin = eventData.fecha_y_hora_fin.slice(0,10);
  
    if(inicio == fin){
        date.innerHTML = eventData.fecha_y_hora_inicio.slice(8,10) + "-" + eventData.fecha_y_hora_inicio.slice(5,7) + "-" + eventData.fecha_y_hora_inicio.slice(0,4)
    } else {
        date.innerHTML = eventData.fecha_y_hora_inicio.slice(8,10) + "-" + eventData.fecha_y_hora_inicio.slice(5,7) + "-" + eventData.fecha_y_hora_inicio.slice(0,4) + " a " +
                         eventData.fecha_y_hora_fin.slice(8,10) + "-" + eventData.fecha_y_hora_fin.slice(5,7) + "-" + eventData.fecha_y_hora_fin.slice(0,4)   
    }
    date.style = "text-align: center"
  var link = document.createElement("a")
    link.href = "../extension-evento/extensionevento.html?nid=" + eventData.nid

  link.appendChild(item)
  item.appendChild(date)
  item.innerHTML += "<br>"
  item.appendChild(picture)
  item.appendChild(title)
  //item.appendChild(desc)
  //item.appendChild(loc)
  //item.innerHTML += "<br>"
  //item.appendChild(more)
  return link
}

var container = document.getElementById("items")
var req = new XMLHttpRequest()
req.open("GET", reqUri, false)
req.send(null)
var jsonData = JSON.parse('{"list": ' + req.responseText + '}')
var row = document.createElement("div")
for (var i = 0; i < jsonData.list.length; i++)
{
    if (i%3 == 0)
    {
      row = document.createElement("div")
      row.classList.add("row")
      row.classList.add("container-fluid")
      row.appendChild(makeDiv(jsonData.list[i]))
      container.appendChild(row)
    }
    else
    {
      row.appendChild(makeDiv(jsonData.list[i]))
      container.appendChild(row)
    }
}
