import React from 'react';
import './stylesTienda.css';

export default function HeaderTienda({ onOpenCart, cartCount, onSearch }) {
  return (
    <div className="header-tienda tienda-container" style={{marginBottom: 6}}>
      <div className="logo-tienda">
        <div className="logo-badge">Ficticia</div>
        <div>
          <div style={{fontWeight:700}}>Tienda Ficticia</div>
          <div style={{fontSize:12, color:'#6b7280'}}>Productos de ejemplo</div>
        </div>
      </div>

      <div className="search-cart">
        <input className="tienda-search" placeholder="Buscar producto..." onChange={e => onSearch && onSearch(e.target.value)} />
        <button className="btn" onClick={onOpenCart}>Carrito ({cartCount || 0})</button>
      </div>
    </div>
  );
}
