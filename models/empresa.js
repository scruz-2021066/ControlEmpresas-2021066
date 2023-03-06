const { Schema, model, Types, SchemaType } = require('mongoose');

const EmpresaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'], 
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    tipo_de_empresa: {
        type: String,
        required: true
    },
    sucursales: [{
        type: Schema.Types.ObjectId,
        ref: 'Sucursale'
    }],
    estado: {
        type: Boolean,
        default: true,
        required: true
    }
});

EmpresaSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Empresa', EmpresaSchema);