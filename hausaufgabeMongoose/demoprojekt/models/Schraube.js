const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// VerkaufsSchema
const VerkaufSchema = new Schema({
    schrauben_typ: { type: String, required: true },
    verkaufsdatum: { type: Date, required: true },
    menge: { type: Number, required: true },
    preis_pro_einheit: { type: Number, required: true },
    produkt_id: { type: String, required: true }
  });

// VerkaufsSchema Gesamtpreis
VerkaufSchema.virtual('gesamtpreis').get(function() {
  return this.menge * this.preis_pro_einheit;
});

// stehen lassen, sonst wird der Gesamtpreis nicht angezeigt im request
VerkaufSchema.set('toObject', { virtuals: true });
VerkaufSchema.set('toJSON', { virtuals: true });

const schraubenModel = mongoose.model('Schraube', VerkaufSchema, 'schrauben');

module.exports = mongoose.model('Schraube', VerkaufSchema);
