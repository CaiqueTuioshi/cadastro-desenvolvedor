import {Schema, model, Document} from 'mongoose'

interface DeveloperInterface extends Document {
  nome: string;
  sexo: string;
  idade: string;
  hobby: string;
  dataNascimento: string;
}

const DeveloperSchema = new Schema({
  nome: String,
  sexo: String,
  idade: String,
  hobby: String,
  dataNascimento: String
}, {
  timestamps: true
})

export default model<DeveloperInterface>('Developer', DeveloperSchema)