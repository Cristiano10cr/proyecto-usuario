import React, { useState } from 'react';

export default function ProductModal({ product, onClose, onAdd }) {
  const [qty, setQty] = useState(1);
  if (!product) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={e=>e.stopPropagation()}>
        <div className="modal-media">
          <img src={product.imagen || 'https://via.placeholder.com/500x400?text=Producto'} alt={product.nombre} style={{maxWidth:'100%', maxHeight:440}} />
        </div>
        <div className="modal-info">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <h2 style={{margin:0}}>{product.nombre}</h2>
            <div style={{fontWeight:800}}>${(product.precio ?? 0).toFixed(2)}</div>
          </div>
          <p style={{color:'#475569'}}>{product.descripcion || 'Descripción extendida del producto con beneficios y características.'}</p>
          <div style={{display:'flex', gap:10, alignItems:'center'}}>
            <div className="qty">
              <button className="btn-outline" onClick={()=>setQty(q=> Math.max(1,q-1))}>-</button>
              <div style={{padding:'6px 10px', minWidth:36, textAlign:'center'}}>{qty}</div>
              <button className="btn-outline" onClick={()=>setQty(q=>q+1)}>+</button>
            </div>
            <button className="btn" onClick={()=>{ onAdd(product, qty); onClose(); }}>Añadir al carrito</button>
            <button className="btn-outline" onClick={onClose}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
