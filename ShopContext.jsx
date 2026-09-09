import { createContext, useContext, useEffect, useMemo, useState } from 'react'
const ShopContext = createContext(null)
const read = (key, fallback=[]) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback } }
export function ShopProvider({children}) {
  const [cart,setCart] = useState(()=>read('kaelo-cart'))
  const [wishlist,setWishlist] = useState(()=>read('kaelo-wishlist'))
  const [coupon,setCoupon] = useState('')
  useEffect(()=>localStorage.setItem('kaelo-cart',JSON.stringify(cart)),[cart])
  useEffect(()=>localStorage.setItem('kaelo-wishlist',JSON.stringify(wishlist)),[wishlist])
  const addToCart=(product,size='M',qty=1)=>setCart(prev=>{ const key=`${product.id}-${size}`; const found=prev.find(i=>i.key===key); if(found) return prev.map(i=>i.key===key?{...i,qty:i.qty+qty}:i); return [...prev,{key,id:product.id,name:product.name,price:product.price,image:product.image,size,qty}] })
  const updateQty=(key,qty)=>setCart(prev=>qty<1?prev.filter(i=>i.key!==key):prev.map(i=>i.key===key?{...i,qty}:i))
  const removeFromCart=key=>setCart(prev=>prev.filter(i=>i.key!==key))
  const clearCart=()=>setCart([])
  const toggleWishlist=id=>setWishlist(prev=>prev.includes(id)?prev.filter(x=>x!==id):[...prev,id])
  const subtotal=useMemo(()=>cart.reduce((s,i)=>s+i.price*i.qty,0),[cart])
  const discount=coupon==='WELCOME10'?Math.round(subtotal*.1):0
  const shipping=(subtotal-discount)>=200000?0:15000
  const total=subtotal-discount+shipping
  const value={cart,wishlist,coupon,setCoupon,addToCart,updateQty,removeFromCart,clearCart,toggleWishlist,subtotal,discount,shipping,total}
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}
export const useShop=()=>useContext(ShopContext)
