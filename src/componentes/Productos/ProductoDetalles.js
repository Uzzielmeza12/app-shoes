import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../../context/Dataprovider";
import { useParams } from "react-router-dom";
import { ProductoItem } from "./Productoitem.js";

export const ProductosDetalles = () => {

    const value = useContext(DataContext);
    const [productos] = value.productos;
    const addCarrito = value.addCarrito;
    const [detalle, setDetalle] = useState([]);
    const [url, setUrl] = useState(0);
    const [image, setImage] = useState([]);
    const params = useParams();
    let item = 0

    useEffect(() => {
        productos.forEach(productos => {
            item = 0;
           if(productos.id === parseInt(params.id)){
               setDetalle(productos)
               setUrl(0)
           } 
        })
    },[params.id, productos]);



    useEffect(() => {
        const values = `${detalle.img1}${url}${detalle.img2}`;
        setImage(values);

    },[url, params.id])

    const handleInput = e => {
        const number = e.target.value.toString().padStart(2, "01");
        setUrl(number);
        console.log(number);
    }



    return (
        <>
          {
              
              <div className="detalles">
                <h2>{detalle.title}</h2>
                <p className="price">${detalle.price}</p>
                <div className="grid">
                 <p className="nuevo">Nuevo</p>
                 <div className="size">
                     <select placeholder="Tamaño">
                         <option value="1">1</option> 
                         <option value="1">2</option> 
                         <option value="1">3</option> 
                         <option value="1">4</option> 
                         <option value="1">5</option>
                         <option value="1">6</option> 
                         <option value="1">7</option> 
                         <option value="1">8</option> 
                         <option value="1">9</option>   
                     </select>
                     <p>Tamaño</p> 
                 </div>    
                </div> 
                <button onClick={() => addCarrito (detalle.id)}>Añadir al carrito</button>
                <img src= {detalle.image} alt={detalle.title} />
                <input type="range" min="1" max="36" value={url} onChange={handleInput}/>
                <div className="description">
                    <p><b>description</b><br></br>Un tenis Nike es un tipo de calzado deportivo fabricado por la marca Nike. Son conocidos por su diseño moderno, comodidad y durabilidad. Tú puedes encontrar diferentes modelos de tenis Nike para diferentes actividades como correr, jugar fútbol o simplemente para uso diario.                                   <br></br>El tenis nike de la marca Nike es perfecto para ti. Su cuello de espuma asimétrica ofrece un ajuste cómodo, proporcionándote comodidad durante todo el día. Además, con las perforaciones en el antepié, podrás disfrutar de una transpirabilidad óptima, manteniendo tus pies frescos y secos. La unidad Nike Air visible en el talón te brinda una amortiguación de impacto excepcional, protegiendo tus pies de cualquier impacto. Y lo mejor de todo, sus botines de malla transpirable se ajustan a tu pie como un cómodo calcetín. No dudes en probar estos tenis, ¡te encantarán!</p>
                </div>
              </div>  
          }  
            


            <h2 className="relacionado">Productos Relacionados</h2>
            <div className="productos">

                 { productos.map((producto) => {
                    if ((item < 6)&&(detalle.category === producto.category)){
                        item++;
                       return <ProductoItem 
                       key={producto.id}
                       id={producto.id}
                       title={producto.title}
                       price={producto.price}
                       image={producto.image}
                       category={producto.category}
                       cantidad={producto.cantidad}
                       /> 
                    }





                 })}
                          
                          
            
            </div>
            

            
        </>
    )
}
