import { useState,useEffect } from 'react';
 import { useNavigate } from 'react-router-dom';

import {Link} from 'react-router-dom'
import axios from 'axios'
import { useParams } from 'react-router-dom';


function Update() {
    const url="http://localhost:5000/"
   const navigate = useNavigate();
  const [upload, setUpload] = useState("")
  const [nome, setNome] = useState("")
  const [description, setDescription] = useState("")
  const [preco, setPreco] = useState("")
  const [categoria, setCategoria] = useState("")
  const [destaque, setDestaque] = useState("")


  const { id } = useParams()


  useEffect(()=>{
    loadName()
 
 },[])

   



const loadName=()=>{

    fetch("http://localhost:5000/edit-action/"+id)
    .then(response=> response.json())
    .then(res=>{
       
         console.log(res[0].image)
        setUpload(res[0].image)
        setNome(res[0].nome)
        setDescription(res[0].description)
        setPreco(res[0].preco)
        setCategoria(res[0].categoria)
        setDestaque(res[0].destaque)

        
    })
            
}




  const handleSubmit=((e)=>{
    e.preventDefault()
    const formdata = new FormData(); 
    formdata.append('upload', upload);

    formdata.append('nome', nome);
    formdata.append('description', description);
    formdata.append('preco', preco);
    formdata.append('categoria', categoria);
    formdata.append('destaque', destaque);



axios.post("http://localhost:5000/edit-action/"+id, formdata,{   
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

      <h2 className="title">editar item</h2>

      <form onSubmit={handleSubmit} enctype="multipart/form-data">

      <input type="file" name="upload" onChange={(e) => setUpload(e.target.files[0])} />
      <br /> <br />
    {upload.name?  null :  <img src={url+upload} style={{width: "100px"}} alt="image_1"/>}
    
      
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
        <div className="listasContent container">

        </div>
        </div>
  );
}

export default Update;
