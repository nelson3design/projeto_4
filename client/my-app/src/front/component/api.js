import axios from 'axios';

export const createName= async  (nome)=>{
    return  await axios.post('http://localhost:5000/teste',nome)
}
