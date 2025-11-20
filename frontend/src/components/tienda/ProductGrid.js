import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import CartDrawer from './CartDrawer';
import HeaderTienda from './HeaderTienda';
import './stylesTienda.css';

/* 
  ProductGrid: obtiene productos de /api/productos
  Si falla, usa datos de ejemplo para que la UI funcione.
*/

const EXAMPLE_PRODUCTS = [
  { id:1, nombre:'Camiseta Ficticia', descripcion:'Algodón 100%', precio:19.99, imagen:'https://picsum.photos/seed/p1/600/400' },
  { id:2, nombre:'Gorra Ficticia', descripcion:'Un tamaño', precio:12.5, imagen:'https://picsum.photos/seed/p2/600/400' },
  { id:3, nombre:'Sudadera', descripcion:'Con capucha', precio:49.0, imagen:'https://picsum.photos/seed/p3/600/400' },
  { id:4, nombre:'Taza', descripcion:'Cerámica 300ml', precio:8.75, imagen:'https://picsum.photos/seed/p4/600/400' },
  { id:5, nombre:'Bolso', descripcion:'Lona resistente', precio:29.9, imagen:'https://picsum.photos/seed/p5/600/400' }
];

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let mounted = true;
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:5000/api/productos', { timeout:3000 });
        if (mounted && Array.isArray(res.data)) {
          setProducts(res.data);
          setFiltered(res.data);
        } else {
          setProducts(EXAMPLE_PRODUCTS);
          setFiltered(EXAMPLE_PRODUCTS);
        }
      } catch (err) {
        // fallback a datos de ejemplo
        setProducts(EXAMPLE_PRODUCTS);
        setFiltered(EXAMPLE_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
    return ()=> mounted = false;
  }, []);

  const handleSearch = (q) => {
    const s = String(q||'').toLowerCase().trim();
    if (!s) return setFiltered(products);
    setFiltered(products.filter(p => (p.nombre || '').toLowerCase().includes(s) || (p.descripcion||'').toLowerCase().includes(s)));
  };

  const openProduct = (p) => setSelected(p);
  const closeProduct = () => setSelected(null);

  const addToCart = (p, qty=1) => {
    setCart(prev => {
      const found = prev.find(x => x.id === p.id);
      if (found) return prev.map(x => x.id === p.id ? { ...x, cantidad: x.cantidad + qty } : x);
      return [...prev, { ...p, cantidad: qty }];
    });
    setCartOpen(true);
  };

  const incItem = (item) => setCart(c => c.map(it => it.id===item.id ? {...it, cantidad: it.cantidad + 1} : it));
  const decItem = (item) => setCart(c => c.map(it => it.id===item.id ? {...it, cantidad: Math.max(1, it.cantidad - 1)} : it));
  const removeItem = (item) => setCart(c => c.filter(it => it.id !== item.id));

  return (
    <div className="tienda-container">
      <HeaderTienda onOpenCart={() => setCartOpen(true)} cartCount={cart.reduce((s,i)=>s+i.cantidad,0)} onSearch={handleSearch} />
      <div style={{marginBottom:12}}>
        <div style={{fontWeight:700, fontSize:22}}>Nuestros productos</div>
        <div style={{color:'#6b7280', marginTop:6}}>Selecciona un producto para ver más detalles y añadir al carrito.</div>
      </div>

      {loading ? <div>Cargando productos...</div> : (
        <div className="grid-products" role="list">
          {filtered.map(p => (
            <ProductCard key={p.id} p={p} onOpen={openProduct} />
          ))}
        </div>
      )}

      <ProductModal product={selected} onClose={closeProduct} onAdd={addToCart} />
      <CartDrawer open={cartOpen} items={cart} onClose={()=>setCartOpen(false)} onInc={incItem} onDec={decItem} onRemove={removeItem} />
    </div>
  );
}
