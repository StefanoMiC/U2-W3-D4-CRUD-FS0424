// Appena si avvia lo script cercherà nell'oggetto window il riferimento alla location.search, che è una stringa
// questa stringa viene passata al costruttore URLSearchParams per generare un oggetto avanzato con cui possiamo
// gestire il singolo parametro che abbiamo nella URL in questo momento
// o una serie di parametri che potrebbero esserci nella URL in uno scenario più realistico.

const params = new URLSearchParams(window.location.search); // oggetto costruito a partire dai parametri nella URL es. ?appointmentId=2938123
const id = params.get("appointmentId"); // metodo sull'oggetto URLSearchParams che
// ci estrae il valore corrispondente alla chiave "appointmentId" da noi scelta e applicata al link in homepage

console.log("RESOURCE ID: ", id);
// al caricamento della pagina facciamo richiesta al server di tornarci i dati specifici della risorsa con l'id che troviamo nella URL
window.addEventListener("DOMContentLoaded", function () {
  fetch("https://striveschool-api.herokuapp.com/api/agenda/" + id)
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Errore nella fetch");
      }
    })
    .then(appointmentObj => {
      const container = document.getElementById("appointments-details");
      // destrutturazione dell'oggetto appointmentObj
      const { name, description, price, time, _id, createdAt, updatedAt } = appointmentObj;
      // svuotiamo il contenitore (togliendo anche lo spinner di conseguenza) e creiamo la struttura già con i dati ottenuti dal server
      container.innerHTML = `
                    <h1 class="display-5">${name}</h1>
                    <p class="font-monospace">${new Date(time).toLocaleString("it-IT")}</p>
                    <p class="lead">${description}</p>
                    <p class="display-6 text-primary">${price ? price + "€" : "gratis"}</p>

                    <h6 class="bg-light ps-2 py-3">Server Details:</h6>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item ps-2"><strong>id:</strong> ${_id}</li>
                        <li class="list-group-item ps-2"><strong>createdAt:</strong> ${new Date(createdAt).toLocaleString("it-IT")}</li>
                        <li class="list-group-item ps-2"><strong>updatedAt:</strong> ${new Date(updatedAt).toLocaleString("it-IT")}</li>
                    </ul>
                    <button class="btn btn-success mt-4" onclick="handleEditBtnClick()">Modifica Appuntamento</button>
    `;
    })
    .catch(err => console.log(err));
});

const handleEditBtnClick = () => {
  window.location.assign("./backoffice.html?appointmentId=" + id);
};
