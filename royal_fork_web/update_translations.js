/* eslint-env node */
const fs = require('fs');
eval(fs.readFileSync('src/i18n/translations.js', 'utf8').replace('export const resources', 'global.resources = {}'));

const updates = {
  fr: {
    "daily.item.name": "Souris d'Agneau Confite",
    "daily.item.desc": "Une souris d'agneau fondante, confite pendant 12 heures aux épices douces, servie avec un écrasé de pommes de terre à l'huile d'olive truffée.",
    "daily.title": "Menu du Jour",
    "daily.subtitle": "Une sélection exclusive préparée chaque matin par notre Chef.",
    "daily.limited_offer": "Offre Limitée - Aujourd'hui seulement",
    "daily.chef_specialty": "La Spécialité du Chef",
    "daily.discount": "-20%",
    "daily.feature1": "Ingrédients frais du marché",
    "daily.feature2": "Préparation artisanale",
    "daily.feature3": "Quantité limitée : 20 portions restantes",
    "daily.add_offer": "Ajouter l'offre au panier",
    "cart.added_toast": "ajouté au panier !",
    "cart.added_btn": "Ajouté",
    "sandwiches.title": "Nos Sandwiches",
    "sandwiches.subtitle": "Découvrez notre sélection de sandwichs premium, préparés avec des ingrédients frais et une touche d'excellence.",
    "halal_badge": "100% Halal",
    "patisserie.title": "Notre Pâtisserie",
    "patisserie.subtitle": "Laissez-vous tenter par nos créations sucrées, confectionnées avec passion et raffinement."
  },
  en: {
    "daily.item.name": "Candied Lamb Shank",
    "daily.item.desc": "A melting lamb shank, candied for 12 hours with sweet spices, served with truffled olive oil mashed potatoes.",
    "daily.title": "Daily Menu",
    "daily.subtitle": "An exclusive selection prepared every morning by our Chef.",
    "daily.limited_offer": "Limited Offer - Today only",
    "daily.chef_specialty": "Chef's Specialty",
    "daily.discount": "-20%",
    "daily.feature1": "Fresh market ingredients",
    "daily.feature2": "Artisanal preparation",
    "daily.feature3": "Limited quantity: 20 portions remaining",
    "daily.add_offer": "Add offer to cart",
    "cart.added_toast": "added to cart!",
    "cart.added_btn": "Added",
    "sandwiches.title": "Our Sandwiches",
    "sandwiches.subtitle": "Discover our selection of premium sandwiches, prepared with fresh ingredients and a touch of excellence.",
    "halal_badge": "100% Halal",
    "patisserie.title": "Our Pastries",
    "patisserie.subtitle": "Let yourself be tempted by our sweet creations, made with passion and refinement."
  },
  ar: {
    "daily.item.name": "موزات لحم ضأن كونفيت",
    "daily.item.desc": "موزات لحم ضأن تذوب في الفم، مطبوخة ببطء لمدة 12 ساعة مع بهارات حلوة، تقدم مع بطاطس مهروسة بزيت الزيتون والكمأة.",
    "daily.title": "قائمة اليوم",
    "daily.subtitle": "تشكيلة حصرية يحضرها الشيف كل صباح.",
    "daily.limited_offer": "عرض محدود - اليوم فقط",
    "daily.chef_specialty": "تخصص الشيف",
    "daily.discount": "-٢٠٪",
    "daily.feature1": "مكونات طازجة من السوق",
    "daily.feature2": "تحضير حرفي",
    "daily.feature3": "كمية محدودة: 20 حصة متبقية",
    "daily.add_offer": "أضف العرض إلى السلة",
    "cart.added_toast": "تمت الإضافة إلى السلة!",
    "cart.added_btn": "تمت الإضافة",
    "sandwiches.title": "سندويشاتنا",
    "sandwiches.subtitle": "اكتشف مجموعتنا المختارة من السندويشات الفاخرة، المحضرة بمكونات طازجة ولمسة من التميز.",
    "halal_badge": "حلال 100%",
    "patisserie.title": "حلوياتنا",
    "patisserie.subtitle": "دع نفسك تنجذب إلى إبداعاتنا الحلوة، المصنوعة بشغف ورقي."
  },
  de: {
    "daily.item.name": "Kandierte Lammhaxe",
    "daily.item.desc": "Eine schmelzende Lammhaxe, 12 Stunden lang mit süßen Gewürzen kandiert, serviert mit Trüffelolivenöl-Kartoffelpüree.",
    "daily.title": "Tagesmenü",
    "daily.subtitle": "Eine exklusive Auswahl, die unser Chefkoch jeden Morgen zubereitet.",
    "daily.limited_offer": "Begrenztes Angebot - Nur heute",
    "daily.chef_specialty": "Spezialität des Küchenchefs",
    "daily.discount": "-20%",
    "daily.feature1": "Frische Zutaten vom Markt",
    "daily.feature2": "Handwerkliche Zubereitung",
    "daily.feature3": "Begrenzte Menge: 20 Portionen übrig",
    "daily.add_offer": "Angebot in den Warenkorb legen",
    "cart.added_toast": "zum Warenkorb hinzugefügt!",
    "cart.added_btn": "Hinzugefügt",
    "sandwiches.title": "Unsere Sandwiches",
    "sandwiches.subtitle": "Entdecken Sie unsere Auswahl an Premium-Sandwiches, die mit frischen Zutaten und einem Hauch von Exzellenz zubereitet werden.",
    "halal_badge": "100% Halal",
    "patisserie.title": "Unsere Konditorei",
    "patisserie.subtitle": "Lassen Sie sich von unseren süßen Kreationen verführen, die mit Leidenschaft und Raffinesse hergestellt werden."
  },
  it: {
    "daily.item.name": "Stinco di Agnello Confit",
    "daily.item.desc": "Uno stinco di agnello fondente, confit per 12 ore con spezie dolci, servito con purè di patate all'olio d'oliva tartufato.",
    "daily.title": "Menu del Giorno",
    "daily.subtitle": "Una selezione esclusiva preparata ogni mattina dal nostro Chef.",
    "daily.limited_offer": "Offerta Limitata - Solo oggi",
    "daily.chef_specialty": "Specialità dello Chef",
    "daily.discount": "-20%",
    "daily.feature1": "Ingredienti freschi di mercato",
    "daily.feature2": "Preparazione artigianale",
    "daily.feature3": "Quantità limitata: 20 porzioni rimanenti",
    "daily.add_offer": "Aggiungi l'offerta al carrello",
    "cart.added_toast": "aggiunto al carrello!",
    "cart.added_btn": "Aggiunto",
    "sandwiches.title": "I Nostri Sandwich",
    "sandwiches.subtitle": "Scopri la nostra selezione di sandwich premium, preparati con ingredienti freschi e un tocco di eccellenza.",
    "halal_badge": "100% Halal",
    "patisserie.title": "La Nostra Pasticceria",
    "patisserie.subtitle": "Lasciati tentare dalle nostre creazioni dolci, realizzate con passione e raffinatezza."
  },
  nl: {
    "daily.item.name": "Gekonfijte Lamsschenkel",
    "daily.item.desc": "Een smeltende lamsschenkel, 12 uur gegaard met zoete kruiden, geserveerd met aardappelpuree met truffelolie.",
    "daily.title": "Dagmenu",
    "daily.subtitle": "Een exclusieve selectie die elke ochtend door onze chef wordt bereid.",
    "daily.limited_offer": "Tijdelijke Aanbieding - Alleen vandaag",
    "daily.chef_specialty": "Specialiteit van de Chef",
    "daily.discount": "-20%",
    "daily.feature1": "Verse marktingrediënten",
    "daily.feature2": "Ambachtelijke bereiding",
    "daily.feature3": "Beperkte hoeveelheid: nog 20 porties",
    "daily.add_offer": "Voeg aanbieding toe aan winkelwagen",
    "cart.added_toast": "toegevoegd aan winkelwagen!",
    "cart.added_btn": "Toegevoegd",
    "sandwiches.title": "Onze Broodjes",
    "sandwiches.subtitle": "Ontdek onze selectie premium broodjes, bereid met verse ingrediënten en een vleugje uitmuntendheid.",
    "halal_badge": "100% Halal",
    "patisserie.title": "Onze Patisserie",
    "patisserie.subtitle": "Laat u verleiden door onze zoete creaties, gemaakt met passie en verfijning."
  }
};

for (const lang in updates) {
  Object.assign(global.resources[lang].translation, updates[lang]);
}

fs.writeFileSync('src/i18n/translations.js', 'export const resources = ' + JSON.stringify(global.resources, null, 2) + ';\n');
console.log('DailyMenu, Sandwiches, Patisserie Translations updated successfully.');
