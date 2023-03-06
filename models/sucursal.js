const { Schema, model } = require('mongoose');

const SucursalSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    empresa: {
        type: Schema.Types.ObjectId,
        ref: 'Empresa',
        required: true
    },
    municipios:[{
        type: String,
        required: true
    }],
    estado: {
        type: Boolean,
        default: true,
        required: true
    }
});

SucursalSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Sucursale', SucursalSchema);