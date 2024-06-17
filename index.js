const isLoading = bool => {
  const spinner = document.querySelector(".spinner-border");

  if (bool) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};

// window.addEventListener("DOMContentLoaded", function () {
//   // al caricamento del dom (pagina), avviamo una chiamata HTTP di tipo GET (implicito)
//   fetch("https://striveschool-api.herokuapp.com/api/agenda/")
//     .then(resp => {
//       if (resp.ok) {
//         // restituiamo il dato convertito in array da JSON
//         return resp.json();
//       }
//     })
//     .then(appointments => {
//       console.log("Appointments", appointments);
//       // otteniamo l'array come parametro appointments
//       // qui dentro ci saremo nel momento esatto in cui avremo ricevuto il dato,
//       // è il punto giusto per fare tutta la dom manipulation che serve
//       isLoading(false); // stiamo rendendo invisibile lo spinner perché in qualche istante verranno generati gli elementi

//       const list = document.getElementById("appointments-list");

//       // cicliamo appointments per generare tanti elementi "li" nella pagina quanti sono gli oggetti contenuti nell'array
//       appointments.forEach(app => {
//         const listItem = document.createElement("li");
//         listItem.className = "list-group-item d-flex align-items-center";
//         listItem.innerHTML = `<span>${app.name}</span> <span class="badge ms-auto me-2 ${app.price ? "text-bg-dark" : "text-bg-success"}">${
//           app.price ? app.price + "€" : "gratis"
//         }</span> <a href="./details.html?appointmentId=${app._id}">VEDI DETTAGLI</a>`;

//         list.appendChild(listItem);
//       });
//     })
//     .catch(err => console.log(err));

//   // una seconda fetch eseguita in concomitanza alla prima
//   fetch("https://api.disneyapi.dev/character")
//     .then(resp => resp.json())
//     .then(characters => console.log("Disney Characters", characters));
// });

const displayAppointments = appointments => {
  const list = document.getElementById("appointments-list");

  appointments.forEach(app => {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex align-items-center";
    listItem.innerHTML = `<span>${app.name}</span> <span class="badge ms-auto me-2 ${app.price ? "text-bg-dark" : "text-bg-success"}">${
      app.price ? app.price + "€" : "gratis"
    }</span> <a href="./details.html?appointmentId=${app._id}">VEDI DETTAGLI</a>`;

    list.appendChild(listItem);
  });
};

// window.addEventListener("DOMContentLoaded", async function () {
//   // all'interno di un contesto async possiamo usare await su ogni operazione asincrona, per aspettarla.
//   // il codice quindi si "congelerà" fino alla risoluzione delle promise

//   // fetch("https://striveschool-api.herokuapp.com/api/agenda/")
//   // .then(resp => {
//   //   if (resp.ok) {
//   //     return resp.json();
//   //   }
//   // })
//   // .then(appointments => {
//   //   // isLoading(false);

//   //   console.log("Appointments", appointments);
//   //   displayAppointments(appointments);
//   // })
//   // .catch(err => console.log(err))
//   // .finally(() => isLoading(false));

//   // il codice precedente si traduce in:

//   try {
//     const response = await fetch("https://striveschool-api.herokuapp.com/api/agenda/");
//     if (response.ok) {
//       const appointments = await response.json();
//       // isLoading(false);

//       console.log("Appointments", appointments);
//       displayAppointments(appointments);
//     } else {
//       throw new Error("errore nel reperimento degli appuntamenti");
//     }
//   } catch (err) {
//     // isLoading(false);
//     console.log(err);
//   } finally {
//     isLoading(false);
//   }

//   // una seconda fetch eseguita in concomitanza alla prima
//   fetch("https://api.disneyapi.dev/character")
//     .then(resp => resp.json())
//     .then(characters => console.log("Disney Characters", characters))
//     .catch(err => console.log(err));
// });

const getAppointments = async () => {
  try {
    const response = await fetch("https://striveschool-api.herokuapp.com/api/agenda/");
    if (response.ok) {
      const appointments = await response.json();
      // isLoading(false);

      return appointments;
    } else {
      throw new Error("errore nel reperimento degli appuntamenti");
    }
  } catch (err) {
    // isLoading(false);
    console.log(err);
  } finally {
    isLoading(false);
  }

  console.log("Fine di get appointments");
};

const getDisney = async () => {
  try {
    const resp = await fetch("https://api.disneyapi.dev/character");
    const characters = await resp.json();
    console.log("Disney Characters", characters);
  } catch (error) {
    console.log(error);
  }
};

const getAndDisplayAppointments = async () => {
  try {
    const appointments = await getAppointments();
    displayAppointments(appointments);
  } catch (error) {
    console.log(error);
  }
};

// come fare a far eseguire il codice della seconda fetch in concomitanza alla prima? senza che venga bloccata dall'esecuzione della precedente?
window.addEventListener("DOMContentLoaded", function () {
  // approccio 1) con then() per ricavare il dato di ritorno da una funzione async
  // getAppointments().then(appointments => {
  //   console.log("Appointments esterno", appointments);
  //   displayAppointments(appointments);
  // });

  // approccio 2) con async/await che però blocca l'esecuzione della funzione getDisney()
  // const appointments = await getAppointments();
  // displayAppointments(appointments);

  // approccio 3) con funzione "di mezzo" che si occupa di repereire il dato con async/await in un contesto separato, così da non impedire l'ecuzione concomitante di getDisney()
  getAndDisplayAppointments();

  getDisney();
  // una seconda fetch eseguita in concomitanza alla prima
});
