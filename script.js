function chargerServeurs() {

    fetch("status.txt?" + Date.now())
    .then(function(response) {
        return response.text();
    })
    .then(function(data) {

        var lignes = data.split("\n");

        var alertes = document.getElementById("alertes");
        var serveurs = document.getElementById("serveurs");
        var resume = document.getElementById("resume");

        alertes.innerHTML = "";
        serveurs.innerHTML = "";

        var nbPannes = 0;
        var nbTotal = 0;

        lignes.forEach(function(ligne) {

            ligne = ligne.trim();

            if (ligne === "") {
                return;
            }

            nbTotal++;

            var morceaux = ligne.split(":");

            var nom = morceaux[0].trim();

            var etat = morceaux[1].trim();

            var serveur = document.createElement("div");
            serveur.className = "server";

            if (etat === "0") {

                nbPannes++;

                serveur.classList.add("erreur");

                var datePanne = "";

                if (morceaux.length >= 4) {

                    datePanne =
                        morceaux[2].trim() + ":" +
                        morceaux[3].trim();
                }

                var dureeTexte = "";

                if (datePanne !== "") {

                    var debut = new Date(datePanne.replace(" ", "T"));

                    if (!isNaN(debut.getTime())) {

                        var maintenant = new Date();

                        var diff = maintenant - debut;

                        var jours =
                            Math.floor(diff / 86400000);

                        var heures =
                            Math.floor((diff % 86400000) / 3600000);

                        var minutes =
                            Math.floor((diff % 3600000) / 60000);

                        dureeTexte =
                            "<div class='info-panne'>" +
                            "Depuis : " + datePanne + "<br>" +
                            "Durée : " +
                            jours + " j " +
                            heures + " h " +
                            minutes + " min" +
                            "</div>";
                    }
                }

                serveur.innerHTML =
                    "<b>" + nom + "</b><br>" +
                    "<span class='offline'>Hors Service</span>" +
                    dureeTexte;

                alertes.appendChild(serveur);

            } else {

                serveur.innerHTML =
                    "<b>" + nom + "</b><br>" +
                    "<span class='online'>Fonctionnel</span>";

                serveurs.appendChild(serveur);
            }

        });

        if (nbPannes === 0) {

            resume.innerHTML =
                "<div class='resume-ok'>" +
                "Tous les serveurs sont opérationnels (" +
                nbTotal +
                ")" +
                "</div>";

        } else {

            resume.innerHTML =
                "<div class='resume-erreur'>" +
                nbPannes +
                " serveur(s) en panne sur " +
                nbTotal +
                "</div>";
        }

    })
    .catch(function() {

        document.getElementById("resume").innerHTML =
            "<div class='resume-erreur'>" +
            "Impossible de charger status.txt" +
            "</div>";
    });
}

chargerServeurs();

setInterval(chargerServeurs, 30000);
