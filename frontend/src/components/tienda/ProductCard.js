import React from 'react';

export default function ProductCard({ p, onOpen }) {
  return (
    <div className="card" role="article">
      <div className="card-media">
        <img src={p.imagen || 'https://via.placeholder.com/320x200?text=Producto'} alt={p.nombre} />
      </div>
      <div className="card-body">
        <div className="card-title">{p.nombre}</div>
        <div className="card-desc">{p.descripcion || 'Descripción breve del producto.'}</div>
        <div className="card-bottom">
          <div className="price">${(p.precio ?? 0).toFixed(2)}</div>
          <div>
            <button className="btn-outline" onClick={()=>onOpen(p)}>Ver</button>
          </div>
        </div>
      </div>
    </div>
  );
}
