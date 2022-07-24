import { useState } from 'react';

 import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'
import axios from 'axios'
import "../styles/create.css"



function Create() {
   const navigate = useNavigate();
  const [upload, setUpload] = useState("")
  const [nome, setNome] = useState("")
  const [description, setDescription] = useState("")
  const [preco, setPreco] = useState("")
  const [categoria, setCategoria] = useState("")
  const [destaque, setDestaque] = useState("")


  

  const handleSubmit=((e)=>{
    e.preventDefault()
    const formdata = new FormData(); 
    formdata.append('upload', upload);

    formdata.append('nome', nome);
    formdata.append('description', description);
    formdata.append('preco', preco);
    formdata.append('categoria', categoria);
    formdata.append('destaque', destaque);


axios.post("http://localhost:5000/add-action", formdata,{   
        headers: { "Content-Type": "multipart/form-data" } 
})
.then(res => { 
 
  if(res.status === 200){
        navigate('/admin/dashboard')
  }

})
        
   
   
})

  return (
     <div className="listas">

        <div className="listasContent container">

        <h2 className="titleCreate">adicionar item</h2>
  
        <form className='formCreate' onSubmit={handleSubmit} enctype="multipart/form-data">
  
        <input type="file" name="upload" onChange={(e) => setUpload(e.target.files[0])} />
        
          <br /> <br />
          <input
            name='nome'
            value={nome}
            setNome={setNome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome"
          /> 
          <br /> <br />
          <textarea
            name="description"
            id=""
            cols="20"
            rows="5"
            value={description}
            setNome={setDescription}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="descrição do item"
          ></textarea>
          <br /> <br />
          <input
            name='preco'
            value={preco}
            setContato={setPreco}
            onChange={(e) => setPreco(e.target.value)}
            placeholder="preço"
          />
          <br></br><br></br>
          <select name="categoria" id=""  value={categoria} setContato={setCategoria}  onChange={(e) => setCategoria(e.target.value)}>
            <option value="">Categoria</option>
            <option value="pizza">pizza</option>
            <option value="hamburguer">hambúrguer</option>
            <option value="bebida">bebida</option>
          </select>
          <br></br>
          <br></br>
          <select name="destaque" id="" value={destaque} setContato={setDestaque}  onChange={(e) => setDestaque(e.target.value)}>
            <option value="">Destaque</option>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
          </select>
          <br /> <br />
          <input type="submit" className="btnAtion1 btnAtion" />
        
  
          <Link to='/admin/dashboard'>
             <button className="btnAtion1 btnAtion">cancel</button>
            </Link>
        </form>
        </div>
      
        </div>
  );
}

export default Create;
