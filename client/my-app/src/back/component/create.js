import { useState } from 'react';

 import { useNavigate } from 'react-router-dom';
import Footer from './footer';
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
    <>
     <div className="listas">

        <div className="listasContent container">

          {/* form */}
          <div className='formCreatebase'>

        <h2 className="titleCreate">adicionar item</h2>
  
        <hr className='bars'/>
        <form className='formCreate' onSubmit={handleSubmit} enctype="multipart/form-data">

         <div className='formCreateContent'>
         <label>Nome</label>
          <input
            name='nome'
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nola Chicken Crispy"
          /> 
         </div>

         <div className='formCreateContent'>
          <label>Imagem</label>
            <input className='uplaod' type="file" name="upload" onChange={(e) => setUpload(e.target.files[0])} />
         </div>

         <div className='formCreateContent'>
          <label>Descrição</label>
           
          <textarea
            name="description"
            id=""
            cols="20"
            rows="5"
            value={description}  
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Coxa e sobrecoxa empanados ao estilo ame..."
          ></textarea>
         </div>
          
        
        <div className='formCreateContent'>
        <label>Preço</label>
          <input
           Type="number"
            name='preco'
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            placeholder="22.00"
          />
        </div>

        <div className='formCreateContent categoria'>
          <select name="categoria" id=""  value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            <option value="">Categoria</option>
            <option value="pizza">pizza</option>
            <option value="hamburguer">hambúrguer</option>
            <option value="bebida">bebida</option>
          </select>
          
          <select name="destaque" id="" value={destaque} onChange={(e) => setDestaque(e.target.value)}>
            <option value="">Destaque</option>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
          </select>

          </div>


          <div className='formCreateContent buttons'>
          <input type="submit" className="submitCreate" value="adicionar"/>
  
          <Link to='/admin/dashboard'>
             <button className="cancelCreate">cancel</button>
          </Link>

          </div> 

        </form>

        </div>
      {/* fim form */}

        </div>
      
        </div>

        <Footer/>

       </>
  );
}

export default Create;
