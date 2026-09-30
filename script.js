// Chaque option a un score entre 0 (pire) et 1 (meilleur).
// Tout au minimum -> 450 ans ; tout au maximum -> 15 ans.
const MAX_YEARS = 450;
const MIN_YEARS = 15;

const DOMAINES = [
  ["Agriculture et agroalimentaire", 0.55],
  ["Aéronautique et spatial", 0.6],
  ["Architecture", 0.3],
  ["Art et création contemporaine", 0],
  ["Artisanat (boulangerie, menuiserie, etc.)", 0.7],
  ["Assurance", 0.6],
  ["Audiovisuel et cinéma", 0.15],
  ["Automobile", 0.45],
  ["Banque et finance", 0.65],
  ["Biotechnologies", 0.4],
  ["Chimie", 0.45],
  ["Commerce et vente", 0.6],
  ["Communication et relations publiques", 0.3],
  ["Comptabilité et audit", 0.7],
  ["Conseil (consulting)", 0.5],
  ["Cybersécurité", 0.85],
  ["Défense et armement", 0.55],
  ["Droit et justice", 0.5],
  ["Éducation et enseignement", 0.6],
  ["Énergie et environnement", 0.6],
  ["Hôtellerie et restauration", 0.8],
  ["Immobilier", 0.4],
  ["Industrie pharmaceutique", 0.5],
  ["Informatique et développement logiciel", 0.45],
  ["Intelligence artificielle", 0.9],
  ["Journalisme", 0.1],
  ["Logistique et transport", 0.7],
  ["Luxe et mode", 0.3],
  ["Marketing digital", 0.35],
  ["Médecine et santé", 0.95],
  ["Dispositifs médicaux (medtech)", 0.5],
  ["Musique", 0.05],
  ["Philosophie", 0.02],
  ["Recherche académique", 0.1],
  ["Ressources humaines", 0.4],
  ["Sport professionnel", 0.08],
  ["Télécommunications", 0.5],
  ["Tourisme", 0.35],
  ["Influenceur(se) sur les réseaux sociaux", 0.12],
  ["Astrologie", 0.03],
  ["Chasse aux fantômes", 0.01],
  ["Dresseur(se) de dragons", 1],
];

const IA = [
  ["Non, mon cerveau est 100 % bio", 0],
  ["Clippy (l'assistant de Microsoft Office 97)", 0.03],
  ["Siri (version 2011)", 0.08],
  ["Alexa, qui ne comprend rien", 0.1],
  ["Un Tamagotchi mal nourri", 0.05],
  ["ChatGPT 3.5 (hallucine un peu)", 0.3],
  ["Gemini Flash", 0.45],
  ["Llama (installé en local, ça chauffe)", 0.4],
  ["Mistral Large", 0.55],
  ["Grok", 0.35],
  ["DeepSeek", 0.5],
  ["Gemini Ultra", 0.7],
  ["GPT-6", 0.8],
  ["Claude Sonnet 5", 0.85],
  ["Claude Opus 5", 0.92],
  ["Claude Fable 5", 1],
];

const CRIME = [
  ["Non, je suis un(e) citoyen(ne) modèle", 0],
  ["Le club de pétanque du quartier (paris illégaux)", 0.08],
  ["Les mamies du marché qui revendent des tartes sans facture", 0.1],
  ["La mafia des trottinettes électriques", 0.15],
  ["Le syndicat clandestin des voleurs de chaussettes", 0.12],
  ["Les pirates de Somalie", 0.45],
  ["La Camorra napolitaine", 0.6],
  ["La 'Ndrangheta calabraise", 0.7],
  ["La Cosa Nostra sicilienne", 0.75],
  ["Les Yakuzas", 0.72],
  ["Les Triades chinoises", 0.7],
  ["La Bratva (mafia russe)", 0.78],
  ["Le cartel de Sinaloa", 0.85],
  ["Le cartel de Medellín (canal historique)", 0.8],
  ["La Mafia corse", 0.65],
  ["Les Peaky Blinders", 0.55],
  ["La Team Rocket", 0.3],
  ["Le SPECTRE (organisation de Blofeld)", 0.9],
  ["Les Illuminati", 1],
];

// Poids de chaque question dans le score final (somme = 1)
const POIDS = { domaine: 0.15, experience: 0.2, phd: 0.25, ia: 0.2, crime: 0.2 };

const COMMENTAIRES = [
  [400, "Vos descendants pourront peut-être encadrer votre lettre d'embauche. Pensez à léguer votre CV dans votre testament."],
  [250, "Bonne nouvelle : l'humanité aura sans doute colonisé Mars d'ici là, et le marché de l'emploi y est moins tendu."],
  [120, "Prévoyez un régime riche en antioxydants et une bonne mutuelle. Le recruteur vous rappellera. Un jour."],
  [60,  "Presque raisonnable ! Commencez dès maintenant à relancer par e-mail tous les 18 mois."],
  [30,  "Excellent profil. Le recruteur a déjà ouvert votre CV ; il le lira dans les prochaines décennies."],
  [0,   "Profil exceptionnel. Vous êtes pratiquement embauché(e) — le temps que les RH terminent la réunion de cadrage."],
];

const $ = (id) => document.getElementById(id);

function remplir(select, options, placeholder) {
  select.innerHTML = `<option value="" disabled selected>${placeholder}</option>` +
    options.map(([label], i) => `<option value="${i}">${label}</option>`).join("");
}

remplir($("domaine"), DOMAINES, "Choisissez un domaine…");
remplir($("ia"), IA, "Choisissez votre implant…");
remplir($("crime"), CRIME, "Choisissez votre affiliation…");

$("phd").addEventListener("input", (e) => { $("phdOut").textContent = e.target.value; });

function fmt(n, d = 0) {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: d, maximumFractionDigits: d });
}

$("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;
  const exp = form.querySelector("input[name=experience]:checked");
  const manquants = [];
  if ($("domaine").value === "") manquants.push("le domaine");
  if (!exp) manquants.push("l'expérience");
  if ($("ia").value === "") manquants.push("l'implant IA");
  if ($("crime").value === "") manquants.push("l'affiliation criminelle");
  if (manquants.length) {
    alert("Il manque encore : " + manquants.join(", ") + ".");
    return;
  }

  const phd = Number($("phd").value);
  const d = DOMAINES[$("domaine").value];
  const i = IA[$("ia").value];
  const c = CRIME[$("crime").value];

  const facteurs = [
    ["Domaine : " + d[0], d[1], POIDS.domaine],
    ["Plus de 25 ans d'expérience : " + (exp.value === "1" ? "oui" : "non"), Number(exp.value), POIDS.experience],
    [phd + " doctorat" + (phd > 1 ? "s" : ""), phd / 35, POIDS.phd],
    ["Implant : " + i[0], i[1], POIDS.ia],
    ["Affiliation : " + c[0], c[1], POIDS.crime],
  ];

  const score = facteurs.reduce((s, [, v, w]) => s + v * w, 0);
  // Interpolation géométrique : chaque point de score divise le temps d'attente
  const annees = MAX_YEARS * Math.pow(MIN_YEARS / MAX_YEARS, score);

  afficher(annees, score, facteurs);
});

function afficher(annees, score, facteurs) {
  const entier = Math.floor(annees);
  const moisTotal = (annees - entier) * 12;
  const mois = Math.floor(moisTotal);
  const jours = Math.round((moisTotal - mois) * 30.44);

  $("years").textContent = fmt(annees, 1);
  $("detail").textContent =
    `soit précisément ${fmt(entier)} ans, ${mois} mois et ${jours} jour${jours > 1 ? "s" : ""}`;

  const date = new Date();
  date.setTime(date.getTime() + annees * 365.25 * 24 * 3600 * 1000);
  $("date").textContent = "Date d'embauche estimée : " +
    date.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  const pct = (Math.log(annees / MIN_YEARS) / Math.log(MAX_YEARS / MIN_YEARS)) * 100;
  $("meterFill").style.width = "0";
  requestAnimationFrame(() => requestAnimationFrame(() => { $("meterFill").style.width = pct + "%"; }));

  $("comment").textContent = COMMENTAIRES.find(([seuil]) => annees >= seuil)[1];

  $("breakdown").innerHTML = facteurs.map(([label, v, w]) =>
    `<li><span>${label}</span><span>${fmt(v * w * 100, 1)} / ${fmt(w * 100)} pts</span></li>`
  ).join("") + `<li><strong>Score d'employabilité</strong><strong>${fmt(score * 100, 1)} / 100</strong></li>`;

  const res = $("result");
  res.hidden = false;
  res.style.animation = "none";
  res.offsetHeight;
  res.style.animation = "";
  res.scrollIntoView({ behavior: "smooth", block: "start" });

  $("share").onclick = async () => {
    const txt = `Selon l'Estimateur d'Emploi, je trouverai un travail dans ${fmt(annees, 1)} ans. 🫠 ${location.href}`;
    try {
      await navigator.clipboard.writeText(txt);
      $("share").textContent = "Copié !";
      setTimeout(() => ($("share").textContent = "Copier mon résultat"), 1500);
    } catch {
      prompt("Copiez ce texte :", txt);
    }
  };
}

$("form").addEventListener("reset", () => {
  $("phdOut").textContent = "0";
  $("result").hidden = true;
});
