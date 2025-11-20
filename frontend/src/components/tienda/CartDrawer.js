import React from 'react';

export default function CartDrawer({ open, items, onClose, onInc, onDec, onRemove }) {
  if (!open) return null;
  const total = items.reduce((s,it)=>s + (it.precio||0) * (it.cantidad||1), 0);
  return (
    <div className="cart-drawer" role="dialog" aria-modal="true">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h3 style={{margin:0}}>Tu carrito</h3>
        <div>
          <button className="btn-outline" onClick={onClose}>Cerrar</button>
        </div>
      </div>

      <div style={{overflow:'auto', maxHeight:'60vh'}}>
        {items.length === 0 && <div style={{padding:16}}>No hay productos</div>}
        {items.map(it => (
          <div className="cart-item" key={it.id || it.nombre}>
            <img src={it.imagen || 'https://via.placeholder.com/80'} style={{width:72, height:72, objectFit:'cover', borderRadius:8}} />
            <div style={{flex:1}}>
              <div style={{fontWeight:700}}>{it.nombre}</div>
              <div style={{fontSize:13, color:'#6b7280'}}> ${ (it.precio||0).toFixed(2) } </div>
              <div style={{marginTop:6, display:'flex', gap:8, alignItems:'center'}}>
                <button className="btn-outline" onClick={()=>onDec(it)}>-</button>
                <div>{it.cantidad}</div>
                <button className="btn-outline" onClick={()=>onInc(it)}>+</button>
                <button className="btn-outline" onClick={()=>onRemove(it)} style={{marginLeft:8}}>Eliminar</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-total">
        <div>Total</div>
        <div>${total.toFixed(2)}</div>
      </div>
      <div style={{display:'flex', gap:8}}>
        <button className="btn" style={{flex:1}}>Pagar</button>
        <button className="btn-outline" style={{flex:1}}>Seguir comprando</button>
      </div>
    </div>
  );
}
